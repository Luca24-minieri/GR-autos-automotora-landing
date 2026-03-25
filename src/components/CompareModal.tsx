"use client";

import Image from "next/image";
import { type Vehiculo, formatPrecio } from "@/data/vehiculos";
import { X, MessageCircle } from "lucide-react";

interface Props {
  vehiculos: Vehiculo[];
  onClose: () => void;
}

function bestOf(vals: (number | undefined)[], mode: "min" | "max"): number {
  const indexed = vals
    .map((v, i) => ({ v, i }))
    .filter((x): x is { v: number; i: number } => x.v !== undefined);
  if (indexed.length === 0) return -1;
  const best =
    mode === "min"
      ? indexed.reduce((a, b) => (b.v < a.v ? b : a))
      : indexed.reduce((a, b) => (b.v > a.v ? b : a));
  return best.i;
}

export default function CompareModal({ vehiculos, onClose }: Props) {
  const rows: { label: string; getter: (v: Vehiculo) => string; highlight?: "min" | "max" }[] = [
    { label: "Año", getter: (v) => String(v.ano), highlight: "max" },
    { label: "Kilometraje", getter: (v) => `${v.km.toLocaleString("es-CL")} km`, highlight: "min" },
    { label: "Precio", getter: (v) => formatPrecio(v.precio), highlight: "min" },
    { label: "Combustible", getter: (v) => v.combustible },
    { label: "Transmisión", getter: (v) => v.transmision },
    { label: "Motor", getter: (v) => v.motor },
    { label: "Potencia", getter: (v) => v.potencia },
    { label: "Tracción", getter: (v) => v.traccion },
    { label: "Puertas", getter: (v) => String(v.puertas) },
    { label: "Color", getter: (v) => v.colorExterior },
    { label: "N° dueños", getter: (v) => String(v.numeroDuenos), highlight: "min" },
  ];

  const numericGetters: Record<string, (v: Vehiculo) => number> = {
    Año: (v) => v.ano,
    Kilometraje: (v) => v.km,
    Precio: (v) => v.precio,
    "N° dueños": (v) => v.numeroDuenos,
  };

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-4 md:px-6">
        <h2 className="font-display text-xl font-bold text-white">Comparar vehículos</h2>
        <button onClick={onClose} aria-label="Cerrar comparador">
          <X className="h-6 w-6 text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <div className="min-w-[600px]">
          {/* Headers */}
          <div
            className="sticky top-0 z-10 grid border-b border-white/[0.06] bg-background"
            style={{ gridTemplateColumns: `160px repeat(${vehiculos.length}, 1fr)` }}
          >
            <div className="px-4 py-3" />
            {vehiculos.map((v) => (
              <div key={v.id} className="border-l border-white/[0.06] px-4 py-3 text-center">
                <div className="relative mx-auto mb-2 aspect-[16/10] w-full max-w-[200px] overflow-hidden rounded-md">
                  <Image
                    src={v.imagenes[0]}
                    alt={`${v.marca} ${v.modelo}`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <p className="font-display text-sm font-semibold text-white">
                  {v.marca} {v.modelo}
                </p>
                <p className="text-lg font-bold text-gold">{formatPrecio(v.precio)}</p>
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, ri) => {
            const numGetter = numericGetters[row.label];
            const bestIdx =
              row.highlight && numGetter ? bestOf(vehiculos.map(numGetter), row.highlight) : -1;

            return (
              <div
                key={row.label}
                className={`grid ${ri % 2 === 0 ? "bg-surface" : "bg-surface-alt"}`}
                style={{ gridTemplateColumns: `160px repeat(${vehiculos.length}, 1fr)` }}
              >
                <div className="px-4 py-3 text-sm text-muted-foreground">{row.label}</div>
                {vehiculos.map((v, vi) => (
                  <div
                    key={v.id}
                    className={`border-l border-white/[0.06] px-4 py-3 text-center text-sm font-medium ${
                      vi === bestIdx ? "text-gold" : "text-white"
                    }`}
                  >
                    {row.getter(v)}
                  </div>
                ))}
              </div>
            );
          })}

          {/* Action row */}
          <div
            className="grid border-t border-white/[0.06]"
            style={{ gridTemplateColumns: `160px repeat(${vehiculos.length}, 1fr)` }}
          >
            <div className="px-4 py-4" />
            {vehiculos.map((v) => {
              const msg = encodeURIComponent(
                `Hola, me interesa el ${v.marca} ${v.modelo} ${v.ano}. ¿Está disponible?`
              );
              return (
                <div
                  key={v.id}
                  className="flex items-center justify-center border-l border-white/[0.06] px-4 py-4"
                >
                  <a
                    href={`https://wa.me/56912345678?text=${msg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white"
                  >
                    <MessageCircle className="h-4 w-4" /> Consultar
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
