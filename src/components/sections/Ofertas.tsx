"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type Vehiculo, formatPrecio } from "@/lib/vehicles";

interface OfertasProps {
  vehiculos?: Vehiculo[];
}

export default function Ofertas({ vehiculos = [] }: OfertasProps) {
  const ofertas = useMemo(() => vehiculos.filter((v) => v.precioAnterior), [vehiculos]);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(1200);

  useEffect(() => {
    const update = () => setViewportWidth(Math.min(window.innerWidth, 1280));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  if (ofertas.length === 0) return null;

  // En mobile (< 768px) las cards son 80vw, en desktop son 340px fijo
  const cardW = viewportWidth < 768 ? Math.min(340, viewportWidth * 0.8) : 340;
  const cardWidth = cardW + 16; // card + gap
  const maxDrag = -(ofertas.length * cardWidth - viewportWidth);

  return (
    <section className="overflow-hidden bg-surface-alt py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          className="font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Ofertas especiales
        </motion.h2>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Vehículos con precios rebajados por tiempo limitado.
        </p>
      </div>

      <motion.div
        ref={containerRef}
        className="mt-8 flex cursor-grab gap-4 px-4 active:cursor-grabbing md:px-6 lg:px-8 snap-x snap-mandatory"
        drag="x"
        style={{ x: springX }}
        dragConstraints={{ left: maxDrag, right: 0 }}
        dragElastic={0.1}
      >
        {ofertas.map((v) => {
          const descuento = v.precioAnterior
            ? Math.round(((v.precioAnterior - v.precio) / v.precioAnterior) * 100)
            : 0;

          return (
            <div
              key={v.id}
              className="w-[min(340px,80vw)] shrink-0 snap-start overflow-hidden rounded-lg border border-white/[0.06] bg-surface"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={v.imagenes[0]}
                  alt={`${v.marca} ${v.modelo} ${v.ano}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 340px"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                    OFERTA -{descuento}%
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-white">
                  {v.marca} {v.modelo} {v.ano}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {v.km.toLocaleString("es-CL")} km · {v.combustible} · {v.transmision}
                </p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrecio(v.precioAnterior!)}
                  </span>
                  <span className="font-display text-2xl font-bold text-gold">
                    {formatPrecio(v.precio)}
                  </span>
                </div>
                <Link
                  href={`/vehiculo/${v.slug}`}
                  className="mt-4 block w-full rounded-full bg-gold py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-gold-hover"
                >
                  Ver oferta
                </Link>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
