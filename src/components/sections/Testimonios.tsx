"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Star } from "lucide-react";

const testimonios = [
  {
    name: "Carlos Mendoza",
    initials: "CM",
    text: "Excelente experiencia. El proceso fue rápido y transparente. Encontré el auto perfecto para mi familia.",
  },
  {
    name: "María José Reyes",
    initials: "MR",
    text: "Muy buena atención personalizada. Me ayudaron con todo el papeleo y el financiamiento. 100% recomendado.",
  },
  {
    name: "Andrés Figueroa",
    initials: "AF",
    text: "Compré mi segundo auto aquí. La confianza que generan es impresionante, siempre cumplen lo que prometen.",
  },
  {
    name: "Valentina Torres",
    initials: "VT",
    text: "El mejor servicio que he recibido en una automotora. Profesionales, honestos y muy amables.",
  },
  {
    name: "Roberto Silva",
    initials: "RS",
    text: "La garantía mecánica me dio mucha tranquilidad. Ya llevo 6 meses con el auto y todo perfecto.",
  },
  {
    name: "Camila Rojas",
    initials: "CR",
    text: "Me encantó que verifican cada auto antes de venderlo. Se nota la calidad y el compromiso.",
  },
];

function TestimonioCard({ t }: { t: { name: string; initials: string; text: string } }) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col rounded-lg border border-white/[0.06] bg-surface p-6 md:w-[350px]">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold text-gold" />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/80">{t.text}</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-sm font-semibold text-gold">
          {t.initials}
        </div>
        <span className="text-sm font-medium text-white">{t.name}</span>
      </div>
    </div>
  );
}

export default function Testimonios() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const cardWidth = 350 + 24; // card width + gap
  const maxDrag = -(
    testimonios.length * cardWidth -
    (typeof window !== "undefined" ? window.innerWidth : 1200)
  );

  return (
    <section className="overflow-hidden bg-surface-alt py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          className="font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Lo que dicen nuestros clientes
        </motion.h2>
      </div>

      <motion.div
        ref={containerRef}
        className="mt-10 flex cursor-grab gap-6 px-4 active:cursor-grabbing md:px-6 lg:px-8"
        drag="x"
        style={{ x: springX }}
        dragConstraints={{ left: maxDrag, right: 0 }}
        dragElastic={0.1}
      >
        {testimonios.map((t) => (
          <TestimonioCard key={t.name} t={t} />
        ))}
      </motion.div>
    </section>
  );
}
