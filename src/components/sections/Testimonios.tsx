"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "motion/react";
import { Star, Quote } from "lucide-react";

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

function TestimonioCard({ t, index }: { t: (typeof testimonios)[0]; index: number }) {
  return (
    <motion.div
      className="flex w-[min(320px,85vw)] shrink-0 snap-start flex-col rounded-2xl border border-white/[0.06] bg-surface p-6 md:w-[380px]"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <Quote className="h-8 w-8 text-gold/20" />
      <div className="mt-3 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold text-gold" />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/80">{t.text}</p>
      <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-sm font-semibold text-gold">
          {t.initials}
        </div>
        <span className="text-sm font-medium text-white">{t.name}</span>
      </div>
    </motion.div>
  );
}

export default function Testimonios() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [viewportWidth, setViewportWidth] = useState(1200);

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const cardW = viewportWidth < 768 ? Math.min(350, viewportWidth * 0.85) : 380;
  const cardWidth = cardW + 24;
  const maxDrag = Math.min(0, -(testimonios.length * cardWidth - viewportWidth));

  return (
    <section className="relative overflow-hidden bg-surface-alt py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.p
          className="text-sm font-medium uppercase tracking-[0.2em] text-gold/70"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          Testimonios
        </motion.p>
        <motion.h2
          className="mt-3 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
        >
          Lo que dicen nuestros clientes
        </motion.h2>
      </div>

      <motion.div
        ref={containerRef}
        className="mt-10 flex cursor-grab gap-6 px-4 active:cursor-grabbing md:px-6 lg:px-8 snap-x snap-mandatory"
        drag="x"
        style={{ x }}
        dragConstraints={{ left: maxDrag, right: 0 }}
        dragElastic={0.1}
      >
        {testimonios.map((t, i) => (
          <TestimonioCard key={t.name} t={t} index={i} />
        ))}
      </motion.div>

      {/* Drag hint */}
      <motion.p
        className="mt-6 text-center text-xs text-muted-foreground/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Arrastra para ver más
      </motion.p>
    </section>
  );
}
