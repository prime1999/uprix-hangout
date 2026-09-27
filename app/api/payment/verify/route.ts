import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

/**
 * GET /api/payment/verify?reference=...
 *
 * This endpoint is used by the Hangout frontend after Paystack
 * redirects the customer back to our application.
 *
 * IMPORTANT:
 * This route does NOT process the payment itself.
 *
 * The Paystack webhook is responsible for:
 * - marking the registration as paid
 * - assigning the seat number
 * - generating the ticket number
 *
 * This endpoint only checks whether that processing has happened
 * yet and, if necessary, asks Paystack about the transaction.
 */
export async function GET(req: Request) {
  try {
    /**
     * Read the payment reference from the URL.
     *
     * Example:
     * /api/payment/verify?reference=T597112301297435
     */
    const { searchParams } = new URL(req.url);

    const reference = searchParams.get("reference");

    /**
     * A payment reference is required because it is the identifier
     * Paystack gives us for the transaction.
     */
    if (!reference) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment reference is required",
        },
        { status: 400 },
      );
    }

    /**
     * Create a Supabase client using the service-role key.
     *
     * This route runs on the server, so the service-role key can
     * safely be used here.
     *
     * NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser.
     */
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    /**
     * ------------------------------------------------------------
     * STEP 1: CHECK OUR DATABASE
     * ------------------------------------------------------------
     *
     * The Paystack webhook is the source of truth for completing
     * the Hangout registration.
     *
     * Therefore, we first check whether the webhook has already
     * processed this payment.
     */
    const { data: registration, error: registrationError } = await supabase
      .from("hangout_registrations")
      .select(
        `
            id,
            full_name,
            email,
            seat_number,
            ticket_number,
            payment_reference,
            payment_status,
            amount_paid,
            discount_amount,
            coupon_code,
            paid_at
          `,
      )
      .eq("payment_reference", reference)
      .maybeSingle();

    /**
     * If Supabase itself failed, we cannot safely determine
     * the payment state.
     */
    if (registrationError) {
      console.error("Hangout verification database error:", registrationError);

      return NextResponse.json(
        {
          success: false,
          error: "Unable to check payment",
        },
        { status: 500 },
      );
    }

    /**
     * ------------------------------------------------------------
     * STEP 2: PAYMENT ALREADY PROCESSED
     * ------------------------------------------------------------
     *
     * If the webhook has already marked the registration as paid,
     * we can immediately return the real registration details.
     *
     * This includes:
     * - seat number
     * - ticket number
     * - amount paid
     * - customer information
     */
    if (registration && registration.payment_status === "paid") {
      return NextResponse.json({
        success: true,
        status: "paid",
        registration,
      });
    }

    /**
     * ------------------------------------------------------------
     * STEP 3: ASK PAYSTACK ABOUT THE TRANSACTION
     * ------------------------------------------------------------
     *
     * The customer can be redirected back to our application
     * before Paystack's webhook reaches our server.
     *
     * Therefore, the registration may still be "pending"
     * even though the customer has successfully paid.
     *
     * We can verify the transaction directly with Paystack here.
     *
     * IMPORTANT:
     * We do NOT mark the registration as paid here.
     *
     * The webhook still owns that responsibility.
     */
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference,
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },

        /**
         * Prevent Next.js from returning a cached verification
         * response. We always want the latest Paystack status.
         */
        cache: "no-store",
      },
    );

    const paystackData = await paystackResponse.json();

    /**
     * If Paystack's verification request itself failed,
     * keep the frontend in a pending state.
     *
     * We don't mark anything as paid from this endpoint.
     */
    if (!paystackResponse.ok || !paystackData.status) {
      console.error("Paystack verification failed:", paystackData);

      return NextResponse.json({
        success: false,
        status: "pending",
        message: "We are still confirming your payment.",
      });
    }

    /**
     * Get the actual transaction object returned by Paystack.
     */
    const transaction = paystackData.data;

    /**
     * If Paystack says the transaction itself was not successful,
     * return that status to the frontend.
     *
     * Examples:
     * - abandoned
     * - failed
     * - pending
     */
    if (transaction.status !== "success") {
      return NextResponse.json({
        success: false,
        status: transaction.status,
        message: "Payment has not been completed.",
      });
    }

    /**
     * ------------------------------------------------------------
     * STEP 4: PAYSTACK SAYS SUCCESS, BUT WEBHOOK IS NOT DONE
     * ------------------------------------------------------------
     *
     * At this point:
     *
     * Paystack:
     *     Payment = successful
     *
     * Our database:
     *     Registration = not processed yet
     *
     * This is normally just a short delay while Paystack delivers
     * the webhook to our server.
     *
     * We therefore tell the frontend to keep polling.
     *
     * The webhook will eventually:
     * - mark payment_status = "paid"
     * - assign the next seat
     * - generate the ticket number
     * - save the payment reference
     */
    return NextResponse.json({
      success: false,
      status: "processing",
      message: "Payment received. Your ticket is being prepared.",
    });
  } catch (error) {
    /**
     * Catch unexpected server errors so the API never crashes
     * without returning a response.
     */
    console.error("Hangout payment verification error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while verifying payment",
      },
      { status: 500 },
    );
  }
}
