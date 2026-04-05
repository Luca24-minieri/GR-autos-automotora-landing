"use client";

import dynamic from "next/dynamic";
import { type Vehiculo } from "@/lib/vehicles";
import Hero from "@/components/sections/Hero";

const Destacados = dynamic(() => import("@/components/sections/Destacados"));
const Ofertas = dynamic(() => import("@/components/sections/Ofertas"));
const Stats = dynamic(() => import("@/components/sections/Stats"));
const WhyUs = dynamic(() => import("@/components/sections/WhyUs"));
const BrandMarquee = dynamic(() => import("@/components/sections/BrandMarquee"));
const CtaDual = dynamic(() => import("@/components/sections/CtaDual"));
const Testimonios = dynamic(() => import("@/components/sections/Testimonios"));

interface HomeClientProps {
  destacados: Vehiculo[];
  todosVehiculos: Vehiculo[];
}

export default function HomeClient({ destacados, todosVehiculos }: HomeClientProps) {
  return (
    <main>
      <Hero />
      <Destacados vehiculos={destacados} />
      <Ofertas vehiculos={todosVehiculos} />
      <Stats />
      <WhyUs />
      <BrandMarquee />
      <CtaDual />
      <Testimonios />
    </main>
  );
}
