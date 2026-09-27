"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

// Self-contained inline SVG icon components for maximum reliability
const Check = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Ticket = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
    <path d="M13 5v2" />
    <path d="M13 11v2" />
    <path d="M13 17v2" />
  </svg>
);

const CheckCircle2 = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const Tag = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2H2v10l11.29 11.29a1 1 0 0 0 1.41 0l7.58-7.58a1 1 0 0 0 0-1.41L12 2z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const Lock = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowRight = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Sparkles = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
  </svg>
);

const XCircle = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const User = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Mail = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Crown = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m2 4 3 12h14l3-12-6 7-4-8-4 8-6-7z" />
    <path d="M5 20h14" />
  </svg>
);

const Copy = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const ShieldCheck = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// Event Category Icons
const Utensils = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 2v16" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const Gamepad = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <circle cx="15" cy="11" r="1" fill="currentColor" />
    <circle cx="18" cy="13" r="1" fill="currentColor" />
    <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.25 2.38.38 4.71 1.768 6.66l1.28 1.8a2 2 0 0 0 1.63.85h.28a2 2 0 0 0 1.83-1.2l.62-1.38a2 2 0 0 1 1.83-1.18h2.14a2 2 0 0 1 1.83 1.18l.62 1.38a2 2 0 0 0 1.83 1.2h.28a2 2 0 0 0 1.63-.85l1.28-1.8c1.388-1.95 2.018-4.28 1.768-6.66A4 4 0 0 0 17.32 5z" />
  </svg>
);

const Palette = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.61 0-.43-.17-.83-.44-1.13-.27-.3-.43-.7-.43-1.13 0-.91.73-1.65 1.64-1.65H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z" />
  </svg>
);

const Music = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

export default function App() {
  const [formData, setFormData] = useState({
    name: "Alex Ekwueme",
    email: "alex.ekwueme@ui.edu.ng",
    coupon: "UPRIX6K",
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("UPRIX6K");
  const [couponError, setCouponError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle state to preview between checkout form and successful payment card
  const [paymentSuccess, setPaymentSuccess] = useState(true);
  const [copiedTicketId, setCopiedTicketId] = useState(false);

  // Ticket Details State
  const [ticketDetails, setTicketDetails] = useState({
    ticketNo: "UPX-8942-INDY",
    seatNo: "JCR-A14",
  });

  const BASE_PRICE = 7000;
  const DISCOUNTED_PRICE = 6000;
  const VALID_COUPONS = [
    "UPRIX6K",
    "UPRIX1000",
    "EARLYBIRD",
    "ANVIL",
    "IBADAN2026",
  ];

  const isCouponValid = appliedCoupon !== null;
  const currentAmount = isCouponValid ? DISCOUNTED_PRICE : BASE_PRICE;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "coupon") {
      setCouponError("");
    }
  };

  const handleApplyCoupon = (codeToApply = "") => {
    const code = (codeToApply || formData.coupon).trim().toUpperCase();
    if (!code) return;

    if (VALID_COUPONS.includes(code)) {
      setAppliedCoupon(code);
      setFormData((prev) => ({ ...prev, coupon: code }));
      setCouponError("");
    } else {
      setAppliedCoupon(null);
      setCouponError('Invalid coupon code! Try "UPRIX6K"');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setFormData((prev) => ({ ...prev, coupon: "" }));
    setCouponError("");
  };

  const generateRandomTicket = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const seats = [
      "JCR-A14",
      "JCR-B07",
      "VIP-SEAT 09",
      "JCR-A22",
      "JCR-C03",
      "FRONT-ROW 05",
    ];
    const randomSeat = seats[Math.floor(Math.random() * seats.length)];
    return {
      ticketNo: `UPX-${randomNum}-INDY`,
      seatNo: randomSeat,
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setTicketDetails(generateRandomTicket());
      setPaymentSuccess(true);
    }, 1200);
  };

  const handleCopyTicket = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ticketDetails.ticketNo);
      setCopiedTicketId(true);
      setTimeout(() => setCopiedTicketId(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 flex flex-col items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden select-none">
      {/* Decorative Floating Corner Badges */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-[#FFE600] rounded-full border-4 border-black rotate-12 flex items-center justify-center font-black text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden lg:flex animate-bounce">
        PARTY!
      </div>
      <div className="absolute bottom-10 left-12 w-20 h-20 bg-[#FF4785] rounded-3xl border-4 border-black -rotate-12 flex items-center justify-center font-black text-xs text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden lg:flex">
        OCT 31st
      </div>
      <div className="absolute top-12 right-12 w-16 h-16 bg-[#00E5FF] rounded-xl border-4 border-black rotate-45 flex items-center justify-center font-black text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden lg:flex">
        12 PM
      </div>

      <div className="w-full max-w-md relative z-10">
        {!paymentSuccess ? (
          <div>
            {/* Venue & Mood Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-1">
              <div className="inline-flex items-center gap-1.5 bg-[#FFE600] border-3 border-black text-black font-black text-xs px-3.5 py-1.5 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                <span>📍 @ INDY JCR - UI</span>
              </div>

              <div className="inline-flex items-center gap-1 bg-[#00E5FF] border-3 border-black text-black font-black text-xs px-3 py-1.5 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GOOD FOOD • GOOD MOOD</span>
              </div>
            </div>

            {/* Form Card Container */}
            <div className="bg-white border-4 border-black rounded-[2.5rem] p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              {/* STYLISH UPRIX HANGOUT 1.0 HEADER */}
              <div className="text-center mb-6 relative">
                <div className="inline-block relative">
                  <div className="absolute inset-0 bg-[#FF4785] rounded-2xl transform rotate-2 translate-y-1 translate-x-1 border-3 border-black" />

                  <div className="relative bg-[#FFE600] text-black font-black text-2xl md:text-3xl px-6 py-2.5 rounded-2xl uppercase border-3 border-black tracking-tight flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                    <span className="text-black drop-shadow-[2px_2px_0px_#FFFFFF]">
                      UPRIX
                    </span>
                    <span className="bg-black text-[#FFE600] px-2.5 py-0.5 rounded-lg text-xl md:text-2xl transform -rotate-2">
                      HANGOUT 1.0
                    </span>
                  </div>

                  <Crown className="w-7 h-7 text-[#FF4785] absolute -top-5 -right-5 rotate-12 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-bounce" />
                </div>
                <p className="text-xs font-extrabold text-slate-700 mt-3.5">
                  Complete your details below to reserve your entry pass!
                </p>
              </div>

              {/* Price Summary Card */}
              <div className="bg-[#F3F4F6] border-3 border-black rounded-2xl p-4 mb-6 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#2563EB] border-2 border-black rounded-xl flex items-center justify-center text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[-6deg]">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                      Ticket Fee
                    </span>
                    <span className="text-xs font-extrabold text-slate-800">
                      1x Regular Pass
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
                    className={`text-2xl font-black ${isCouponValid ? "text-emerald-600" : "text-slate-900"}`}
                  >
                    ₦{currentAmount.toLocaleString()}
                  </span>
                </div>

                {isCouponValid && (
                  <div className="absolute -top-3 -right-2 bg-[#00E676] text-black font-black text-[10px] uppercase px-2.5 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    ₦1,000 OFF SAVED! 🎉
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1 flex items-center gap-1"
                  >
                    <User className="w-3.5 h-3.5" /> Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Ekwueme"
                    className="w-full px-4 py-3 bg-white border-3 border-black rounded-xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE600] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1 flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" /> Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 bg-white border-3 border-black rounded-xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFE600] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                  />
                </div>

                {/* Coupon Code */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor="coupon"
                      className="block text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1"
                    >
                      <Tag className="w-3.5 h-3.5" /> Coupon Code
                    </label>
                    {!isCouponValid && (
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon("UPRIX6K")}
                        className="text-[11px] font-black text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Try "UPRIX6K"</span>
                        <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
                      </button>
                    )}
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
                        className="px-4 py-3 bg-red-500 border-3 border-black text-white font-black text-xs rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        className="px-5 py-3 bg-black border-3 border-black text-white font-black text-xs rounded-xl shadow-[3px_3px_0px_0px_#FFE600] hover:bg-slate-900 hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        Apply
                      </button>
                    )}
                  </div>

                  {couponError && (
                    <p className="text-xs font-black text-red-600 mt-1.5 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> {couponError}
                    </p>
                  )}

                  {isCouponValid && (
                    <p className="text-xs font-black text-emerald-700 mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Code applied!
                      Ticket price set to ₦6,000!
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#FFE600] border-4 border-black text-black font-black text-lg rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFF066] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Confirming Seat Pass...</span>
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

                <div className="text-center pt-2">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                    Direct Email Pass Delivery • Indy JCR UI
                  </span>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* SUCCESS TICKET CARD MATCHING THE INSPIRED PLAYFUL DESIGN */
          /* ========================================================= */
          <div className="relative animate-in fade-in zoom-in-95 duration-300 pt-6">
            {/* Top Floating Green Checkmark Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
              <div className="relative">
                {/* Yellow burst accent rays around check circle */}
                <div className="absolute -top-2 -left-2 w-2 h-4 bg-[#FFE600] rounded-full rotate-[-45deg] border border-black" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-[#FFE600] rounded-full border border-black" />
                <div className="absolute -top-2 -right-2 w-2 h-4 bg-[#FFE600] rounded-full rotate-[45deg] border border-black" />
                <div className="absolute -bottom-1 -left-3 w-4 h-2 bg-[#FFE600] rounded-full rotate-[15deg] border border-black" />
                <div className="absolute -bottom-1 -right-3 w-4 h-2 bg-[#FFE600] rounded-full rotate-[-15deg] border border-black" />

                {/* Main Green Check Circle Badge */}
                <div className="w-16 h-16 bg-[#00E676] border-4 border-black rounded-full flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                  <Check className="w-9 h-9 stroke-[3]" />
                </div>
              </div>
            </div>

            {/* Main White Success Card */}
            <div className="bg-white border-4 border-black rounded-[2.5rem] p-6 pt-12 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              {/* Corner Brush Effect Splats */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-[#FFE600] rounded-br-full border-r-3 border-b-3 border-black -translate-x-3 -translate-y-3 -z-0 opacity-80" />
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#00E5FF] rounded-tl-full border-l-3 border-t-3 border-black translate-x-4 translate-y-4 -z-0 opacity-80" />

              <div className="relative z-10">
                {/* Painted Blue Title Banner */}
                <div className="inline-block relative my-2 w-full">
                  <div className="bg-[#1D4ED8] text-white font-black text-xl sm:text-2xl py-2 px-4 rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_#FFE600] transform -rotate-1 relative uppercase tracking-wider flex items-center justify-center gap-2">
                    <span className="text-[#FFE600] text-sm font-black">✦</span>
                    <span>CONGRATULATIONS!</span>
                    <span className="text-[#FFE600] text-sm font-black">✦</span>
                  </div>
                </div>

                {/* Subtitle Confirmation text */}
                <h3 className="font-black text-slate-900 text-sm sm:text-base mt-2">
                  Your ticket has been purchased successfully!
                </h3>
                <p className="text-xs font-bold text-slate-600 mt-0.5">
                  Thank you for joining us at{" "}
                  <span className="text-slate-900 font-extrabold">
                    Uprix Hangout 1.0
                  </span>
                  !
                </p>

                {/* IMPORTANT EMAIL-AS-PASS NOTICE BOX */}
                <div className="mt-4 bg-[#FFE600] border-3 border-black rounded-2xl p-3 text-left shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 bg-black text-[#00E5FF] rounded-lg border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="bg-black text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                        📩 EMAIL SENT TO YOUR INBOX
                      </span>
                      <p className="text-xs font-extrabold text-black leading-snug mt-1">
                        We sent your pass to{" "}
                        <span className="underline font-black">
                          {formData.email || "alex.ekwueme@ui.edu.ng"}
                        </span>
                        .
                      </p>
                      <p className="text-[10px] font-bold text-slate-900 mt-0.5">
                        👉{" "}
                        <span className="font-black uppercase">
                          Your email is your entry pass.
                        </span>{" "}
                        Please show the email at the venue entrance!
                      </p>
                    </div>
                  </div>
                </div>

                {/* TICKET STUB BLUE BOX WITH TICKET NUMBER & SEAT */}
                <div className="my-5 relative bg-[#2563EB] text-white border-3 border-black rounded-2xl p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-center overflow-hidden">
                  {/* Decorative Ticket Stub Side Notches */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-r-3 border-black rounded-full" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-l-3 border-black rounded-full" />

                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block">
                    YOUR OFFICIAL TICKET NUMBER
                  </span>

                  {/* Main Ticket Code */}
                  <div className="flex items-center justify-center gap-2 my-1">
                    <span className="text-2xl sm:text-3xl font-black text-[#FFE600] font-mono tracking-wider drop-shadow-[2px_2px_0px_#000]">
                      {ticketDetails.ticketNo}
                    </span>
                    <button
                      onClick={handleCopyTicket}
                      className="p-1.5 bg-black/30 hover:bg-black/50 text-white rounded-lg border border-white/30 transition-colors cursor-pointer"
                      title="Copy Ticket ID"
                    >
                      {copiedTicketId ? (
                        <Check className="w-4 h-4 text-[#00E676]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Seat Number & Attendee Details Line */}
                  <div className="mt-2 pt-2 border-t-2 border-dashed border-blue-400/60 flex flex-wrap items-center justify-between gap-2 text-xs font-bold px-2">
                    <div className="text-left">
                      <span className="text-[9px] uppercase font-bold text-blue-200 block">
                        ATTENDEE
                      </span>
                      <span className="font-extrabold text-white">
                        {formData.name || "Alex Ekwueme"}
                      </span>
                    </div>

                    <div className="bg-[#FF4785] text-white px-2.5 py-1 rounded-lg border-2 border-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-2">
                      SEAT: {ticketDetails.seatNo}
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] uppercase font-bold text-blue-200 block">
                        AMOUNT PAID
                      </span>
                      <span className="font-black text-[#FFE600]">
                        ₦{currentAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4 Activity Icon Badges (Food, Games, Art, Fun) */}
                <div className="my-5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-2">
                    WHAT TO EXPECT AT UPRIX HANGOUT
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {/* Food */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[#FFE600] border-3 border-black rounded-2xl flex items-center justify-center text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-3 hover:scale-110 transition-transform">
                        <Utensils className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-black mt-1 uppercase tracking-tight">
                        FOOD
                      </span>
                    </div>

                    {/* Games */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[#00E5FF] border-3 border-black rounded-2xl flex items-center justify-center text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:scale-110 transition-transform">
                        <Gamepad className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-black mt-1 uppercase tracking-tight">
                        GAMES
                      </span>
                    </div>

                    {/* Art */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[#FF4785] border-3 border-black rounded-2xl flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2 hover:scale-110 transition-transform">
                        <Palette className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-black mt-1 uppercase tracking-tight">
                        ART
                      </span>
                    </div>

                    {/* Fun */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[#00E676] border-3 border-black rounded-2xl flex items-center justify-center text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-3 hover:scale-110 transition-transform">
                        <Music className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-black mt-1 uppercase tracking-tight">
                        FUN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Badge */}
        <div className="mt-4 text-center">
          <span className="inline-block bg-white border-2 border-black font-black text-xs px-4 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-800">
            🎉 Uprix Hangout 1.0 • UI Ibadan
          </span>
        </div>
      </div>
    </div>
  );
}
