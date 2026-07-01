/**
 * Rutas y destinos de Las Senderistas — mapa del mundo.
 *
 * Dos tipos:
 *  - type "local"   → hikes de Monterrey: con stats (altitud/duración/desnivel/
 *                     precio) y botón Reservar (WhatsApp). Coordenadas reales.
 *  - type "destino" → expediciones/destinos del mundo: SOLO imagen + descripción
 *                     (sin costo ni reservación). Coordenadas reales.
 *
 * `levels` alimenta el filtro de dificultad: "facil" | "moderada" | "avanzada".
 * `image` es relativa a /public.
 */
export const WHATSAPP_PHONE = "528119176335";

export const ROUTES = [
  /* ===================== LOCALES (Monterrey) ===================== */
  {
    id: "cerro-de-la-silla",
    type: "local",
    name: "Cerro de la Silla",
    levelLabel: "Intermedio-Avanzado",
    levels: ["moderada", "avanzada"],
    image: "/media/destinos/cerro-de-la-silla.jpg",
    description:
      "El ícono más emblemático de Monterrey. Una ruta desafiante por senderos rocosos con pendientes pronunciadas hasta vistas panorámicas incomparables de toda la ciudad.",
    stats: { altitud: "1,750 m", duracion: "5-6 horas", desnivel: "+800 m", precio: "$400 MXN" },
    coords: [25.6283, -100.2247],
  },
  {
    id: "la-martha",
    type: "local",
    name: "La Martha",
    levelLabel: "Intermedio",
    levels: ["moderada"],
    image: "/media/destinos/la-martha.jpg",
    description:
      "Una ruta clásica que pone a prueba tu resistencia. Pendientes exigentes y terreno variado te recompensan con vistas espectaculares de la sierra. Ideal para un reto moderado.",
    stats: { altitud: "1,340 m", duracion: "4-5 horas", desnivel: "+650 m", precio: "$400 MXN" },
    coords: [25.2436, -100.4983],
  },
  {
    id: "el-chupon",
    type: "local",
    name: "El Chupón",
    levelLabel: "Principiante-Intermedio",
    levels: ["facil", "moderada"],
    image: "/media/destinos/el-chupon.jpg",
    description:
      "Una montaña icónica con un sendero bien definido. Perfecta para principiantes que quieren iniciarse en el hiking con una experiencia gratificante y vistas hermosas.",
    stats: { altitud: "1,200 m", duracion: "3-4 horas", desnivel: "+450 m", precio: "$400 MXN" },
    coords: [25.645, -100.52],
  },
  {
    id: "rinos",
    type: "local",
    name: "Rinos",
    levelLabel: "Avanzado",
    levels: ["avanzada"],
    image: "/media/destinos/rinos.jpg",
    description:
      "Una aventura completa que combina senderismo y escalada moderada. Terreno técnico con secciones de roca que requieren uso de manos. Para quienes buscan emoción adicional.",
    stats: { altitud: "1,450 m", duracion: "5-6 horas", desnivel: "+700 m", precio: "$400 MXN" },
    coords: [25.74, -100.63],
  },
  {
    id: "chipinque",
    type: "local",
    name: "Chipinque",
    levelLabel: "Principiante-Intermedio",
    levels: ["facil", "moderada"],
    image: "/media/destinos/chipinque.jpg",
    description:
      "Rutas variadas en el emblemático parque nacional. Bosques de pino y encino con múltiples senderos para todos los niveles. Perfecto para disfrutar la naturaleza cerca de la ciudad.",
    stats: { altitud: "2,200 m", duracion: "3-4 horas", desnivel: "+400 m", precio: "$400 MXN" },
    coords: [25.6097, -100.3577],
  },
  {
    id: "estanzuela",
    type: "local",
    name: "Estanzuela",
    levelLabel: "Principiante",
    levels: ["facil"],
    image: "/media/destinos/estanzuela.jpg",
    description:
      "Caminata tranquila a través de un hermoso cañón con río y cascadas. Ideal para principiantes o para disfrutar un día relajado en contacto con la naturaleza.",
    stats: { altitud: "800 m", duracion: "2-3 horas", desnivel: "+200 m", precio: "$400 MXN" },
    coords: [25.553, -100.244],
  },
  {
    id: "la-raya",
    type: "local",
    name: "La Raya",
    levelLabel: "Intermedio",
    levels: ["moderada"],
    image: "/media/destinos/la-raya.jpg",
    description:
      "Ruta moderada con vistas panorámicas del valle. Sendero bien marcado que combina ascenso gradual con secciones planas. Excelente para fortalecer resistencia.",
    stats: { altitud: "1,500 m", duracion: "4 horas", desnivel: "+550 m", precio: "$400 MXN" },
    coords: [25.58, -100.18],
  },
  {
    id: "el-agujerado",
    type: "local",
    name: "El Agujerado",
    levelLabel: "Intermedio",
    levels: ["moderada"],
    image: "/media/destinos/el-agujerado.jpg",
    description:
      "Una ruta cercana a Monterrey que combina veredas amplias, cruces de arroyo y una subida final hacia un mirador natural.",
    stats: { altitud: "700 m", duracion: "4-6 horas", desnivel: "+250 m", precio: "$400 MXN" },
    coords: [25.43, -100.13],
  },
  {
    id: "cueva-de-la-virgen",
    type: "local",
    name: "Cueva de la Virgen",
    levelLabel: "Principiante-Intermedio",
    levels: ["facil", "moderada"],
    image: "/media/destinos/cueva-de-la-virgen.jpg",
    description:
      "Peregrinación y naturaleza en una sola experiencia. Sendero empinado que te lleva a una cueva con vistas hermosas. Rica en historia y espiritualidad.",
    stats: { altitud: "1,100 m", duracion: "3 horas", desnivel: "+350 m", precio: "$400 MXN" },
    coords: [25.81, -100.58],
  },

  /* ===================== DESTINOS DEL MUNDO ===================== */
  {
    id: "pico-de-orizaba",
    type: "destino",
    name: "Pico de Orizaba",
    region: "Veracruz–Puebla, México",
    levels: ["avanzada"],
    image: "/media/destinos/pico-de-orizaba.jpg",
    description:
      "El techo de México con sus 5,636 m. Un coloso nevado que corona el horizonte entre Veracruz y Puebla; subirlo es uno de los grandes sueños de toda montañista.",
    coords: [19.0303, -97.2683],
  },
  {
    id: "sierra-negra",
    type: "destino",
    name: "Sierra Negra",
    region: "Puebla, México",
    levels: ["avanzada"],
    image: "/media/destinos/sierra-negra.jpg",
    description:
      "Expedición de alta montaña al quinto pico más alto de México. Una experiencia transformadora que te lleva al límite, entre cielos infinitos y el observatorio más alto del país.",
    coords: [18.9853, -97.3088],
  },
  {
    id: "tepozteco",
    type: "destino",
    name: "Tepozteco",
    region: "Morelos, México",
    levels: ["facil"],
    image: "/media/destinos/tepozteco.jpg",
    description:
      "Una caminata mágica entre montañas y leyendas hasta la pirámide prehispánica que vigila el pueblo de Tepoztlán. Naturaleza, historia y misticismo en un solo sendero.",
    coords: [18.9889, -99.1017],
  },
  {
    id: "machu-picchu",
    type: "destino",
    name: "Machu Picchu",
    region: "Cusco, Perú",
    levels: ["moderada"],
    image: "/media/destinos/machu-picchu.jpg",
    description:
      "La ciudadela inca suspendida entre las nubes de los Andes. Caminar hasta ella es seguir los pasos de una civilización y descubrir uno de los paisajes más sobrecogedores del planeta.",
    coords: [-13.1631, -72.545],
  },
  {
    id: "torres-del-paine",
    type: "destino",
    name: "Torres del Paine",
    region: "Patagonia, Chile",
    levels: ["moderada"],
    image: "/media/destinos/torres-del-paine.jpg",
    description:
      "Granito, glaciares y lagos turquesa en el corazón de la Patagonia. Senderos de ensueño donde el viento y las montañas te recuerdan lo libres que somos.",
    coords: [-50.946, -72.973],
  },
  {
    id: "dolomitas",
    type: "destino",
    name: "Las Dolomitas",
    region: "Alpes, Italia",
    levels: ["moderada"],
    image: "/media/destinos/dolomitas.jpg",
    description:
      "Agujas de roca pálida que se encienden de rosa al atardecer. Los Alpes italianos en su versión más espectacular, entre praderas verdes y refugios de montaña.",
    coords: [46.6189, 12.3056],
  },
  {
    id: "islandia",
    type: "destino",
    name: "Islandia",
    region: "Kirkjufell, Islandia",
    levels: ["facil"],
    image: "/media/destinos/islandia.jpg",
    description:
      "Tierra de fuego y hielo. Cascadas, volcanes y la inconfundible montaña Kirkjufell en un paisaje que parece de otro mundo.",
    coords: [64.9416, -23.3074],
  },
  {
    id: "auroras-boreales",
    type: "destino",
    name: "Auroras Boreales",
    region: "Tromsø, Noruega",
    levels: ["facil"],
    image: "/media/destinos/aurora-boreal.webp",
    description:
      "Perseguir la aurora boreal bajo el cielo ártico. Noches en las que el firmamento baila en verde y violeta: pura magia que se queda contigo para siempre.",
    coords: [69.6492, 18.9553],
  },
  {
    id: "everest",
    type: "destino",
    name: "Monte Everest",
    region: "Himalaya, Nepal",
    levels: ["avanzada"],
    image: "/media/destinos/everest.jpg",
    description:
      "El punto más alto de la Tierra. Caminar hasta el campo base del Everest, entre los gigantes del Himalaya, es una de las travesías más legendarias del mundo.",
    coords: [27.9881, 86.925],
  },
  {
    id: "kilimanjaro",
    type: "destino",
    name: "Kilimanjaro",
    region: "Tanzania, África",
    levels: ["avanzada"],
    image: "/media/destinos/kilimanjaro.jpg",
    description:
      "El techo de África se alza solitario sobre la sabana. Subir el Kilimanjaro es atravesar selva, páramo y glaciar hasta tocar el cielo de Tanzania.",
    coords: [-3.0674, 37.3556],
  },
  {
    id: "monte-fuji",
    type: "destino",
    name: "Monte Fuji",
    region: "Japón",
    levels: ["moderada"],
    image: "/media/destinos/monte-fuji.jpg",
    description:
      "El volcán sagrado de Japón, perfecto y simétrico. Su ascenso al amanecer, recibiendo el sol entre nubes, es una experiencia espiritual inolvidable.",
    coords: [35.3606, 138.7274],
  },
];

/** Arma el link de WhatsApp con mensaje pre-llenado (solo rutas locales). */
export function whatsappLink(route) {
  const msg = `¡Hola Las Senderistas! 👋 Me interesa la ruta ${route.name}. ¿Me comparten las próximas fechas disponibles?`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
}
