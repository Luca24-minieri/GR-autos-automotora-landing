"use client";

import { motion } from "motion/react";
import { Marquee } from "@/components/ui/marquee";

const brands = [
  "Toyota",
  "Hyundai",
  "Kia",
  "Chevrolet",
  "Mazda",
  "Nissan",
  "Suzuki",
  "MG",
  "Subaru",
  "Mitsubishi",
];

export default function BrandMarquee() {
  return (
    <section className="relative overflow-hidden bg-surface-alt py-14 md:py-20">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-surface-alt to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-surface-alt to-transparent md:w-32" />

      <motion.p
        className="mb-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        Marcas que comercializamos
      </motion.p>

      <Marquee pauseOnHover className="[--duration:40s] [--gap:3rem]">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex h-8 items-center px-6 text-xl font-bold tracking-wide text-white/25 transition-colors duration-300 hover:text-white/70 md:h-10 md:text-2xl lg:h-12 lg:text-3xl"
          >
            {brand}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
