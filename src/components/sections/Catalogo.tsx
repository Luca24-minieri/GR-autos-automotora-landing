"use client";

import { motion } from "motion/react";
import Image from "next/image";

const cars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla Cross",
    year: 2023,
    km: "18.000 km",
    price: "$18.990.000",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=75&auto=format&fit=crop",
  },
  {
    id: 2,
    brand: "Hyundai",
    model: "Tucson",
    year: 2022,
    km: "32.000 km",
    price: "$16.490.000",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=75&auto=format&fit=crop",
  },
  {
    id: 3,
    brand: "Mazda",
    model: "CX-5",
    year: 2023,
    km: "12.000 km",
    price: "$19.990.000",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75&auto=format&fit=crop",
  },
  {
    id: 4,
    brand: "Kia",
    model: "Sportage",
    year: 2024,
    km: "5.000 km",
    price: "$21.490.000",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=75&auto=format&fit=crop",
  },
  {
    id: 5,
    brand: "Chevrolet",
    model: "Tracker",
    year: 2023,
    km: "22.000 km",
    price: "$14.990.000",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=75&auto=format&fit=crop",
  },
  {
    id: 6,
    brand: "Nissan",
    model: "Qashqai",
    year: 2022,
    km: "28.000 km",
    price: "$15.490.000",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=75&auto=format&fit=crop",
  },
];

export default function Catalogo() {
  return (
    <section id="catalogo" className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          className="font-display text-2xl font-bold text-white md:text-4xl lg:text-6xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Encuentra tu próximo auto
        </motion.h2>
        <motion.p
          className="mt-4 text-sm text-muted-foreground md:text-base"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          Explora nuestra selección de vehículos verificados y con garantía.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
          {cars.map((car, i) => (
            <motion.div
              key={car.id}
              data-testid="car-card"
              className="group overflow-hidden rounded-lg border border-white/[0.06] bg-surface transition-shadow duration-300 hover:shadow-lg hover:shadow-gold/5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-4 md:p-5">
                <p className="text-xs text-muted-foreground">
                  {car.year} · {car.km}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">
                  {car.brand} {car.model}
                </h3>
                <p className="mt-2 font-display text-xl font-bold text-gold">{car.price}</p>
                <button className="mt-4 w-full rounded-full border border-white/[0.06] py-2.5 text-sm text-white transition-colors hover:bg-white/5">
                  Ver más detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <button className="rounded-full bg-gold px-8 py-3 font-medium text-black transition-colors hover:bg-gold-hover">
            Ver catálogo completo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
