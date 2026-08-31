import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Platform } from "@/components/sections/Platform";
import { Results } from "@/components/sections/Results";
import { Audience } from "@/components/sections/Audience";
import { Testimonial } from "@/components/sections/Testimonial";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenu-principal">
        <Hero />
        <TrustBar />
        <Problem />
        <Solution />
        <Platform />
        <Results />
        <Audience />
        <Testimonial />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
