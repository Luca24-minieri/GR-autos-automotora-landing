"use client";

import { motion } from "motion/react";
import { MapPin, Navigation, Users, Award, Shield, Clock } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";

const valores = [
  {
    icon: Shield,
    title: "Transparencia",
    desc: "Cada vehículo incluye historial completo, inspección técnica y documentación al día.",
  },
  {
    icon: Users,
    title: "Cercanía",
    desc: "Relaciones de largo plazo con nuestros clientes. El 70% llega por recomendación.",
  },
  {
    icon: Award,
    title: "Calidad",
    desc: "Solo comercializamos vehículos que cumplen con nuestros estándares de calidad.",
  },
  {
    icon: Clock,
    title: "Agilidad",
    desc: "Procesos simples y rápidos. Tu tiempo es valioso y lo respetamos.",
  },
];

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero banner */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
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
            Nuestra historia
          </motion.p>
          <motion.h1
            className="mt-3 font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            Sobre nosotros
          </motion.h1>
          <motion.div
            className="mt-6 h-px w-16 bg-gold/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Story section */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="font-display text-2xl font-semibold text-white">
                Transformando la experiencia de compra desde 2018
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                GR Autos nació con una misión clara: transformar la experiencia de compra de
                vehículos en Chile. Cansados de un mercado donde la desconfianza era la norma,
                decidimos crear una automotora donde la transparencia, la calidad y el servicio
                personalizado fueran los pilares fundamentales.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Ubicados en el corazón de Vitacura, hemos crecido de la mano de nuestros clientes,
                quienes nos recomiendan una y otra vez. Cada vehículo que ofrecemos pasa por una
                rigurosa inspección técnica y mecánica, porque creemos que la confianza se construye
                con hechos, no con palabras.
              </p>

              <motion.div
                className="mt-8 rounded-2xl border border-white/[0.06] bg-surface p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              >
                <h3 className="font-display text-lg font-semibold text-white">Nuestra misión</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Facilitar el acceso a vehículos de calidad con un proceso de compra simple,
                  transparente y seguro. Queremos que cada cliente salga de GR Autos con la
                  tranquilidad de haber tomado la mejor decisión.
                </p>
              </motion.div>
            </motion.div>

            {/* Stats column */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 500, suffix: "+", label: "Autos vendidos" },
                  { value: 8, suffix: "+", label: "Años de trayectoria" },
                  { value: 98, suffix: "%", label: "Satisfacción" },
                  { value: 70, suffix: "%", label: "Llegan por referidos" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="rounded-2xl border border-white/[0.06] bg-surface p-5 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="font-display text-2xl font-bold text-gold md:text-3xl">
                      <NumberTicker value={stat.value} />{stat.suffix}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Contact info */}
              <div className="rounded-2xl border border-white/[0.06] bg-surface p-6">
                <div className="space-y-4 text-sm text-white/80">
                  <p>
                    <span className="font-semibold text-gold">Dirección:</span> San Francisco de
                    Asís 150, Of. 329, Vitacura
                  </p>
                  <p>
                    <span className="font-semibold text-gold">Horario:</span> Lun-Vie 9:00-18:30 ·
                    Sáb 10:00-14:00
                  </p>
                  <p>
                    <span className="font-semibold text-gold">Teléfono:</span> +56 9 1234 5678
                  </p>
                  <p>
                    <span className="font-semibold text-gold">Email:</span> contacto@grautos.cl
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=-33.3969,-70.5969"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white transition-[background-color,border-color] duration-200 hover:border-white/20 hover:bg-white/5"
                  >
                    <MapPin className="h-4 w-4" /> Google Maps
                  </a>
                  <a
                    href="https://waze.com/ul?ll=-33.3969,-70.5969&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white transition-[background-color,border-color] duration-200 hover:border-white/20 hover:bg-white/5"
                  >
                    <Navigation className="h-4 w-4" /> Waze
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="relative overflow-hidden bg-surface-alt py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[300px] w-[600px] rounded-full bg-gold/[0.03] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.h2
            className="text-center font-display text-2xl font-bold text-white md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            Nuestros valores
          </motion.h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((v, i) => (
              <motion.div
                key={v.title}
                className="rounded-2xl border border-white/[0.06] bg-surface p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <v.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.h2
            className="mb-6 text-center font-display text-2xl font-bold text-white md:text-3xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            Encuéntranos
          </motion.h2>
          <motion.div
            className="overflow-hidden rounded-2xl border border-white/[0.06]"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <iframe
              title="Ubicación GR Autos"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9!2d-70.597!3d-33.397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIzJzQ5LjIiUyA3MMKwMzUnNDkuMiJX!5e0!3m2!1ses!2scl!4v1"
              className="h-[300px] w-full md:h-[450px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
