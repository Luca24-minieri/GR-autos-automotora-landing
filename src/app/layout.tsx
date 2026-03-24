import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GR Autos | Tu próximo auto te espera",
  description:
    "Automotora premium en Vitacura, Santiago. Venta de autos usados y nuevos con financiamiento flexible y garantía mecánica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${dmSans.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
