export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  caseSlug?: string;
  externalUrl?: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "abs-depot",
    title: "ABS Depot — Punto de Venta y Stock",
    category: "Punto de Venta",
    description:
      "Sistema de punto de venta y control de stock para un almacén, con panel administrativo, app cliente y app mobile para el equipo en piso.",
    tech: ["Laravel", "Angular", "Ionic"],
  },
  {
    slug: "andretich",
    title: "Andretich — Catálogo de Autopartes",
    category: "Distribución",
    description:
      "Catálogo digital para un distribuidor regional de autopartes, con backoffice para carga masiva, buscador por marca y compatibilidad, y sincronización con Mercado Libre.",
    tech: [".NET", "Blazor", "React", "Mercado Libre API"],
    caseSlug: "catalogo-web-autopartes",
  },
  {
    slug: "capassotech-suite",
    title: "CapassoTech — Suite de Herramientas Internas",
    category: "Producto Propio",
    description:
      "Nuestra propia suite interna: documentación de equipo, backend y paneles de seguimiento de horas y soporte — además de este mismo sitio web.",
    tech: ["NestJS", "React", "Vite"],
  },
  {
    slug: "carwash",
    title: "CarWash — Landing de Lavadero",
    category: "Landing",
    description:
      "Landing page para promocionar una app de lavadero de autos, con capturas de pantalla y la propuesta de valor del servicio.",
    tech: ["HTML5", "CSS", "Firebase Hosting"],
  },
  {
    slug: "chinita",
    title: "Chinita — Tienda Online",
    category: "E-commerce",
    description:
      "Tienda online con carrito de compras propio, catálogo de productos y backend a medida en Node.js.",
    tech: ["Angular", "Node.js", "Express"],
  },
  {
    slug: "cleansched",
    title: "CleanSched — Reserva de Turnos",
    category: "Servicios",
    description:
      "Sistema de reserva de turnos con calendario visual y notificaciones, pensado para negocios de servicios que quieren dejar de coordinar por teléfono.",
    tech: ["Angular", "FullCalendar", "Firebase"],
    caseSlug: "sistema-turnos-online",
  },
  {
    slug: "efecapital",
    title: "efecapital — Portal de Asesoría Financiera",
    category: "Finanzas",
    description:
      "Sitio institucional y portal de clientes para una asesoría financiera, con panel de seguimiento para administración y usuarios.",
    tech: ["React", "Vite", "Firebase"],
  },
  {
    slug: "epefi",
    title: "EPEFI — Plataforma Educativa",
    category: "Educación",
    description:
      "Plataforma educativa con portal de cursos, panel administrativo y backend propio, separada en entornos de prueba y producción.",
    tech: ["Node.js", "React", "Firebase"],
  },
  {
    slug: "gastos",
    title: "Control de Gastos — App de Finanzas Personales",
    category: "Producto Propio",
    description:
      "Aplicación propia para llevar el control de gastos personales, con categorías, gráficos y sincronización en la nube. Disponible en Google Play.",
    tech: ["React", "Firebase", "Capacitor"],
    externalUrl: "https://play.google.com/store/apps/details?id=gastos.app",
  },
  {
    slug: "glasshome",
    title: "Glasshome — Mamparas y Cerramientos",
    category: "Landing",
    description:
      "Sitio institucional para una empresa de mamparas, cerramientos y barandas de vidrio y aluminio, con galería de trabajos y contacto directo por WhatsApp.",
    tech: ["React", "Vite", "Firebase"],
  },
  {
    slug: "gymfuze",
    title: "GymFuze — Gestión de Gimnasios",
    category: "Producto Propio",
    description:
      "Nuestro SaaS propio para gestión de gimnasios: alumnos, pagos, rutinas y comunicación, con panel admin y app para alumnos.",
    tech: ["React Native", "Expo", "Firebase", "Node.js"],
    caseSlug: "gymfuze-app",
    externalUrl: "https://gymfuzeapp.web.app/",
  },
  {
    slug: "home-pisos-vinilicos",
    title: "Home Pisos Vinílicos — Catálogo y Ventas",
    category: "E-commerce",
    description:
      "Catálogo visual de pisos vinílicos con carga autoadministrable de productos y botón de contacto directo por WhatsApp.",
    tech: ["HTML5", "TailwindCSS", "Firebase"],
    caseSlug: "web-pisos-whatsapp",
  },
  {
    slug: "inee",
    title: "INEE — Plataforma Educativa",
    category: "Educación",
    description:
      "Plataforma educativa completa, con backend, panel administrativo, portal de estudiantes y tienda online con pagos integrados.",
    tech: ["Node.js", "Firebase", "MercadoPago"],
  },
  {
    slug: "landixx",
    title: "Landixx — Landing Corporativa",
    category: "Landing",
    description:
      "Landing page corporativa desarrollada sobre una base ágil, pensada para lanzamientos rápidos de marca.",
    tech: ["Gulp", "SCSS"],
  },
  {
    slug: "vialto",
    title: "Vialto — Control de Combustible para Flotas",
    category: "Producto Propio",
    description:
      "Nuestro producto propio para digitalizar el seguimiento de flotas de transporte: app para choferes y panel de control con reportes en tiempo real.",
    tech: ["React", "Node.js", "Firebase", "React Native"],
    caseSlug: "vialto-app",
    externalUrl: "https://vialto.uno/",
  },
  {
    slug: "bressan",
    title: "Bressan — Seguimiento de Combustible",
    category: "Logística",
    description:
      "Sistema de seguimiento de combustible y choferes para una empresa de transporte, con gestión de conductores y accesos diferenciados por rol.",
    tech: ["React", "Firebase"],
  },
  {
    slug: "logistics-check",
    title: "Logistics Check — Panel de Consistencia Logística",
    category: "Logística",
    description:
      "Panel para validar la consistencia de datos operativos de una flota de transporte, en desarrollo continuo.",
    tech: ["React", "Firebase"],
  },
  {
    slug: "retiro-emprendedor",
    title: "Retiro Emprendedor — Landing de Evento",
    category: "Landing",
    description:
      "Landing page para un retiro presencial de emprendedores, con toda la información del evento y la inscripción.",
    tech: ["HTML5", "JavaScript"],
  },
  {
    slug: "rueda-compartida",
    title: "Rueda Compartida — Viajes Compartidos con IA",
    category: "Movilidad",
    description:
      "Aplicación de viajes compartidos con funciones de inteligencia artificial para sugerir coincidencias de rutas entre usuarios.",
    tech: ["Next.js", "Firebase", "Genkit AI"],
  },
  {
    slug: "turnera",
    title: "Turnera — Reserva de Turnos",
    category: "Servicios",
    description:
      "Otra implementación de nuestro sistema de reserva de turnos, con calendario y sincronización en la nube.",
    tech: ["Angular", "Firebase"],
  },
  {
    slug: "vaultify",
    title: "Vaultify — Gestor de Contraseñas",
    category: "Producto Propio",
    description:
      "Gestor de contraseñas propio, con organización por carpetas, cifrado y acceso por PIN.",
    tech: ["React", "Firebase"],
  },
  {
    slug: "yoppus",
    title: "Yoppus — Tienda Online",
    category: "E-commerce",
    description:
      "Tienda online con backend a medida en Node.js y frontend en Angular.",
    tech: ["Angular", "Node.js"],
  },
  {
    slug: "zycris",
    title: "ZYcris — Punto de Venta y Gestión",
    category: "Punto de Venta",
    description:
      "Sistema de punto de venta y gestión, construido sobre la misma base que desarrollamos para ABS Depot y adaptado a otro negocio.",
    tech: ["Laravel", "Vue", "Filament"],
  },
];
