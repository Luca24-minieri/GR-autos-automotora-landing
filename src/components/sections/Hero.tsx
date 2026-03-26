"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const tagline = "Tu próximo auto te espera";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const endPhraseRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            if (self.progress > 0.2 && videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }
          },
        },
      });

      tl.to(imageRef.current, { scale: 2.2, ease: "power1.in", duration: 0.6 }, 0);
      tl.to(textRef.current, { opacity: 0, ease: "none", duration: 0.25 }, 0);

      tl.fromTo(
        videoWrapRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power1.inOut", duration: 0.4 },
        0.3
      );
      tl.to(imageRef.current, { opacity: 0, ease: "power1.in", duration: 0.3 }, 0.4);

      tl.fromTo(
        videoWrapRef.current,
        { scale: 1.05 },
        { scale: 1, ease: "none", duration: 0.3 },
        0.7
      );

      tl.to(videoWrapRef.current, { opacity: 0, ease: "power2.in", duration: 0.15 }, 0.75);
      tl.fromTo(
        endPhraseRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.2 },
        0.78
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative h-[160vh] w-full overflow-hidden"
      data-testid="hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">
        {/* Car exterior image */}
        <div
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: "scale(1)" }}
        >
          <Image
            src="/images/hero-porsche.jpg"
            alt="Porsche 911 GT3 RS - GR Autos"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Car interior video */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 opacity-0 will-change-[opacity,transform]"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/hero-interior.mp4"
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Interior de vehículo GR Autos"
          >
            <track kind="captions" srcLang="es" label="Español" default />
          </video>
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
          {/* Title */}
          <motion.h1
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-gold">GR</span>{" "}
            <span className="font-light italic tracking-wide">Autos</span>
          </motion.h1>

          {/* Tagline */}
          <div className="mt-4 flex flex-wrap justify-center overflow-hidden px-4">
            {tagline.split("").map((char, i) => (
              <motion.span
                key={i}
                className="font-sans text-sm text-white/80 sm:text-lg md:text-xl lg:text-2xl"
                style={{ mixBlendMode: "difference" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.6 + i * 0.03,
                  ease: "easeOut",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="relative z-30 mt-8 flex flex-col items-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
            style={{ pointerEvents: "auto" }}
          >
            <Link
              href="/vehiculos"
              className="block w-full rounded-full bg-gold px-8 py-3 text-center font-semibold text-white transition-colors hover:bg-gold-hover sm:w-auto"
            >
              Compra tu auto
            </Link>
            <Link
              href="/vende-tu-auto"
              className="block w-full rounded-full border border-white/30 px-8 py-3 text-center font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Vende tu auto
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
            <div className="h-8 w-px bg-white/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
