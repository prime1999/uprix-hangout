import Image from "next/image";
import details from "@/public/images/details.png";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@800&family=Permanent+Marker&display=swap');
.badge-font { font-family: 'Baloo 2', cursive; }
.marker-font { font-family: 'Permanent Marker', cursive; }
.text-stroke {
  -webkit-text-stroke: 3px #000;
  paint-order: stroke fill;
}
`;

function Crown() {
  return (
    <svg viewBox="0 0 100 60" className="w-8 h-5 sm:w-10 sm:h-6">
      <path
        d="M8 50 L4 20 L26 34 L50 10 L74 34 L96 20 L92 50 Z"
        fill="#FFD400"
        stroke="#000"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle
        cx="4"
        cy="18"
        r="6"
        fill="#FFD400"
        stroke="#000"
        strokeWidth="5"
      />
      <circle
        cx="50"
        cy="9"
        r="6"
        fill="#FFD400"
        stroke="#000"
        strokeWidth="5"
      />
      <circle
        cx="96"
        cy="18"
        r="6"
        fill="#FFD400"
        stroke="#000"
        strokeWidth="5"
      />
      <line x1="12" y1="46" x2="88" y2="46" stroke="#000" strokeWidth="4" />
    </svg>
  );
}

function Squiggle() {
  return (
    <svg viewBox="0 0 160 14" className="w-full h-3 mt-1">
      <path
        d="M2 8 Q15 2 28 8 T54 8 T80 8 T106 8 T132 8 T158 8"
        fill="none"
        stroke="#FFD400"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Bolt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 100" className={className}>
      <path
        d="M38 4 L10 54 L26 54 L18 96 L52 42 L34 42 Z"
        fill="#FFE000"
        stroke="#111"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Underline() {
  return (
    <svg viewBox="0 0 220 14" className="w-full h-3 mt-1">
      <path
        d="M2 8 Q40 2 80 8 T160 7 T218 8"
        fill="#FFD400"
        stroke="#FFD400"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const Info = () => {
  return (
    <main className="w-full max-w-6xl mx-auto my-6 md:my-10 text-white">
      <style>{STYLES}</style>

      {/* Outer wrapper: provides the background image covering all 3 on desktop, but only section 1 & 2 on mobile */}
      <div
        className="w-full bg-[length:100%_100%] md:bg-contain bg-no-repeat bg-center min-h-[380px] md:min-h-[400px] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 py-8 px-4 sm:px-6 md:py-10"
        style={{ backgroundImage: "url(/images/colorBg.png)" }}
      >
        {/* 1. left: badge */}
        <div className="w-full md:w-1/3 flex items-center justify-center bg-transparent p-8 md:p-10">
          <div className="flex flex-col items-center md:items-start -rotate-2 text-center md:text-left">
            <Crown />

            <h1 className="badge-font text-stroke text-yellow-300 text-4xl leading-[0.95] mt-1">
              FOOD
              <br />
              GAMES
              <br />
              FUN &amp; GREAT
              <br />
              PEOPLE
            </h1>

            <div className="mt-2 w-max">
              <span className="badge-font text-stroke text-white text-sm tracking-wide">
                ALL IN ONE PLACE
              </span>
              <Squiggle />
            </div>
          </div>
          <Image
            src={details}
            alt="Event Details"
            width={200}
            height={200}
            className="md:hidden object-contain h-48 w-48"
          />
        </div>

        {/* 2. middle: copy + CTA */}
        <div className="w-full -mt-8 mb-4 lg:mb-0 lg:mt-0 md:w-1/3 md:border-l-2 md:border-l-white/80 px-4 sm:px-6 py-2 md:py-4 text-center md:text-left font-normal flex flex-col items-center md:items-start">
          <p className="text-xs sm:text-sm md:text-base leading-relaxed text-neutral-100 max-w-md md:max-w-none">
            UPRIX hangout is where exciting games, amazing people, good
            memories, and fun experiences come together. Whether you are coming
            to chill, compete, create or just vibe — there will be something for
            you.
          </p>
          <button className="bg-yellow-300 text-xs sm:text-sm rounded-full px-5 py-2.5 text-black font-semibold mt-4 sm:mt-5 cursor-pointer duration-300 transition hover:bg-yellow-400 active:scale-95 shadow-md">
            Save your spot
          </button>
        </div>

        {/* 3. right: doodle event details (Desktop position inside background) */}
        <div className="hidden md:flex relative w-1/3 items-center justify-center bg-transparent overflow-hidden p-10 min-h-[280px]">
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <Crown />
          </div>
          <Bolt className="absolute top-1 right-10 w-7 h-14 rotate-6" />
          <Bolt className="absolute bottom-6 left-10 w-6 h-12 -rotate-6" />

          {/* <div className="relative z-10 flex flex-col gap-2 marker-font text-white leading-tight text-left">
            <p className="text-lg">
              <span className="font-semibold">Date:</span> 30th, October, 2026
            </p>
            <p className="text-lg">
              <span className="font-semibold">Time:</span> 12pm Prompt
            </p>
            <p className="text-lg">
              <span className="font-semibold">Venue:</span> Indy JCR,
              <br />
              University of Ibadan
            </p>
            <Underline />
          </div> */}
          <Image
            src={details}
            alt="Event Details"
            width={200}
            height={200}
            className="hidden md:block object-contain h-56 w-56 lg:w-64 lg:h-64"
          />
        </div>
      </div>

      {/* 3. Mobile Event Details Section (Positioned outside and below the background on mobile) */}
      {/* <div className="md:hidden relative w-full flex items-center justify-center text-black p-6 sm:p-8 mt-6 min-h-[220px] overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <Crown />
        </div>
        <Bolt className="absolute top-2 right-6 w-6 h-12 rotate-6" />
        <Bolt className="absolute bottom-4 left-6 w-5 h-10 -rotate-6" />

        <div className="relative z-10 flex flex-col gap-2 marker-font leading-tight text-center mt-4">
          <p className="text-base sm:text-lg">
            <span className="font-semibold">Date:</span> 30th, October, 2026
          </p>
          <p className="text-base sm:text-lg">
            <span className="font-semibold">Time:</span> 12pm Prompt
          </p>
          <p className="text-base sm:text-lg">
            <span className="font-semibold">Venue:</span> Indy JCR,
            <br />
            University of Ibadan
          </p>
          <Underline />
        </div>
      </div> */}
    </main>
  );
};

export default Info;
