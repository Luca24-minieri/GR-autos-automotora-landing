"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const tagline = "Tu próximo auto te espera";
const HERO_VIDEO_SRC = "/videos/grautos-hero.mp4";

// Píxeles de scroll por segundo de video (calibrado para luxury feel).
const PX_PER_SECOND_DESKTOP = 550;
const PX_PER_SECOND_MOBILE = 340;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const endPhraseRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    const video = videoRef.current;
    const wrap = videoWrapRef.current;

    // Reduced motion: sin scrub, sin pin. Video estático en frame 0.
    if (prefersReducedMotion) {
      if (wrap) wrap.style.opacity = "1";
      return;
    }

    if (!video) return;

    let ctx: gsap.Context | null = null;
    let cancelled = false;

    const setupScrub = () => {
      if (cancelled) return;

      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      // Evitar autoplay involuntario y dejar el video bajo control del scroll.
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          {
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)",
          },
          (context) => {
            const { isDesktop } = context.conditions as {
              isMobile: boolean;
              isDesktop: boolean;
            };

            const pxPerSec = isDesktop
              ? PX_PER_SECOND_DESKTOP
              : PX_PER_SECOND_MOBILE;
            const scrubDistance = Math.round(duration * pxPerSec);

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${scrubDistance}`,
                scrub: 0.5,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onEnter: () => {
                  if (wrap) wrap.style.willChange = "opacity, transform";
                },
                onLeave: () => {
                  if (wrap) wrap.style.willChange = "auto";
                },
                onLeaveBack: () => {
                  if (wrap) wrap.style.willChange = "auto";
                },
              },
            });

            // Reveal sutil del video al inicio del pin.
            tl.fromTo(
              wrap,
              { opacity: 0.6, scale: 1.06 },
              { opacity: 1, scale: 1, ease: "power1.out", duration: 0.08 },
              0,
            );

            // Texto principal se desvanece en el primer ~25% del scroll.
            tl.to(
              textRef.current,
              { opacity: 0, scale: 1.04, ease: "none", duration: 0.25 },
              0,
            );

            // CORE: video.currentTime atado linealmente al progreso del scroll.
            // duration: 1 → ocupa todo el timeline.
            tl.to(
              video,
              { currentTime: duration, ease: "none", duration: 1 },
              0,
            );

            // Frase final aparece sobre los últimos frames.
            if (isDesktop) {
              tl.fromTo(
                endPhraseRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, ease: "power2.out", duration: 0.12 },
                0.86,
              );
            }
          },
        );
      }, containerRef);
    };

    // Necesitamos buffer completo (no sólo metadata) para que el seek sea fluido.
    // canplaythrough = el navegador estima que puede reproducir hasta el final sin pausas.
    let initialized = false;
    const tryInit = () => {
      if (initialized || cancelled) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      initialized = true;
      setupScrub();
    };

    // Failsafe: si canplaythrough no dispara en 3s pero tenemos metadata + algo de buffer, arrancamos igual.
    const failsafeTimer = window.setTimeout(() => {
      if (!initialized && video.readyState >= 2) tryInit();
    }, 3000);

    if (video.readyState >= 4 /* HAVE_ENOUGH_DATA */) {
      tryInit();
    } else {
      video.addEventListener("canplaythrough", tryInit, { once: true });
      video.addEventListener("loadedmetadata", () => {
        // Forzar descarga proactiva del buffer.
        try {
          video.load();
        } catch {
          /* ignore */
        }
      }, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(failsafeTimer);
      video.removeEventListener("canplaythrough", tryInit);
      if (ctx) ctx.revert();
      if (wrap) wrap.style.willChange = "auto";
      try {
        video.pause();
      } catch {
        /* ignore */
      }
      ScrollTrigger.refresh();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      data-testid="hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">
        {/* Hero video — único asset visual, scroll-scrubbed */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0"
          style={{ opacity: prefersReducedMotion ? 1 : 0.6 }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={HERO_VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label="GR Autos — animación de presentación"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        </div>

        {/* End phrase */}
        <div
          ref={endPhraseRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 opacity-0"
        >
          <p className="text-center font-display text-xl font-semibold uppercase tracking-[0.25em] text-gold/80 md:text-2xl lg:text-3xl">
            La automotora de alta gama
          </p>
          <p className="mt-2 text-center font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl lg:text-6xl">
            N°1 en Chile
          </p>
          <div className="mt-6 h-px w-16 bg-gold/40" />
        </div>

        {/* Hero text + CTA */}
        <div
          ref={textRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4"
        >
          <motion.h1
            className="flex items-center gap-3 sm:gap-4 md:gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/gr-logo.png"
              alt="GR"
              style={{ height: "80px", width: "auto", maxWidth: "200px" }}
            />
            <span className="font-display text-4xl font-light italic tracking-wide text-white sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
              Autos
            </span>
          </motion.h1>

          <div
            className="mt-4 flex flex-wrap justify-center overflow-hidden px-4"
            style={{ mixBlendMode: "difference" }}
          >
            {tagline.split("").map((char, i) => (
              <motion.span
                key={i}
                className="font-sans text-sm text-white/80 sm:text-lg md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.6 + i * 0.03,
                  ease: "easeOut",
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="relative z-30 mt-8 flex flex-col items-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{ pointerEvents: "auto" }}
          >
            <Link
              href="/vehiculos"
              className="btn-press block w-full rounded-full bg-gold px-8 py-3 text-center font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-gold-hover hover:shadow-lg hover:shadow-gold/20 sm:w-auto"
            >
              Compra tu auto
            </Link>
            <Link
              href="/vende-tu-auto"
              className="btn-press block w-full rounded-full border border-white/30 px-8 py-3 text-center font-semibold text-white transition-[background-color] duration-200 hover:bg-white/10 sm:w-auto"
            >
              Vende tu auto
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
