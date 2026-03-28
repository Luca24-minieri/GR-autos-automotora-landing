"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { getMarcasUnicas, getModelosPorMarca, getVehiculos, formatPrecio } from "@/data/vehiculos";
import {
  ClipboardList,
  PhoneCall,
  Handshake,
  Banknote,
  ShieldCheck,
  Smartphone,
  DollarSign,
} from "lucide-react";

const pasos = [
  {
    icon: ClipboardList,
    title: "Completa el formulario",
    desc: "Ingresa los datos de tu auto y tus datos de contacto.",
  },
  {
    icon: PhoneCall,
    title: "Te contactamos en 24h",
    desc: "Nuestro equipo evalúa tu vehículo y te llama con una oferta.",
  },
  {
    icon: Handshake,
    title: "Acordamos e inspeccionamos",
    desc: "Si la oferta te parece bien, agendamos una inspección presencial.",
  },
  {
    icon: Banknote,
    title: "Pago inmediato",
    desc: "Transferencia segura y pago al momento de la entrega.",
  },
];

const anios = Array.from({ length: 12 }, (_, i) => 2026 - i);
const combustibles = ["Bencina", "Diesel", "Híbrido", "Eléctrico"];
const transmisiones = ["Automática", "Manual"];
const estados = ["Excelente", "Bueno", "Regular"];

export default function VendeTuAutoPage() {
  const marcas = useMemo(() => getMarcasUnicas(), []);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anoTasacion, setAnoTasacion] = useState("");
  const [kmTasacion, setKmTasacion] = useState("");
  const modelos = useMemo(() => (marca ? getModelosPorMarca(marca) : []), [marca]);

  const handleMarcaChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setMarca(e.target.value);
    setModelo("");
  }, []);

  const estimacion = useMemo(() => {
    if (!marca || !anoTasacion || !kmTasacion) return null;
    const ano = Number(anoTasacion);
    const km = Number(kmTasacion);
    const todos = getVehiculos();
    const similares = todos.filter(
      (v) => v.marca === marca && v.ano >= ano - 1 && v.ano <= ano + 1
    );
    if (similares.length === 0) return null;
    const promedioBase = similares.reduce((sum, v) => sum + v.precio, 0) / similares.length;
    const kmPromedio = similares.reduce((sum, v) => sum + v.km, 0) / similares.length;
    const ajusteKm = ((kmPromedio - km) / 10000) * 0.02;
    const estimado = Math.round(promedioBase * (1 + ajusteKm));
    return { min: Math.round(estimado * 0.9), max: Math.round(estimado * 1.1) };
  }, [marca, anoTasacion, kmTasacion]);

  const selectClass =
    "w-full rounded-xl border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white transition-colors duration-200 focus:border-gold focus:outline-none";
  const inputClass =
    "w-full rounded-xl border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground transition-colors duration-200 focus:border-gold focus:outline-none";

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center md:px-6 lg:px-8">
          <motion.p
            className="text-sm font-medium uppercase tracking-[0.2em] text-gold/70"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            Proceso simple y seguro
          </motion.p>
          <motion.h1
            className="mt-3 font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            Vende tu auto de forma{" "}
            <span className="text-gold">rápida y segura</span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-lg text-base text-muted-foreground md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.23, 1, 0.32, 1] }}
          >
            Recibe una oferta en menos de 24 horas
          </motion.p>
          <motion.a
            href="#formulario"
            className="btn-press group relative mt-8 inline-block overflow-hidden rounded-full bg-gold px-10 py-3.5 font-semibold text-white shadow-lg shadow-gold/15 transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/25"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="relative z-10">Tasar mi auto</span>
            <div className="absolute inset-0 bg-gold-hover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.a>
        </div>
      </section>

      {/* 4 Steps */}
      <section className="relative overflow-hidden bg-surface-alt py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[300px] w-[600px] rounded-full bg-gold/[0.03] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.h2
            className="mb-10 text-center font-display text-2xl font-bold text-white md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            ¿Cómo funciona?
          </motion.h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {pasos.map((paso, i) => (
              <motion.div
                key={paso.title}
                className="group relative rounded-2xl border border-white/[0.06] bg-surface p-6 text-center transition-colors duration-300 hover:border-gold/20"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gold/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <span className="block font-display text-4xl font-bold text-gold/15">
                    {i + 1}
                  </span>
                  <div className="mx-auto -mt-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <paso.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">
                    {paso.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{paso.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24">
        <div id="formulario" className="scroll-mt-24 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.h2
            className="text-center font-display text-2xl font-bold text-white md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            Solicita tu tasación gratuita
          </motion.h2>

          <motion.form
            className="mx-auto mt-10 max-w-3xl space-y-4"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="tasacion-marca" className="sr-only">Marca</label>
                <select id="tasacion-marca" name="marca" value={marca} onChange={handleMarcaChange} className={selectClass}>
                  <option value="">Marca</option>
                  {marcas.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tasacion-modelo" className="sr-only">Modelo</label>
                <select id="tasacion-modelo" name="modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} className={selectClass}>
                  <option value="">Modelo</option>
                  {modelos.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tasacion-ano" className="sr-only">Año</label>
                <select id="tasacion-ano" name="ano" value={anoTasacion} onChange={(e) => setAnoTasacion(e.target.value)} className={selectClass}>
                  <option value="">Año</option>
                  {anios.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tasacion-km" className="sr-only">Kilometraje</label>
                <input
                  id="tasacion-km"
                  type="number"
                  name="kilometraje"
                  placeholder="Kilometraje"
                  value={kmTasacion}
                  onChange={(e) => setKmTasacion(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="tasacion-combustible" className="sr-only">Combustible</label>
                <select id="tasacion-combustible" name="combustible" className={selectClass}>
                  <option value="">Combustible</option>
                  {combustibles.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tasacion-transmision" className="sr-only">Transmisión</label>
                <select id="tasacion-transmision" name="transmision" className={selectClass}>
                  <option value="">Transmisión</option>
                  {transmisiones.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="tasacion-estado" className="sr-only">Estado general</label>
                <select id="tasacion-estado" name="estado" className={selectClass}>
                  <option value="">Estado general</option>
                  {estados.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estimation */}
            {estimacion && (
              <motion.div
                className="rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Estimación referencial
                </p>
                <p className="mt-2 break-words font-display text-2xl font-bold text-gold md:text-3xl lg:text-4xl">
                  {formatPrecio(estimacion.min)} - {formatPrecio(estimacion.max)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Estimación automática. El precio final se determina en la inspección presencial.
                </p>
              </motion.div>
            )}

            <hr className="border-white/[0.06]" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="tasacion-nombre" className="sr-only">Nombre del propietario</label>
                <input id="tasacion-nombre" type="text" name="nombre" placeholder="Nombre del propietario" className={inputClass} />
              </div>
              <div>
                <label htmlFor="tasacion-telefono" className="sr-only">Teléfono</label>
                <input id="tasacion-telefono" type="tel" name="telefono" placeholder="Teléfono" className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="tasacion-email" className="sr-only">Email</label>
              <input id="tasacion-email" type="email" name="email" placeholder="Email" className={inputClass} />
            </div>
            <div>
              <label htmlFor="tasacion-comentarios" className="sr-only">Comentarios adicionales</label>
              <textarea id="tasacion-comentarios" placeholder="Comentarios adicionales" rows={3} className={inputClass} />
            </div>

            <button
              type="submit"
              className="btn-press group relative w-full overflow-hidden rounded-full bg-gold py-3.5 font-semibold text-white shadow-lg shadow-gold/15 transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/25"
            >
              <span className="relative z-10">Solicitar tasación gratuita</span>
              <div className="absolute inset-0 bg-gold-hover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </motion.form>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-surface-alt py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {[
              {
                icon: DollarSign,
                title: "Sin comisión",
                desc: "No cobramos comisión por la venta de tu vehículo.",
              },
              {
                icon: Smartphone,
                title: "Transferencia digital segura",
                desc: "Todo el proceso se gestiona de forma digital y segura.",
              },
              {
                icon: ShieldCheck,
                title: "Pago inmediato",
                desc: "Una vez completada la inspección, el pago es inmediato.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="group relative rounded-2xl border border-white/[0.06] bg-surface p-6 text-center transition-colors duration-300 hover:border-gold/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gold/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <item.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
