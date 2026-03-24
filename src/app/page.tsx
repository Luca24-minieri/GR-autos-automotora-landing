"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";

const Catalogo = dynamic(() => import("@/components/sections/Catalogo"));
const Stats = dynamic(() => import("@/components/sections/Stats"));
const WhyUs = dynamic(() => import("@/components/sections/WhyUs"));
const BrandMarquee = dynamic(() => import("@/components/sections/BrandMarquee"));
const Financiamiento = dynamic(() => import("@/components/sections/Financiamiento"));
const TextRevealSection = dynamic(() => import("@/components/sections/TextRevealSection"), {
  ssr: false,
});
const Testimonios = dynamic(() => import("@/components/sections/Testimonios"));
const SobreNosotros = dynamic(() => import("@/components/sections/SobreNosotros"));
const Contacto = dynamic(() => import("@/components/sections/Contacto"));
const Footer = dynamic(() => import("@/components/sections/Footer"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Catalogo />
        <Stats />
        <WhyUs />
        <BrandMarquee />
        <Financiamiento />
        <TextRevealSection />
        <Testimonios />
        <SobreNosotros />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
