"use client";

import Image from "next/image";
import Link from "next/link";
import { type Vehiculo, formatPrecio } from "@/data/vehiculos";
import { Fuel, Settings } from "lucide-react";

export default function VehicleCard({ v }: { v: Vehiculo }) {
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
        {v.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {v.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-gold/90 px-2.5 py-0.5 text-xs font-medium text-black"
              >
                {badge}
              </span>
            ))}
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
          <p className="font-display text-xl font-bold text-gold">{formatPrecio(v.precio)}</p>
        </div>
        <Link
          href={`/vehiculo/${v.slug}`}
          className="mt-4 block w-full rounded-full border border-white/[0.06] py-2.5 text-center text-sm text-white transition-colors hover:bg-white/5"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
