import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros | GR Autos",
  description:
    "Conoce GR Autos, automotora premium en Vitacura, Santiago. Más de 8 años de experiencia en venta de vehículos con transparencia y garantía.",
  openGraph: {
    title: "Sobre Nosotros | GR Autos",
    description: "Automotora premium en Vitacura con más de 8 años de experiencia.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
