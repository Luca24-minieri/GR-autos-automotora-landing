"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const Destacados = dynamic(() => import("@/components/sections/Destacados"));
const Stats = dynamic(() => import("@/components/sections/Stats"));
const WhyUs = dynamic(() => import("@/components/sections/WhyUs"));
const BrandMarquee = dynamic(() => import("@/components/sections/BrandMarquee"));
const CtaDual = dynamic(() => import("@/components/sections/CtaDual"));
const Testimonios = dynamic(() => import("@/components/sections/Testimonios"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Destacados />
        <Stats />
        <WhyUs />
        <BrandMarquee />
        <CtaDual />
        <Testimonios />
      </main>
      <WhatsAppButton />
    </>
  );
}
