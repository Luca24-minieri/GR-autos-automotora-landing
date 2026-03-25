"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/56912345678?text=Hola%2C%20me%20interesa%20un%20auto%20en%20GR%20Autos";

export default function Contacto() {
  return (
    <section
      id="contacto"
      className="bg-gradient-to-b from-surface-alt to-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        <motion.h2
          className="text-center font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Contáctanos
        </motion.h2>
        <motion.p
          className="mt-4 text-center text-sm text-muted-foreground md:text-base"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          Déjanos tus datos y te contactamos a la brevedad.
        </motion.p>

        <motion.form
          className="mt-10 space-y-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="sr-only" htmlFor="contacto-nombre">Nombre</label>
            <input
              id="contacto-nombre"
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <label className="sr-only" htmlFor="contacto-telefono">Teléfono</label>
            <input
              id="contacto-telefono"
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
          </div>
          <label className="sr-only" htmlFor="contacto-email">Email</label>
          <input
            id="contacto-email"
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
          />
          <label className="sr-only" htmlFor="contacto-mensaje">Mensaje</label>
          <textarea
            id="contacto-mensaje"
            name="mensaje"
            placeholder="Mensaje"
            rows={4}
            className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-gold py-3 font-medium text-black transition-colors hover:bg-gold-hover md:w-auto md:px-12"
          >
            Enviar mensaje
          </button>
        </motion.form>

        <div className="mt-8 flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
