"use client";

const links = [
  { label: "Inicio", href: "#" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Financiamiento", href: "#financiamiento" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
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
    <footer className="border-t border-white/[0.06] bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          {/* Logo + info */}
          <div>
            <span className="font-display text-2xl font-bold text-white">GR Autos</span>
            <p className="mt-3 text-sm text-muted-foreground">
              San Francisco de Asís 150, Of. 329
              <br />
              Vitacura, Santiago, Chile
            </p>
            <p className="mt-2 text-sm text-muted-foreground">+56 9 1234 5678</p>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/60">
              Navegación
            </p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/60">
              Síguenos
            </p>
            <div className="flex justify-center gap-4 md:justify-start">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-white/60 transition-colors hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-white/60 transition-colors hover:text-white"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-white/60 transition-colors hover:text-white"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 GR Autos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
