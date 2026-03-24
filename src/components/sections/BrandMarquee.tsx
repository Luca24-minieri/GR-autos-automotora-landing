"use client";

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
    <section className="bg-surface-alt py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm uppercase tracking-widest text-muted-foreground">
          Marcas que comercializamos
        </p>
      </div>
      <Marquee pauseOnHover className="[--duration:40s] [--gap:3rem]">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex h-8 items-center px-4 text-lg font-semibold text-white/40 transition-colors duration-300 hover:text-white md:h-10 md:text-xl lg:h-12 lg:text-2xl"
          >
            {brand}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
