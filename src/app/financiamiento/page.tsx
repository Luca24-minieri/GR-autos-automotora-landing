"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Marquee } from "@/components/ui/marquee";
import { formatPrecio } from "@/data/vehiculos";
import { ShieldCheck, Clock, Building2, MessageCircle } from "lucide-react";

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

export default function FinanciamientoPage() {
  const [precio, setPrecio] = useState(18000000);
  const [piePct, setPiePct] = useState(20);
  const [cuotas, setCuotas] = useState(36);

  const montoFinanciar = useMemo(() => precio * (1 - piePct / 100), [precio, piePct]);
  const cuotaMensual = useMemo(() => calcCuota(montoFinanciar, cuotas), [montoFinanciar, cuotas]);

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h1
          className="font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Financiamiento
        </motion.h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Simula tu crédito automotriz y encuentra la mejor opción para ti.
        </p>

        {/* Calculator */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <motion.div
            className="rounded-lg border border-white/[0.06] bg-surface p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-display text-xl font-semibold text-white">
              Calculadora de crédito
            </h2>

            <div className="mt-6 space-y-6">
              {/* Precio */}
              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Precio del vehículo
                </label>
                <input
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
                <label className="mb-2 block text-sm text-muted-foreground">
                  Porcentaje de pie: <span className="text-gold font-semibold">{piePct}%</span>
                </label>
                <input
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
                <label className="mb-2 block text-sm text-muted-foreground">Número de cuotas</label>
                <div className="flex gap-2">
                  {[12, 24, 36, 48].map((n) => (
                    <button
                      key={n}
                      onClick={() => setCuotas(n)}
                      className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
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
            <div className="mt-8 rounded-lg bg-background p-6 text-center">
              <p className="text-sm text-muted-foreground">Tu cuota mensual estimada</p>
              <p
                data-testid="resultado-cuota"
                className="mt-2 font-display text-4xl font-bold text-gold md:text-5xl"
              >
                {formatPrecio(cuotaMensual)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Monto a financiar: {formatPrecio(Math.round(montoFinanciar))} en {cuotas} cuotas
              </p>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Tasa referencial: 1,2% mensual. Valores estimativos sujetos a evaluación crediticia.
            </p>

            <a
              href="https://wa.me/56912345678?text=Hola%2C%20quiero%20consultar%20por%20financiamiento%20automotriz"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 font-medium text-white transition-colors hover:bg-gold-hover"
            >
              <MessageCircle className="h-5 w-5" /> Consultar financiamiento personalizado
            </a>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-xl font-semibold text-white">
              ¿Por qué financiar con GR Autos?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Trabajamos con las principales instituciones financieras del país para ofrecerte las
              mejores tasas y condiciones. Nuestro equipo te acompaña en todo el proceso.
            </p>

            <div className="mt-8 space-y-6">
              {[
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
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-white">Requisitos</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Cédula de identidad vigente
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Últimas 3 liquidaciones de sueldo
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Certificado de antigüedad laboral
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Carpeta tributaria (independientes)
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Partner logos */}
        <div className="mt-16">
          <p className="mb-6 text-center text-sm uppercase tracking-widest text-muted-foreground">
            Instituciones financieras asociadas
          </p>
          <Marquee pauseOnHover className="[--duration:30s] [--gap:3rem]">
            {bancos.map((b) => (
              <div
                key={b}
                className="flex items-center px-4 text-lg font-semibold text-white/30 transition-colors duration-300 hover:text-white md:text-xl"
              >
                {b}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </main>
  );
}
