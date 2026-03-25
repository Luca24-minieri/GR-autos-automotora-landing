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

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center">
          <motion.h1
            className="font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Vende tu auto de forma rápida y segura
          </motion.h1>
          <motion.p
            className="mt-3 text-sm text-muted-foreground md:text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Recibe una oferta en menos de 24 horas
          </motion.p>
          <motion.a
            href="#formulario"
            className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-black transition-colors hover:bg-gold-hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tasar mi auto
          </motion.a>
        </div>

        {/* 4 Steps */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso, i) => (
            <motion.div
              key={paso.title}
              className="rounded-lg border border-white/[0.06] bg-surface p-6 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                <paso.icon className="h-6 w-6 text-gold" />
              </div>
              <span className="mt-3 block font-display text-3xl font-bold text-gold/30">
                {i + 1}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold text-white">{paso.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{paso.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <div id="formulario" className="mt-16 scroll-mt-24">
          <motion.h2
            className="text-center font-display text-2xl font-bold text-white md:text-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Solicita tu tasación gratuita
          </motion.h2>

          <motion.form
            className="mx-auto mt-8 max-w-3xl space-y-4"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <select
                name="marca"
                value={marca}
                onChange={handleMarcaChange}
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
              >
                <option value="">Marca</option>
                {marcas.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                name="modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
              >
                <option value="">Modelo</option>
                {modelos.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                name="ano"
                value={anoTasacion}
                onChange={(e) => setAnoTasacion(e.target.value)}
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
              >
                <option value="">Año</option>
                {anios.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="kilometraje"
                placeholder="Kilometraje"
                value={kmTasacion}
                onChange={(e) => setKmTasacion(e.target.value)}
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
              <select
                name="combustible"
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
              >
                <option value="">Combustible</option>
                {combustibles.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                name="transmision"
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
              >
                <option value="">Transmisión</option>
                {transmisiones.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                name="estado"
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white focus:border-gold focus:outline-none md:col-span-2"
              >
                <option value="">Estado general</option>
                {estados.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            {/* Estimación referencial */}
            {estimacion && (
              <div className="rounded-lg border border-gold/30 bg-gold/5 p-5 text-center">
                <p className="text-sm text-muted-foreground">Estimación referencial</p>
                <p className="mt-1 font-display text-2xl font-bold text-gold md:text-3xl">
                  {formatPrecio(estimacion.min)} - {formatPrecio(estimacion.max)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Esta es una estimación automática. El precio final se determina en la inspección
                  presencial.
                </p>
              </div>
            )}

            <hr className="border-white/[0.06]" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del propietario"
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <textarea
              placeholder="Comentarios adicionales"
              rows={3}
              className="w-full rounded-lg border border-white/[0.06] bg-surface px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-gold py-3 font-semibold text-black transition-colors hover:bg-gold-hover"
            >
              Solicitar tasación gratuita
            </button>
          </motion.form>
        </div>

        {/* Value props */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: DollarSign,
              title: "Sin comisión",
              desc: "No cobramos comisión por la venta de tu vehículo.",
            },
            {
              icon: Smartphone,
              title: "Transferencia digital segura",
              desc: "Todo el proceso de transferencia se gestiona de forma digital y segura.",
            },
            {
              icon: ShieldCheck,
              title: "Pago inmediato",
              desc: "Una vez completada la inspección y transferencia, el pago es inmediato.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-lg border border-white/[0.06] bg-surface p-6 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <item.icon className="mx-auto h-8 w-8 text-gold" />
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
