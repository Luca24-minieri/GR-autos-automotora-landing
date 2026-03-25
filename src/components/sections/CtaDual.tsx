"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function CtaDual() {
  return (
    <section className="bg-surface-alt py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
        <motion.h2
          className="font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          ¿Qué quieres hacer hoy?
        </motion.h2>
        <motion.div
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <Link
            href="/vehiculos"
            className="w-full rounded-full bg-gold px-8 py-4 text-center font-semibold text-black transition-colors hover:bg-gold-hover sm:w-auto"
          >
            Compra tu auto
          </Link>
          <Link
            href="/vende-tu-auto"
            className="w-full rounded-full border border-white/20 px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-white/5 sm:w-auto"
          >
            Vende tu auto
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
