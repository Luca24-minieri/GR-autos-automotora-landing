import { supabase } from '@/lib/supabase/client';
import type { Vehicle } from '@/types/vehicle';

// ── Tipo compatible con los componentes existentes ─────────────────
export interface Vehiculo {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  version: string;
  ano: number;
  km: number;
  precio: number;
  precioAnterior?: number;
  combustible: 'Bencina' | 'Diesel' | 'Híbrido' | 'Eléctrico';
  transmision: 'Automática' | 'Manual';
  tipoVehiculo: string;
  motor: string;
  potencia: string;
  colorExterior: string;
  colorInterior: string;
  numeroDuenos: number;
  traccion: string;
  puertas: number;
  descripcion: string;
  caracteristicas: string[];
  badges: string[];
  estado: 'disponible' | 'reservado' | 'vendido';
  destacado: boolean;
  imagenes: string[];
  fechaIngreso: string;
  financiamiento: {
    pie40: { cuotas12: number; cuotas24: number; cuotas36: number; cuotas48: number };
    pie30: { cuotas12: number; cuotas24: number; cuotas36: number; cuotas48: number };
    pie20: { cuotas12: number; cuotas24: number; cuotas36: number; cuotas48: number };
  };
}

export interface FiltrosVehiculo {
  marcas?: string[];
  tipoVehiculo?: string[];
  precioMin?: number;
  precioMax?: number;
  anoMin?: number;
  anoMax?: number;
  kmMax?: number;
  combustible?: string[];
  transmision?: string[];
}

// ── Utilidades ─────────────────────────────────────────────────────

function calcCuota(precio: number, piePct: number, n: number): number {
  const monto = precio * (1 - piePct / 100);
  const tasa = 0.012;
  return Math.round((monto * tasa) / (1 - Math.pow(1 + tasa, -n)));
}

function calcFinanciamiento(precio: number) {
  return {
    pie40: {
      cuotas12: calcCuota(precio, 40, 12),
      cuotas24: calcCuota(precio, 40, 24),
      cuotas36: calcCuota(precio, 40, 36),
      cuotas48: calcCuota(precio, 40, 48),
    },
    pie30: {
      cuotas12: calcCuota(precio, 30, 12),
      cuotas24: calcCuota(precio, 30, 24),
      cuotas36: calcCuota(precio, 30, 36),
      cuotas48: calcCuota(precio, 30, 48),
    },
    pie20: {
      cuotas12: calcCuota(precio, 20, 12),
      cuotas24: calcCuota(precio, 20, 24),
      cuotas36: calcCuota(precio, 20, 36),
      cuotas48: calcCuota(precio, 20, 48),
    },
  };
}

export function formatPrecio(precio: number): string {
  return '$' + precio.toLocaleString('es-CL');
}

/** Mapea un registro de Supabase al tipo Vehiculo que esperan los componentes */
function mapToVehiculo(v: Vehicle): Vehiculo {
  return {
    id: v.id,
    slug: v.slug,
    marca: v.marca,
    modelo: v.modelo,
    version: '',
    ano: v.año,
    km: v.kilometraje,
    precio: v.precio,
    precioAnterior: v.precio_original ?? undefined,
    combustible: v.combustible,
    transmision: v.transmision,
    tipoVehiculo: '',
    motor: v.motor ?? '',
    potencia: '',
    colorExterior: v.color,
    colorInterior: '',
    numeroDuenos: 0,
    traccion: v.traccion,
    puertas: v.puertas,
    descripcion: v.descripcion ?? '',
    caracteristicas: [],
    badges: v.etiquetas ?? [],
    estado: v.estado,
    destacado: v.destacado,
    imagenes: v.imagenes ?? [],
    fechaIngreso: v.created_at,
    financiamiento: calcFinanciamiento(v.precio),
  };
}

// ── Funciones de consulta ──────────────────────────────────────────

/** Vehículos destacados para la home page */
export async function getVehiculosDestacados(): Promise<Vehiculo[]> {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('destacado', true)
      .eq('estado', 'disponible')
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) throw error;
    return (data ?? []).map(mapToVehiculo);
  } catch (e) {
    console.error('getVehiculosDestacados:', e);
    return [];
  }
}

/** Todos los vehículos (disponibles, reservados y vendidos) ordenados por estado */
export async function getVehiculos(): Promise<Vehiculo[]> {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    const mapped = (data ?? []).map(mapToVehiculo);
    // Ordenar: disponibles primero, reservados segundo, vendidos al final
    const estadoOrden: Record<string, number> = { disponible: 0, reservado: 1, vendido: 2 };
    return mapped.sort((a, b) => (estadoOrden[a.estado] ?? 3) - (estadoOrden[b.estado] ?? 3));
  } catch (e) {
    console.error('getVehiculos:', e);
    return [];
  }
}

/** Un vehículo por slug (incluye vendidos para link directo) */
export async function getVehiculoBySlug(slug: string): Promise<Vehiculo | null> {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data ? mapToVehiculo(data) : null;
  } catch (e) {
    console.error('getVehiculoBySlug:', e);
    return null;
  }
}

/** Incrementar clicks (fire-and-forget) */
export function incrementClicks(vehicleId: string): void {
  supabase.rpc('increment_clicks', { vehicle_id: vehicleId }).then(({ error }) => {
    if (error) {
      console.warn('incrementClicks RPC failed:', error.message);
    }
  });
}

/** Marcas disponibles para filtros */
export async function getMarcasDisponibles(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('marca')
      .neq('estado', 'vendido')
      .order('marca');

    if (error) throw error;
    return [...new Set((data ?? []).map((d: { marca: string }) => d.marca))];
  } catch (e) {
    console.error('getMarcasDisponibles:', e);
    return [];
  }
}

/** Modelos por marca para filtros */
export async function getModelosPorMarca(marca: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('modelo')
      .eq('marca', marca)
      .neq('estado', 'vendido')
      .order('modelo');

    if (error) throw error;
    return [...new Set((data ?? []).map((d: { modelo: string }) => d.modelo))];
  } catch (e) {
    console.error('getModelosPorMarca:', e);
    return [];
  }
}

// ── Funciones de filtrado/ordenamiento client-side ──────────────────

export function filtrarVehiculos(vehiculos: Vehiculo[], filtros: FiltrosVehiculo): Vehiculo[] {
  return vehiculos.filter((v) => {
    if (filtros.marcas?.length && !filtros.marcas.includes(v.marca)) return false;
    if (filtros.precioMin && v.precio < filtros.precioMin) return false;
    if (filtros.precioMax && v.precio > filtros.precioMax) return false;
    if (filtros.anoMin && v.ano < filtros.anoMin) return false;
    if (filtros.anoMax && v.ano > filtros.anoMax) return false;
    if (filtros.kmMax && v.km > filtros.kmMax) return false;
    if (filtros.combustible?.length && !filtros.combustible.includes(v.combustible)) return false;
    if (filtros.transmision?.length && !filtros.transmision.includes(v.transmision)) return false;
    return true;
  });
}

export function ordenarVehiculos(vehiculosArr: Vehiculo[], criterio: string): Vehiculo[] {
  const sorted = [...vehiculosArr];
  switch (criterio) {
    case 'precio-asc':
      return sorted.sort((a, b) => a.precio - b.precio);
    case 'precio-desc':
      return sorted.sort((a, b) => b.precio - a.precio);
    case 'ano-desc':
      return sorted.sort((a, b) => b.ano - a.ano);
    case 'ano-asc':
      return sorted.sort((a, b) => a.ano - b.ano);
    case 'km-asc':
      return sorted.sort((a, b) => a.km - b.km);
    case 'recientes':
      return sorted.sort(
        (a, b) => new Date(b.fechaIngreso).getTime() - new Date(a.fechaIngreso).getTime()
      );
    default:
      return sorted;
  }
}
