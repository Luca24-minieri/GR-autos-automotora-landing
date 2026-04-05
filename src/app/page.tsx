import { getVehiculosDestacados, getVehiculos } from "@/lib/vehicles";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const [destacados, todosVehiculos] = await Promise.all([
    getVehiculosDestacados(),
    getVehiculos(),
  ]);

  return <HomeClient destacados={destacados} todosVehiculos={todosVehiculos} />;
}
