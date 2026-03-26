"use client";

import Image from "next/image";
import Link from "next/link";
import { type Vehiculo, formatPrecio } from "@/data/vehiculos";
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

  return (
    <div
      data-testid="car-card"
      className="group relative overflow-hidden rounded-lg border border-white/[0.06] bg-surface transition-shadow duration-300 hover:shadow-lg hover:shadow-gold/5"
    >
      {v.estado === "reservado" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
          <span className="rounded-full bg-yellow-500/90 px-4 py-1.5 text-sm font-bold text-black">
            RESERVADO
          </span>
        </div>
      )}

      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={v.imagenes[0]}
          alt={`${v.marca} ${v.modelo} ${v.ano}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {badges.slice(0, maxBadges).map((badge) => (
              <span
                key={badge.label}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.color}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
        {v.precioAnterior && (
          <div className="absolute top-2 right-2">
            <span className="rounded-full bg-red-500/90 px-2.5 py-0.5 text-xs font-bold text-white">
              -{Math.round(((v.precioAnterior - v.precio) / v.precioAnterior) * 100)}%
            </span>
          </div>
        )}
      </div>

      <div className="p-4 md:p-5">
        <p className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{v.ano}</span>
          <span>·</span>
          <span>{v.km.toLocaleString("es-CL")} km</span>
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold text-white">
          {v.marca} {v.modelo}
        </h3>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" /> {v.combustible}
          </span>
          <span className="flex items-center gap-1">
            <Settings className="h-3.5 w-3.5" /> {v.transmision}
          </span>
        </div>
        <div className="mt-3">
          {v.precioAnterior && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrecio(v.precioAnterior)}
            </p>
          )}
          <p className="break-words font-display text-xl font-bold text-gold">{formatPrecio(v.precio)}</p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/vehiculo/${v.slug}`}
            className="block flex-1 rounded-full border border-white/[0.06] py-2.5 text-center text-sm text-white transition-colors hover:bg-white/5"
          >
            Ver detalles
          </Link>
          {showCompare && (
            <label
              data-testid="compare-checkbox"
              aria-label={`${isCompared ? "Quitar de" : "Agregar a"} comparador: ${v.marca} ${v.modelo} ${v.ano}`}
              className={`flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors ${
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
