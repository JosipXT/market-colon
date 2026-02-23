import React, { useState, useEffect } from 'react';
import { Globe, Search, Star, MapPin, Phone, MessageCircle, User, ShieldCheck, Building, Wrench, BookOpen, Utensils, HeartPulse, Menu, X, ArrowRight, MapIcon, PawPrint } from 'lucide-react';

// --- DATOS SIMULADOS Y REALES ---
const MOCK_DATA = [
  // --- Condominio Caoba (Locales/Recomendados) ---
  {
    id: 59,
    name: "Macrobiótica Rio Oro",
    type: "general",
    category: "Salud",
    phone: "8916-4640",
    description: "Gran variedad de productos naturales, vitaminas y suplementos para tu bienestar integral.",
    location: "50 norte del BCR centro comercial Villa Colón",
    image: "https://imagedelivery.net/0F92Czxm-YSY0EqFzZS4jA/eeb829b8-f531-4a3a-0f14-117d3b6e6400/public",
    keywords: ["macrobiótica", "salud", "natural", "suplementos", "vitaminas", "rio oro", "villa colón"]
  },
  {
    id: 58,
    name: "A/O Personal Shoper",
    type: "vecino",
    category: "Servicios",
    description: "Compras en Estados Unidos por encargo de cualquier tienda u outlet. Se cobra un porcentaje de la factura, sin importar el peso de los productos.",
    house: "Casa 112",
    image: "https://imagedelivery.net/0F92Czxm-YSY0EqFzZS4jA/461fff9c-3d4a-4bbe-404b-1e1d2a854700/public",
    keywords: ["compras", "estados unidos", "usa", "encargo", "outlets", "personal shopper", "a/o", "importación"]
  },
  {
    id: 57,
    name: "Divina Tentación",
    type: "vecino",
    category: "Comida",
    phone: "8820-2857",
    website: "https://divinatentacioncr.com",
    description: "Sidra Artesanal “Divina Tentación” es una bebida fermentada de manzana elaborada mediante un proceso controlado y natural. Su color dorado natural, aroma fresco a manzana y sabor equilibrado la convierten en una sidra versátil, ideal tanto para consumo casual como para experiencias gastronómicas. Con un contenido alcohólico moderado al 6%.",
    house: "Casa 103",
    image: "https://imagedelivery.net/0F92Czxm-YSY0EqFzZS4jA/89b1ccf3-b20d-46e7-d274-f8d905006900/public",
    keywords: ["sidra", "artesanal", "manzana", "fermentada", "bebida", "divina tentación", "manzanas"]
  },
  {
    id: 56,
    name: "Sari Fusión Mágica",
    type: "general",
    category: "Comida",
    phone: "4052-3142",
    website: "https://www.instagram.com/sari_fusionmagica/",
    description: "Comida fusión colombiana y tica. Una experiencia mágica de sabores.",
    location: "Ciudad Colón",
    image: "https://imagedelivery.net/0F92Czxm-YSY0EqFzZS4jA/1158fb56-4bdf-4573-ade2-f5e75eb17100/public",
    keywords: ["comida", "fusión", "colombiana", "tica", "restaurante", "sari", "sari fusión mágica", "almuerzo", "cena"]
  },
  {
    id: 55,
    name: "Núcleo Marketing Studio",
    type: "vecino",
    category: "Servicios",
    phone: "8861-9239",
    whatsapp2: "6155-8585",
    description: "Marketing y contenido para negocios y emprendedores: redes sociales, diseño, video, automatizaciones, chatbots y páginas web. Atención rápida por WhatsApp.",
    house: "Casa 44",
    image: "https://imagedelivery.net/0F92Czxm-YSY0EqFzZS4jA/8f8d7755-8ace-4e2b-6307-bc4d27675c00/public",
    keywords: ["marketing", "agencia", "redes sociales", "diseño", "video", "páginas web", "chatbots", "núcleo", "automatizaciones"]
  },
  {
    id: 54,
    name: "Mermeladas Artesanales - Vilà Vilà",
    type: "recomendado",
    category: "Comida",
    phone: "6007-2706",
    website: "https://www.vilavilacr.com/",
    description: "En Vilà Vilà creamos mucho más que mermeladas o productos saludables. Ofrecemos opciones 100 % clean food, elaboradas con ingredientes premium, sin químicos, sin conservantes y sin azúcares refinados.",
    location: "Belén, hacen envíos",
    image: "https://imagedelivery.net/0F92Czxm-YSY0EqFzZS4jA/918819a6-5e2d-4401-d697-33d65ca29700/public",
    keywords: ["mermeladas", "artesanales", "saludables", "clean food", "premium", "vilà vilà", "comida", "sin azúcar"]
  },
  {
    id: 53,
    name: "The Good Way",
    type: "general",
    category: "Salud",
    phone: "7138-0518",
    website: "https://www.instagram.com/thegoodwaycr?igsh=MXNveHJ3MTVyODltOQ==",
    description: "Servicios de nutrición",
    location: "100 m Oeste de la Escuela Rogelio Fernández Güell, dentro de Enjoy Studio",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600",
    keywords: ["nutrición", "nutricionista", "salud", "dieta", "alimentación", "the good way", "enjoy studio"]
  },
  {
    id: 52,
    name: "Mariandrea Salon",
    type: "general",
    category: "Servicios",
    phone: "8628-9020",
    description: "Salón de belleza. Especialista en cabello colocho.",
    location: "Al costado de la Farmacia Mora, sobre calle principal",
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&q=80&w=600",
    keywords: ["salón", "belleza", "cabello", "colocho", "peluquería", "mariandrea"]
  },
  {
    id: 51,
    name: "Piscina Municipal Mora",
    type: "general",
    category: "Educación",
    phone: "8509-4510",
    website: "https://www.facebook.com/share/1CdHsM3VVR/",
    description: "Clases de natación",
    location: "Barrio San Bosco, detrás del CTP de Mora",
    image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&q=80&w=600",
    keywords: ["piscina", "natación", "clases", "deporte", "ejercicio", "municipal", "mora"]
  },
  {
    id: 50,
    name: "Lavacar RAE",
    type: "recomendado",
    category: "Autos",
    phone: "8338-8256",
    description: "Servicio de lavado de autos en Ciudad Colón.",
    location: "Ciudad Colón",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=600",
    keywords: ["lavacar", "lavado automotriz", "lavado", "autos", "limpieza", "rae"]
  },
  {
    id: 49,
    name: "Insanity Autospa",
    type: "recomendado",
    category: "Autos",
    phone: "7274-4911",
    description: "Servicio profesional de autospa y detailing para tu vehículo.",
    location: "Ciudad Colón",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600",
    keywords: ["lavacar", "autospa", "lavado", "autos", "detailing", "insanity"]
  },
  {
    id: 48,
    name: "Repuestos Delgado Lavadora",
    type: "recomendado",
    category: "Hogar",
    phone: "8835-6277",
    description: "Reparación profesional de lavadoras y venta de repuestos.",
    location: "Ciudad Colón",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=600",
    keywords: ["lavadoras", "reparación", "línea blanca", "repuestos", "delgado"]
  },
  {
    id: 47,
    name: "Lavandería & Dry Cleaning",
    type: "recomendado",
    category: "Servicios",
    phone: "7275-0206",
    description: "Lavandería profesional de ropa y servicio de dry cleaning.",
    location: "Ciudad Colón",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=600",
    keywords: ["lavandería", "ropa", "dry cleaning", "lavado", "planchado", "tintorería"]
  },
  {
    id: 46,
    name: "Wados",
    type: "recomendado",
    category: "Mascotas",
    phone: "8751-5227",
    description: "Tienda de mascotas y servicios de clínica veterinaria.",
    location: "Ciudad Colón",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600",
    keywords: ["mascotas", "veterinaria", "perros", "gatos", "tienda", "wados"]
  },
  {
    id: 45,
    name: "Lanco Pinturas",
    type: "recomendado",
    category: "Hogar",
    phone: "8454-8374",
    description: "Tienda de pinturas Lanco y accesorios para el hogar.",
    location: "Ciudad Colón",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=600",
    keywords: ["pinturas", "lanco", "ferretería", "remodelación", "hogar", "pintor"]
  },
  {
    id: 44,
    name: "Wingy",
    type: "recomendado",
    category: "Comida",
    phone: "8617-3032",
    description: "Venta de deliciosas alitas (wings) y comida preparada.",
    location: "Ciudad Colón",
    image: "https://imagedelivery.net/0F92Czxm-YSY0EqFzZS4jA/172de7ec-78cb-4567-a850-f1eac6645800/public",
    keywords: ["alitas", "wings", "comida", "comida rápida", "wingy", "pollo"]
  },
  {
    id: 43,
    name: "Bed & Winnie's",
    type: "general",
    category: "Mascotas",
    phone: "6010-7070",
    website: "https://www.instagram.com/bed_and_winnies?igsh=Yzh2YXA3Z3dlMmZ0",
    description: "Guardería y hotel para perritos",
    location: "Del Super Mora 300 m Oeste",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600",
    keywords: ["perros", "mascotas", "guardería", "hotel", "cuido", "bed and winnies", "perritos"]
  },
  {
    id: 42,
    name: "Doy Aire",
    type: "vecino",
    category: "Hogar",
    phone: "8651-1652",
    description: "Mantenimientos e instalaciones de aires acondicionados",
    house: "Casa 76",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
    keywords: ["aire acondicionado", "a/c", "mantenimiento", "instalación", "doy aire", "clima"]
  },
  {
    id: 41,
    name: "Clínica Fisioterapia Alejandra Porras",
    type: "general",
    category: "Salud",
    phone: "8724-2447",
    description: "Terapia física",
    location: "25 m Oeste del Banco Popular",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    keywords: ["fisioterapia", "terapia física", "rehabilitación", "salud", "masajes", "alejandra porras"]
  },
  {
    id: 40,
    name: "Enjoy Studio",
    type: "general",
    category: "Salud",
    phone: "7138-0518",
    website: "https://www.instagram.com/enjoystudiocr?igsh=M201ajdza2s0ejZp",
    description: "Clases de Pilates, Barre y Yoga.",
    location: "100 m Oeste de la Escuela Rogelio Fernández Güell",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600",
    keywords: ["pilates", "barre", "yoga", "ejercicio", "salud", "bienestar", "enjoy studio"]
  },
  {
    id: 39,
    name: "Dental Love",
    type: "general",
    category: "Salud",
    phone: "8972-8558",
    website: "https://www.instagram.com/dental.lovecr?igsh=cjh4eDhnbG550Wdn",
    description: "Servicios Odontológicos",
    location: "25 m Oeste del Banco Popular",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600",
    keywords: ["dentista", "odontología", "salud", "dientes", "dental love", "clínica dental"]
  },
  {
    id: 38,
    name: "Mauricio Aires Acondicionados",
    type: "recomendado",
    category: "Hogar",
    phone: "8604-0842",
    description: "Servicio recomendado por vecinos para instalación y mantenimiento de aires acondicionados.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=600",
    keywords: ["aire acondicionado", "a/c", "mantenimiento", "instalación", "mauricio", "clima"]
  },
  {
    id: 37,
    name: "Mini Mundo",
    type: "recomendado",
    category: "Servicios",
    phone: "8606-3350",
    whatsappGroup: "https://chat.whatsapp.com/BKYY1iYNLQL4N2dZTMLxAx?mode=gi_t",
    description: "Todo lo que necesitas, en un solo lugar. Compra ya. Ofertas.",
    location: "San José, 25 metros este del ICE de Ciudad Colón, Costa Rica.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600",
    keywords: ["bebés", "bebes", "cosas para bebes", "productos para bebes", "outlet", "ropa", "niños", "maternidad", "mamás", "mini mundo", "ofertas"]
  },
  {
    id: 36,
    name: "Manileño Barbershop",
    type: "general",
    category: "Servicios",
    phone: "8925-7801",
    description: "Barbería profesional. Cortes de cabello y barba de alta calidad para un estilo impecable.",
    location: "Plaza Villa Columbus, Contiguo a, Local #14, San José, Cd Colón",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=600",
    keywords: ["barbero", "barbería", "corte", "cabello", "barba", "manileño"]
  },
  {
    id: 35,
    name: "David Cavallinni - Cedazos",
    type: "recomendado",
    category: "Hogar",
    phone: "6260-1989",
    description: "Instalación profesional de cedazos para puertas y ventanas. Servicio recomendado por la comunidad.",
    location: "Viene a Condominio Caoba",
    image: "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=600",
    keywords: ["cedazos", "puertas", "ventanas", "insectos", "mosquiteros", "david", "cavallinni"]
  },
  {
    id: 34,
    name: "Hamburguesas Gallohaus",
    type: "vecino",
    category: "Comida",
    phone: "8846-7433",
    description: "Deliciosas hamburguesas artesanales preparadas por tus vecinos. Excelente sabor y calidad directo a tu puerta.",
    house: "Casa 90",
    image: "https://imagedelivery.net/0F92Czxm-YSY0EqFzZS4jA/3f11c9d0-2209-4e73-1915-df8c1ad5af00/public",
    keywords: ["hamburguesas", "comida", "comida rápida", "gallohaus", "burger", "cena"]
  },
  {
    id: 24,
    name: "Taxista Richard Jimenez",
    type: "recomendado",
    category: "Servicios",
    phone: "8721-3793",
    description: "Servicio de taxi rápido y seguro recomendado por la comunidad. Cuenta con datáfono para pagos con tarjeta.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1490650404312-a2175773bbf5?auto=format&fit=crop&q=80&w=600",
    keywords: ["taxi", "transporte", "viaje", "chofer", "richard", "jimenez", "datafono"]
  },
  {
    id: 25,
    name: "Evelyn Dulce Secreto",
    type: "recomendado",
    category: "Comida",
    phone: "8626-7236",
    description: "Deliciosa comida casera por encargo: costillas, piernas de cerdo, lasagnas y postres. ¡Un dulce secreto!",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
    keywords: ["comida", "postres", "costillas", "cerdo", "lasagna", "evelyn", "dulce secreto", "encargo"]
  },
  {
    id: 26,
    name: "Sandra's Delicatessen (Catering)",
    type: "recomendado",
    category: "Servicios",
    phone: "6482-2136",
    description: "Servicio de catering completo para almuerzos, bodas, cumpleaños y eventos corporativos. Usted decide el nivel de servicio.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600",
    keywords: ["catering", "comida", "eventos", "bodas", "fiestas", "almuerzos", "sandra"]
  },
  {
    id: 27,
    name: "Chef Lu Doug",
    type: "recomendado",
    category: "Comida",
    phone: "6396-2935",
    description: "Chef profesional disponible para cenas privadas y eventos exclusivos con menú personalizado.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600",
    keywords: ["chef", "cocina", "cenas", "eventos", "privado", "lu doug"]
  },
  {
    id: 28,
    name: "Alberto S.P. Pan Artesanal",
    type: "recomendado",
    category: "Comida",
    phone: "8775-6778",
    description: "Panadería artesanal por encargo. Deliciosos panes frescos horneados en casa recomendados por la comunidad.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
    keywords: ["pan", "artesanal", "panadería", "postres", "alberto"]
  },
  {
    id: 29,
    name: "Panadería La Erre",
    type: "general",
    category: "Comida",
    phone: "8750-7725",
    description: "Excelente panadería en Ciudad Colón con gran variedad de panes y repostería recién horneada.",
    location: "Ciudad Colón, Mora",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=600",
    keywords: ["panadería", "pan", "repostería", "café", "la erre"]
  },
  {
    id: 30,
    name: "Moises Jardinero",
    type: "recomendado",
    category: "Hogar",
    phone: "8927-6431",
    description: "Servicio completo de jardinería profesional, mantenimiento de zonas verdes y paisajismo.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1673853233774-34a726cfc335?auto=format&fit=crop&q=80&w=600",
    keywords: ["jardín", "jardinero", "poda", "mantenimiento", "moises"]
  },
  {
    id: 31,
    name: "Ale Salón",
    type: "general",
    category: "Servicios",
    phone: "8338-7220",
    description: "Salón de belleza completo. Cortes, tintes, peinados y tratamientos capilares. Propietaria vecina de Casa 52.",
    location: "Ciudad Colón, Mora",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600",
    keywords: ["salón", "belleza", "cabello", "corte", "tinte", "peluquería", "ale"]
  },
  {
    id: 32,
    name: "Servicentro Los Ángeles",
    type: "general",
    category: "Autos",
    phone: "2249-5672",
    description: "Gasolinera de Ciudad Colón y servicio de mecánica rápida automotriz (cambio de luces, aceite).",
    location: "Ciudad Colón, Mora",
    image: "https://images.unsplash.com/photo-1567777176186-dfa735f1fe20?auto=format&fit=crop&q=80&w=600",
    keywords: ["gasolinera", "estación de servicio", "combustible", "mecánica rápida", "luces", "autos", "los angeles"]
  },
  {
    id: 33,
    name: "El Chirote Bar & Boquería",
    type: "general",
    category: "Comida",
    phone: "2249-0468",
    website: "https://chiroteboqueriabirrera.com/",
    description: "Boquería y bar cervecero en Ciudad Colón. Auténticas tapas, excelentes bebidas y un ambiente acogedor.",
    location: "Ciudad Colón, Mora",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=600",
    keywords: ["bar", "restaurante", "chirote", "tapas", "cerveza", "boquería", "boqueria", "birra", "tragos"]
  },
  {
    id: 23,
    name: "Tequeños Doña Ana",
    type: "vecino",
    category: "Comida",
    phone: "8309-5649",
    description: "Deliciosos tequeños de queso con salsa de ajo y porciones de quesillo casero. Los venden tanto congelados como listos para eventos con la estación de Tequeños. Directo a tu puerta.",
    house: "Casa 92",
    image: "https://imagedelivery.net/0F92Czxm-YSY0EqFzZS4jA/2194584f-67f2-4067-a5f0-d810f452c600/public",
    keywords: ["tequeños", "quesillo", "comida", "postres", "queso", "venezolana", "doña ana", "deditos", "eventos", "congelados"]
  },
  {
    id: 16,
    name: "El Mariachi Santa Ana",
    type: "recomendado",
    category: "Servicios",
    phone: "8395-5724",
    description: "Música en vivo para amenizar todo tipo de eventos y celebraciones.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&q=80&w=600",
    keywords: ["mariachi", "música", "fiesta", "eventos", "santa ana", "serenata"]
  },
  {
    id: 17,
    name: "Jardinero Roger",
    type: "recomendado",
    category: "Hogar",
    phone: "6156-5688",
    description: "Mantenimiento profesional de áreas verdes, poda, diseño y cuidado general de jardines.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600",
    keywords: ["jardín", "jardinero", "poda", "césped", "plantas", "mantenimiento exterior", "roger"]
  },
  {
    id: 18,
    name: "Construcciones Andres Construcción",
    type: "recomendado",
    category: "Hogar",
    phone: "6184-8883",
    description: "Servicios integrales de construcción, remodelaciones, albañilería general y acabados.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600",
    keywords: ["construcción", "constructor", "albañil", "remodelación", "obra", "andres"]
  },
  {
    id: 19,
    name: "Construcciones El Chambeador",
    type: "recomendado",
    category: "Hogar",
    phone: "6042-1690",
    description: "Obra gris, remodelaciones y reparaciones estructurales y estéticas para el hogar.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=600",
    keywords: ["construcción", "albañil", "remodelación", "reparaciones", "chambeador"]
  },
  {
    id: 20,
    name: "Multiservicios (Lavadoras)",
    type: "recomendado",
    category: "Hogar",
    phone: "8949-0672",
    description: "Diagnóstico y arreglo de lavadoras, secadoras y electrodomésticos de línea blanca.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=600",
    keywords: ["lavadora", "secadora", "reparación", "línea blanca", "electroméstico", "multiservicios"]
  },
  {
    id: 21,
    name: "Melvin Malverde (Reparaciones)",
    type: "recomendado",
    category: "Hogar",
    phone: "8398-4614",
    description: "Revisión preventiva y reparación a domicilio de lavadoras de diversas marcas.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=600",
    keywords: ["lavadora", "secadora", "reparación", "línea blanca", "melvin", "malverde"]
  },
  {
    id: 22,
    name: "Tecniservicios",
    type: "recomendado",
    category: "Hogar",
    phone: "6069-7218",
    description: "Reparación y mantenimiento especializado de lavadoras residenciales. Servicio garantizado.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&q=80&w=600",
    keywords: ["lavadora", "secadora", "reparación", "línea blanca", "tecniservicios"]
  },
  {
    id: 1,
    name: "Refrigeración Industrial Sánchez (Luis)",
    type: "recomendado",
    category: "Hogar",
    phone: "8465-4852",
    description: "Servicio especializado en mantenimiento e instalación de aires acondicionados y refrigeración industrial.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600",
    keywords: ["aire acondicionado", "a/c", "mantenimiento", "instalación", "refrigeración", "luis", "sánchez", "clima", "frío"]
  },
  {
    id: 2,
    name: "Alterna Electromecánica S.A",
    type: "vecino",
    category: "Hogar",
    phone: "8781-7426",
    description: "Servicios de ingeniería eléctrica y mecánica en general. Atención rápida dentro de Condominio Caoba.",
    house: "Casa 14",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600",
    keywords: ["ingeniería", "eléctrica", "mecánica", "electricista", "electricidad", "alonso", "reparaciones"]
  },
  {
    id: 3,
    name: "Taller Memo",
    type: "recomendado",
    category: "Autos",
    phone: "8837-5545",
    description: "Mecánico automotriz recomendado por vecinos. Excelente servicio y honestidad para reparaciones en general.",
    location: "Viene a Condominio Caoba",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600",
    keywords: ["mecánico", "mecanico", "taller", "memo", "carro", "vehículo", "motor", "arreglo", "autos", "reparación"]
  },

  // --- Ciudad Colón (Reales extraídos de Google Maps) ---
  {
    id: 4,
    name: "Anfiteatro de Villa",
    type: "general",
    category: "Comida",
    phone: "8403-4545",
    description: "Restaurantes, pizzería y tours guiados por las impresionantes cavernas. Un atractivo turístico icónico de Ciudad Colón.",
    location: "Ciudad Colón, 800m Sur de la clínica",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=600",
    keywords: ["restaurante", "pizza", "cavernas", "tour", "turismo", "mirador", "anfiteatro", "villa"],
    lat: 9.9115,
    lng: -84.2465
  },
  {
    id: 5,
    name: "La Planta Brewpub",
    type: "general",
    category: "Comida",
    phone: "6159-5851",
    description: "Excelente bar y restaurante con cervezas artesanales y un ambiente indómito. Libre de reggaetón.",
    location: "50m este de la escuela de Brasil de Mora",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=600",
    keywords: ["restaurante", "bar", "cerveza", "artesanal", "pub", "comida", "hamburguesas", "la planta"],
    lat: 9.9231,
    lng: -84.2346
  },
  {
    id: 6,
    name: "Farmacia Mora",
    type: "general",
    category: "Salud",
    phone: "2249-1416",
    description: "Farmacia de confianza en la zona. Amplio surtido de medicamentos, entregas y parqueo.",
    location: "Av. 6, Ciudad Colón, Mora",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=600",
    keywords: ["farmacia", "medicinas", "pastillas", "salud", "médico", "inyecciones", "mora"]
  },
  {
    id: 7,
    name: "Centro Médico VillaMed",
    type: "general",
    category: "Salud",
    phone: "2249-5000",
    description: "Atención médica integral con variedad de especialidades. Comprometidos con su salud y bienestar.",
    location: "Ciudad Colón, Mora",
    website: "https://centromedicovillamed.com/",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
    keywords: ["clínica", "médico", "doctor", "consultorio", "salud", "laboratorio", "pediatra", "villamed"]
  },
  {
    id: 8,
    name: "Taller TEMM",
    type: "general",
    category: "Autos",
    phone: "8370-3072",
    description: "Centro de servicio y lubricentro. Mantenimiento, cambio de aceite y mecánica automotriz.",
    location: "Ciudad Colón, Mora",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600",
    keywords: ["llantas", "lubricentro", "aceite", "mecánico", "taller", "autos", "neumáticos", "temm"]
  },
  {
    id: 9,
    name: "Restaurante Sabor a Pueblo",
    type: "general",
    category: "Comida",
    phone: "2249-1342",
    description: "Auténtica comida típica costarricense. Casados, olla de carne, chifrijo y desayunos.",
    location: "200m Sur del Fresh Market, Ciudad Colón",
    image: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=600",
    keywords: ["restaurante", "comida", "casados", "típica", "almuerzo", "cena", "pueblo"]
  },
  {
    id: 10,
    name: "Librería Ziggy",
    type: "general",
    category: "Educación",
    phone: "8478-6816",
    description: "Todo en útiles escolares, suministros de oficina, copias y regalos. Abierto de lunes a sábado.",
    location: "Centro de Ciudad Colón",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    keywords: ["librería", "bazar", "útiles", "escuela", "copias", "impresiones", "cuadernos", "ziggy"]
  },
  {
    id: 11,
    name: "Conservatorium",
    type: "general",
    category: "Comida",
    phone: "4081-2451",
    description: "Experiencia gastronómica de vanguardia. Carnes maduradas, cocina contemporánea e ingredientes locales.",
    location: "Ciudad Colón",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=600",
    keywords: ["restaurante", "chef", "gourmet", "carnes", "cena", "exclusivo", "conservatorium"]
  },
  {
    id: 12,
    name: "Ferretería D' HEMICA",
    type: "general",
    category: "Hogar",
    phone: "2249-6088",
    description: "Ferretería local de confianza con amplio surtido de materiales para construcción y reparaciones del hogar.",
    location: "C. 2, San José, Cd Colón",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600",
    keywords: ["ferretería", "ferreteria", "herramientas", "construcción", "pintura", "clavos", "hemica"]
  },
  {
    id: 13,
    name: "Clínica Veterinaria Agrocomercial Colón",
    type: "general",
    category: "Mascotas",
    phone: "2249-1970",
    description: "Consultas veterinarias, farmacia, limpieza dental, rayos X y estética canina. Atención integral para tu mascota.",
    location: "50 metros este de la torre del ICE",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600",
    keywords: ["veterinaria", "perro", "gato", "mascotas", "animales", "vacunas", "agrocomercial"]
  },
  {
    id: 14,
    name: "TAVA Pizza & Lunch",
    type: "general",
    category: "Comida",
    phone: "8888-0000",
    description: "Variedad de pizzas, alitas, calzones y pastas. Ofrecen combos familiares y excelente servicio exprés vía Uber Eats.",
    location: "Ciudad Colón Centro",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600",
    keywords: ["pizza", "pizzería", "comida rápida", "alitas", "calzone", "pasta", "tava"]
  },
  {
    id: 15,
    name: "Fresh Market Mora",
    type: "general",
    category: "Hogar",
    phone: "2105-2466",
    website: "https://freshmarket.co.cr",
    description: "Cadena refinada de tiendas de alimentos con productos locales, comidas preparadas, vino y más.",
    location: "Plaza Vía, 2 km al Oeste de Swiss Travel, San José, Cd Colón",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=600",
    keywords: ["supermercado", "compras", "pulpería", "abarrotes", "fresh market", "víveres"]
  }
];

const CATEGORIES = [
  { name: "Todas las categorías", icon: null },
  { name: "Hogar", icon: Wrench },
  { name: "Comida", icon: Utensils },
  { name: "Mascotas", icon: PawPrint },
  { name: "Educación", icon: BookOpen },
  { name: "Salud", icon: HeartPulse },
  { name: "Autos", icon: Wrench },
  { name: "Servicios", icon: Building },
];

// --- COMPONENTE ANIMACIÓN DE ESCRITURA ---
const TypewriterEffect = () => {
  const words = ["mecánico de confianza.", "barbero favorito.", "electricista experto.", "postre delicioso.", "fontanero rápido."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = 50;
    const deleteSpeed = 30;
    const delayBetweenWords = 500;

    const handleTyping = () => {
      const fullWord = words[currentWordIndex];

      if (isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText.length === fullWord.length) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
          return;
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="text-[#DCA742] font-semibold inline-block">
      {currentText}
      <span className="animate-pulse border-r-2 border-[#DCA742] ml-1"></span>
    </span>
  );
};

const ExpandableDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text && text.length > 120;

  return (
    <div className="flex-1 mb-6 flex flex-col items-start w-full">
      <p className={`text-slate-600 text-sm w-full ${!isExpanded ? 'line-clamp-3' : ''}`}>
        {text}
      </p>
      {isLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#DCA742] hover:text-[#c49236] text-xs font-bold mt-1.5 transition-colors focus:outline-none"
        >
          {isExpanded ? 'Ver menos' : 'Leer más...'}
        </button>
      )}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [activeTab, setActiveTab] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'Hogar',
    whatsapp: '',
    phone: '',
    website: '',
    description: '',
    location: ''
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        _subject: `Market Colon nuevo proveedor - ${formData.businessName}`,
        "Nombre del Negocio": formData.businessName,
        "Categoría": formData.category,
        "WhatsApp": formData.whatsapp || 'No especificado',
        "Teléfono": formData.phone || 'No especificado',
        "Página Web": formData.website || 'No especificada',
        "Descripción": formData.description,
        "Ubicación o Casa": formData.location,
      };

      await fetch("https://formsubmit.co/ajax/josiptaylor@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      setSubmitSuccess(true);
      setFormData({ businessName: '', category: 'Hogar', whatsapp: '', phone: '', website: '', description: '', location: '' });
    } catch (error) {
      console.error("Error enviando formulario:", error);
      alert("Hubo un error al enviar la solicitud. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filtrado
  const filteredProviders = MOCK_DATA.filter(provider => {
    const matchesTab = activeTab === 'todos' || provider.type === activeTab;
    const query = searchQuery.toLowerCase().trim();

    // Búsqueda inteligente
    const matchesSearch = query === '' ||
      provider.name.toLowerCase().includes(query) ||
      provider.description.toLowerCase().includes(query) ||
      provider.category.toLowerCase().includes(query) ||
      (provider.keywords && provider.keywords.some(kw => kw.toLowerCase().includes(query)));

    const matchesCategory = selectedCategory === "Todas las categorías" || provider.category === selectedCategory;

    return matchesTab && matchesSearch && matchesCategory;
  });

  // Utilidades visuales
  const getBadgeStyle = (type) => {
    switch (type) {
      case 'recomendado': return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case 'vecino': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'general': return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "";
    }
  };

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'recomendado': return <ShieldCheck className="w-3.5 h-3.5 mr-1" />;
      case 'vecino': return <User className="w-3.5 h-3.5 mr-1" />;
      case 'general': return <MapPin className="w-3.5 h-3.5 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-[#DCA742] selection:text-white relative z-0">

      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 z-[-1] bg-[#FDFBF7] bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:30px_30px] opacity-60"></div>

      {/* NEW SERVICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSubmitting && !submitSuccess && setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full p-2 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">¡Gracias por sugerir!</h3>
                <p className="text-slate-600 text-lg leading-relaxed max-w-sm mx-auto">
                  La información ha sido enviada exitosamente. El servicio será revisado y agregado en un rango de <strong className="text-[#DCA742]">72 horas</strong>.
                </p>
                <button
                  onClick={() => { setSubmitSuccess(false); setIsModalOpen(false); }}
                  className="mt-8 bg-[#2C3E50] hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-medium transition-colors w-full"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-1">Publicar un Servicio</h3>
                <p className="text-slate-500 text-sm mb-6">Completa los datos del negocio para agregarlo al directorio. Verificaremos la información pronto.</p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre del Negocio *</label>
                    <input required type="text" value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#DCA742]/50 focus:border-[#DCA742] transition-colors" placeholder="Ej: Barbería Don José" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Categoría *</label>
                    <select required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#DCA742]/50 focus:border-[#DCA742] transition-colors appearance-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em" }}>
                      <option value="Hogar">Hogar</option>
                      <option value="Comida">Comida</option>
                      <option value="Mascotas">Mascotas</option>
                      <option value="Educación">Educación</option>
                      <option value="Salud">Salud</option>
                      <option value="Autos">Autos</option>
                      <option value="Servicios">Servicios</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp (Opcional)</label>
                      <input type="tel" value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#DCA742]/50 focus:border-[#DCA742] transition-colors" placeholder="Ej: 8888-0000" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono (Opcional)</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#DCA742]/50 focus:border-[#DCA742] transition-colors" placeholder="Ej: 2249-0000" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Sitio Web (Opcional)</label>
                      <input type="text" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#DCA742]/50 focus:border-[#DCA742] transition-colors" placeholder="Ej: miweb.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Ubicación o N° de Casa (Opcional)</label>
                    <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#DCA742]/50 focus:border-[#DCA742] transition-colors" placeholder="Ej: Condominio Caoba, Casa 42" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Breve Descripción *</label>
                    <textarea required rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#DCA742]/50 focus:border-[#DCA742] transition-colors resize-none" placeholder="¿Qué servicios o productos ofrecen?"></textarea>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#DCA742] hover:bg-[#c99535] text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md mt-2 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Enviando...</span>
                    ) : 'Enviar Solicitud'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* GENERIC MODALS (About, Terms, Privacy) */}
      {(isAboutOpen || isTermsOpen || isPrivacyOpen) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { setIsAboutOpen(false); setIsTermsOpen(false); setIsPrivacyOpen(false); }}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-2xl p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setIsAboutOpen(false); setIsTermsOpen(false); setIsPrivacyOpen(false); }}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pt-2">
              {isAboutOpen && (
                <>
                  <h3 className="text-3xl font-bold text-[#2C3E50] mb-6 border-b border-slate-100 pb-4">Sobre Nosotros</h3>
                  <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                    <p className="text-lg leading-relaxed pt-2">
                      Somos una plataforma digital diseñada para integrar los diferentes servicios de Ciudad Colón y nuestra comunidad.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Nacimos a partir de las recomendaciones compartidas por los vecinos del Condominio Caoba, con el objetivo de brindar acceso a soluciones al alcance de manera sencilla y rápida. Facilitamos el contacto entre excelentes proovedores y aquellas personas que los necesitan.
                    </p>
                  </div>
                </>
              )}
              {isTermsOpen && (
                <>
                  <h3 className="text-3xl font-bold text-[#2C3E50] mb-6 border-b border-slate-100 pb-4">Términos y Condiciones</h3>
                  <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                    <p className="pt-2">
                      Market Colón actúa únicamente como un directorio abierto para facilitar la conexión entre usuarios y proveedores de servicios.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Toda interacción o transacción se realiza e interpreta directamente entre el proveedor y el consumidor.</li>
                      <li>No cobramos comisiones ni participamos de la facturación comercial de los negocios expuestos.</li>
                      <li>La plataforma no se hace responsable por un uso indebido de los servicios o garantías no ejecutadas, sirviendo únicamente como herramienta de visibilidad local.</li>
                    </ul>
                  </div>
                </>
              )}
              {isPrivacyOpen && (
                <>
                  <h3 className="text-3xl font-bold text-[#2C3E50] mb-6 border-b border-slate-100 pb-4">Aviso de Privacidad</h3>
                  <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                    <p className="pt-2">
                      Su privacidad y seguridad en internet son de enorme importancia para Market Colón.
                    </p>
                    <p>
                      Toda la información contenida en el directorio es previamente brindada por la comunidad para ser pública; los datos ingresados desde el formato sugerir servicio son administrados mediante correos directos en forma segura. No vendemos ni compartimos historiales o bases de datos a agencias terciarias de marketing.
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="mt-10 flex justify-end">
              <button
                onClick={() => { setIsAboutOpen(false); setIsTermsOpen(false); setIsPrivacyOpen(false); }}
                className="bg-[#2C3E50] hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <div className="leading-none tracking-tight text-[26px] font-bold text-[#2C3E50]">
                Market<br />Colón<span className="text-[#DCA742] text-[32px] leading-[0]">.</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-600 hover:text-[#DCA742] font-medium transition-colors">Inicio</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsAboutOpen(true); }} className="text-slate-600 hover:text-[#DCA742] font-medium transition-colors">Sobre Nosotros</a>
              <button onClick={() => setIsModalOpen(true)} className="bg-[#2C3E50] hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg flex items-center">
                Publicar Servicio <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#" className="block px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-md">Inicio</a>
              <button onClick={() => { setMobileMenuOpen(false); setIsAboutOpen(true); }} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-md">Sobre Nosotros</button>
              <button onClick={() => { setIsModalOpen(true); setMobileMenuOpen(false); }} className="w-full mt-4 bg-[#2C3E50] text-white px-6 py-3 rounded-xl font-medium shadow-md">
                Publicar Servicio
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden">
        {/* Abstract background shapes con animación */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl overflow-hidden pointer-events-none opacity-60">
          <div className="absolute top-[0%] right-[0%] w-[500px] h-[500px] rounded-full bg-[#DCA742]/15 blur-3xl animate-blob"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-slate-400/20 blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#2C3E50]/5 blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#2C3E50] tracking-tight mb-6 leading-tight flex flex-col items-center min-h-[140px] md:min-h-[180px]">
              <span className="mb-2 md:mb-4">Encuentra tu</span>
              <div className="h-[60px] md:h-[90px] flex justify-center w-full">
                <TypewriterEffect />
              </div>
            </h1>
            <p className="mt-2 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              La red de confianza de <strong>Condominio Caoba</strong>. Descubre servicios recomendados por tus vecinos o contacta directamente a la comunidad en Ciudad Colón.
            </p>

            {/* Main Search Bar */}
            <div className="max-w-3xl mx-auto bg-white p-2 md:p-3 rounded-2xl md:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col md:flex-row items-center gap-3">
              <div className="flex-1 w-full flex items-center px-4 py-2">
                <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="¿Qué servicio estás buscando hoy?"
                  className="w-full text-slate-800 bg-transparent focus:outline-none text-base md:text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hidden md:block w-px h-8 bg-slate-200 mx-2"></div>
              <button
                className="w-full md:w-auto bg-[#DCA742] hover:bg-[#c99535] text-white px-8 py-3.5 rounded-xl md:rounded-full font-bold transition-colors shadow-md text-lg"
                onClick={() => document.getElementById('directorio').scrollIntoView({ behavior: 'smooth' })}
              >
                Buscar
              </button>
            </div>

            {/* Quick Categories */}
            <div className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
              <span className="text-sm text-slate-500 w-full md:w-auto flex items-center justify-center md:mr-2">Búsquedas populares:</span>
              {["Hogar", "Comida", "Educación", "Mascotas"].map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); document.getElementById('directorio').scrollIntoView({ behavior: 'smooth' }); }}
                  className="px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-sm hover:border-[#DCA742] hover:text-[#DCA742] transition-colors shadow-sm"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT / DIRECTORY */}
      <main id="directorio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Section Header & Tabs */}
        <div className="flex flex-col mb-10 gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-3">Directorio de Servicios</h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Escoge la categoría que desees visualizar: recomendaciones validadas de vecinos del condominio, proveedores de servicios que viven dentro del condominio, o comercios de Ciudad Colón disponibles.
              </p>
            </div>

            {/* Modern Toggle Tabs */}
            <div className="flex flex-col w-full md:w-auto">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-2 hidden md:block text-right">Filtrar Profesionales</span>
              <div className="flex p-1 bg-slate-100/80 rounded-xl md:rounded-full w-full overflow-x-auto hide-scrollbar border border-slate-200/60 shadow-inner">
                {[
                  { id: 'todos', label: 'Todos', icon: Globe },
                  { id: 'recomendado', label: 'Recomendados', icon: ShieldCheck },
                  { id: 'vecino', label: 'Vecinos', icon: User },
                  { id: 'general', label: 'Ciudad Colón', icon: Building }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-center px-4 md:px-5 py-2.5 rounded-lg md:rounded-full text-sm font-semibold transition-all whitespace-nowrap min-w-[100px] md:min-w-[120px] ${activeTab === tab.id
                        ? 'bg-white text-[#2C3E50] shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                        }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 space-x-3 hide-scrollbar mb-4">
          {CATEGORIES.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${selectedCategory === category.name
                  ? 'bg-[#2C3E50] text-white border-[#2C3E50] shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#DCA742] hover:text-[#DCA742]'
                  }`}
              >
                {Icon && <Icon className="w-4 h-4 mr-2" />}
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Info Banner based on active tab */}
        {activeTab === 'general' && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-start shadow-sm mt-4">
            <Building className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-amber-600" />
            <p className="text-sm">
              <strong className="font-semibold block mb-1">Negocios Reales de Ciudad Colón</strong>
              Estos servicios locales han sido recopilados para tu conveniencia en toda el área de Ciudad Colón y cantón de Mora.
            </p>
          </div>
        )}

        {/* Grid of Cards */}
        {filteredProviders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mt-8">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No encontramos resultados</h3>
            <p className="text-slate-500 max-w-md mx-auto">No hay servicios que coincidan con tu búsqueda en esta categoría. Intenta con otros términos o cambia de pestaña.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Todas las categorías'); }}
              className="mt-6 text-[#DCA742] font-semibold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredProviders.map(provider => (
              <div key={provider.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group flex flex-col">

                {/* Image Header */}
                <div className="h-48 relative overflow-hidden bg-slate-100">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge over image */}
                  <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center shadow-sm backdrop-blur-sm ${getBadgeStyle(provider.type)}`}>
                    {getBadgeIcon(provider.type)}
                    {provider.type === 'recomendado' ? 'Recomendado' : provider.type === 'vecino' ? 'Vecino' : 'Local (Colón)'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-[#2C3E50] leading-tight group-hover:text-[#DCA742] transition-colors">
                      {provider.name}
                    </h3>
                  </div>

                  <div className="inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {provider.category}
                  </div>

                  <ExpandableDescription text={provider.description} />

                  <div className="space-y-2 mb-6 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                    {provider.house ? (
                      <div className="flex items-center font-medium">
                        <User className="w-4 h-4 mr-2.5 text-slate-400" />
                        <span>{provider.house}</span>
                      </div>
                    ) : (
                      <div className="flex items-center font-medium">
                        <MapPin className="w-4 h-4 mr-2.5 text-slate-400" />
                        <span className="truncate">{provider.location}</span>
                      </div>
                    )}
                    {provider.type === 'recomendado' && (
                      <div className="flex items-center text-emerald-600 font-medium">
                        <ShieldCheck className="w-4 h-4 mr-2.5" />
                        <span>Recomendado por la comunidad de Caoba</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 mt-auto">
                    <div className={`grid ${(provider.phone && /^[678]/.test(provider.phone.replace(/\D/g, ''))) ? 'grid-cols-2 gap-3' : 'grid-cols-1'}`}>
                      {provider.phone && /^[678]/.test(provider.phone.replace(/\D/g, '')) && (
                        <a
                          href={`https://wa.me/506${provider.phone.replace('-', '')}?text=Hola,%20los%20encontré%20en%20Market%20Colón...`}
                          target="_blank" rel="noreferrer"
                          className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-xl flex items-center justify-center font-semibold transition-colors shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </a>
                      )}
                      {provider.phone && (
                        <a
                          href={`tel:+506${provider.phone.replace('-', '')}`}
                          className="bg-slate-100 hover:bg-slate-200 text-[#2C3E50] py-2.5 rounded-xl flex items-center justify-center font-semibold transition-colors"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Llamar
                        </a>
                      )}
                    </div>

                    {provider.whatsapp2 && (
                      <a
                        href={`https://wa.me/506${provider.whatsapp2.replace('-', '')}?text=Hola,%20los%20encontré%20en%20Market%20Colón...`}
                        target="_blank" rel="noreferrer"
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-xl flex items-center justify-center font-semibold transition-colors shadow-sm w-full"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp #2
                      </a>
                    )}

                    {provider.website && (
                      <a
                        href={provider.website}
                        target="_blank" rel="noreferrer"
                        className="bg-[#2C3E50] hover:bg-slate-800 text-white py-2.5 rounded-xl flex items-center justify-center font-semibold transition-colors shadow-sm w-full"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Sitio Web
                      </a>
                    )}

                    {provider.whatsappGroup && (
                      <a
                        href={provider.whatsappGroup}
                        target="_blank" rel="noreferrer"
                        className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-200 py-2.5 rounded-xl flex items-center justify-center font-semibold transition-colors w-full shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
                        Unirse al Grupo
                      </a>
                    )}
                  </div>
                </div>
              </div >
            ))
            }
          </div >
        )}
      </main >

      {/* FOOTER */}
      < footer className="bg-[#2C3E50] text-slate-300 py-12 border-t border-slate-800 mt-12" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

            <div className="text-center md:text-left">
              <div className="leading-none tracking-tight text-[24px] font-bold text-white mb-4">
                Market<br />Colón<span className="text-[#DCA742] text-[28px] leading-[0]">.</span>
              </div>
              <p className="text-sm text-slate-400 max-w-xs mx-auto md:mx-0">
                Conectando a nuestra comunidad. Recomendaciones reales de vecinos para vecinos.
              </p>
            </div>

            <div className="flex justify-center space-x-6">
              <a href="#" onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }} className="hover:text-white transition-colors">Términos</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsPrivacyOpen(true); }} className="hover:text-white transition-colors">Privacidad</a>
              <a href="mailto:josiptaylor@gmail.com" className="hover:text-white transition-colors">Contacto</a>
            </div>

            <div className="text-center md:text-right">
              <button onClick={() => setIsModalOpen(true)} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                Sugerir un servicio
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-700/50 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Market Colón. Todas las imágenes empleadas son imágenes de stock con fines de ilustración referencial.
          </div>
        </div>
      </footer >
    </div >
  );
}
