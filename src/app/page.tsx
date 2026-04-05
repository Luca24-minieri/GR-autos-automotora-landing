import { getVehiculosDestacados, getVehiculos } from "@/lib/vehicles";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [destacados, todosVehiculos] = await Promise.all([
    getVehiculosDestacados(),
    getVehiculos(),
  ]);

  return <HomeClient destacados={destacados} todosVehiculos={todosVehiculos} />;
}
