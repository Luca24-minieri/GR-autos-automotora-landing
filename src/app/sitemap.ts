import { getVehiculos } from "@/lib/vehicles";

const BASE = "https://gr-autos-landing.vercel.app";

export default async function sitemap() {
  const vehiculos = await getVehiculos();
  const vehiculoUrls = vehiculos.map((v) => ({
    url: `${BASE}/vehiculo/${v.slug}`,
    lastModified: v.fechaIngreso,
    priority: 0.8,
  }));

  return [
    { url: BASE, priority: 1.0, lastModified: new Date().toISOString() },
    { url: `${BASE}/vehiculos`, priority: 0.9 },
    { url: `${BASE}/financiamiento`, priority: 0.7 },
    { url: `${BASE}/vende-tu-auto`, priority: 0.7 },
    { url: `${BASE}/nosotros`, priority: 0.5 },
    { url: `${BASE}/contacto`, priority: 0.5 },
    ...vehiculoUrls,
  ];
}
