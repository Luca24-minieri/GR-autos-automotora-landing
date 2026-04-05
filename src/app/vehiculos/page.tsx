import { getVehiculos, getMarcasDisponibles } from "@/lib/vehicles";
import VehiculosCatalog from "@/components/VehiculosCatalog";

export default async function VehiculosPage() {
  const [vehiculos, marcas] = await Promise.all([
    getVehiculos(),
    getMarcasDisponibles(),
  ]);

  return <VehiculosCatalog vehiculos={vehiculos} marcas={marcas} />;
}
