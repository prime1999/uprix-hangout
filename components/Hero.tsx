import Image from "next/image";
import hero from "@/public/images/hero.png";
import console from "@/public/images/console.png";
import drinks from "@/public/images/drinks.png";
import camera from "@/public/images/camera.png";
import logo from "@/public/images/logo.png";

const Hero = () => {
  // Deep, exaggerated wave loops with sharper upward peaks
  const extraWavyPath =
    "M 0 0 C 20 80, 60 80, 80 0 C 100 80, 140 80, 160 0 L 160 0 L 0 0 Z";
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#FFFDF0]">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[680px] w-full flex-col items-center justify-center bg-[#E5D81D] pb-16 md:min-h-screen md:pb-24">
        <Image
          src={logo}
          alt=""
          width={150}
          height={150}
          priority
          className="absolute -top-10 object-cover translate-x-0 z-50"
        />
        <Image
          src={hero}
          alt=""
          width={900}
          height={900}
          priority
          className="h-100 w-[min(88vw,720px)] z-30 object-cover md:h-[520px]"
        />

        <Image
          src={console}
          alt="gaming-console"
          width={300}
          height={300}
          className="absolute z-50 -top-30 rotate-90 lg:rotate-0 -right-30 lg:-top-10 lg:right-3"
        />

        <Image
          src={camera}
          alt="camera"
          width={350}
          height={350}
          className="absolute z-50 top-0 -left-50 md:-left-40 lg:-left-20"
        />

        {/* Main Text Graphic */}
        <div className="absolute top-16 z-50 flex w-full max-w-xl justify-center px-4 md:top-20">
          <svg
            viewBox="0 0 500 520"
            role="img"
            aria-label="Uprix Hangout"
            className="h-auto w-full select-none drop-shadow-[0_15px_0_rgba(0,0,0,0.25)]"
          >
            <defs>
              <path id="path-presenting" d="M 120 70 Q 250 35 380 70" />
              <path id="path-uprix" d="M 70 160 Q 250 120 430 160" />
              <path id="path-hang" d="M 80 270 Q 250 230 420 270" />
              <path id="path-out" d="M 90 380 Q 250 340 410 380" />

              <pattern
                id="dots"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="3" cy="3" r="1.5" fill="#111" opacity="0.18" />
              </pattern>
            </defs>

            {/* LAYER 1: HEAVY BLACK OUTLINE BACKDROP */}
            <g
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="54"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="font-black uppercase"
              style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
            >
              <text fontSize="20">
                <textPath
                  href="#path-presenting"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  PRESENTING
                </textPath>
              </text>
              <text fontSize="105">
                <textPath
                  href="#path-uprix"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  UPRIX
                </textPath>
              </text>
              <text fontSize="120">
                <textPath
                  href="#path-hang"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  HANG
                </textPath>
              </text>
              <text fontSize="120">
                <textPath
                  href="#path-out"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  OUT
                </textPath>
              </text>
            </g>

            {/* LAYER 2: GREEN PRESENTING BANNER */}
            <path
              d="M 130 60 Q 250 30 370 60"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <text
              fill="#FFF"
              fontSize="18"
              fontWeight="900"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              <textPath
                href="#path-presenting"
                startOffset="50%"
                textAnchor="middle"
              >
                PRESENTING
              </textPath>
            </text>

            {/* LAYER 3: MAIN TEXT FILLS */}
            <g
              className="font-black uppercase"
              style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
            >
              <text fontSize="105" fill="#FFFFFF">
                <textPath
                  href="#path-uprix"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  UPRIX
                </textPath>
              </text>
              <text fontSize="120" fill="#EAB308">
                <textPath
                  href="#path-hang"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  HANG
                </textPath>
              </text>
              <text fontSize="120" fill="url(#dots)">
                <textPath
                  href="#path-hang"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  HANG
                </textPath>
              </text>
              <text fontSize="120" fill="#FFFFFF">
                <textPath
                  href="#path-out"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  OUT
                </textPath>
              </text>
            </g>
          </svg>
        </div>
        <div className="absolute bottom-45 lg:bottom-120 left-0 lg:left-5 w-full z-20 pointer-events-none translate-y-[99%] overflow-hidden">
          <Image src={drinks} alt="drinks" width={1200} height={400} />
        </div>
        <div className="z-50 flex flex-col gap-2 items-center justify-center -mt-8">
          {" "}
          <button className="bg-red-600 py-2 px-4 font-embrace text-xs shadow-lg shadow-red-800 rounded-[24px] cursor-pointer duration-500 transition hover:bg-red-700">
            Get your Tickets
          </button>
          <p className="ml-4 font-semibold text-xs bg-black px-4 py-2 rounded-full">
            Come have fun while networking.
          </p>
        </div>

        {/* EXTRA WAVY BOTTOM BORDER - FIXED SIZE / NON-SQUEEZING */}
        <div className="absolute bottom-0 left-0 w-full h-[80px] pointer-events-none translate-y-[99%] overflow-hidden">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="wavy-pattern"
                patternUnits="userSpaceOnUse"
                width="160"
                height="80"
              >
                <path d={extraWavyPath} fill="#E5D81D" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wavy-pattern)" />
          </svg>
        </div>
      </section>

      {/* REMAINING WEBPAGE BODY */}
      <section className="min-h-screen w-full px-6 pb-12 pt-20 text-gray-900 md:p-12 md:pt-24">
        <h2 className="text-3xl font-bold mb-4">Event Details & Info</h2>
        <p className="text-lg leading-relaxed">
          This body section retains the background color of your choice below
          the deep wavy hero edge.
        </p>
      </section>
    </div>
  );
};

export default Hero;
