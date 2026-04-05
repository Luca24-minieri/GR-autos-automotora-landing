"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import {
  filtrarVehiculos,
  ordenarVehiculos,
  type FiltrosVehiculo,
  type Vehiculo,
} from "@/lib/vehicles";
import VehicleCard from "@/components/VehicleCard";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  GitCompareArrows,
  Search,
} from "lucide-react";

const CompareModal = dynamic(() => import("@/components/CompareModal"), { ssr: false });

const combustibles = ["Bencina", "Diesel", "Híbrido", "Eléctrico"];
const transmisiones = ["Automática", "Manual"];
const PER_PAGE = 9;

// ── Dropdown component ──────────────────────────────────────────────
function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="w-full appearance-none rounded-lg border border-white/[0.08] bg-[#1A1A1A] px-3 py-2.5 pr-8 text-sm text-white transition-colors focus:border-gold focus:outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
interface VehiculosCatalogProps {
  vehiculos: Vehiculo[];
  marcas: string[];
}

export default function VehiculosCatalog({ vehiculos, marcas }: VehiculosCatalogProps) {
  // ── Derive modelos from loaded data ──
  const getModelosPorMarca = useCallback(
    (marca: string) => {
      return [...new Set(vehiculos.filter((v) => v.marca === marca).map((v) => v.modelo))].sort();
    },
    [vehiculos]
  );

  // ── Quick‑filter bar state (single‑value dropdowns) ──
  const [qMarca, setQMarca] = useState("");
  const [qModelo, setQModelo] = useState("");
  const [qTransmision, setQTransmision] = useState("");
  const [qCombustible, setQCombustible] = useState("");

  // ── Sorting / pagination / compare ──
  const [orden, setOrden] = useState("recientes");
  const [page, setPage] = useState(1);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  // ── Derived: modelos for selected marca ──
  const modelosDisponibles = useMemo(
    () => (qMarca ? getModelosPorMarca(qMarca) : []),
    [qMarca, getModelosPorMarca]
  );

  // ── Build filtros object from quick state ──
  const filtros = useMemo<FiltrosVehiculo>(() => {
    const f: FiltrosVehiculo = {};
    if (qMarca) f.marcas = [qMarca];
    if (qTransmision) f.transmision = [qTransmision];
    if (qCombustible) f.combustible = [qCombustible];
    return f;
  }, [qMarca, qTransmision, qCombustible]);

  // ── Results ──
  const resultados = useMemo(() => {
    let filtered = filtrarVehiculos(vehiculos, filtros);
    // Apply modelo filter manually
    if (qModelo) {
      filtered = filtered.filter((v) => v.modelo === qModelo);
    }
    return ordenarVehiculos(filtered, orden);
  }, [vehiculos, filtros, qModelo, orden]);

  const compareVehiculos = useMemo(
    () =>
      compareIds
        .map((id) => vehiculos.find((v) => v.id === id))
        .filter(Boolean) as Vehiculo[],
    [compareIds, vehiculos]
  );

  const totalPages = useMemo(
    () => Math.ceil(resultados.length / PER_PAGE),
    [resultados.length]
  );
  const paginated = useMemo(
    () => resultados.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [resultados, page]
  );

  // ── Handlers ──
  const handleMarcaChange = useCallback(
    (val: string) => {
      setQMarca(val);
      setQModelo("");
      setPage(1);
    },
    []
  );
  const handleModeloChange = useCallback((val: string) => {
    setQModelo(val);
    setPage(1);
  }, []);
  const handleTransmisionChange = useCallback((val: string) => {
    setQTransmision(val);
    setPage(1);
  }, []);
  const handleCombustibleChange = useCallback((val: string) => {
    setQCombustible(val);
    setPage(1);
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev
    );
  }, []);

  const hasAnyFilter = qMarca || qModelo || qTransmision || qCombustible;

  const clearAll = useCallback(() => {
    setQMarca("");
    setQModelo("");
    setQTransmision("");
    setQCombustible("");
    setPage(1);
  }, []);

  // ════════════════════════════════════════════════════════════════
  return (
    <main className="min-h-screen bg-background">
      {/* Hero banner */}
      <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-gold/[0.04] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.p
            className="text-sm font-medium uppercase tracking-[0.2em] text-gold/70"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            Catálogo
          </motion.p>
          <motion.h1
            className="mt-3 font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            Nuestro Stock
          </motion.h1>
          <motion.p
            className="mt-3 text-base text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14, ease: [0.23, 1, 0.32, 1] }}
          >
            Encuentra el vehículo perfecto para ti.
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:px-8">

        {/* ── Quick filter bar ────────────────────────────────── */}
        <motion.div
          className="mt-8 rounded-xl border border-white/[0.08] bg-surface p-4 md:p-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <FilterSelect
              label="Marca"
              value={qMarca}
              onChange={handleMarcaChange}
              options={marcas}
              placeholder="Todas las marcas"
            />
            <FilterSelect
              label="Modelo"
              value={qModelo}
              onChange={handleModeloChange}
              options={modelosDisponibles}
              placeholder={qMarca ? "Todos los modelos" : "Selecciona marca"}
            />
            <FilterSelect
              label="Transmisión"
              value={qTransmision}
              onChange={handleTransmisionChange}
              options={transmisiones}
              placeholder="Todas"
            />
            <FilterSelect
              label="Combustible"
              value={qCombustible}
              onChange={handleCombustibleChange}
              options={combustibles}
              placeholder="Todos"
            />
            <div className="flex flex-col justify-end">
              <button
                onClick={() => setPage(1)}
                className="btn-press flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-gold-hover hover:shadow-lg hover:shadow-gold/20 lg:w-auto"
              >
                <Search className="h-4 w-4" />
                BUSCAR
              </button>
            </div>
          </div>

          {/* ── Clear filters ─────────────────────── */}
          {hasAnyFilter && (
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={clearAll}
                className="min-h-[44px] px-1 text-xs text-gold/70 transition-colors hover:text-gold"
              >
                Limpiar todo
              </button>
            </div>
          )}
        </motion.div>

        {/* ── Results toolbar ────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {resultados.length === 0
              ? "Sin resultados"
              : `Mostrando ${paginated.length} de ${resultados.length} vehículos`}
          </p>
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
        </div>

        {/* ── Grid ───────────────────────────────────────────── */}
        <div className="mt-6">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {paginated.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                >
                  <VehicleCard
                    v={v}
                    showCompare
                    isCompared={compareIds.includes(v.id)}
                    onToggleCompare={toggleCompare}
                  />
                </motion.div>
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
                      ? "bg-gold text-white"
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

      {/* ── Compare floating bar ───────────────────────────── */}
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
              className="btn-press flex shrink-0 items-center gap-1.5 rounded-full bg-gold px-3 py-2 text-xs font-semibold text-white transition-[background-color] duration-200 hover:bg-gold-hover disabled:opacity-40 sm:gap-2 sm:px-5 sm:text-sm"
            >
              <GitCompareArrows className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Comparar</span>
            </button>
            <button
              onClick={() => setCompareIds([])}
              aria-label="Limpiar selección del comparador"
              className="flex h-11 w-11 shrink-0 items-center justify-center text-xs text-white/50 hover:text-white"
            >
              Limpiar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare modal */}
      {showCompare && compareVehiculos.length >= 2 && (
        <CompareModal
          vehiculos={compareVehiculos}
          onClose={() => setShowCompare(false)}
        />
      )}
    </main>
  );
}
