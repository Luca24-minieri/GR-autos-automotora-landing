"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function CtaDual() {
  return (
    <section className="relative overflow-hidden bg-surface-alt py-20 md:py-28">
      {/* Radial gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
        <motion.p
          className="text-sm font-medium uppercase tracking-[0.2em] text-gold/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          Da el siguiente paso
        </motion.p>

        <motion.h2
          className="mt-4 font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
        >
          ¿Qué quieres hacer hoy?
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-lg text-base text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
        >
          Compra o vende con la confianza y respaldo de GR Autos.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.23, 1, 0.32, 1] }}
        >
          <Link
            href="/vehiculos"
            className="btn-press group relative w-full overflow-hidden rounded-full bg-gold px-10 py-4 text-center text-lg font-semibold text-white shadow-lg shadow-gold/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/30 sm:w-auto"
          >
            <span className="relative z-10">Compra tu auto</span>
            <div className="absolute inset-0 bg-gold-hover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          <Link
            href="/vende-tu-auto"
            className="btn-press w-full rounded-full border border-white/20 px-10 py-4 text-center text-lg font-semibold text-white transition-[background-color,border-color] duration-300 hover:border-white/40 hover:bg-white/5 sm:w-auto"
          >
            Vende tu auto
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
