"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getVehiculoBySlug, getVehiculos, formatPrecio, type Vehiculo } from "@/data/vehiculos";
import VehicleCard from "@/components/VehicleCard";
import { MessageCircle, Share2, ChevronRight } from "lucide-react";

function Gallery({ imagenes, alt }: { imagenes: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={imagenes[active]}
          alt={alt}
          fill
          priority={active === 0}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
        />
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {imagenes.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
              i === active ? "border-gold" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`${alt} - foto ${i + 1}`}
              fill
              sizes="96px"
              loading="lazy"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function FinancingTable({ v }: { v: Vehiculo }) {
  const [pie, setPie] = useState<"pie20" | "pie30" | "pie40">("pie20");
  const data = v.financiamiento[pie];
  const pieLabels = { pie20: "20%", pie30: "30%", pie40: "40%" };

  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-white">Financiamiento</h3>
      <div className="mt-3 flex gap-2">
        {(["pie20", "pie30", "pie40"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPie(p)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              pie === p
                ? "bg-gold text-black"
                : "border border-white/10 text-white/70 hover:bg-white/5"
            }`}
          >
            Pie {pieLabels[p]}
          </button>
        ))}
      </div>
      <div className="mt-3 overflow-hidden rounded-lg border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-surface-alt">
              <th className="px-4 py-2.5 text-left font-medium text-white/60">Cuotas</th>
              <th className="px-4 py-2.5 text-right font-medium text-white/60">Valor cuota</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                [12, data.cuotas12],
                [24, data.cuotas24],
                [36, data.cuotas36],
                [48, data.cuotas48],
              ] as [number, number][]
            ).map(([n, val], i) => (
              <tr key={n} className={i % 2 === 0 ? "bg-surface" : "bg-surface-alt"}>
                <td className="px-4 py-2.5 text-white">{n} cuotas</td>
                <td className="px-4 py-2.5 text-right font-semibold text-gold">
                  {formatPrecio(val)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Valores referenciales con tasa de 1,2% mensual. Consulta condiciones exactas.
      </p>
    </div>
  );
}

function SpecTable({ v }: { v: Vehiculo }) {
  const specs = [
    ["Marca", v.marca],
    ["Modelo", v.modelo],
    ["Versión", v.version],
    ["Año", String(v.ano)],
    ["Kilometraje", `${v.km.toLocaleString("es-CL")} km`],
    ["Combustible", v.combustible],
    ["Transmisión", v.transmision],
    ["Motor", v.motor],
    ["Potencia", v.potencia],
    ["Tracción", v.traccion],
    ["Color exterior", v.colorExterior],
    ["Color interior", v.colorInterior],
    ["Puertas", String(v.puertas)],
    ["N° de dueños", String(v.numeroDuenos)],
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.06]">
      {specs.map(([label, value], i) => (
        <div
          key={label}
          className={`flex justify-between px-4 py-2.5 text-sm ${
            i % 2 === 0 ? "bg-surface" : "bg-surface-alt"
          }`}
        >
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium text-white">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function VehiculoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const v = getVehiculoBySlug(slug);

  if (!v) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background pt-20">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-white">Vehículo no encontrado</h1>
          <Link href="/vehiculos" className="mt-4 inline-block text-gold underline">
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  const similares = getVehiculos()
    .filter((x) => x.tipoVehiculo === v.tipoVehiculo && x.id !== v.id)
    .slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `Hola, me interesa el ${v.marca} ${v.modelo} ${v.ano} publicado en su sitio web. ¿Está disponible?`
  );

  function handleShare() {
    if (!v) return;
    if (navigator.share) {
      navigator.share({
        title: `${v.marca} ${v.modelo} ${v.ano} - GR Autos`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/vehiculos" className="hover:text-white">
            Vehículos
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">
            {v.marca} {v.modelo} {v.ano}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left column */}
          <div>
            <Gallery imagenes={v.imagenes} alt={`${v.marca} ${v.modelo} ${v.ano}`} />

            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-white">Descripción</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{v.descripcion}</p>
            </div>

            {v.caracteristicas.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-xl font-semibold text-white">Características</h2>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {v.caracteristicas.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-white">
                Especificaciones técnicas
              </h2>
              <div className="mt-3">
                <SpecTable v={v} />
              </div>
            </div>
          </div>

          {/* Right column (sticky) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-white/[0.06] bg-surface p-6">
              {/* Price */}
              {v.precioAnterior && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrecio(v.precioAnterior)}
                </p>
              )}
              <p className="font-display text-3xl font-bold text-gold">{formatPrecio(v.precio)}</p>
              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  v.estado === "disponible"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {v.estado === "disponible" ? "Disponible" : "Reservado"}
              </span>

              <h2 className="mt-2 font-display text-xl font-semibold text-white">
                {v.marca} {v.modelo} {v.ano}
              </h2>
              <p className="text-sm text-muted-foreground">{v.version}</p>

              <div className="mt-6">
                <FinancingTable v={v} />
              </div>

              {/* Contact form */}
              <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  className="w-full rounded-lg border border-white/[0.06] bg-background px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  className="w-full rounded-lg border border-white/[0.06] bg-background px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-white/[0.06] bg-background px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
                <input type="hidden" name="vehiculo" value={`${v.marca} ${v.modelo} ${v.ano}`} />
                <p className="text-xs text-muted-foreground">
                  Estoy interesado/a en el {v.marca} {v.modelo} {v.ano}
                </p>
                <button
                  type="submit"
                  className="w-full rounded-full bg-gold py-3 font-medium text-black transition-colors hover:bg-gold-hover"
                >
                  Enviar consulta
                </button>
              </form>

              {/* Action buttons */}
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={`https://wa.me/56912345678?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-medium text-white"
                >
                  <MessageCircle className="h-5 w-5" /> Consultar por WhatsApp
                </a>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-sm text-white/70 transition-colors hover:bg-white/5"
                >
                  <Share2 className="h-4 w-4" /> Compartir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar vehicles */}
        {similares.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-white">Vehículos similares</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {similares.map((s) => (
                <VehicleCard key={s.id} v={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
