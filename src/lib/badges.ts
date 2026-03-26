import { type Vehiculo } from "@/data/vehiculos";

export interface Badge {
  label: string;
  color: string; // tailwind classes
}

export function getAutoBadges(v: Vehiculo): Badge[] {
  const badges: Badge[] = [];

  if (v.numeroDuenos === 1)
    badges.push({ label: "Único dueño", color: "bg-green-500/80 text-white" });
  if (v.km < 30000) badges.push({ label: "Poco kilometraje", color: "bg-blue-500/80 text-white" });
  if (v.ano >= 2024) badges.push({ label: "Semi nuevo", color: "bg-gold/90 text-white" });
  if (v.traccion === "4x4" || v.traccion === "AWD")
    badges.push({ label: "4x4", color: "bg-white/20 text-white" });
  if (v.combustible === "Diesel")
    badges.push({ label: "Diesel", color: "bg-zinc-600/80 text-white" });
  if (v.combustible === "Híbrido")
    badges.push({ label: "Híbrido", color: "bg-emerald-400/80 text-black" });
  if (v.combustible === "Eléctrico")
    badges.push({ label: "Eléctrico", color: "bg-cyan-400/80 text-black" });

  // Add manual badges
  for (const b of v.badges) {
    if (!badges.some((ab) => ab.label === b)) {
      badges.push({ label: b, color: "bg-gold/90 text-white" });
    }
  }

  return badges;
}
