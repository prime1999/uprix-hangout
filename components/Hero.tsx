import Image from "next/image";
import hero from "@/public/images/hero.png";
import console from "@/public/images/console.png";
import heroBottom from "@/public/images/heroBottom.png";
import camera from "@/public/images/camera.png";
import logo from "@/public/images/logo.png";
import heroText from "@/public/images/heroText.png";
import drinks from "@/public/images/drinks.png";
import fun from "@/public/images/fun.png";

const Hero = () => {
  // Deep, exaggerated wave loops with sharper upward peaks
  const extraWavyPath =
    "M 0 0 C 20 80, 60 80, 80 0 C 100 80, 140 80, 160 0 L 160 0 L 0 0 Z";
  return (
    <div className="w-full h-[800px] overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative flex h-[680px] w-full flex-col items-center justify-center bg-[#E5D81D] pb-16 md:min-h-screen md:pb-24">
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
        <Image
          src={heroText}
          alt="hero-text"
          width={600}
          height={600}
          className="absolute z-50 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]"
        />
        <span className="absolute mt-32 translate-x-40 md:translate-x-50 rotate-30 z-50 text-sm bg-red-500 shadow-lg shadow-black rounded-[8px] py-1 px-2 tracking-wider font-semibold text-white">
          1.0
        </span>

        <div className="absolute bottom-60 lg:bottom-120 left-0 lg:left-5 w-full z-20 pointer-events-none translate-y-[99%] overflow-hidden">
          <Image
            src={heroBottom}
            alt="drinks and more"
            width={1000}
            height={400}
            className="mx-auto"
          />
        </div>
        <Image
          src={drinks}
          alt="drinks"
          width={200}
          height={200}
          className="absolute -left-5 md:left-2 max-sm:bottom-20 md:top-80 z-30"
        />
        <Image
          src={fun}
          alt="fun"
          width={200}
          height={200}
          className="absolute -right-5 md:right-2 max-sm:bottom-20 md:top-80 z-30"
        />
        <div className="z-50 flex flex-col gap-2 items-center justify-center -mt-8">
          {" "}
          <button className="bg-blue-600 py-3 px-6 font-embrace text-xs shadow-lg shadow-blue-800 rounded-[24px] cursor-pointer duration-500 transition hover:bg-blue-700">
            Get your Tickets
          </button>
          <p className="font-semibold text-xs bg-black px-4 py-2 rounded-full">
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
    </div>
  );
};

export default Hero;
