import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Slider from "@/components/slider";
import WhatToExpect from "@/components/WhatToExpect";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatToExpect />
      <Info />
      <Slider />
      <Footer />
    </>
  );
}
