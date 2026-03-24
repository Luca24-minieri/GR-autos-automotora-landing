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
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          className="text-center font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          ¿Por qué GR Autos?
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              className="rounded-lg border border-white/[0.06] bg-surface p-6 text-center transition-colors duration-300 hover:bg-surface-alt"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <block.icon className="mx-auto h-10 w-10 text-gold" />
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{block.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{block.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
