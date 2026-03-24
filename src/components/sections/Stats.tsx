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
    <section className="bg-surface-alt py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="font-display text-3xl font-bold text-gold md:text-4xl lg:text-5xl">
                {stat.prefix}
                <NumberTicker value={stat.value} />
                {stat.suffix}
              </div>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
