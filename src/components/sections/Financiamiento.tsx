"use client";

import { motion } from "motion/react";
import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/56912345678?text=Hola%2C%20quiero%20simular%20un%20crédito%20automotriz";

export default function Financiamiento() {
  return (
    <section id="financiamiento" className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:px-6 lg:gap-16 lg:px-8">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl">
            Financiamiento a tu medida
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            En GR Autos te ayudamos a encontrar el mejor crédito automotriz. Trabajamos con
            múltiples instituciones financieras para ofrecerte las mejores condiciones.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/80 md:text-base">
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Pie desde el 10%
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Hasta 48 cuotas
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Aprobación en 24 horas
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Sin letra chica
            </li>
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3 font-medium text-white transition-colors hover:bg-gold-hover"
          >
            Simula tu crédito
          </a>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=75&auto=format&fit=crop"
            alt="Financiamiento automotriz"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
