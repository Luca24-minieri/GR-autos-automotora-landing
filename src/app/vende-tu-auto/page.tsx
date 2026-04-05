import { getVehiculos, getMarcasDisponibles } from "@/lib/vehicles";
import VendeTuAutoClient from "@/components/VendeTuAutoClient";

export const dynamic = "force-dynamic";

export default async function VendeTuAutoPage() {
  const [vehiculos, marcas] = await Promise.all([
    getVehiculos(),
    getMarcasDisponibles(),
  ]);

  return <VendeTuAutoClient vehiculos={vehiculos} marcas={marcas} />;
}
