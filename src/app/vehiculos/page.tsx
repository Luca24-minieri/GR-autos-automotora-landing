"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import {
  filtrarVehiculos,
  ordenarVehiculos,
  getMarcasUnicas,
  getVehiculos,
  type FiltrosVehiculo,
  type Vehiculo,
} from "@/data/vehiculos";
import VehicleCard from "@/components/VehicleCard";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight, GitCompareArrows } from "lucide-react";

const CompareModal = dynamic(() => import("@/components/CompareModal"), { ssr: false });

const tiposVehiculo = ["Sedán", "SUV", "Camioneta", "Hatchback", "Coupé", "Van"];
const combustibles = ["Bencina", "Diesel", "Híbrido", "Eléctrico"];
const transmisiones = ["Automática", "Manual"];
const PER_PAGE = 9;

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-white/20 bg-surface accent-gold"
      />
      {label}
    </label>
  );
}

export default function VehiculosPage() {
  const marcas = useMemo(() => getMarcasUnicas(), []);
  const [filtros, setFiltros] = useState<FiltrosVehiculo>({});
  const [orden, setOrden] = useState("recientes");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }, []);

  const resultados = useMemo(() => {
    const filtered = filtrarVehiculos(filtros);
    return ordenarVehiculos(filtered, orden);
  }, [filtros, orden]);

  const allVehiculos = useMemo(() => getVehiculos(), []);
  const compareVehiculos = useMemo(
    () => compareIds.map((id) => allVehiculos.find((v) => v.id === id)).filter(Boolean) as Vehiculo[],
    [compareIds, allVehiculos]
  );

  const totalPages = useMemo(() => Math.ceil(resultados.length / PER_PAGE), [resultados.length]);
  const paginated = useMemo(
    () => resultados.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [resultados, page]
  );

  function toggleFilter(
    key: "marcas" | "tipoVehiculo" | "combustible" | "transmision",
    value: string
  ) {
    setFiltros((prev) => {
      const arr = prev[key] || [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: next.length ? next : undefined };
    });
    setPage(1);
  }

  function clearFilters() {
    setFiltros({});
    setPage(1);
  }

  const hasFilters = Object.values(filtros).some(
    (v) => v !== undefined && (Array.isArray(v) ? v.length > 0 : true)
  );

  const filtersContent = (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">Marca</p>
        <div className="space-y-1.5">
          {marcas.map((m) => (
            <Checkbox
              key={m}
              label={m}
              checked={filtros.marcas?.includes(m) || false}
              onChange={() => toggleFilter("marcas", m)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">Tipo</p>
        <div className="space-y-1.5">
          {tiposVehiculo.map((t) => (
            <Checkbox
              key={t}
              label={t}
              checked={filtros.tipoVehiculo?.includes(t) || false}
              onChange={() => toggleFilter("tipoVehiculo", t)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">
          Combustible
        </p>
        <div className="space-y-1.5">
          {combustibles.map((c) => (
            <Checkbox
              key={c}
              label={c}
              checked={filtros.combustible?.includes(c) || false}
              onChange={() => toggleFilter("combustible", c)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">
          Transmisión
        </p>
        <div className="space-y-1.5">
          {transmisiones.map((t) => (
            <Checkbox
              key={t}
              label={t}
              checked={filtros.transmision?.includes(t) || false}
              onChange={() => toggleFilter("transmision", t)}
            />
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full rounded-full border border-white/10 py-2 text-sm text-white/70 transition-colors hover:bg-white/5"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-white md:text-4xl lg:text-5xl">
          Catálogo de vehículos
        </h1>

        {/* Toolbar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Mostrando {paginated.length} de {resultados.length} vehículos
          </p>
          <div className="flex items-center gap-3">
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              aria-label="Ordenar vehículos"
              className="rounded-lg border border-white/[0.06] bg-surface px-3 py-2 text-sm text-white"
            >
              <option value="recientes">Últimos agregados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="ano-desc">Año: más nuevo</option>
              <option value="ano-asc">Año: más antiguo</option>
              <option value="km-asc">Kilometraje: menor</option>
            </select>
            <button
              onClick={() => setMobileFilters(true)}
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-surface px-3 py-2 text-sm text-white lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filtrar
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-[260px] shrink-0 lg:block">{filtersContent}</aside>

          {/* Grid */}
          <div className="flex-1">
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {paginated.map((v) => (
                  <VehicleCard
                    key={v.id}
                    v={v}
                    showCompare
                    isCompared={compareIds.includes(v.id)}
                    onToggleCompare={toggleCompare}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-20 text-center">
                <p className="text-lg text-muted-foreground">
                  No encontramos vehículos con esos filtros.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prueba ampliando tu búsqueda o{" "}
                  <a
                    href="https://wa.me/56912345678"
                    className="text-gold underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    contáctanos por WhatsApp
                  </a>
                  .
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Página anterior"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] text-white disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    aria-label={`Ir a página ${p}`}
                    aria-current={p === page ? "page" : undefined}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
                      p === page
                        ? "bg-gold text-black"
                        : "border border-white/[0.06] text-white hover:bg-white/5"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Página siguiente"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] text-white disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilters && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#0A0A0A] px-6 pt-6 overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-semibold text-white">Filtros</span>
              <button onClick={() => setMobileFilters(false)} aria-label="Cerrar filtros">
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="mt-6 pb-24">{filtersContent}</div>
            <div className="fixed bottom-0 left-0 w-full bg-[#0A0A0A] p-4 border-t border-white/[0.06]">
              <button
                onClick={() => setMobileFilters(false)}
                className="w-full rounded-full bg-gold py-3 font-semibold text-black"
              >
                Ver {resultados.length} resultados
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare floating bar */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-2 rounded-full border border-white/[0.06] bg-surface px-4 py-2 shadow-xl sm:w-auto sm:gap-4 sm:px-6 sm:py-3"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <span className="min-w-0 flex-1 truncate text-xs text-white sm:text-sm">
              {compareIds.length} {compareIds.length > 1 ? "seleccionados" : "seleccionado"}
            </span>
            <button
              disabled={compareIds.length < 2}
              onClick={() => setShowCompare(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-gold px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-gold-hover disabled:opacity-40 sm:gap-2 sm:px-5 sm:text-sm"
            >
              <GitCompareArrows className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Comparar</span>
            </button>
            <button
              onClick={() => setCompareIds([])}
              className="shrink-0 text-xs text-white/50 hover:text-white"
            >
              Limpiar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare modal */}
      {showCompare && compareVehiculos.length >= 2 && (
        <CompareModal vehiculos={compareVehiculos} onClose={() => setShowCompare(false)} />
      )}
    </main>
  );
}
