/** Tipo que mapea directamente a la tabla `vehicles` en Supabase */
export interface Vehicle {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  precio_original: number | null;
  kilometraje: number;
  combustible: 'Bencina' | 'Diesel' | 'Híbrido' | 'Eléctrico';
  transmision: 'Manual' | 'Automática';
  traccion: '4x2' | '4x4' | 'AWD';
  color: string;
  puertas: number;
  motor: string | null;
  estado: 'disponible' | 'reservado' | 'vendido';
  condicion: 'Nuevo' | 'Usado';
  destacado: boolean;
  descripcion: string | null;
  imagenes: string[];
  etiquetas: string[];
  clicks: number;
  created_at: string;
  updated_at: string;
}
