"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { getVehiculosDestacados } from "@/data/vehiculos";
import VehicleCard from "@/components/VehicleCard";

export default function Destacados() {
  const destacados = getVehiculosDestacados();

  return (
    <section className="bg-background py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.p
          className="text-sm font-medium uppercase tracking-[0.2em] text-gold/70"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          Selección premium
        </motion.p>
        <motion.h2
          className="mt-3 font-display text-3xl font-bold text-white md:text-4xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
        >
          Vehículos destacados
        </motion.h2>
        <motion.p
          className="mt-4 max-w-lg text-sm text-muted-foreground md:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.23, 1, 0.32, 1] }}
        >
          Nuestra selección de vehículos verificados y con garantía.
        </motion.p>

        {/* Mobile carousel */}
        <div className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:hidden">
          {destacados.map((v, i) => (
            <motion.div
              key={v.id}
              className="min-w-[280px] snap-center flex-shrink-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <VehicleCard v={v} />
            </motion.div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="mt-12 hidden md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {destacados.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <VehicleCard v={v} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <Link
            href="/vehiculos"
            className="btn-press group relative overflow-hidden rounded-full bg-gold px-10 py-3.5 font-medium text-white shadow-lg shadow-gold/15 transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/25"
          >
            <span className="relative z-10">Ver catálogo completo</span>
            <div className="absolute inset-0 bg-gold-hover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
