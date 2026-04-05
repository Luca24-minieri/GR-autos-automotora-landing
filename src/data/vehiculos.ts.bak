export interface Vehiculo {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  version: string;
  ano: number;
  km: number;
  precio: number;
  precioAnterior?: number;
  combustible: "Bencina" | "Diesel" | "Híbrido" | "Eléctrico";
  transmision: "Automática" | "Manual";
  tipoVehiculo: "Sedán" | "SUV" | "Camioneta" | "Hatchback" | "Coupé" | "Van";
  motor: string;
  potencia: string;
  colorExterior: string;
  colorInterior: string;
  numeroDuenos: number;
  traccion: string;
  puertas: number;
  descripcion: string;
  caracteristicas: string[];
  badges: string[];
  estado: "disponible" | "reservado" | "vendido";
  destacado: boolean;
  imagenes: string[];
  fechaIngreso: string;
  financiamiento: {
    pie40: { cuotas12: number; cuotas24: number; cuotas36: number; cuotas48: number };
    pie30: { cuotas12: number; cuotas24: number; cuotas36: number; cuotas48: number };
    pie20: { cuotas12: number; cuotas24: number; cuotas36: number; cuotas48: number };
  };
}

export interface FiltrosVehiculo {
  marcas?: string[];
  tipoVehiculo?: string[];
  precioMin?: number;
  precioMax?: number;
  anoMin?: number;
  anoMax?: number;
  kmMax?: number;
  combustible?: string[];
  transmision?: string[];
}

function calcCuota(precio: number, piePct: number, n: number): number {
  const monto = precio * (1 - piePct / 100);
  const tasa = 0.012;
  return Math.round((monto * tasa) / (1 - Math.pow(1 + tasa, -n)));
}

function financiamiento(precio: number) {
  return {
    pie40: {
      cuotas12: calcCuota(precio, 40, 12),
      cuotas24: calcCuota(precio, 40, 24),
      cuotas36: calcCuota(precio, 40, 36),
      cuotas48: calcCuota(precio, 40, 48),
    },
    pie30: {
      cuotas12: calcCuota(precio, 30, 12),
      cuotas24: calcCuota(precio, 30, 24),
      cuotas36: calcCuota(precio, 30, 36),
      cuotas48: calcCuota(precio, 30, 48),
    },
    pie20: {
      cuotas12: calcCuota(precio, 20, 12),
      cuotas24: calcCuota(precio, 20, 24),
      cuotas36: calcCuota(precio, 20, 36),
      cuotas48: calcCuota(precio, 20, 48),
    },
  };
}

const unsplash = (query: string, idx: number) =>
  `https://images.unsplash.com/photo-${query}?w=800&q=75&auto=format&fit=crop&seed=${idx}`;

const vehiculos: Vehiculo[] = [
  // === SUV ===
  {
    id: "v01",
    slug: "hyundai-tucson-2023",
    marca: "Hyundai",
    modelo: "Tucson",
    version: "2.0 CRDi Premium AWD",
    ano: 2023,
    km: 18000,
    precio: 22990000,
    combustible: "Diesel",
    transmision: "Automática",
    tipoVehiculo: "SUV",
    motor: "2.0L Turbo Diesel",
    potencia: "186 HP",
    colorExterior: "Gris Platinum",
    colorInterior: "Negro",
    numeroDuenos: 1,
    traccion: "AWD",
    puertas: 5,
    descripcion:
      "Hyundai Tucson 2023 en impecable estado, único dueño, con todos los mantenimientos al día en servicio oficial. Equipamiento premium con techo panorámico, asientos calefaccionados, sistema de navegación y cámara 360°. Ideal para ciudad y carretera.",
    caracteristicas: [
      "Techo panorámico",
      "Apple CarPlay / Android Auto",
      "Cámara 360°",
      "Asientos calefaccionados",
      "Sensor de estacionamiento",
      "Lane Assist",
      "Control crucero adaptativo",
    ],
    badges: ["Único dueño", "Poco kilometraje"],
    estado: "disponible",
    destacado: true,
    imagenes: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2025-12-15",
    financiamiento: financiamiento(22990000),
  },
  {
    id: "v02",
    slug: "toyota-rav4-2024",
    marca: "Toyota",
    modelo: "RAV4",
    version: "2.5 XLE CVT",
    ano: 2024,
    km: 8000,
    precio: 25990000,
    precioAnterior: 27490000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "SUV",
    motor: "2.5L 4 cilindros",
    potencia: "203 HP",
    colorExterior: "Blanco Perla",
    colorInterior: "Negro",
    numeroDuenos: 1,
    traccion: "4x2",
    puertas: 5,
    descripcion:
      "Toyota RAV4 2024 prácticamente nueva, con garantía de fábrica vigente. Motor 2.5L eficiente y confiable, con todo el equipamiento de seguridad Toyota Safety Sense. Excelente opción para quien busca seguridad y respaldo de marca.",
    caracteristicas: [
      "Toyota Safety Sense 2.5",
      "Apple CarPlay / Android Auto",
      "Cámara de retroceso",
      "Control crucero dinámico",
      "Alerta de punto ciego",
      "Freno autónomo de emergencia",
    ],
    badges: ["Garantía vigente", "Poco kilometraje"],
    estado: "disponible",
    destacado: true,
    imagenes: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2026-01-10",
    financiamiento: financiamiento(25990000),
  },
  {
    id: "v03",
    slug: "mazda-cx5-2023",
    marca: "Mazda",
    modelo: "CX-5",
    version: "2.5 GT AWD",
    ano: 2023,
    km: 22000,
    precio: 23490000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "SUV",
    motor: "2.5L Skyactiv-G",
    potencia: "194 HP",
    colorExterior: "Rojo Cristal",
    colorInterior: "Negro/Marrón",
    numeroDuenos: 1,
    traccion: "AWD",
    puertas: 5,
    descripcion:
      "Mazda CX-5 GT con tracción integral y el reconocido diseño Kodo. Interior premium con cuero, sistema Bose de 10 parlantes, head-up display y pantalla de 10.25 pulgadas. Vehículo mantenido exclusivamente en servicio Mazda.",
    caracteristicas: [
      "Cuero genuino",
      "Sistema Bose 10 parlantes",
      "Head-Up Display",
      "Techo solar",
      'Pantalla 10.25"',
      "Apple CarPlay / Android Auto",
      "Cámara 360°",
    ],
    badges: ["Único dueño", "Servicio oficial"],
    estado: "disponible",
    destacado: true,
    imagenes: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2025-11-20",
    financiamiento: financiamiento(23490000),
  },
  // === Sedán ===
  {
    id: "v04",
    slug: "toyota-corolla-2023",
    marca: "Toyota",
    modelo: "Corolla",
    version: "XLi 1.8 CVT",
    ano: 2023,
    km: 25000,
    precio: 14990000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "Sedán",
    motor: "1.8L 4 cilindros",
    potencia: "140 HP",
    colorExterior: "Plata",
    colorInterior: "Negro",
    numeroDuenos: 1,
    traccion: "4x2",
    puertas: 4,
    descripcion:
      "Toyota Corolla 2023, el sedán más vendido de Chile. Confiabilidad probada, bajo consumo y excelente valor de reventa. Mantenimientos al día en Toyota oficial. Perfecto para uso diario en ciudad.",
    caracteristicas: [
      "Apple CarPlay / Android Auto",
      "Cámara de retroceso",
      "Control crucero",
      "Aire acondicionado automático",
      'Llantas de aleación 16"',
      "7 airbags",
    ],
    badges: ["Único dueño", "Bajo consumo"],
    estado: "disponible",
    destacado: true,
    imagenes: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2025-10-05",
    financiamiento: financiamiento(14990000),
  },
  {
    id: "v05",
    slug: "mercedes-cla200-2022",
    marca: "Mercedes-Benz",
    modelo: "CLA 200",
    version: "Progressive",
    ano: 2022,
    km: 35000,
    precio: 24990000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "Sedán",
    motor: "1.3L Turbo",
    potencia: "163 HP",
    colorExterior: "Negro Obsidiana",
    colorInterior: "Negro/Rojo",
    numeroDuenos: 2,
    traccion: "4x2",
    puertas: 4,
    descripcion:
      'Mercedes-Benz CLA 200 Progressive con el icónico diseño coupé de cuatro puertas. Interior MBUX con pantalla dual de 10.25", ambient lighting de 64 colores y paquete de asistencia a la conducción. Un sedán premium con alma deportiva.',
    caracteristicas: [
      'MBUX con pantalla dual 10.25"',
      "Ambient lighting 64 colores",
      "Asientos deportivos",
      "Navegación GPS",
      "Paquete de parking",
      "Faros LED High Performance",
      "Keyless Go",
    ],
    badges: ["Premium", "Diseño coupé"],
    estado: "disponible",
    destacado: true,
    imagenes: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2026-01-20",
    financiamiento: financiamiento(24990000),
  },
  {
    id: "v06",
    slug: "kia-cerato-2024",
    marca: "Kia",
    modelo: "Cerato",
    version: "EX 1.6 AT",
    ano: 2024,
    km: 5000,
    precio: 15490000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "Sedán",
    motor: "1.6L MPI",
    potencia: "128 HP",
    colorExterior: "Azul Gravity",
    colorInterior: "Negro",
    numeroDuenos: 1,
    traccion: "4x2",
    puertas: 4,
    descripcion:
      "Kia Cerato 2024 prácticamente nuevo con solo 5.000 km. Diseño renovado con pantalla de 8 pulgadas, cargador inalámbrico y completo paquete de seguridad ADAS. Garantía de fábrica vigente hasta 2031 (7 años).",
    caracteristicas: [
      'Pantalla 8" táctil',
      "Cargador inalámbrico",
      "Apple CarPlay / Android Auto",
      "Cámara de retroceso",
      "Sensores delanteros y traseros",
      "Frenado autónomo",
      "Garantía 7 años",
    ],
    badges: ["Garantía vigente", "Prácticamente nuevo"],
    estado: "disponible",
    destacado: true,
    imagenes: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2026-02-01",
    financiamiento: financiamiento(15490000),
  },
  // === Camioneta ===
  {
    id: "v07",
    slug: "toyota-hilux-2024",
    marca: "Toyota",
    modelo: "Hilux",
    version: "SRV 2.8 4x4 AT",
    ano: 2024,
    km: 12000,
    precio: 27990000,
    combustible: "Diesel",
    transmision: "Automática",
    tipoVehiculo: "Camioneta",
    motor: "2.8L Turbo Diesel",
    potencia: "204 HP",
    colorExterior: "Blanco",
    colorInterior: "Negro",
    numeroDuenos: 1,
    traccion: "4x4",
    puertas: 4,
    descripcion:
      "Toyota Hilux 2024 SRV, la camioneta más vendida y confiable de Chile. Motor 2.8 turbo diesel con 204 HP, tracción 4x4 permanente y diferencial trasero con bloqueo. Ideal para trabajo y aventura.",
    caracteristicas: [
      "Tracción 4x4 con bloqueo",
      "Control de descenso",
      "Cámara de retroceso",
      'Pantalla 8"',
      "Apple CarPlay / Android Auto",
      "6 airbags",
      "Barras laterales",
    ],
    badges: ["4x4", "Poco kilometraje"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2026-01-05",
    financiamiento: financiamiento(27990000),
  },
  {
    id: "v08",
    slug: "mitsubishi-l200-2023",
    marca: "Mitsubishi",
    modelo: "L200",
    version: "Katana CR 2.4 4x4 AT",
    ano: 2023,
    km: 30000,
    precio: 23490000,
    combustible: "Diesel",
    transmision: "Automática",
    tipoVehiculo: "Camioneta",
    motor: "2.4L Turbo Diesel",
    potencia: "181 HP",
    colorExterior: "Gris Grafito",
    colorInterior: "Negro",
    numeroDuenos: 1,
    traccion: "4x4",
    puertas: 4,
    descripcion:
      'Mitsubishi L200 Katana, edición especial con estética agresiva y equipamiento premium. Super Select 4WD II para máxima versatilidad. Barras deportivas, estribos laterales y llantas de aleación 18".',
    caracteristicas: [
      "Super Select 4WD II",
      'Pantalla 9" táctil',
      "Apple CarPlay / Android Auto",
      "Cámara trasera",
      "Barras deportivas",
      "Estribos laterales",
      'Llantas 18"',
    ],
    badges: ["Edición especial", "4x4"],
    estado: "reservado",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2025-09-15",
    financiamiento: financiamiento(23490000),
  },
  {
    id: "v09",
    slug: "chevrolet-colorado-2023",
    marca: "Chevrolet",
    modelo: "Colorado",
    version: "High Country 2.8 4x4 AT",
    ano: 2023,
    km: 28000,
    precio: 26490000,
    combustible: "Diesel",
    transmision: "Automática",
    tipoVehiculo: "Camioneta",
    motor: "2.8L Duramax Turbo Diesel",
    potencia: "200 HP",
    colorExterior: "Negro",
    colorInterior: "Cuero Marrón",
    numeroDuenos: 1,
    traccion: "4x4",
    puertas: 4,
    descripcion:
      'Chevrolet Colorado High Country, la versión más equipada. Interior full cuero, asientos calefaccionados, sistema MyLink con pantalla de 8" y conectividad total. Motor Duramax con 500 Nm de torque para cualquier terreno.',
    caracteristicas: [
      "Cuero genuino",
      "Asientos calefaccionados",
      'MyLink 8"',
      "Tracción 4x4",
      "Control de estabilidad",
      "Hill Descent Control",
      "Toma 220V en cama",
    ],
    badges: ["High Country", "Full equipo"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2025-11-01",
    financiamiento: financiamiento(26490000),
  },
  // === Hatchback ===
  {
    id: "v10",
    slug: "suzuki-swift-2024",
    marca: "Suzuki",
    modelo: "Swift",
    version: "GLX 1.2 AT",
    ano: 2024,
    km: 3000,
    precio: 11990000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "Hatchback",
    motor: "1.2L Dualjet",
    potencia: "82 HP",
    colorExterior: "Rojo Burning",
    colorInterior: "Negro",
    numeroDuenos: 1,
    traccion: "4x2",
    puertas: 5,
    descripcion:
      "Suzuki Swift 2024, el city car más divertido de manejar. Nuevo diseño generacional, ultra liviano (menos de 1 tonelada), consumo de apenas 5.1L/100km. Perfecto para la ciudad con su tamaño compacto y agilidad.",
    caracteristicas: [
      'Pantalla 9" táctil',
      "Apple CarPlay / Android Auto",
      "Cámara de retroceso",
      "6 airbags",
      "Control de estabilidad",
      "Alerta de cambio de pista",
      "Start/Stop",
    ],
    badges: ["Prácticamente nuevo", "Bajo consumo"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2026-02-10",
    financiamiento: financiamiento(11990000),
  },
  {
    id: "v11",
    slug: "mazda-3-2023",
    marca: "Mazda",
    modelo: "Mazda3",
    version: "GT 2.5 HB AT",
    ano: 2023,
    km: 15000,
    precio: 18490000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "Hatchback",
    motor: "2.5L Skyactiv-G",
    potencia: "194 HP",
    colorExterior: "Machine Grey",
    colorInterior: "Negro/Rojo",
    numeroDuenos: 1,
    traccion: "4x2",
    puertas: 5,
    descripcion:
      "Mazda3 Hatchback GT, diseño premiado a nivel mundial. Interior con cuero, sistema Bose de 12 parlantes, head-up display y el chasis más refinado de su segmento. Para quienes buscan un hatchback con alma premium.",
    caracteristicas: [
      "Cuero genuino",
      "Bose 12 parlantes",
      "Head-Up Display",
      'Pantalla 8.8"',
      "i-Activsense completo",
      "Faros LED adaptativos",
      "Apple CarPlay / Android Auto",
    ],
    badges: ["Diseño premiado", "Full equipo"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2025-12-20",
    financiamiento: financiamiento(18490000),
  },
  // === Coupé ===
  {
    id: "v12",
    slug: "bmw-serie2-coupe-2023",
    marca: "BMW",
    modelo: "Serie 2 Coupé",
    version: "220i M Sport",
    ano: 2023,
    km: 18000,
    precio: 32990000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "Coupé",
    motor: "2.0L TwinPower Turbo",
    potencia: "184 HP",
    colorExterior: "Azul Portimao",
    colorInterior: "Negro Vernasca",
    numeroDuenos: 1,
    traccion: "4x2",
    puertas: 2,
    descripcion:
      'BMW Serie 2 Coupé con paquete M Sport, la esencia deportiva de BMW en su máxima expresión. Propulsión trasera, chasis deportivo M, frenos M y llantas de 19". Interior Vernasca con volante M y asientos deportivos.',
    caracteristicas: [
      "Paquete M Sport",
      "BMW Live Cockpit Professional",
      "Pantalla curva",
      "Asientos deportivos M",
      "Harman Kardon",
      "Driving Assistant",
      'Llantas M 19"',
    ],
    badges: ["M Sport", "Deportivo"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2026-01-15",
    financiamiento: financiamiento(32990000),
  },
  {
    id: "v13",
    slug: "audi-a5-sportback-2022",
    marca: "Audi",
    modelo: "A5 Sportback",
    version: "40 TFSI S-Line",
    ano: 2022,
    km: 32000,
    precio: 29990000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "Coupé",
    motor: "2.0 TFSI",
    potencia: "204 HP",
    colorExterior: "Gris Daytona",
    colorInterior: "Negro S-Line",
    numeroDuenos: 2,
    traccion: "4x2",
    puertas: 4,
    descripcion:
      'Audi A5 Sportback S-Line, la perfecta combinación entre elegancia y deportividad. Virtual Cockpit Plus de 12.3", sistema MMI Navigation Plus con pantalla 10.1" y asistente de conducción Audi Pre Sense. Un gran turismo moderno.',
    caracteristicas: [
      'Audi Virtual Cockpit Plus 12.3"',
      'MMI Navigation Plus 10.1"',
      "Audi Pre Sense",
      "Asientos S-Line",
      "Bang & Olufsen",
      "Matrix LED",
      "Keyless entry",
    ],
    badges: ["S-Line", "Premium"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2025-10-25",
    financiamiento: financiamiento(29990000),
  },
  // === Híbrido ===
  {
    id: "v14",
    slug: "toyota-corolla-cross-hybrid-2024",
    marca: "Toyota",
    modelo: "Corolla Cross",
    version: "Hybrid SEG CVT",
    ano: 2024,
    km: 6000,
    precio: 21990000,
    combustible: "Híbrido",
    transmision: "Automática",
    tipoVehiculo: "SUV",
    motor: "1.8L Hybrid Synergy Drive",
    potencia: "122 HP (combinado)",
    colorExterior: "Blanco Perlado",
    colorInterior: "Negro",
    numeroDuenos: 1,
    traccion: "4x2",
    puertas: 5,
    descripcion:
      "Toyota Corolla Cross Hybrid 2024, la SUV híbrida más eficiente del mercado. Consumo de apenas 4.3L/100km en ciclo combinado. Garantía híbrida de 10 años, Toyota Safety Sense 3.0 completo. Ecología sin sacrificar espacio ni confort.",
    caracteristicas: [
      "Toyota Safety Sense 3.0",
      'Pantalla 9" táctil',
      "Apple CarPlay / Android Auto",
      "Cámara de retroceso",
      "Sensor de lluvia",
      "Faros LED",
      "Garantía híbrida 10 años",
    ],
    badges: ["Híbrido", "Garantía vigente"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2026-02-20",
    financiamiento: financiamiento(21990000),
  },
  {
    id: "v15",
    slug: "hyundai-ioniq-hybrid-2023",
    marca: "Hyundai",
    modelo: "Ioniq",
    version: "Hybrid GLS",
    ano: 2023,
    km: 20000,
    precio: 18990000,
    combustible: "Híbrido",
    transmision: "Automática",
    tipoVehiculo: "Sedán",
    motor: "1.6L GDi Hybrid",
    potencia: "141 HP (combinado)",
    colorExterior: "Plata",
    colorInterior: "Gris",
    numeroDuenos: 1,
    traccion: "4x2",
    puertas: 4,
    descripcion:
      "Hyundai Ioniq Hybrid con el menor consumo de combustible del mercado: 3.4L/100km. Transmisión DCT de 6 velocidades, frenado regenerativo y modo EV para trayectos cortos. La opción inteligente para ahorro máximo.",
    caracteristicas: [
      'Pantalla 10.25" navegación',
      "Cargador inalámbrico",
      "Apple CarPlay / Android Auto",
      "Frenado regenerativo",
      "Modo EV",
      "SmartSense ADAS",
      "Ventilación en asientos",
    ],
    badges: ["Ultra eficiente", "Híbrido"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2025-11-10",
    financiamiento: financiamiento(18990000),
  },
  // === Premium ===
  {
    id: "v16",
    slug: "porsche-cayenne-2022",
    marca: "Porsche",
    modelo: "Cayenne",
    version: "3.0 V6 Tiptronic",
    ano: 2022,
    km: 28000,
    precio: 54990000,
    precioAnterior: 58990000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "SUV",
    motor: "3.0L V6 Turbo",
    potencia: "340 HP",
    colorExterior: "Negro",
    colorInterior: "Cuero Marrón",
    numeroDuenos: 1,
    traccion: "AWD",
    puertas: 5,
    descripcion:
      "Porsche Cayenne 2022, la SUV deportiva por excelencia. Motor V6 turbo de 340 HP con tracción integral Porsche Traction Management. Interior full cuero con paquete Sport Chrono, suspensión neumática PASM y frenos cerámicos opcionales.",
    caracteristicas: [
      "Sport Chrono Package",
      "PASM suspensión adaptativa",
      'PCM 6.0 pantalla 12.3"',
      "Cuero natural completo",
      "BOSE Surround Sound",
      "Techo panorámico",
      "Cámara 360°",
    ],
    badges: ["Premium", "Sport Chrono"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2026-01-25",
    financiamiento: financiamiento(54990000),
  },
  {
    id: "v17",
    slug: "mercedes-glc300-2023",
    marca: "Mercedes-Benz",
    modelo: "GLC 300",
    version: "4MATIC AMG Line",
    ano: 2023,
    km: 15000,
    precio: 42990000,
    combustible: "Bencina",
    transmision: "Automática",
    tipoVehiculo: "SUV",
    motor: "2.0L Turbo",
    potencia: "258 HP",
    colorExterior: "Blanco Polar",
    colorInterior: "Negro AMG",
    numeroDuenos: 1,
    traccion: "AWD",
    puertas: 5,
    descripcion:
      'Mercedes-Benz GLC 300 4MATIC con paquete AMG Line. El SUV premium más vendido del mundo con el nuevo sistema MBUX de segunda generación, pantalla OLED de 11.9" y realidad aumentada en navegación. Lujo, tecnología y performance en perfecta armonía.',
    caracteristicas: [
      "MBUX 2da generación",
      'Pantalla OLED 11.9"',
      "AMG Line exterior e interior",
      "Burmester 3D Sound",
      "Realidad aumentada",
      "ENERGIZING Comfort",
      "Suspensión AIRMATIC",
    ],
    badges: ["AMG Line", "4MATIC"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2026-02-15",
    financiamiento: financiamiento(42990000),
  },
  // === Van ===
  {
    id: "v18",
    slug: "hyundai-staria-2024",
    marca: "Hyundai",
    modelo: "Staria",
    version: "2.2 CRDi Premium 9 pasajeros",
    ano: 2024,
    km: 8000,
    precio: 34990000,
    combustible: "Diesel",
    transmision: "Automática",
    tipoVehiculo: "Van",
    motor: "2.2L CRDi Turbo Diesel",
    potencia: "177 HP",
    colorExterior: "Gris Moonlight",
    colorInterior: "Beige",
    numeroDuenos: 1,
    traccion: "4x2",
    puertas: 5,
    descripcion:
      "Hyundai Staria Premium, la van del futuro con diseño de nave espacial. Interior premium para 9 pasajeros con asientos captain en segunda fila, puertas eléctricas deslizantes y techo panorámico. Confort para viajes largos con toda la familia.",
    caracteristicas: [
      "Puertas eléctricas deslizantes",
      "9 pasajeros",
      "Asientos captain 2da fila",
      "Techo panorámico",
      'Pantalla 10.25"',
      "Apple CarPlay / Android Auto",
      "Cámara 360°",
    ],
    badges: ["9 pasajeros", "Puertas eléctricas"],
    estado: "disponible",
    destacado: false,
    imagenes: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=75&auto=format&fit=crop",
    ],
    fechaIngreso: "2026-03-01",
    financiamiento: financiamiento(34990000),
  },
];

// ========== Helper functions ==========

export function getVehiculos(): Vehiculo[] {
  return vehiculos.filter((v) => v.estado !== "vendido");
}

export function getVehiculoBySlug(slug: string): Vehiculo | undefined {
  return vehiculos.find((v) => v.slug === slug);
}

export function getVehiculosDestacados(): Vehiculo[] {
  return vehiculos.filter((v) => v.destacado && v.estado !== "vendido");
}

export function getMarcasUnicas(): string[] {
  return [...new Set(vehiculos.map((v) => v.marca))].sort();
}

export function getModelosPorMarca(marca: string): string[] {
  return [...new Set(vehiculos.filter((v) => v.marca === marca).map((v) => v.modelo))].sort();
}

export function filtrarVehiculos(filtros: FiltrosVehiculo): Vehiculo[] {
  return getVehiculos().filter((v) => {
    if (filtros.marcas?.length && !filtros.marcas.includes(v.marca)) return false;
    if (filtros.tipoVehiculo?.length && !filtros.tipoVehiculo.includes(v.tipoVehiculo))
      return false;
    if (filtros.precioMin && v.precio < filtros.precioMin) return false;
    if (filtros.precioMax && v.precio > filtros.precioMax) return false;
    if (filtros.anoMin && v.ano < filtros.anoMin) return false;
    if (filtros.anoMax && v.ano > filtros.anoMax) return false;
    if (filtros.kmMax && v.km > filtros.kmMax) return false;
    if (filtros.combustible?.length && !filtros.combustible.includes(v.combustible)) return false;
    if (filtros.transmision?.length && !filtros.transmision.includes(v.transmision)) return false;
    return true;
  });
}

export function ordenarVehiculos(vehiculosArr: Vehiculo[], criterio: string): Vehiculo[] {
  const sorted = [...vehiculosArr];
  switch (criterio) {
    case "precio-asc":
      return sorted.sort((a, b) => a.precio - b.precio);
    case "precio-desc":
      return sorted.sort((a, b) => b.precio - a.precio);
    case "ano-desc":
      return sorted.sort((a, b) => b.ano - a.ano);
    case "ano-asc":
      return sorted.sort((a, b) => a.ano - b.ano);
    case "km-asc":
      return sorted.sort((a, b) => a.km - b.km);
    case "recientes":
      return sorted.sort(
        (a, b) => new Date(b.fechaIngreso).getTime() - new Date(a.fechaIngreso).getTime()
      );
    default:
      return sorted;
  }
}

export function formatPrecio(precio: number): string {
  return "$" + precio.toLocaleString("es-CL");
}
