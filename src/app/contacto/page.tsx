"use client";

import { motion } from "motion/react";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/56912345678?text=Hola%2C%20me%20interesa%20un%20auto%20en%20GR%20Autos";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h1
          className="font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contacto
        </motion.h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Estamos aquí para ayudarte. Contáctanos por el medio que prefieras.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Form */}
          <motion.form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="sr-only" htmlFor="contacto-page-nombre">Nombre</label>
              <input
                id="contacto-page-nombre"
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
              <label className="sr-only" htmlFor="contacto-page-telefono">Teléfono</label>
              <input
                id="contacto-page-telefono"
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
            </div>
            <label className="sr-only" htmlFor="contacto-page-email">Email</label>
            <input
              id="contacto-page-email"
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <label className="sr-only" htmlFor="contacto-page-mensaje">Mensaje</label>
            <textarea
              id="contacto-page-mensaje"
              name="mensaje"
              placeholder="Mensaje"
              rows={5}
              className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-gold py-3 font-medium text-black transition-colors hover:bg-gold-hover md:w-auto md:px-12"
            >
              Enviar mensaje
            </button>

            <div className="pt-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 md:w-auto md:inline-flex"
              >
                <MessageCircle className="h-5 w-5" />
                Escribir por WhatsApp
              </a>
            </div>
          </motion.form>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4">
              {[
                { icon: MapPin, label: "San Francisco de Asís 150, Of. 329, Vitacura, Santiago" },
                { icon: Phone, label: "+56 9 1234 5678" },
                { icon: Mail, label: "contacto@grautos.cl" },
                { icon: Clock, label: "Lun-Vie 9:00-18:30 · Sáb 10:00-14:00" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm text-white/80">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-lg">
              <iframe
                title="Ubicación GR Autos"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9!2d-70.597!3d-33.397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIzJzQ5LjIiUyA3MMKwMzUnNDkuMiJX!5e0!3m2!1ses!2scl!4v1"
                className="h-[300px] w-full md:h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
