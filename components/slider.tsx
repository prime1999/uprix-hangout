"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Fanning team-member slider.
 * Fanning flex expansion with full touch/swipe gesture controls.
 */

const members = [
  {
    name: "Marcus Lee",
    title: "Product Design Lead",
    hair: "#1a1a1a",
    tone: "#c98a5e",
  },
  {
    name: "Dara Okafor",
    title: "Growth Strategist",
    hair: "#0d0d0d",
    tone: "#8a5a3c",
  },
  {
    name: "Iana Andrew",
    title: "Senior Marketing Executive",
    hair: "#241226",
    tone: "#e8b89c",
  },
  {
    name: "Petra Lindqvist",
    title: "Brand Director",
    hair: "#3a2a1c",
    tone: "#e6c9ad",
  },
  {
    name: "Noah Bergström",
    title: "Client Partnerships",
    hair: "#2b2b2b",
    tone: "#d9ab84",
  },
  {
    name: "Zuri Adeyemi",
    title: "Creative Producer",
    hair: "#0a0a0a",
    tone: "#8f5a3c",
  },
];

function Portrait({ tone, hair }: { tone: string; hair: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      preserveAspectRatio="xMidYMax slice"
      className="w-full h-full pointer-events-none select-none"
    >
      <rect width="200" height="260" fill="#d9d9d9" />
      <ellipse cx="100" cy="300" rx="90" ry="95" fill={tone} />
      <path
        d="M40 120 Q35 40 100 35 Q165 40 160 120 Q168 170 140 195 Q150 130 100 120 Q50 130 60 195 Q32 170 40 120 Z"
        fill={hair}
      />
      <ellipse cx="100" cy="120" rx="42" ry="50" fill={tone} />
    </svg>
  );
}

export default function Slider() {
  const [active, setActive] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  // Swipe tracking refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % members.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // GSAP Animations & Container-only Horizontal Auto-Scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      members.forEach((_, i) => {
        const panel = panelRefs.current[i];
        const img = imgRefs.current[i];
        const text = textRefs.current[i];
        const overlay = overlayRefs.current[i];
        const isActive = i === active;

        if (panel) {
          gsap.killTweensOf(panel);
          gsap.to(panel, {
            flexGrow: isActive ? 3.5 : 1,
            duration: 0.7,
            ease: "power2.out",
          });
        }

        if (img) {
          gsap.killTweensOf(img);
          gsap.to(img, {
            filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
            opacity: isActive ? 1 : 0.55,
            duration: 0.7,
            ease: "power2.out",
          });
        }

        if (text) {
          gsap.killTweensOf(text);
          gsap.to(text, {
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : -8,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        if (overlay) {
          gsap.killTweensOf(overlay);
          gsap.to(overlay, {
            opacity: isActive ? 1 : 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    }, containerRef);

    // Smoothly scroll container internally without page jumping
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

  const go = (dir: number) => {
    setActive((prev) => (prev + dir + members.length) % members.length);
  };

  // Touch Swipe Handlers
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
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40; // minimum pixels moved to trigger a slide change

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Slide
      go(1);
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Previous Slide
      go(-1);
    }

    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto py-6 md:py-10 px-4"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-end mb-4 px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            className="w-8 h-8 rounded-sm flex items-center justify-center text-white bg-blue-500 transition-opacity hover:opacity-90 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            className="w-8 h-8 rounded-sm flex items-center justify-center text-white bg-blue-500 transition-opacity hover:opacity-90 active:scale-95"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Outer Horizontal Scroll Container with Touch Support */}
      <div
        ref={scrollWrapperRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full overflow-x-auto rounded-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-y"
      >
        {/* Inner Flex Container */}
        <div className="flex items-stretch h-[380px] md:h-[420px] w-[220%] sm:w-[160%] md:w-full overflow-hidden rounded-sm gap-[2px] bg-white select-none">
          {members.map((m, i) => (
            <div
              key={m.name}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              onClick={() => setActive(i)}
              className="relative flex-1 min-w-[70px] md:min-w-0 cursor-pointer overflow-hidden will-change-[flex-grow]"
              style={{ flexBasis: "0%" }}
            >
              {/* Image Container */}
              <div
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
                className="absolute inset-0 pointer-events-none"
              >
                <Portrait tone={m.tone} hair={m.hair} />
              </div>

              {/* Gradient Overlay */}
              <div
                ref={(el) => {
                  overlayRefs.current[i] = el;
                }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(123,47,247,0.35) 0%, rgba(123,47,247,0.05) 40%, transparent 65%)",
                }}
              />

              {/* Text Overlay */}
              <div
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className="absolute top-4 left-3 right-3 md:top-5 md:left-5 md:right-5 pointer-events-none z-10"
              >
                <p
                  className="text-[9px] md:text-[10px] tracking-widest font-semibold mb-1 truncate"
                  style={{ color: "#8B5CF6" }}
                >
                  {m.title.toUpperCase()}
                </p>
                <h3 className="text-sm md:text-lg font-bold text-neutral-900 leading-tight truncate">
                  {m.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
