"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { getVehiculosDestacados } from "@/data/vehiculos";
import VehicleCard from "@/components/VehicleCard";

export default function Destacados() {
  const destacados = getVehiculosDestacados();

  return (
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          className="font-display text-2xl font-bold text-white md:text-4xl lg:text-6xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Vehículos destacados
        </motion.h2>
        <motion.p
          className="mt-4 text-sm text-muted-foreground md:text-base"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          Nuestra selección de vehículos verificados y con garantía.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
          {destacados.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <VehicleCard v={v} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link
            href="/vehiculos"
            className="rounded-full bg-gold px-8 py-3 font-medium text-white transition-colors hover:bg-gold-hover"
          >
            Ver catálogo completo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
