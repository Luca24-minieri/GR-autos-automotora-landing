"use client";

import { motion } from "motion/react";
import { Wallet, ShieldCheck, BadgeCheck, HeartHandshake } from "lucide-react";

const blocks = [
  {
    icon: Wallet,
    title: "Financiamiento flexible",
    description: "Créditos a tu medida con pie desde el 10% y hasta 48 cuotas.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía mecánica",
    description: "Todos nuestros vehículos cuentan con garantía mecánica incluida.",
  },
  {
    icon: BadgeCheck,
    title: "Autos verificados",
    description: "Cada auto pasa por una inspección técnica exhaustiva antes de la venta.",
  },
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    description: "Te acompañamos en todo el proceso, desde la elección hasta la entrega.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-36">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.p
          className="text-center text-sm font-medium uppercase tracking-[0.2em] text-gold/70"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          Nuestras ventajas
        </motion.p>
        <motion.h2
          className="mt-4 text-center font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
        >
          ¿Por qué GR Autos?
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              className="group relative rounded-2xl border border-white/[0.06] bg-surface p-6 md:p-8 text-center transition-colors duration-300 hover:border-gold/20 hover:bg-surface-alt"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gold/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                  <block.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{block.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
