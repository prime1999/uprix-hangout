"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Ticket,
  CheckCircle2,
  Tag,
  Lock,
  ArrowRight,
  Sparkles,
  XCircle,
  User,
  Mail,
  PartyPopper,
  Crown,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

type CheckOutFormProps = {
  embedded?: boolean;
};

type Registration = {
  id: string;
  full_name: string;
  email: string;
  seat_number: number | null;
  ticket_number: string | null;
  payment_reference: string | null;
  payment_status: string;
  amount_paid: number;
  discount_amount: number;
  coupon_code: string | null;
  paid_at: string | null;
};

type PaymentState = "idle" | "processing" | "paid" | "failed";

export default function CheckOutForm({ embedded = false }: CheckOutFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coupon: "",
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
   * Payment state is now controlled by the callback +
   * verification flow instead of a fake local success state.
   */
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");

  const [registration, setRegistration] = useState<Registration | null>(null);

  const BASE_PRICE = 7000;
  const DISCOUNTED_PRICE = 6000;

  /*
   * This is only used for the visual coupon experience.
   *
   * The backend is still the final authority when the
   * payment is initialized.
   */
  const VALID_COUPONS = ["UPRIX2026"];

  const isCouponValid = appliedCoupon !== null;

  const currentAmount = isCouponValid ? DISCOUNTED_PRICE : BASE_PRICE;

  /*
   * ----------------------------------------------------------
   * Handle Paystack callback
   * ----------------------------------------------------------
   *
   * Paystack redirects the user back to:
   *
   * /?reference=PAYSTACK_REFERENCE
   *
   * The reference itself does NOT prove that payment succeeded.
   *
   * We send the reference to our server verification endpoint.
   */
  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference) {
      return;
    }

    /*
     * We don't immediately say "payment successful".
     *
     * First put the UI into a processing state while the
     * server checks the transaction.
     */
    setPaymentState("processing");

    verifyPayment(reference);
  }, [searchParams]);

  /*
   * ----------------------------------------------------------
   * Verify payment
   * ----------------------------------------------------------
   */
  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch(
        `/api/hangout/payment/verify?reference=${encodeURIComponent(
          reference,
        )}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to verify payment");
      }

      /*
       * The webhook has already processed the registration.
       *
       * This is the state we want before showing the actual
       * success/ticket information.
       */
      if (data.status === "paid" && data.registration) {
        setRegistration(data.registration);
        setFormData({
          name: data.registration.full_name,
          email: data.registration.email,
          coupon: data.registration.coupon_code || "",
        });

        if (data.registration.coupon_code) {
          setAppliedCoupon(data.registration.coupon_code);
        }

        setPaymentState("paid");

        return;
      }

      /*
       * Paystack says the payment succeeded but the webhook
       * hasn't finished updating our database yet.
       *
       * Wait briefly and check again.
       */
      if (data.status === "processing") {
        setPaymentState("processing");

        setTimeout(() => {
          verifyPayment(reference);
        }, 2500);

        return;
      }

      /*
       * Payment was not successfully completed.
       */
      setPaymentState("failed");
    } catch (error) {
      console.error("Hangout payment verification error:", error);

      setPaymentState("failed");
    }
  };

  /*
   * ----------------------------------------------------------
   * Handle input changes
   * ----------------------------------------------------------
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "coupon") {
      setCouponError("");
    }
  };

  /*
   * ----------------------------------------------------------
   * Apply coupon
   * ----------------------------------------------------------
   */
  const handleApplyCoupon = (codeToApply: string) => {
    const code = (codeToApply || formData.coupon).trim().toUpperCase();

    if (!code) {
      return;
    }

    if (VALID_COUPONS.includes(code)) {
      setAppliedCoupon(code);

      setFormData((prev) => ({
        ...prev,
        coupon: code,
      }));

      setCouponError("");
    } else {
      setAppliedCoupon(null);

      setCouponError('Invalid coupon code! Try "UPRIX2026"');
    }
  };

  /*
   * ----------------------------------------------------------
   * Remove coupon
   * ----------------------------------------------------------
   */
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);

    setFormData((prev) => ({
      ...prev,
      coupon: "",
    }));

    setCouponError("");
  };

  /*
   * ----------------------------------------------------------
   * Start Paystack payment
   * ----------------------------------------------------------
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          couponCode: formData.coupon.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to initialize payment");
      }

      /*
       * At this point Paystack has only initialized the
       * transaction.
       *
       * The payment itself has NOT been confirmed yet.
       *
       * Redirect the user to Paystack.
       */
      window.location.href = data.authorizationUrl;
    } catch (error) {
      console.error("Hangout payment error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while starting payment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * ----------------------------------------------------------
   * Close payment modal
   * ----------------------------------------------------------
   *
   * We remove ?reference=... from the URL so refreshing the
   * page doesn't trigger verification again.
   */
  const handleClosePaymentModal = () => {
    setPaymentState("idle");
    setRegistration(null);

    router.replace("/", {
      scroll: false,
    });
  };

  return (
    <div
      className={`${
        embedded ? "bg-transparent p-0" : "min-h-screen bg-[#FDFBF7] p-4 md:p-8"
      } text-slate-900 flex items-center justify-center font-sans relative overflow-hidden select-none`}
    >
      {/* Background Decorative Playful Shapes */}

      <div className="absolute top-8 left-8 w-16 h-16 bg-[#FFE600] rounded-full border-4 border-black rotate-12 flex items-center justify-center font-black text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:flex">
        FUN!
      </div>

      <div className="absolute bottom-10 left-12 w-20 h-20 bg-[#FF4785] rounded-3xl border-4 border-black -rotate-12 flex items-center justify-center font-black text-xs text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:flex">
        OCT 31st
      </div>

      <div className="absolute top-12 right-12 w-14 h-14 bg-[#00E5FF] rounded-xl border-4 border-black rotate-45 flex items-center justify-center font-black text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:flex">
        12 PM
      </div>

      {/* Main Wrapper Container */}

      <div
        className={`${embedded ? "max-w-none" : "max-w-lg"} w-full relative`}
      >
        {/* Playful Floating Badges */}

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-2">
          {/* Location Badge */}

          <div className="inline-flex items-center gap-1.5 bg-[#FFE600] border-3 border-black text-black font-black text-xs md:text-sm px-3.5 py-1.5 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1 transform hover:scale-105 transition-transform">
            <span>📍 @ INDY JCR - UI</span>
          </div>

          {/* Slogan Badge */}

          <div className="inline-flex items-center gap-1 bg-[#00E5FF] border-3 border-black text-black font-black text-xs px-3 py-1.5 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GOOD FOOD, GOOD MOOD</span>
          </div>
        </div>

        {/* Main Card */}

        <div
          className={`${
            embedded
              ? "border-0 rounded-none p-0 shadow-none"
              : "border-4 rounded-[2rem] p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
          } bg-white border-black relative overflow-hidden`}
        >
          {/* Banner Graphic Header */}

          <div className="text-center mb-6 relative">
            <div className="inline-block relative">
              <span className="bg-[#111111] text-white font-black text-2xl md:text-3xl px-6 py-2 rounded-2xl tracking-wide uppercase border-2 border-black inline-block shadow-[4px_4px_0px_0px_#FFE600] -rotate-1">
                MAKE PAYMENT
              </span>

              <Crown className="w-6 h-6 text-[#FFE600] absolute -top-4 -right-4 rotate-12 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
            </div>

            <p className="text-xs md:text-sm font-bold text-slate-600 mt-3">
              UPRIX HANGOUT 1.0 • Complete your ticket purchase below!
            </p>
          </div>

          {/* Ticket Price Display Box */}

          <div className="bg-[#F3F4F6] border-3 border-black rounded-2xl p-4 md:p-5 mb-6 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative group">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2563EB] border-2 border-black rounded-xl flex items-center justify-center text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[-6deg]">
                <Ticket className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
                  Ticket Fee
                </span>

                <span className="text-sm font-extrabold text-slate-800">
                  1x Regular Entry Pass
                </span>
              </div>
            </div>

            <div className="text-right">
              {isCouponValid && (
                <span className="text-xs font-black text-red-500 line-through block decoration-2">
                  ₦7,000
                </span>
              )}

              <span
                className={`text-2xl md:text-3xl font-black ${
                  isCouponValid ? "text-emerald-600" : "text-slate-900"
                }`}
              >
                ₦{currentAmount.toLocaleString()}
              </span>
            </div>

            {isCouponValid && (
              <div className="absolute -top-3 -right-2 bg-[#00E676] text-black font-black text-[10px] uppercase px-2.5 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                ₦1,000 Off Saved! 🎉
              </div>
            )}
          </div>

          {/* Form */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}

            <div>
              <label
                htmlFor="name"
                className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1 flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Alex Ekwueme"
                className="w-full px-4 py-3 bg-white border-3 border-black rounded-xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE600] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-normal placeholder:text-slate-400"
              />
            </div>

            {/* Email Field */}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1 flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="alex@example.com"
                className="w-full px-4 py-3 bg-white border-3 border-black rounded-xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE600] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-normal placeholder:text-slate-400"
              />
            </div>

            {/* Coupon Code Field */}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="coupon"
                  className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1"
                >
                  <Tag className="w-3.5 h-3.5" />
                  Coupon Code
                </label>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    id="coupon"
                    name="coupon"
                    disabled={isCouponValid}
                    value={formData.coupon}
                    onChange={handleInputChange}
                    placeholder="ENTER COUPON CODE"
                    className={`w-full px-4 py-3 border-3 border-black rounded-xl text-slate-900 font-black text-sm uppercase focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                      isCouponValid
                        ? "bg-emerald-100 text-emerald-900 border-emerald-900"
                        : "bg-white"
                    }`}
                  />

                  {isCouponValid && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                </div>

                {isCouponValid ? (
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="px-4 py-3 bg-red-500 border-3 border-black text-white font-black text-xs rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon(formData.coupon)}
                    className="px-5 py-3 bg-black border-3 border-black text-white font-black text-xs rounded-xl shadow-[3px_3px_0px_0px_#FFE600] cursor-pointer hover:bg-slate-900 hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1"
                  >
                    Apply
                  </button>
                )}
              </div>

              {couponError && (
                <p className="text-xs font-black text-red-600 mt-1.5 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  {couponError}
                </p>
              )}

              {isCouponValid && (
                <p className="text-xs font-black text-emerald-700 mt-1.5 flex items-center gap-1">
                  <PartyPopper className="w-3.5 h-3.5" />
                  Coupon code applied! Ticket updated to ₦6,000!
                </p>
              )}
            </div>

            {/* Pay Button */}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#FFE600] border-4 border-black text-black font-black text-lg rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFF066] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />

                    <span>
                      Proceed to Pay ₦{currentAmount.toLocaleString()}
                    </span>

                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Footer Trust Badge */}

            <div className="text-center pt-2">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider inline-flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                Secure Payment • Guaranteed Entry
              </span>
            </div>
          </form>
        </div>

        {/* Bottom Decorative Label */}

        <div className="mt-4 text-center">
          <span className="inline-block bg-white border-2 border-black font-black text-xs px-4 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-700">
            🎉 Uprix Hangout 1.0 • Ticket app by Uprix
          </span>
        </div>
      </div>

      {/* =====================================================
          PAYMENT PROCESSING / SUCCESS / FAILED MODAL
          ===================================================== */}

      {paymentState !== "idle" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border-4 border-black rounded-[2rem] p-6 md:p-8 max-w-sm w-full shadow-[12px_12px_0px_0px_#00E5FF] text-center relative animate-in zoom-in-95 duration-200">
            {/* PROCESSING */}

            {paymentState === "processing" && (
              <>
                <div className="w-16 h-16 bg-[#00E5FF] border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <LoaderCircle className="w-9 h-9 text-black animate-spin" />
                </div>

                <h3 className="text-2xl font-black uppercase text-slate-900 mb-1">
                  Confirming Payment
                </h3>

                <p className="text-xs font-bold text-slate-600 mb-5">
                  Your payment was received. We&apos;re confirming your
                  transaction and preparing your ticket.
                </p>

                <div className="bg-[#F3F4F6] border-3 border-black rounded-xl p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-left">
                  <span className="text-[10px] font-black uppercase text-slate-500 block">
                    Payment Reference
                  </span>

                  <span className="text-xs font-black text-slate-900 break-all">
                    {searchParams.get("reference")}
                  </span>
                </div>
              </>
            )}

            {/* SUCCESS */}

            {paymentState === "paid" && registration && (
              <>
                <div className="w-16 h-16 bg-[#00E676] border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <CheckCircle2 className="w-10 h-10 text-black" />
                </div>

                <h3 className="text-2xl font-black uppercase text-slate-900 mb-1">
                  You&apos;re In! 🎉
                </h3>

                <p className="text-xs font-bold text-slate-600 mb-4">
                  Your payment was confirmed. Your UPRIX Hangout ticket is
                  ready.
                </p>

                {/* Ticket Information */}

                <div className="bg-[#FFE600] border-3 border-black rounded-xl p-3 mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-left space-y-2 text-xs font-extrabold">
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-700">Name:</span>

                    <span className="text-right">{registration.full_name}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-700">Amount Paid:</span>

                    <span>
                      ₦{(registration.amount_paid / 100).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-700">Seat:</span>

                    <span>{registration.seat_number ?? "Assigned"}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-700">Ticket:</span>

                    <span>{registration.ticket_number ?? "Generating..."}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-700">Venue:</span>

                    <span>INDY JCR, UI</span>
                  </div>
                </div>

                {/* Email Notice */}

                <div className="bg-[#00E5FF] border-3 border-black rounded-xl p-3 mb-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-left">
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 mt-0.5 shrink-0" />

                    <p className="text-[11px] font-black leading-4">
                      Your ticket details will be sent to{" "}
                      <span className="underline">{registration.email}</span>.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClosePaymentModal}
                  className="w-full py-3 bg-black text-white border-3 border-black rounded-xl font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all"
                >
                  Close & Get Another Ticket
                </button>
              </>
            )}

            {/* FAILED */}

            {paymentState === "failed" && (
              <>
                <div className="w-16 h-16 bg-[#FF4785] border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <AlertCircle className="w-9 h-9 text-white" />
                </div>

                <h3 className="text-2xl font-black uppercase text-slate-900 mb-1">
                  Payment Not Confirmed
                </h3>

                <p className="text-xs font-bold text-slate-600 mb-5">
                  We couldn&apos;t confirm this payment. If you completed the
                  payment, please wait a moment and try again.
                </p>

                <button
                  onClick={handleClosePaymentModal}
                  className="w-full py-3 bg-black text-white border-3 border-black rounded-xl font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
