"use client";

import { motion } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";

const stats = [
  { value: 500, prefix: "+", suffix: "", label: "Autos vendidos" },
  { value: 8, prefix: "+", suffix: "", label: "Años de experiencia" },
  { value: 1200, prefix: "+", suffix: "", label: "Clientes felices" },
  { value: 98, prefix: "", suffix: "%", label: "Satisfacción" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-surface-alt py-20 md:py-28">
      {/* Gradient glow behind stats */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[300px] w-[600px] rounded-full bg-gold/[0.04] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Animated top line */}
        <motion.div
          className="mx-auto mb-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        />

        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="font-display text-3xl font-bold text-gold sm:text-4xl md:text-5xl lg:text-6xl">
                {stat.prefix}
                <NumberTicker value={stat.value} />
                {stat.suffix}
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated bottom line */}
        <motion.div
          className="mx-auto mt-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </section>
  );
}
