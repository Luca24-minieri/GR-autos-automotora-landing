import { notFound } from "next/navigation";
import { getVehiculoBySlug, getVehiculos } from "@/lib/vehicles";
import VehiculoFicha from "@/components/VehiculoFicha";

export default async function VehiculoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [vehiculo, todosVehiculos] = await Promise.all([
    getVehiculoBySlug(slug),
    getVehiculos(),
  ]);

  if (!vehiculo) notFound();

  return <VehiculoFicha vehiculo={vehiculo} todosVehiculos={todosVehiculos} />;
}
