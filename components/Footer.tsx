import footer from "@/public/images/footer.png";
import Link from "next/link";

function Crown() {
  return (
    <svg viewBox="0 0 100 60" className="w-7 h-4 sm:w-10 sm:h-6">
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

const Footer = () => {
  return (
    <footer
      className="-mb-12 lg:-mb-22 w-full mt-8 text-white flex flex-col justify-center items-center bg-[length:100%_100%] bg-no-repeat bg-center aspect-[16/10] sm:aspect-[16/7] md:h-[400px] md:aspect-auto"
      style={{ backgroundImage: `url(${footer.src})` }}
    >
      <div className="max-w-md w-full mx-auto flex flex-col items-center justify-center text-center relative px-4">
        {/* Crown Icon */}
        <div className="absolute -top-1 sm:-top-3 left-1/2 -translate-x-1/2">
          <Crown />
        </div>

        {/* Headline */}
        <h2 className="text-md lg:text-lg font-embrace italic tracking-wide -rotate-1 px-1 mt-2">
          Ready to Hangout<span className="ml-1 text-sm sm:text-xl">?</span>
        </h2>

        {/* Decorative Underline */}
        <div className="w-24 sm:w-40 -rotate-1 mt-0.5">
          <svg
            className="w-full h-2 sm:h-3 mx-auto"
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

        {/* Subtitle */}
        <p className="text-[10px] sm:text-sm text-neutral-200 mt-2 px-2 max-w-[240px] sm:max-w-none">
          Fun, Games, and Great People all in one place
        </p>

        {/* CTA Button */}
        <button className="bg-yellow-300 text-xs sm:text-base rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-black font-semibold mt-3 sm:mt-5 cursor-pointer duration-300 transition hover:bg-yellow-400 active:scale-95 shadow-md">
          Save your spot
        </button>

        {/* Developer Attribution */}
        <div className="flex items-center justify-center gap-1 mt-4 sm:mt-10 text-[10px] sm:text-xs text-neutral-300">
          <p>developed by</p>
          <Link
            href="https://priime-portfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 font-semibold hover:underline"
          >
            priime
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
