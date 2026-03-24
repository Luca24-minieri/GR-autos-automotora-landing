"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/56912345678?text=Hola%2C%20me%20interesa%20un%20auto%20en%20GR%20Autos";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-opacity duration-300 md:bottom-6 md:right-6 md:h-16 md:w-16 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      } wa-pulse`}
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  );
}
