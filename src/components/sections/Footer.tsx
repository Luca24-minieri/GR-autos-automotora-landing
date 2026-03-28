"use client";

import { motion } from "motion/react";
import Link from "next/link";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/vehiculos" },
  { label: "Financiamiento", href: "/financiamiento" },
  { label: "Vende tu auto", href: "/vende-tu-auto" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.2V12a4.85 4.85 0 01-3.58-1.59V6.69h3.58z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-background py-14 md:py-20">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-[600px] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:text-left">
          {/* Logo + info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="font-display text-2xl font-bold text-white">
              GR <span className="text-gold">Autos</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              San Francisco de Asís 150, Of. 329
              <br />
              Vitacura, Santiago, Chile
            </p>
            <p className="mt-2 text-sm text-muted-foreground">+56 9 1234 5678</p>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Navegación
            </p>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Síguenos
            </p>
            <div className="flex justify-center gap-3 md:justify-start">
              {[
                { label: "Instagram", icon: InstagramIcon, href: "#" },
                { label: "Facebook", icon: FacebookIcon, href: "#" },
                { label: "TikTok", icon: TikTokIcon, href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] text-white/50 transition-all duration-200 hover:border-gold/30 hover:bg-gold/10 hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 border-t border-white/[0.06] pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xs text-muted-foreground/60">
            &copy; 2026 GR Autos. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
