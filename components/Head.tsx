import React from "react";

const Head = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center p-6 bg-transparent select-none">
      <div className="relative inline-flex flex-col items-center">
        {/* Main Header Row */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Left Action Burst SVG (Dashes spread apart) */}
          <svg
            className="w-8 h-8 md:w-12 md:h-12 text-[#0b1b4f] shrink-0"
            viewBox="0 0 45 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="5.5"
            strokeLinecap="round"
          >
            {/* Top dash shifted up */}
            <path d="M 8 10 L 32 16" />
            {/* Middle dash centered */}
            <path d="M 4 30 L 36 30" />
            {/* Bottom dash shifted down */}
            <path d="M 12 50 L 32 44" />
          </svg>

          {/* Heading Text */}
          <h2 className="text-md sm:text-lg md:text-xl font-embrace italic tracking-wide text-[#0b1b4f] -rotate-1 px-1">
            {text}
          </h2>

          {/* Right Action Burst SVG (Dashes spread apart) */}
          <svg
            className="w-8 h-8 md:w-12 md:h-12 text-[#0b1b4f] shrink-0"
            viewBox="0 0 45 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="5.5"
            strokeLinecap="round"
          >
            {/* Top dash: shifted up to Y=12 */}
            <path d="M 10 16 L 32 8" />
            {/* Middle dash: centered at Y=30 */}
            <path d="M 8 30 L 42 32" />
            {/* Bottom dash: shifted down to Y=46 */}
            <path d="M 10 44 L 30 54" />
          </svg>
        </div>

        {/* Hand-Drawn Yellow Marker Underline */}
        <div className="w-[40%] -rotate-1">
          <svg
            className="w-full h-5"
            viewBox="0 0 320 20"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 5 11 C 90 16, 210 6, 315 13"
              stroke="#EAB308"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Head;
