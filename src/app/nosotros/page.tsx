"use client";

import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h1
          className="font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Sobre nosotros
        </motion.h1>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-display text-xl font-semibold text-white">Nuestra historia</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              GR Autos nació en 2018 con una misión clara: transformar la experiencia de compra de
              vehículos en Chile. Cansados de un mercado donde la desconfianza era la norma,
              decidimos crear una automotora donde la transparencia, la calidad y el servicio
              personalizado fueran los pilares fundamentales.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Ubicados en el corazón de Vitacura, hemos crecido de la mano de nuestros clientes,
              quienes nos recomiendan una y otra vez. Cada vehículo que ofrecemos pasa por una
              rigurosa inspección técnica y mecánica, porque creemos que la confianza se construye
              con hechos, no con palabras.
            </p>

            <h2 className="mt-10 font-display text-xl font-semibold text-white">Nuestra misión</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Facilitar el acceso a vehículos de calidad con un proceso de compra simple,
              transparente y seguro. Queremos que cada cliente salga de GR Autos con la tranquilidad
              de haber tomado la mejor decisión.
            </p>

            <div className="mt-10 space-y-3 text-sm text-white/80 md:text-base">
              <p>
                <span className="font-semibold text-gold">Dirección:</span> San Francisco de Asís
                150, Of. 329, Vitacura, Santiago
              </p>
              <p>
                <span className="font-semibold text-gold">Horario:</span> Lunes a Viernes 9:00 -
                18:30 · Sábado 10:00 - 14:00
              </p>
              <p>
                <span className="font-semibold text-gold">Teléfono:</span> +56 9 1234 5678
              </p>
              <p>
                <span className="font-semibold text-gold">Email:</span> contacto@grautos.cl
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.google.com/maps/search/?api=1&query=-33.3969,-70.5969"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white transition-colors hover:bg-white/5"
              >
                <MapPin className="h-4 w-4" /> Abrir en Google Maps
              </a>
              <a
                href="https://waze.com/ul?ll=-33.3969,-70.5969&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white transition-colors hover:bg-white/5"
              >
                <Navigation className="h-4 w-4" /> Abrir en Waze
              </a>
            </div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <iframe
              title="Ubicación GR Autos"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9!2d-70.597!3d-33.397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIzJzQ5LjIiUyA3MMKwMzUnNDkuMiJX!5e0!3m2!1ses!2scl!4v1"
              className="h-[300px] w-full md:h-[500px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
