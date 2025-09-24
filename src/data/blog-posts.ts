export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string[];
  readingTime: number;
  tags: string[];
  serviceFocus: string;
  relatedCaseSlug?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "andretich-autopartes-transformacion-digital",
    title: "Cómo digitalizamos la gestión de autopartes con Andretich",
    date: "2024-08-20",
    category: "Transformación Digital",
    summary:
      "Antes había un solo programador asistiendo al gerente de sistemas. Hoy lo respalda un equipo de CapassoTech que se adapta de forma flexible al presupuesto de la empresa, unificando catálogo, marketplace y Mercado Libre.",
    content: [
      "Cuando empezamos con Andretich, la operación se sostenía con planillas y sistemas desconectados. El catálogo no estaba centralizado y las publicaciones en Mercado Libre se hacían de forma manual. En ese contexto, había un solo programador asistiendo al gerente de sistemas.",
      "Armamos un equipo que hoy respalda al gerente de sistemas y se adapta de forma flexible al presupuesto de la empresa. Trabajamos por etapas con un roadmap claro, priorizando lo que más impacto tiene en ventas y operación.",
      "Diseñamos una arquitectura con catálogo único como fuente de verdad y un marketplace propio, más una integración bidireccional con Mercado Libre para publicar, actualizar y pausar automáticamente según stock. Implementamos manejo de expiración de tokens (refresh automático y persistencia en base de datos) para asegurar continuidad en las publicaciones.",
      "El panel de administración es accesible por roles e incluye las secciones clave del negocio (Productos, Usuarios/Cuentas, Categorías, Marcas, Compatibilidades, Ayuda, Logs y exportar a Excel) para operar todo desde un solo lugar.",
      "Integramos logística y atención: seguimiento de pedidos, alertas para depósito y centralización de mensajes de marketplace y WhatsApp, reduciendo fricción operativa y desincronizaciones de stock.",
      "Hoy la operación digital es estable y escalable. Seguimos iterando con mejoras continuas, siempre alineados al presupuesto y a los objetivos comerciales de Andretich."
    ],
    readingTime: 6,
    tags: ["autopartes", "marketplace", "integraciones"],
    serviceFocus: "Desarrollo a medida",
    relatedCaseSlug: "catalogo-web-autopartes",
  }
  ,
  {
    slug: "inee-plataforma-educativa-modular",
    title: "INEE: una plataforma educativa modular que escala con cada cohorte",
    date: "2024-08-12",
    category: "EdTech",
    summary:
      "CapassoTech creó junto a Potenciar un ecosistema virtual en desarrollo que busca ir más allá de un simple portal de cursos.",
    content: [
      "El Instituto de Negocios Emprendedor Empresarial (INEE) es un proyecto nuevo que busca transformar la educación emprendedora. Desde el inicio, sabían que necesitaban algo más que una plataforma de cursos: requerían un sistema que acompañara el aprendizaje, facilitara la gestión y creciera con cada cohorte.",
      "Estamos trabajando en una etapa temprana junto a Potenciar, nuestro aliado estratégico, para co-crear una plataforma modular que respete la metodología pedagógica del instituto y le permita adaptarse sin depender de terceros. El descubrimiento nos llevó a diseñar una arquitectura de cursos compuestos por materias, materias alimentadas por módulos reutilizables y evaluaciones configurables según competencias.",
      "La experiencia del alumno es prioridad desde el prototipo inicial: clases grabadas, material descargable, foros y evaluaciones en un mismo flujo, con recordatorios inteligentes y dashboards personalizados. Los docentes contarán con herramientas para monitorear la participación y brindar feedback en diversos formatos.",
      "La integración con sistemas administrativos permitirá automatizar inscripciones, certificados y conciliación de pagos. Además, sumaremos analítica educativa para detectar alumnos en riesgo y proyectar nuevas cohortes.",
      "Aunque el proyecto está en pleno desarrollo, ya se vislumbra el potencial de un ecosistema que escalará de forma sostenible. INEE y CapassoTech, en conjunto con Potenciar, están construyendo una plataforma educativa que va mucho más allá de un simple portal de cursos.",
    ],
    readingTime: 5,
    tags: ["educacion", "saas", "potenciar"],
    serviceFocus: "Plataformas digitales",
  },
  {
    slug: "abs-depot-marketplace-ia-whatsapp",
    title: "ABS Depot: marketplace dominicano con atención inteligente por WhatsApp",
    date: "2024-08-05",
    category: "Comercio Digital",
    summary:
      "Impulsamos a ABS Depot conectando su marketplace de alimentos y productos varios con WhatsApp y asistentes de IA.",
    content: [
      "ABS Depot se consolidó como referente en la venta de alimentos y productos varios en República Dominicana, pero su crecimiento digital se veía frenado por procesos manuales y canales desconectados. Los clientes llegaban por redes sociales, mensajería y referencias, y el equipo debía responder uno por uno, consultar planillas para verificar stock y armar cotizaciones desde cero. El tiempo de respuesta podía superar las dos horas en horarios pico, generando oportunidades perdidas en un mercado muy competitivo.",
      "La prioridad fue diseñar una experiencia de compra que uniera catálogo, logística y atención personalizada. El marketplace ya existía, pero decidimos potenciarlo con una integración directa a WhatsApp. Los usuarios pueden buscar por marca, modelo y categoría, con filtros inteligentes que replican la experiencia de un vendedor experto, mientras cada ficha incluye compatibilidades, fotos y recomendaciones cruzadas.",
      "El diferencial estuvo en el bot conversacional conectado al marketplace. Desarrollamos un asistente potenciado con IA que accede al catálogo y sugiere productos según los mensajes del cliente. Si alguien escribe “necesito arroz premium de 10 libras”, el bot identifica la categoría, muestra opciones disponibles, precios y tiempos de entrega. Cuando la consulta requiere intervención humana, el sistema deriva con contexto completo para que el asesor continúe sin repetir preguntas.",
      "Para el equipo interno construimos un panel centralizado que consolida pedidos del marketplace y conversaciones de WhatsApp. Allí pueden actualizar stock, gestionar devoluciones y seguir el performance de campañas. También integramos el flujo de ventas con el ERP existente para mantener inventario y contabilidad sincronizados. Con dashboards en tiempo real, la dirección monitorea ventas por segmento, ticket promedio y velocidad de respuesta.",
      "Los resultados fueron contundentes: el tiempo de respuesta bajó de horas a minutos, la tasa de conversión de consultas en ventas aumentó un 35% y los clientes valoran la rapidez con la que obtienen recomendaciones precisas. El equipo comercial redujo tareas repetitivas y ahora dedica más horas a acuerdos con proveedores estratégicos. Además, la infraestructura quedó preparada para escalar a otros países del Caribe sin rehacer el core.",
      "En CapassoTech creemos que cada marketplace necesita combinar automatización con empatía. El caso ABS Depot demuestra cómo la IA y la mensajería, bien integradas, potencian negocios tradicionales. Si querés impulsar una operación similar, te esperamos en https://capassotech.com.",
    ],
    readingTime: 6,
    tags: ["whatsapp", "ia", "marketplace"],
    serviceFocus: "E-commerce & IA",
  },
];
