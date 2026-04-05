"use client";

import Image from "next/image";
import Link from "next/link";
import { type Vehiculo, formatPrecio } from "@/lib/vehicles";
import { getAutoBadges } from "@/lib/badges";
import { Fuel, Settings } from "lucide-react";

interface VehicleCardProps {
  v: Vehiculo;
  maxBadges?: number;
  showCompare?: boolean;
  isCompared?: boolean;
  onToggleCompare?: (id: string) => void;
}

export default function VehicleCard({
  v,
  maxBadges = 3,
  showCompare,
  isCompared,
  onToggleCompare,
}: VehicleCardProps) {
  const badges = getAutoBadges(v);
  const isVendido = v.estado === "vendido";
  const isReservado = v.estado === "reservado";

  return (
    <div
      data-testid="car-card"
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface transition-all duration-300 hover:border-gold/15 hover:shadow-xl hover:shadow-gold/[0.08] ${
        isVendido ? "opacity-75" : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={v.imagenes[0]}
          alt={`${v.marca} ${v.modelo} ${v.ano}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Gradient overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Vendido: overlay oscuro + badge centrado */}
        {isVendido && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
            <span className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white">
              VENDIDO
            </span>
          </div>
        )}

        {/* Reservado: badge esquina superior derecha */}
        {isReservado && (
          <div className="absolute top-0 right-0 z-10">
            <span className="rounded-bl-lg bg-amber-500/90 px-3 py-1 text-xs font-bold uppercase text-white">
              RESERVADO
            </span>
          </div>
        )}

        {badges.length > 0 && !isVendido && (
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
            {badges.slice(0, maxBadges).map((badge) => (
              <span
                key={badge.label}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm ${badge.color}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
        {v.precioAnterior && !isVendido && (
          <div className="absolute top-2.5 right-2.5">
            <span className="rounded-full bg-red-500/90 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
              -{Math.round(((v.precioAnterior - v.precio) / v.precioAnterior) * 100)}%
            </span>
          </div>
        )}
      </div>

      <div className="p-4 md:p-5">
        <p className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{v.ano}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>{v.km.toLocaleString("es-CL")} km</span>
        </p>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-white">
          {v.marca} {v.modelo}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" /> {v.combustible}
          </span>
          <span className="flex items-center gap-1">
            <Settings className="h-3.5 w-3.5" /> {v.transmision}
          </span>
        </div>
        <div className="mt-3">
          {v.precioAnterior && !isVendido && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrecio(v.precioAnterior)}
            </p>
          )}
          <p className={`break-words font-display text-xl font-bold ${
            isVendido ? "text-muted-foreground line-through" : "text-gold"
          }`}>
            {formatPrecio(v.precio)}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/vehiculo/${v.slug}`}
            className="btn-press block flex-1 rounded-full border border-white/[0.06] py-2.5 text-center text-sm font-medium text-white transition-[background-color,border-color] duration-200 hover:border-white/15 hover:bg-white/5"
          >
            {isVendido ? "Ver vehículo" : "Ver detalles"}
          </Link>
          {showCompare && !isVendido && (
            <label
              data-testid="compare-checkbox"
              aria-label={`${isCompared ? "Quitar de" : "Agregar a"} comparador: ${v.marca} ${v.modelo} ${v.ano}`}
              className={`flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 ${
                isCompared
                  ? "border-gold bg-gold/20 text-gold"
                  : "border-white/[0.06] text-white/40 hover:bg-white/5"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={isCompared}
                onChange={() => onToggleCompare?.(v.id)}
              />
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l4.58-4.58c.94-.94.94-2.48 0-3.42L9 5Z" />
                <path d="M15 5h7v7l-6.29 6.29a2.42 2.42 0 0 1-3.42 0l-1.58-1.58" />
              </svg>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
