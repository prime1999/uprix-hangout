import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    // ---------------------------------------------------------
    // 1. Create the Supabase admin client
    // ---------------------------------------------------------
    //
    // This route runs on the server, so we can safely use the
    // Supabase service-role key here.
    //
    // IMPORTANT:
    // SUPABASE_SERVICE_ROLE_KEY must NEVER be exposed to the
    // browser or used in a client component.

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // ---------------------------------------------------------
    // 2. Read and validate the request body
    // ---------------------------------------------------------

    const body = await req.json();

    const { fullName, email, couponCode } = body;

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 },
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------
    // 3. Determine the Hangout payment amount
    // ---------------------------------------------------------
    //
    // Paystack amounts are sent in kobo.
    //
    // ₦7,000 = 700,000 kobo
    // ₦6,000 = 600,000 kobo

    const regularPrice = 700000;
    const discountedPrice = 600000;
    const discountAmount = 100000;

    let amount = regularPrice;
    let appliedDiscount = 0;
    let appliedCoupon: string | null = null;

    const normalizedCouponCode =
      typeof couponCode === "string" ? couponCode.trim().toUpperCase() : "";

    const validCouponCode =
      process.env.HANGOUT_COUPON_CODE?.trim().toUpperCase();

    // ---------------------------------------------------------
    // 4. Validate coupon
    // ---------------------------------------------------------

    if (normalizedCouponCode) {
      if (!validCouponCode || normalizedCouponCode !== validCouponCode) {
        return NextResponse.json(
          { error: "Invalid coupon code" },
          { status: 400 },
        );
      }

      amount = discountedPrice;
      appliedDiscount = discountAmount;
      appliedCoupon = normalizedCouponCode;
    }

    // ---------------------------------------------------------
    // 5. Create pending Hangout registration
    // ---------------------------------------------------------
    //
    // At this point the user has NOT paid yet.
    //
    // payment_status = pending
    // seat_number    = null
    // ticket_number  = null
    //
    // The webhook will handle the successful payment later.

    const { data: registration, error: registrationError } = await supabase
      .from("hangout_registrations")
      .insert({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        amount_paid: amount,
        discount_amount: appliedDiscount,
        coupon_code: appliedCoupon,
        payment_status: "pending",
      })
      .select("id")
      .single();

    if (registrationError || !registration) {
      console.error(
        "Failed to create Hangout registration:",
        registrationError,
      );

      return NextResponse.json(
        {
          error: "Unable to create Hangout registration",
        },
        { status: 500 },
      );
    }

    // ---------------------------------------------------------
    // 6. Initialize the Paystack transaction
    // ---------------------------------------------------------

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),

          // Amount is determined on the server.
          amount,

          currency: "NGN",

          // Hangout gets its own callback URL.
          callback_url: `${process.env.HANGOUT_APP_URL}/`,

          // Metadata is important because the existing
          // webhook will later need to distinguish Hangout
          // payments from Result Room payments.
          metadata: {
            payment_type: "hangout",
            registration_id: registration.id,
          },
        }),
      },
    );

    const paystackData = await paystackResponse.json();

    // ---------------------------------------------------------
    // 7. Handle Paystack initialization failure
    // ---------------------------------------------------------

    if (!paystackResponse.ok || !paystackData.status) {
      console.error("Paystack initialization failed:", paystackData);

      // Since Paystack failed to initialize, mark the pending
      // registration as failed.
      await supabase
        .from("hangout_registrations")
        .update({
          payment_status: "failed",
        })
        .eq("id", registration.id);

      return NextResponse.json(
        {
          error: paystackData.message || "Unable to initialize payment",
        },
        { status: 500 },
      );
    }

    // ---------------------------------------------------------
    // 8. Save the Paystack reference
    // ---------------------------------------------------------
    //
    // This reference is what will later allow the webhook to
    // connect the Paystack transaction to this registration.

    const paymentReference = paystackData.data.reference;

    const { error: referenceError } = await supabase
      .from("hangout_registrations")
      .update({
        payment_reference: paymentReference,
      })
      .eq("id", registration.id);

    if (referenceError) {
      console.error("Failed to save Paystack reference:", referenceError);

      /**
       * We don't mark the payment as failed here.
       *
       * Paystack has already successfully initialized the
       * transaction, so the user can still complete payment.
       *
       * The reference-saving error should be investigated
       * separately.
       */
    }

    // ---------------------------------------------------------
    // 9. Return the Paystack checkout URL
    // ---------------------------------------------------------

    return NextResponse.json({
      success: true,
      authorizationUrl: paystackData.data.authorization_url,
      reference: paymentReference,
      registrationId: registration.id,
    });
  } catch (error) {
    console.error("Initialize Hangout payment error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while initializing payment",
      },
      { status: 500 },
    );
  }
}
