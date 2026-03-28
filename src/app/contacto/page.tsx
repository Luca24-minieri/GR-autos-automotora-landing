"use client";

import { motion } from "motion/react";
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/56912345678?text=Hola%2C%20me%20interesa%20un%20auto%20en%20GR%20Autos";

const contactInfo = [
  { icon: MapPin, label: "San Francisco de Asís 150, Of. 329, Vitacura, Santiago" },
  { icon: Phone, label: "+56 9 1234 5678" },
  { icon: Mail, label: "contacto@grautos.cl" },
  { icon: Clock, label: "Lun-Vie 9:00-18:30 · Sáb 10:00-14:00" },
];

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero banner */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.p
            className="text-sm font-medium uppercase tracking-[0.2em] text-gold/70"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            Conversemos
          </motion.p>
          <motion.h1
            className="mt-3 font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            Contacto
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-base text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.23, 1, 0.32, 1] }}
          >
            Estamos aquí para ayudarte. Contáctanos por el medio que prefieras.
          </motion.p>
          <motion.div
            className="mt-6 h-px w-16 bg-gold/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
            {/* Form */}
            <motion.form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40" htmlFor="contacto-page-nombre">
                    Nombre
                  </label>
                  <input
                    id="contacto-page-nombre"
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground transition-colors duration-200 focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40" htmlFor="contacto-page-telefono">
                    Teléfono
                  </label>
                  <input
                    id="contacto-page-telefono"
                    type="tel"
                    name="telefono"
                    placeholder="+56 9 XXXX XXXX"
                    className="w-full rounded-xl border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground transition-colors duration-200 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40" htmlFor="contacto-page-email">
                  Email
                </label>
                <input
                  id="contacto-page-email"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-xl border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground transition-colors duration-200 focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40" htmlFor="contacto-page-mensaje">
                  Mensaje
                </label>
                <textarea
                  id="contacto-page-mensaje"
                  name="mensaje"
                  placeholder="¿En qué podemos ayudarte?"
                  rows={5}
                  className="w-full rounded-xl border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground transition-colors duration-200 focus:border-gold focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  className="btn-press group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-3 font-medium text-white shadow-lg shadow-gold/15 transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Send className="h-4 w-4" /> Enviar mensaje
                  </span>
                  <div className="absolute inset-0 bg-gold-hover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition-opacity duration-200 hover:opacity-90"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            </motion.form>

            {/* Right column: Info + Map */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Info cards */}
              <div className="rounded-2xl border border-white/[0.06] bg-surface p-6">
                <h3 className="mb-4 font-display text-lg font-semibold text-white">
                  Información de contacto
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                        <item.icon className="h-4 w-4 text-gold" />
                      </div>
                      <span className="text-sm text-white/80 pt-1.5">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
                <iframe
                  title="Ubicación GR Autos"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9!2d-70.597!3d-33.397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIzJzQ5LjIiUyA3MMKwMzUnNDkuMiJX!5e0!3m2!1ses!2scl!4v1"
                  className="h-[250px] w-full md:h-[300px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
