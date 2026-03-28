"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/vehiculos" },
  { label: "Financiamiento", href: "/financiamiento" },
  { label: "Vende tu auto", href: "/vende-tu-auto" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

const WHATSAPP_URL =
  "https://wa.me/56912345678?text=Hola%2C%20me%20interesa%20un%20auto%20en%20GR%20Autos";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > (isHome ? window.innerHeight * 0.8 : 20));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const showBg = scrolled || !isHome;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          showBg
            ? "bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-white/[0.06]"
            : "bg-transparent border-transparent"
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[padding] duration-300 md:px-8 lg:px-10 ${
            showBg ? "py-3 lg:py-4" : "py-5 lg:py-6"
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
          {/* Logo — hidden on hero, visible on scroll */}
          <Link href="/" className="flex h-[20px] items-center" aria-label="GR Autos - Inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/gr-logo.png"
              alt="GR Autos"
              style={{ height: '28px', width: 'auto', maxWidth: '60px' }}
              className={`transition-opacity duration-300 ${
                showBg ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 lg:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative py-1"
                >
                  <span
                    className={`text-[15px] font-medium tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-gold"
                        : "text-white/75 group-hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            {/* CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press rounded-full bg-gold px-6 py-2.5 text-sm font-semibold tracking-wide text-white transition-[background-color,box-shadow] duration-200 hover:bg-gold-hover hover:shadow-lg hover:shadow-gold/20"
            >
              Cotizar
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            data-testid="menu-hamburger"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#0A0A0A]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-5 py-5">
              <Image
                src="/images/gr-logo.png"
                alt="GR Autos"
                width={40}
                height={20}
                className="h-[20px] w-auto"
              />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Mobile links */}
            <div className="flex flex-1 flex-col justify-center px-8">
              <div className="flex flex-col gap-7">
                {links.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.35, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block py-1 font-display text-[28px] font-semibold tracking-tight transition-colors duration-200 ${
                          isActive ? "text-gold" : "text-white hover:text-gold"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile CTA */}
            <motion.div
              className="px-8 pb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.35 }}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press block w-full rounded-full bg-gold py-4 text-center text-lg font-bold tracking-wide text-white transition-colors hover:bg-gold-hover"
                onClick={() => setMobileOpen(false)}
              >
                Cotizar por WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-white/30">
                Respuesta inmediata
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
