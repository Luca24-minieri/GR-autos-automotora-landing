import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vende tu Auto | GR Autos",
  description:
    "Vende tu auto de forma rápida y segura. Tasación gratuita, pago inmediato y transferencia digital. GR Autos, Vitacura.",
  openGraph: {
    title: "Vende tu Auto | GR Autos",
    description: "Recibe una oferta por tu auto en menos de 24 horas.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
