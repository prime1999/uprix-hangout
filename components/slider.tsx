"use client";

import React, { useRef, useState, useEffect } from "react";

import gsap from "gsap";

import {
  ChevronLeft,
  ChevronRight,
  Check,
  Ticket,
  Sparkles,
} from "lucide-react";

import yusroh from "@/public/images/yusroh.jpeg";
import taifaq from "@/public/images/taifaq.png";
import unknown from "@/public/images/unknown.jpg";

/**
 * Fanning team-member slider.
 *
 * - Desktop keeps the original Uprix Hangout presentation.
 * - Mobile uses a more compact card size and spacing.
 * - Full touch/swipe gesture support is preserved.
 * - GSAP controls the active-card expansion and image effects.
 */
const members = [
  {
    name: "Yusroh Oyerinola",
    title: "Product Design Lead",
    avatar: yusroh.src,
    seat: "JCR-A14",
  },
  {
    name: "Taifaq",
    title: "Brand Identity Designer",
    avatar: taifaq.src,
    seat: "JCR-A01",
  },
  {
    name: "Who 🤔??",
    title: "🤔🤔🤔🤔🤔🤔",
    avatar: unknown.src,
    seat: "JCR-???",
  },
  {
    name: "Who 🤔??",
    title: "🤔🤔🤔🤔🤔🤔",
    avatar: unknown.src,
    seat: "JCR-???",
  },
  {
    name: "Who 🤔??",
    title: "🤔🤔🤔🤔🤔🤔",
    avatar: unknown.src,
    seat: "JCR-???",
  },
  {
    name: "Who 🤔??",
    title: "🤔🤔🤔🤔🤔🤔",
    avatar: unknown.src,
    seat: "JCR-???",
  },
];

export default function Slider() {
  const [active, setActive] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  // Swipe tracking refs.
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ------------------------------------------------------------
  // AUTO PLAY
  // ------------------------------------------------------------

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % members.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // ------------------------------------------------------------
  // GSAP ANIMATIONS + INTERNAL SCROLL
  // ------------------------------------------------------------

  useEffect(() => {
    const ctx = gsap.context(() => {
      members.forEach((_, i) => {
        const panel = panelRefs.current[i];
        const img = imgRefs.current[i];
        const text = textRefs.current[i];
        const overlay = overlayRefs.current[i];

        const isActive = i === active;

        // --------------------------------------------------------
        // CARD WIDTH
        // --------------------------------------------------------

        if (panel) {
          gsap.killTweensOf(panel);

          gsap.to(panel, {
            flexGrow: isActive ? 3.5 : 1,
            duration: 0.7,
            ease: "power2.out",
          });
        }

        // --------------------------------------------------------
        // IMAGE
        // --------------------------------------------------------

        if (img) {
          gsap.killTweensOf(img);

          gsap.to(img, {
            filter: isActive ? "grayscale(0%)" : "grayscale(80%)",

            opacity: isActive ? 1 : 0.65,

            scale: isActive ? 1 : 1.08,

            duration: 0.7,
            ease: "power2.out",
          });
        }

        // --------------------------------------------------------
        // TEXT
        // --------------------------------------------------------

        if (text) {
          gsap.killTweensOf(text);

          gsap.to(text, {
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 12,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        // --------------------------------------------------------
        // OVERLAY
        // --------------------------------------------------------

        if (overlay) {
          gsap.killTweensOf(overlay);

          gsap.to(overlay, {
            opacity: isActive ? 1 : 0.7,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    }, containerRef);

    // ----------------------------------------------------------
    // KEEP ACTIVE CARD CENTERED INSIDE THE SCROLL CONTAINER
    // ----------------------------------------------------------

    const wrapper = scrollWrapperRef.current;
    const activePanel = panelRefs.current[active];

    if (wrapper && activePanel) {
      const wrapperWidth = wrapper.clientWidth;
      const panelLeft = activePanel.offsetLeft;
      const panelWidth = activePanel.clientWidth;

      const targetScrollLeft = panelLeft - wrapperWidth / 2 + panelWidth / 2;

      wrapper.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }

    return () => ctx.revert();
  }, [active]);

  // ------------------------------------------------------------
  // NEXT / PREVIOUS
  // ------------------------------------------------------------

  const go = (dir: number) => {
    setActive((prev) => (prev + dir + members.length) % members.length);
  };

  // ------------------------------------------------------------
  // TOUCH SWIPE
  // ------------------------------------------------------------

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);

    touchStartX.current = e.targetTouches[0].clientX;

    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);

    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    // Minimum movement required before changing slides.
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      // Swipe left → next slide.
      go(1);
    } else if (distance < -minSwipeDistance) {
      // Swipe right → previous slide.
      go(-1);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full max-w-5xl mx-auto py-6 md:py-10 px-4 font-sans text-slate-900"
    >
      {/* ------------------------------------------------------
          TOP BAR
          ------------------------------------------------------ */}

      <div className="flex items-center justify-between mb-3 md:mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-400 text-slate-950 font-black text-[9px] sm:text-xs uppercase px-2.5 sm:px-3 py-1 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            ✦ UPRIX HANGOUT 1.0 ✦
          </span>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={() => go(-1)}
            className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-950 bg-yellow-400 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] md:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all hover:bg-yellow-300 active:translate-y-0.5 cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft size={18} className="md:w-5 md:h-5" strokeWidth={3} />
          </button>

          <button
            onClick={() => go(1)}
            className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center text-white bg-blue-600 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] md:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all hover:bg-blue-500 active:translate-y-0.5 cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight size={18} className="md:w-5 md:h-5" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------
          OUTER HORIZONTAL SCROLL CONTAINER

          Mobile:
          - Compact height
          - Wider virtual canvas
          - Smaller minimum card width

          Desktop:
          - Original larger presentation
          ------------------------------------------------------ */}

      <div
        ref={scrollWrapperRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full overflow-x-auto rounded-[1.75rem] md:rounded-[2.5rem] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-y"
      >
        {/* ----------------------------------------------------
            INNER FLEX CONTAINER
            ---------------------------------------------------- */}

        <div className="flex items-stretch h-[380px] sm:h-[400px] md:h-[480px] lg:h-[540px] w-[220%] sm:w-[180%] md:w-[150%] lg:w-full overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] gap-2 md:gap-3 bg-slate-100 p-1.5 md:p-2 select-none border-2 border-slate-900 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          {members.map((m, i) => {
            const isActive = i === active;

            return (
              <div
                key={m.name}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                onClick={() => setActive(i)}
                className="relative flex-1 min-w-[70px] sm:min-w-[80px] md:min-w-[90px] lg:min-w-0 cursor-pointer overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-900 will-change-[flex-grow] bg-slate-900"
                style={{
                  flexBasis: "0%",
                }}
              >
                {/* ------------------------------------------------
                    FULL-BLEED PORTRAIT
                    ------------------------------------------------ */}

                <div
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  className="absolute inset-0 pointer-events-none transition-transform duration-700"
                >
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* ------------------------------------------------
                    GRADIENT SHADOW
                    ------------------------------------------------ */}

                <div
                  ref={(el) => {
                    overlayRefs.current[i] = el;
                  }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.1) 40%, rgba(15,23,42,0.92) 85%)",
                  }}
                />

                {/* ------------------------------------------------
                    ACTIVE BADGE
                    ------------------------------------------------ */}

                {isActive && (
                  <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 z-20 flex items-center gap-1 md:gap-1.5 bg-blue-600 text-white text-[8px] md:text-[10px] font-black uppercase tracking-wider px-2 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] rotate-[-1deg]">
                    <Sparkles
                      className="
                        w-3
                        h-3
                        md:w-3.5
                        md:h-3.5
                        text-yellow-300
                        fill-yellow-300
                      "
                    />

                    <span>I WILL BE THERE!</span>
                  </div>
                )}

                {/* ------------------------------------------------
                    BOTTOM INFORMATION
                    ------------------------------------------------ */}

                <div
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 z-20 text-left pointer-events-none flex flex-col justify-end"
                >
                  {/* Name + verified */}
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                    <h3 className="text-sm sm:text-base md:text-2xl font-black text-white leading-tight drop-shadow-md truncate">
                      {m.name}
                    </h3>

                    <div className="w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full border border-slate-900 flex items-center justify-center shrink-0">
                      <Check
                        className="
                          w-2.5
                          h-2.5
                          md:w-3
                          md:h-3

                          text-white
                          stroke-[3.5]
                        "
                      />
                    </div>
                  </div>

                  {/* Title / role */}
                  <p className="text-[10px] sm:text-xs font-bold text-slate-300 mb-2 md:mb-3 line-clamp-1 truncate">
                    {m.title}
                  </p>

                  {/* ------------------------------------------------
                      EVENT + SEAT + CONNECT
                      ------------------------------------------------ */}

                  <div className="flex items-center justify-between pt-2 md:pt-2.5 border-t border-white/20 gap-1.5 md:gap-2">
                    {/* Seat */}
                    <div className="flex items-center gap-1 md:gap-1.5 bg-yellow-400 text-slate-950 px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg md:rounded-xl border border-slate-900 font-mono text-[9px] md:text-[11px] font-black shrink-0">
                      <Ticket
                        className="
                          w-3
                          h-3
                          md:w-3.5
                          md:h-3.5

                          stroke-[2.5]
                        "
                      />

                      <span>{m.seat}</span>
                    </div>

                    {/* Connect */}
                    <button className="pointer-events-auto bg-white hover:bg-yellow-400 text-slate-950 text-[10px] md:text-xs font-black px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-lg md:rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] whitespace-nowrap">
                      CONNECT
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
