"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Marquee } from "@/components/ui/marquee";
import { formatPrecio } from "@/data/vehiculos";
import { ShieldCheck, Clock, Building2, MessageCircle, Calculator } from "lucide-react";

const TASA = 0.012;

function calcCuota(monto: number, n: number): number {
  if (monto <= 0 || n <= 0) return 0;
  return Math.round((monto * TASA) / (1 - Math.pow(1 + TASA, -n)));
}

const bancos = [
  "BancoEstado",
  "Santander",
  "BCI",
  "Scotiabank",
  "Tanner",
  "Forum",
  "NuevoCapital",
  "Eurocapital",
];

const beneficios = [
  {
    icon: ShieldCheck,
    title: "Sin comisión",
    desc: "No cobramos comisión por gestión de crédito. Nuestro servicio es gratuito para ti.",
  },
  {
    icon: Clock,
    title: "Respuesta en 24 horas",
    desc: "Enviamos tu solicitud a múltiples instituciones y te presentamos las mejores opciones.",
  },
  {
    icon: Building2,
    title: "Múltiples instituciones",
    desc: "Bancos, financieras y cooperativas. Comparamos para que tú elijas la mejor.",
  },
];

const requisitos = [
  "Cédula de identidad vigente",
  "Últimas 3 liquidaciones de sueldo",
  "Certificado de antigüedad laboral",
  "Carpeta tributaria (independientes)",
];

export default function FinanciamientoPage() {
  const [precio, setPrecio] = useState(18000000);
  const [piePct, setPiePct] = useState(20);
  const [cuotas, setCuotas] = useState(36);

  const montoFinanciar = useMemo(() => precio * (1 - piePct / 100), [precio, piePct]);
  const cuotaMensual = useMemo(() => calcCuota(montoFinanciar, cuotas), [montoFinanciar, cuotas]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
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
            Crédito automotriz
          </motion.p>
          <motion.h1
            className="mt-3 font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            Financiamiento
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-base text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.23, 1, 0.32, 1] }}
          >
            Simula tu crédito automotriz y encuentra la mejor opción para ti.
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

      {/* Calculator */}
      <section className="overflow-hidden pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Calculator card */}
            <motion.div
              className="rounded-2xl border border-white/[0.06] bg-surface p-6 md:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
                  <Calculator className="h-5 w-5 text-gold" />
                </div>
                <h2 className="font-display text-xl font-semibold text-white">
                  Calculadora de crédito
                </h2>
              </div>

              <div className="mt-6 space-y-6">
                {/* Precio */}
                <div>
                  <label htmlFor="calc-precio" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">
                    Precio del vehículo
                  </label>
                  <input
                    id="calc-precio"
                    type="range"
                    min={5000000}
                    max={60000000}
                    step={500000}
                    value={precio}
                    onChange={(e) => setPrecio(Number(e.target.value))}
                    className="w-full accent-gold"
                  />
                  <p className="mt-1 text-right font-display text-lg font-semibold text-white">
                    {formatPrecio(precio)}
                  </p>
                </div>

                {/* Pie */}
                <div>
                  <label htmlFor="calc-pie" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">
                    Porcentaje de pie: <span className="text-gold font-semibold normal-case">{piePct}%</span>
                  </label>
                  <input
                    id="calc-pie"
                    type="range"
                    min={10}
                    max={50}
                    step={5}
                    value={piePct}
                    onChange={(e) => setPiePct(Number(e.target.value))}
                    className="w-full accent-gold"
                  />
                  <p className="mt-1 text-right text-sm text-muted-foreground">
                    Pie: {formatPrecio(Math.round((precio * piePct) / 100))}
                  </p>
                </div>

                {/* Cuotas */}
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
                    Número de cuotas
                  </p>
                  <div className="flex gap-2">
                    {[12, 24, 36, 48].map((n) => (
                      <button
                        key={n}
                        onClick={() => setCuotas(n)}
                        className={`btn-press flex-1 rounded-xl py-2.5 text-sm font-medium transition-[background-color,border-color,color] duration-200 ${
                          cuotas === n
                            ? "bg-gold text-white"
                            : "border border-white/10 text-white/70 hover:bg-white/5"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result */}
              <motion.div
                className="mt-8 rounded-2xl bg-background p-6 text-center"
                key={`${montoFinanciar}-${cuotas}`}
                initial={{ scale: 0.98, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tu cuota mensual estimada
                </p>
                <p
                  data-testid="resultado-cuota"
                  className="mt-3 break-words font-display text-3xl font-bold text-gold sm:text-4xl md:text-5xl"
                >
                  {formatPrecio(cuotaMensual)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Monto a financiar: {formatPrecio(Math.round(montoFinanciar))} en {cuotas} cuotas
                </p>
              </motion.div>

              <p className="mt-4 text-xs text-muted-foreground">
                Tasa referencial: 1,2% mensual. Valores estimativos sujetos a evaluación crediticia.
              </p>

              <a
                href="https://wa.me/56912345678?text=Hola%2C%20quiero%20consultar%20por%20financiamiento%20automotriz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gold py-3 font-medium text-white shadow-lg shadow-gold/15 transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" /> Consultar financiamiento
                </span>
                <div className="absolute inset-0 bg-gold-hover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </motion.div>

            {/* Info */}
            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              <div>
                <h2 className="font-display text-xl font-semibold text-white">
                  ¿Por qué financiar con GR Autos?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Trabajamos con las principales instituciones financieras del país para ofrecerte las
                  mejores tasas y condiciones.
                </p>
              </div>

              <div className="space-y-5">
                {beneficios.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                      <item.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="rounded-2xl border border-white/[0.06] bg-surface p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <h3 className="font-display font-semibold text-white">Requisitos</h3>
                <ul className="mt-3 space-y-2.5">
                  {requisitos.map((req) => (
                    <li key={req} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners marquee */}
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-surface-alt py-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-surface-alt to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-surface-alt to-transparent md:w-32" />

        <motion.p
          className="mb-8 text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Instituciones financieras asociadas
        </motion.p>
        <Marquee pauseOnHover className="[--duration:30s] [--gap:3rem]">
          {bancos.map((b) => (
            <div
              key={b}
              className="flex items-center px-6 text-xl font-bold text-white/20 transition-colors duration-300 hover:text-white/60 md:text-2xl"
            >
              {b}
            </div>
          ))}
        </Marquee>
      </section>
    </main>
  );
}
