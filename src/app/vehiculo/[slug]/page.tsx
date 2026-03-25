"use client";

import { useState, use, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getVehiculoBySlug, getVehiculos, formatPrecio, type Vehiculo } from "@/data/vehiculos";
import { getAutoBadges } from "@/lib/badges";
import VehicleCard from "@/components/VehicleCard";
import { MessageCircle, Share2, ChevronRight, Clock, FileDown, Check } from "lucide-react";

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
      <div className="mt-3 overflow-x-auto rounded-lg border border-white/[0.06]">
        <table className="w-full min-w-[280px] text-sm">
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
    <div id="spec-table" className="overflow-hidden rounded-lg border border-white/[0.06]">
      {specs.map(([label, value], i) => (
        <div
          key={label}
          className={`flex items-start justify-between gap-4 px-4 py-2.5 text-sm ${
            i % 2 === 0 ? "bg-surface" : "bg-surface-alt"
          }`}
        >
          <span className="shrink-0 text-muted-foreground">{label}</span>
          <span className="text-right font-medium text-white">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function VehiculoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const v = getVehiculoBySlug(slug);
  const [contactPref, setContactPref] = useState("whatsapp");
  const [copied, setCopied] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const handleShare = useCallback(() => {
    if (!v) return;
    if (navigator.share) {
      navigator.share({
        title: `${v.marca} ${v.modelo} ${v.ano} - GR Autos`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [v]);

  const handlePdf = useCallback(async () => {
    if (!v) return;
    setGeneratingPdf(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF("p", "mm", "a4");
      const w = pdf.internal.pageSize.getWidth();

      // Header
      pdf.setFontSize(24);
      pdf.setTextColor(196, 162, 101);
      pdf.text("GR Autos", 15, 20);
      pdf.setFontSize(10);
      pdf.setTextColor(136, 136, 136);
      pdf.text("San Francisco de Asís 150, Of. 329, Vitacura", 15, 27);

      // Vehicle name
      pdf.setFontSize(18);
      pdf.setTextColor(250, 250, 250);
      pdf.setFillColor(10, 10, 10);
      pdf.rect(0, 0, w, 297, "F");
      pdf.setTextColor(196, 162, 101);
      pdf.text("GR Autos", 15, 20);
      pdf.setFontSize(9);
      pdf.setTextColor(136, 136, 136);
      pdf.text("San Francisco de Asís 150, Of. 329, Vitacura | +56 9 1234 5678", 15, 26);

      pdf.setDrawColor(196, 162, 101);
      pdf.line(15, 30, w - 15, 30);

      pdf.setFontSize(16);
      pdf.setTextColor(250, 250, 250);
      pdf.text(`${v.marca} ${v.modelo} ${v.version} ${v.ano}`, 15, 40);

      pdf.setFontSize(20);
      pdf.setTextColor(196, 162, 101);
      pdf.text(formatPrecio(v.precio), 15, 50);

      // Specs
      const specs = [
        ["Año", String(v.ano)],
        ["Kilometraje", `${v.km.toLocaleString("es-CL")} km`],
        ["Combustible", v.combustible],
        ["Transmisión", v.transmision],
        ["Motor", v.motor],
        ["Potencia", v.potencia],
        ["Tracción", v.traccion],
        ["Color", v.colorExterior],
        ["Puertas", String(v.puertas)],
        ["N° dueños", String(v.numeroDuenos)],
      ];

      let y = 60;
      pdf.setFontSize(12);
      pdf.setTextColor(250, 250, 250);
      pdf.text("Especificaciones", 15, y);
      y += 7;

      specs.forEach(([label, value], i) => {
        if (i % 2 === 0) {
          pdf.setFillColor(20, 20, 20);
        } else {
          pdf.setFillColor(26, 26, 26);
        }
        pdf.rect(15, y - 4, w - 30, 7, "F");
        pdf.setFontSize(9);
        pdf.setTextColor(136, 136, 136);
        pdf.text(label, 18, y);
        pdf.setTextColor(250, 250, 250);
        pdf.text(value, w - 18, y, { align: "right" });
        y += 7;
      });

      // Financing table (pie 30%)
      y += 5;
      pdf.setFontSize(12);
      pdf.setTextColor(250, 250, 250);
      pdf.text("Financiamiento (Pie 30%)", 15, y);
      y += 7;

      const fin = v.financiamiento.pie30;
      const cuotas = [
        ["12 cuotas", formatPrecio(fin.cuotas12)],
        ["24 cuotas", formatPrecio(fin.cuotas24)],
        ["36 cuotas", formatPrecio(fin.cuotas36)],
        ["48 cuotas", formatPrecio(fin.cuotas48)],
      ];

      cuotas.forEach(([label, value], i) => {
        pdf.setFillColor(i % 2 === 0 ? 20 : 26, i % 2 === 0 ? 20 : 26, i % 2 === 0 ? 20 : 26);
        pdf.rect(15, y - 4, w - 30, 7, "F");
        pdf.setFontSize(9);
        pdf.setTextColor(136, 136, 136);
        pdf.text(label, 18, y);
        pdf.setTextColor(196, 162, 101);
        pdf.text(value, w - 18, y, { align: "right" });
        y += 7;
      });

      // Footer
      y += 10;
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text("Generado desde gr-autos-landing.vercel.app", 15, y);
      pdf.text("Valores referenciales. Consulta condiciones exactas.", 15, y + 4);

      pdf.save(`${v.slug}-ficha-tecnica.pdf`);
    } catch {
      // Silently fail
    } finally {
      setGeneratingPdf(false);
    }
  }, [v]);

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

  const badges = getAutoBadges(v);

  const consultaMsg = `Hola, estoy interesado/a en el ${v.marca} ${v.modelo} ${v.ano} - ${v.version} publicado a ${formatPrecio(v.precio)}. ¿Está disponible?`;
  const whatsappMsg = encodeURIComponent(consultaMsg);
  const shareWaMsg = encodeURIComponent(
    `Mira este ${v.marca} ${v.modelo} ${v.ano} en GR Autos: ${typeof window !== "undefined" ? window.location.href : ""}`
  );

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${v.marca} ${v.modelo}`,
    modelDate: v.ano.toString(),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: v.km, unitCode: "KMT" },
    offers: {
      "@type": "Offer",
      price: v.precio,
      priceCurrency: "CLP",
      availability:
        v.estado === "disponible" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex min-w-0 flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="shrink-0 hover:text-white">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <Link href="/vehiculos" className="shrink-0 hover:text-white">
            Vehículos
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="min-w-0 truncate text-white">
            {v.marca} {v.modelo} {v.ano}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left column */}
          <div>
            <Gallery imagenes={v.imagenes} alt={`${v.marca} ${v.modelo} ${v.ano}`} />

            {/* Badges */}
            {badges.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b.label}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${b.color}`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            )}

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
                <label className="sr-only" htmlFor="ficha-nombre">Nombre</label>
                <input
                  id="ficha-nombre"
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  className="w-full rounded-lg border border-white/[0.06] bg-background px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
                <label className="sr-only" htmlFor="ficha-telefono">Teléfono</label>
                <input
                  id="ficha-telefono"
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  className="w-full rounded-lg border border-white/[0.06] bg-background px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
                <label className="sr-only" htmlFor="ficha-email">Email</label>
                <input
                  id="ficha-email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-white/[0.06] bg-background px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
                <label className="sr-only" htmlFor="ficha-mensaje">Mensaje</label>
                <textarea
                  id="ficha-mensaje"
                  name="mensaje"
                  rows={2}
                  defaultValue={consultaMsg}
                  className="w-full rounded-lg border border-white/[0.06] bg-background px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />

                {/* Contact preference */}
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">
                    ¿Cómo prefieres que te contactemos?
                  </p>
                  <div className="flex gap-3">
                    {[
                      { value: "whatsapp", label: "WhatsApp" },
                      { value: "llamada", label: "Llamada" },
                      { value: "email", label: "Email" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className="flex cursor-pointer items-center gap-1.5 text-xs text-white/70"
                      >
                        <input
                          type="radio"
                          name="contactPref"
                          value={opt.value}
                          checked={contactPref === opt.value}
                          onChange={(e) => setContactPref(e.target.value)}
                          className="accent-gold"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-gold py-3 font-medium text-black transition-colors hover:bg-gold-hover"
                >
                  Enviar consulta
                </button>
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  Te contactamos en menos de 30 minutos
                </div>
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
                <a
                  data-testid="share-whatsapp"
                  href={`https://wa.me/?text=${shareWaMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-[#25D366]/30 py-3 text-sm text-[#25D366] transition-colors hover:bg-[#25D366]/10"
                >
                  <MessageCircle className="h-4 w-4" /> Compartir por WhatsApp
                </a>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-sm text-white/70 transition-colors hover:bg-white/5"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                  {copied ? "Link copiado" : "Compartir"}
                </button>
                <button
                  onClick={handlePdf}
                  disabled={generatingPdf}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-sm text-white/70 transition-colors hover:bg-white/5 disabled:opacity-50"
                >
                  <FileDown className="h-4 w-4" />
                  {generatingPdf ? "Generando..." : "Descargar ficha técnica"}
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
