"use client";

import { useState, useEffect } from "react";

interface PaymentProcessingCardProps {
  amount?: number;
  email?: string;
  onRefresh?: () => void;
}

export default function PaymentProcessingCard({
  amount = 6000,
  email = "moshood@example.com",
  onRefresh,
}: PaymentProcessingCardProps) {
  const [seconds, setSeconds] = useState(0);

  // Timer simulation to show live processing time
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-900 relative pt-10 pb-8 px-6 my-6 text-center">
        {/* Animated Ticket Spinner Badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            {/* Pulsing Outer Glow */}
            <div className="absolute -inset-3 bg-blue-400 rounded-full blur-xs opacity-40 animate-ping"></div>

            {/* Central Spinner Badge */}
            <div className="w-20 h-20 bg-blue-600 rounded-full border-4 border-slate-900 shadow-xl flex items-center justify-center relative z-10">
              <div className="animate-spin duration-1000 text-white">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2 2 2 0 010 4 2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2 2 2 0 010-4 2 2 0 002-2V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
            </div>

            {/* Sparkles */}
            <span className="absolute -top-1 -left-2 text-yellow-400 font-bold text-lg select-none">
              ✨
            </span>
            <span className="absolute -top-1 -right-2 text-yellow-400 font-bold text-lg select-none">
              ✨
            </span>
          </div>
        </div>

        {/* Painted Blue Header Banner */}
        <div className="mt-4 mb-4 inline-block w-full">
          <div className="bg-blue-600 text-white font-black text-xl sm:text-2xl tracking-wide uppercase py-3 px-6 rounded-2xl shadow-md rotate-[-1deg] border-2 border-slate-900 relative">
            <span className="relative z-10">PROCESSING PAYMENT...</span>
          </div>
        </div>

        {/* Main Status Text */}
        <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
          Hold tight! Confirming your transaction
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Communicating with the payment provider ({seconds}s elapsed)
        </p>

        {/* Amount & Destination Details */}
        <div className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-200 text-left space-y-2 mb-6 shadow-sm">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-bold uppercase tracking-wider">
              Total Amount:
            </span>
            <span className="font-black text-emerald-600 text-base">
              ₦{amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200">
            <span className="text-slate-500 font-bold uppercase tracking-wider">
              Account Email:
            </span>
            <span className="font-bold text-slate-800 truncate max-w-[180px]">
              {email}
            </span>
          </div>
        </div>

        {/* Animated Progress Indicator Bar */}
        <div className="mb-6">
          <div className="w-full bg-slate-100 rounded-full h-3.5 border-2 border-slate-900 overflow-hidden p-0.5">
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-yellow-400 h-full rounded-full animate-pulse w-3/4 transition-all duration-500"></div>
          </div>
          <p className="text-[11px] font-bold text-blue-600 mt-2 flex items-center justify-center gap-1">
            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
            Please do not close this window
          </p>
        </div>

        {/* Event Vibe Icons */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center text-slate-900 border-2 border-slate-900 rotate-[-2deg] text-base">
              🍕
            </div>
            <span className="text-[10px] font-black uppercase mt-1 text-slate-700">
              Food
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center text-white border-2 border-slate-900 rotate-[3deg] text-base">
              🎮
            </div>
            <span className="text-[10px] font-black uppercase mt-1 text-slate-700">
              Games
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-pink-500 rounded-2xl flex items-center justify-center text-white border-2 border-slate-900 rotate-[-3deg] text-base">
              🎨
            </div>
            <span className="text-[10px] font-black uppercase mt-1 text-slate-700">
              Art
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white border-2 border-slate-900 rotate-[2deg] text-base">
              🎵
            </div>
            <span className="text-[10px] font-black uppercase mt-1 text-slate-700">
              Fun
            </span>
          </div>
        </div>

        {/* Refresh Page / Try Again Button */}
        <button
          onClick={handleRefresh}
          className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 font-black text-base rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-950 transition-all flex items-center justify-center gap-2 group cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
        >
          <svg
            className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500 stroke-[3]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>REFRESH PAGE / TRY AGAIN</span>
        </button>
      </div>
    </div>
  );
}
