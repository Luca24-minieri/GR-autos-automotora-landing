"use client";

import { motion } from "motion/react";

export default function SobreNosotros() {
  return (
    <section id="nosotros" className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-6 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl">
            Sobre nosotros
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            GR Autos es una automotora ubicada en el corazón de Vitacura, Santiago. Con más de 8
            años de experiencia en el mercado automotriz, nos especializamos en la venta de
            vehículos usados y seminuevos de todas las marcas.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Nuestro compromiso es ofrecer transparencia, calidad y un servicio personalizado que
            acompaña a nuestros clientes en cada paso del proceso de compra.
          </p>

          <div className="mt-8 space-y-3 text-sm text-white/80 md:text-base">
            <p>
              <span className="font-semibold text-gold">Dirección:</span> San Francisco de Asís 150,
              Of. 329, Vitacura
            </p>
            <p>
              <span className="font-semibold text-gold">Horario:</span> Lunes a Viernes 9:00 - 18:30
              · Sábado 10:00 - 14:00
            </p>
            <p>
              <span className="font-semibold text-gold">Teléfono:</span> +56 9 1234 5678
            </p>
          </div>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <iframe
            title="Ubicación GR Autos"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9!2d-70.597!3d-33.397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIzJzQ5LjIiUyA3MMKwMzUnNDkuMiJX!5e0!3m2!1ses!2scl!4v1"
            className="h-[250px] w-full md:h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin"
          />
        </motion.div>
      </div>
    </section>
  );
}
