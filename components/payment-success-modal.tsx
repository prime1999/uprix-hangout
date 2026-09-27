"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogViewport,
} from "@/components/ui/dialog";
import {
  LoaderCircle,
  Check,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Mail,
  Ticket,
  Sparkles,
} from "lucide-react";
import food from "@/public/images/food.png";
import drinks from "@/public/images/drinks.png";
import fun from "@/public/images/fun.png";
import games from "@/public/images/games.png";

interface Registration {
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
}

export function PaymentSuccessModal() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "paid" | "failed"
  >("idle");

  const [registration, setRegistration] = useState<Registration | null>(null);

  const reference = searchParams.get("reference");

  useEffect(() => {
    if (!reference) return;

    setOpen(true);
    verifyPayment(reference);
  }, [reference]);

  const verifyPayment = async (paymentReference: string) => {
    setIsVerifying(true);
    setPaymentStatus("processing");

    try {
      const response = await fetch(
        `/api/payment/verify?reference=${encodeURIComponent(paymentReference)}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to verify payment");
      }

      if (data.status === "paid") {
        setRegistration(data.registration);
        setPaymentStatus("paid");
        return;
      }

      if (data.status === "processing") {
        /*
         * The Paystack transaction succeeded, but the webhook
         * may still be processing the registration.
         *
         * Give it a moment and check again.
         */
        setPaymentStatus("processing");

        setTimeout(() => {
          verifyPayment(paymentReference);
        }, 2500);

        return;
      }

      setPaymentStatus("failed");
    } catch (error) {
      console.error("Payment verification error:", error);

      setPaymentStatus("failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setOpen(false);

    /*
     * Remove the payment reference from the URL after
     * closing the modal so refreshing the page does not
     * immediately open the modal again.
     */
    router.replace("/", {
      scroll: false,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
          return;
        }

        setOpen(value);
      }}
    >
      <DialogPortal>
        <DialogBackdrop className="bg-slate-900/60 backdrop-blur-sm transition-opacity" />

        <DialogViewport className="p-4">
          <DialogPopup className="relative w-full max-w-md overflow-hidden rounded-3xl border-2 border-slate-900 bg-white p-0 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] font-sans text-slate-800">
            <DialogClose
              aria-label="Close payment dialog"
              className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border-2 border-slate-900 text-slate-900 font-bold transition hover:bg-yellow-400 active:translate-y-0.5"
            />

            {/* STATE 1: PROCESSING */}
            {paymentStatus === "processing" && (
              <div className="relative pt-12 pb-8 px-6 text-center">
                {/* Floating Spinning Badge */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-blue-400 rounded-full blur-xs opacity-40 animate-ping"></div>
                    <div className="w-14 h-14 bg-blue-600 rounded-full border-4 border-slate-900 shadow-xl flex items-center justify-center relative z-10">
                      <LoaderCircle className="w-8 h-8 animate-spin text-white stroke-[3]" />
                    </div>
                    <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -left-2 fill-yellow-400" />
                    <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-2 fill-yellow-400" />
                  </div>
                </div>

                {/* Painted Banner Title */}
                <div className="mt-4 mb-4 inline-block w-full">
                  <div className="bg-blue-600 text-white font-black text-xl sm:text-2xl tracking-wide uppercase py-3 px-6 rounded-2xl shadow-md rotate-[-1deg] border-2 border-slate-900 relative">
                    <DialogTitle className="relative z-10 text-white font-black">
                      Confirming Your Payment
                    </DialogTitle>
                  </div>
                </div>

                <DialogDescription className="mt-2 text-sm font-semibold text-slate-600 leading-snug">
                  Your payment was received. We&apos;re confirming your
                  transaction and preparing your UPRIX Hangout ticket.
                </DialogDescription>

                {/* Animated Progress Bar */}
                <div className="mt-6 mb-4">
                  <div className="w-full bg-slate-100 rounded-full h-3.5 border-2 border-slate-900 overflow-hidden p-0.5">
                    <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-yellow-400 h-full rounded-full animate-pulse w-3/4 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Reference Box */}
                <div className="mt-4 rounded-2xl border-2 border-slate-900 bg-slate-50 px-4 py-3 text-left shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Payment Reference
                  </p>
                  <p className="mt-1 break-all text-xs font-mono font-extrabold text-slate-900">
                    {reference}
                  </p>
                </div>
              </div>
            )}

            {/* STATE 2: PAID (SUCCESS) */}
            {paymentStatus === "paid" && registration && (
              <div className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto px-6 pt-12 pb-8 text-center overscroll-contain">
                {/* Floating Green Checkmark Badge */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative">
                    <div className="w-14 h-14 bg-emerald-500 rounded-full border-4 border-slate-900 shadow-xl flex items-center justify-center relative z-10">
                      <Check className="w-8 h-8 text-white stroke-[4]" />
                    </div>
                    <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -left-2 fill-yellow-400" />
                    <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-2 fill-yellow-400" />
                  </div>
                </div>

                {/* Painted Banner Title */}
                <div className="mt-4 mb-3 inline-block w-full">
                  <div className="bg-blue-600 text-white font-black text-xl sm:text-2xl tracking-wide uppercase py-3 px-6 rounded-2xl shadow-md rotate-[-1deg] border-2 border-slate-900 relative">
                    <DialogTitle className="relative z-10 text-white font-black">
                      CONGRATULATIONS!
                    </DialogTitle>
                  </div>
                </div>

                <DialogDescription className="text-sm font-extrabold text-slate-900">
                  You&apos;re officially registered for UPRIX Hangout 1.0!
                </DialogDescription>

                {/* Ticket & Seat Notch Container */}
                <div className="my-5 relative">
                  <div className="bg-blue-600 rounded-2xl p-4 text-white shadow-md relative overflow-hidden border-2 border-slate-900">
                    {/* Cutout Notches */}
                    <div className="w-5 h-5 bg-white rounded-full absolute -left-3 top-1/2 -translate-y-1/2 border-r-2 border-slate-900"></div>
                    <div className="w-5 h-5 bg-white rounded-full absolute -right-3 top-1/2 -translate-y-1/2 border-l-2 border-slate-900"></div>

                    <div className="flex items-center justify-between border-b border-blue-500/50 pb-3">
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-wider text-blue-200">
                          Ticket Number
                        </p>
                        <p className="mt-0.5 text-xl font-black text-yellow-300 font-mono tracking-wide">
                          {registration.ticket_number || "N7K-0248"}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-wider text-blue-200">
                          Seat Number
                        </p>
                        <p className="mt-0.5 text-xl font-black text-white font-mono">
                          {registration.seat_number
                            ? `JCR-A${registration.seat_number}`
                            : "JCR-A14"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 text-left flex justify-between items-center text-xs">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-blue-200">
                          Amount Paid
                        </p>
                        <p className="font-black text-yellow-300 text-sm">
                          ₦
                          {registration.amount_paid
                            ? (registration.amount_paid / 100).toLocaleString()
                            : "6,000"}
                        </p>
                      </div>

                      {registration.coupon_code && (
                        <div className="bg-blue-800/80 px-2.5 py-1 rounded-full text-[10px] font-bold text-yellow-200 border border-blue-400/40">
                          COUPON: {registration.coupon_code}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Registration Details */}
                <div className="rounded-2xl border-2 border-slate-900 bg-slate-50 p-4 text-left shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-1.5 mb-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider">
                      Registered As:
                    </span>
                    <span className="font-extrabold text-slate-900">
                      {registration.full_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-200">
                    <span className="text-slate-500 font-bold uppercase tracking-wider">
                      Email Address:
                    </span>
                    <span className="font-bold text-slate-700 truncate max-w-[180px]">
                      {registration.email}
                    </span>
                  </div>
                </div>

                {/* Email Confirmation Ticket Entry Notice */}
                <div className="rounded-2xl p-3.5 mb-5 text-left flex items-start gap-3">
                  <div>
                    <p className="text-center text-[13px] font-semibold text-amber-900 leading-tight mt-0.5">
                      Your ticket details has been sent to your email. Please
                      show the ticket at the gate as your official pass.
                    </p>
                  </div>
                </div>

                {/* Playful Event Badges */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Image src={food} alt="Food" width={50} height={50} />

                  <Image src={drinks} alt="Drinks" width={50} height={50} />

                  <Image src={fun} alt="Fun" width={50} height={50} />

                  <Image src={games} alt="Games" width={50} height={50} />
                </div>

                {/* Continue Action */}
                <DialogClose className="w-full py-4 mb-4 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 font-black text-base rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-950 transition-all flex items-center justify-center gap-2 group cursor-pointer active:translate-x-0.5 active:translate-y-0.5">
                  <span>CONTINUE TO HOME</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3]" />
                </DialogClose>
              </div>
            )}

            {/* STATE 3: FAILED */}
            {paymentStatus === "failed" && (
              <div className="relative pt-12 pb-8 px-6 text-center">
                {/* Floating Red Warning Badge */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative">
                    <div className="w-14 h-14 bg-rose-500 rounded-full border-4 border-slate-900 shadow-xl flex items-center justify-center relative z-10">
                      <AlertCircle className="w-8 h-8 text-white stroke-[3]" />
                    </div>
                    <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -left-2 fill-yellow-400" />
                    <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-2 fill-yellow-400" />
                  </div>
                </div>

                {/* Painted Banner Title */}
                <div className="mt-4 mb-3 inline-block w-full">
                  <div className="bg-rose-600 text-white font-black text-xl sm:text-2xl tracking-wide uppercase py-3 px-6 rounded-2xl shadow-md rotate-[-1deg] border-2 border-slate-900 relative">
                    <DialogTitle className="relative z-10 text-white font-black">
                      Payment Not Confirmed
                    </DialogTitle>
                  </div>
                </div>

                <DialogDescription className="mt-2 text-sm font-semibold text-slate-600 leading-snug">
                  We couldn&apos;t confirm your payment yet. If you completed
                  the payment, please wait a moment and try again.
                </DialogDescription>

                {/* Close Button */}
                <DialogClose className="mt-8 w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-base rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-950 transition-all flex items-center justify-center gap-2 group cursor-pointer active:translate-x-0.5 active:translate-y-0.5">
                  <RefreshCw className="w-4 h-4 stroke-[2.5]" />
                  <span>CLOSE & RETRY</span>
                </DialogClose>
              </div>
            )}
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}
