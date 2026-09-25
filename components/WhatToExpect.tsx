"use client";

import Image from "next/image";
import goodFood from "@/public/images/01_good_food.png";
import coolDrink from "@/public/images/02_cool_drinks.png";
import games from "@/public/images/03_games.png";
import goodVibes from "@/public/images/05_good_vibes.png";
import Head from "./Head";

const WhatToExpect = () => {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12">
      {/* Subtle paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            radial-gradient(#172b63 0.7px, transparent 0.7px),
            radial-gradient(#172b63 0.5px, transparent 0.5px)
          `,
          backgroundPosition: "0 0, 8px 8px",
          backgroundSize: "16px 16px",
        }}
      />

      <Head text="WHAT TO EXPECT" />
      <div className="w-10/12 mx-auto flex flex-col md:flex-row flex-wrap gap-4 items-center justify-center mt-4">
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image src={goodFood} alt="Good Food" width={100} height={100} />
          <h3 className="text-xs font-embrace italic tracking-wide text-[#0b1b4f] -rotate-1 px-1">
            DELICIOUS FOOD
          </h3>
          <p className="w-48 text-center text-[#0b1b4f] text-xs">
            Fresh, tasty and made for the vibes.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image src={coolDrink} alt="Cool Drink" width={100} height={100} />
          <h3 className="text-xs font-embrace italic tracking-wide text-[#0b1b4f] -rotate-1 px-1">
            COOL DRINKS
          </h3>
          <p className="w-48 text-center text-[#0b1b4f] text-xs">
            Refreshing sips and perfect combo for good times.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image src={games} alt="Games" width={100} height={100} />
          <h3 className="text-xs font-embrace italic tracking-wide text-[#0b1b4f] -rotate-1 px-1">
            GAMES
          </h3>
          <p className="w-48 text-center text-[#0b1b4f] text-xs">
            Play, compete and bond together.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image src={goodVibes} alt="Good Vibes" width={100} height={100} />
          <h3 className="text-xs font-embrace italic tracking-wide text-[#0b1b4f] -rotate-1 px-1">
            GOOD VIBES
          </h3>
          <p className="w-48 text-center text-[#0b1b4f] text-xs">
            Great people, music, laughs and unforgettable moments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;
