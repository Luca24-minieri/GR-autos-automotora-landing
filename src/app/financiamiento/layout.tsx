import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financiamiento Automotriz | GR Autos",
  description:
    "Simula tu crédito automotriz. Pie desde 10%, hasta 48 cuotas. Trabajamos con BancoEstado, Santander, BCI y más. GR Autos, Vitacura.",
  openGraph: {
    title: "Financiamiento Automotriz | GR Autos",
    description: "Simula tu crédito automotriz con las mejores tasas del mercado.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
