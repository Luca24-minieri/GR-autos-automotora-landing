import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Vehículos | GR Autos",
  description:
    "Explora nuestro catálogo de autos usados y seminuevos. SUV, sedán, camionetas y más con financiamiento disponible en GR Autos, Vitacura.",
  openGraph: {
    title: "Catálogo de Vehículos | GR Autos",
    description:
      "Explora nuestro catálogo de autos usados y seminuevos con financiamiento disponible.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
