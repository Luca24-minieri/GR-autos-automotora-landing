import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | GR Autos",
  description:
    "Contáctanos por WhatsApp, teléfono o email. Visítanos en San Francisco de Asís 150, Vitacura, Santiago. GR Autos.",
  openGraph: {
    title: "Contacto | GR Autos",
    description: "Contáctanos y encuentra tu próximo auto.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
