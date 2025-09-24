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
};

export const blogPosts: BlogPost[] = [
  {
    slug: "andretich-autopartes-transformacion-digital",
    title: "Cómo digitalizamos la gestión de autopartes con Andretich",
    date: "2024-08-20",
    category: "Transformación Digital",
    summary:
      "Andretich confió en CapassoTech para unificar catálogo, marketplace y Mercado Libre en una plataforma que acelera ventas y operaciones.",
    content: [
      "Cuando el equipo de Andretich nos buscó, llevaban años creciendo gracias a su conocimiento del mercado de autopartes, pero la operación diaria se sostenía con planillas y múltiples sistemas desconectados. El catálogo no estaba centralizado, actualizar precios llevaba horas y el marketplace propio convivía con publicaciones manuales en Mercado Libre. La dirección intuía que podían vender mucho más si lograban ordenar la información y automatizar la publicación de piezas, pero necesitaban un socio que entendiera tanto el negocio de la posventa automotor como las exigencias de un canal digital masivo.",
      "Nuestra primera decisión fue realizar workshops con el equipo comercial, logística y servicio al cliente para mapear cada flujo relevante. A partir de esas sesiones diseñamos una arquitectura modular: un catálogo único que oficia de fuente de verdad, un motor de marketplace que controla stock, promociones y reglas de compatibilidad, y una integración bidireccional con Mercado Libre que sincroniza títulos, descripciones, imágenes y stock en tiempo real. Implementamos un panel de administración accesible desde cualquier dispositivo, con perfiles por rol y KPIs claros para tomar decisiones sin depender de reportes manuales.",
      "Para resolver la complejidad del catálogo, construimos un modelo de datos capaz de relacionar más de 40 mil repuestos con vehículos, marcas y versiones. Automatizamos la normalización de fichas técnicas, generamos plantillas de contenido SEO y conectamos la base con un buscador inteligente que entiende sinónimos y errores frecuentes de los usuarios. Además, desarrollamos un orquestador de publicaciones que controla el ciclo completo: alta, actualización, pausado automático por falta de stock y gestión de reclamos.",
      "La plataforma también integró logística y posventa. Sumamos seguimiento de pedidos, alertas automáticas para el picking en depósito y un módulo de atención que centraliza mensajes de marketplace y WhatsApp. Esto permitió que los asesores trabajen desde un solo lugar, con historial de conversaciones y prioridades sugeridas por un algoritmo que pondera la urgencia de cada caso. Todo quedó respaldado por analytics en tiempo real, que reportan ventas por modelo, margen por proveedor y performance por canal.",
      "El impacto se notó desde el primer trimestre: Andretich redujo en un 60% el tiempo dedicado a cargar productos y duplicó la tasa de conversión del marketplace propio gracias a fichas más completas y un buscador preciso. La sincronización con Mercado Libre eliminó diferencias de stock que generaban reclamos, y la visibilidad de KPIs permitió renegociar condiciones con proveedores estratégicos. Con menos horas operativas, el equipo pudo enfocarse en acuerdos comerciales y lanzamientos de nuevas líneas.",
      "Hoy Andretich cuenta con una operación digital escalable, lista para sumar más canales y automatizaciones. En CapassoTech seguimos acompañando la evolución con un roadmap de mejoras continuas, demostrando que entendemos la lógica del negocio además de la tecnología. Si querés explorar cómo transformar tu operación de autopartes, te invitamos a conocer más en https://capassotech.com.",
    ],
    readingTime: 6,
    tags: ["autopartes", "marketplace", "integraciones"],
    serviceFocus: "Desarrollo a medida",
  },
  {
    slug: "inee-plataforma-educativa-modular",
    title: "INEE: una plataforma educativa modular que escala con cada cohorte",
    date: "2024-08-12",
    category: "EdTech",
    summary:
      "CapassoTech creó para INEE un ecosistema virtual con cursos, materias y módulos reutilizables que soporta crecimiento sostenido.",
    content: [
      "El Instituto Nacional de Estudios Especializados (INEE) tenía un desafío claro: sus programas formativos crecían en demanda, pero la infraestructura tecnológica no acompañaba. Las inscripciones se gestionaban con múltiples formularios, los docentes cargaban materiales en nubes dispersas y los alumnos reclamaban por la falta de seguimiento de sus progresos. El instituto sabía que necesitaba una plataforma integral, pero buscaba algo que respetara su metodología pedagógica y le permitiera adaptar contenidos sin depender de terceros.",
      "Con ese contexto, organizamos sesiones de co-creación con el equipo académico para entender cómo estructuraban planes de estudio, evaluaciones y certificaciones. El descubrimiento nos llevó a diseñar una plataforma modular: cursos compuestos por materias, materias alimentadas por módulos reutilizables y evaluaciones configurables según competencias. Implementamos un sistema de gestión de contenidos que permite a los coordinadores armar propuestas en minutos, arrastrando recursos, plantillas y actividades previamente validadas.",
      "La experiencia del alumno fue prioridad desde el primer prototipo. Desarrollamos un front intuitivo, accesible desde cualquier dispositivo, donde los estudiantes encuentran clases grabadas, material descargable, foros y evaluaciones en un mismo flujo. Agregamos recordatorios inteligentes por correo y WhatsApp, adaptados al ritmo de cada cohorte, y dashboards personalizados para seguir avances, notas y sugerencias de repaso. Los docentes, por su parte, cuentan con herramientas para monitorear la participación, calificar con rúbricas y brindar feedback con audio o video.",
      "Para garantizar la continuidad operativa, integramos la plataforma con los sistemas administrativos existentes del INEE. Automatizamos el alta de alumnos, la emisión de certificados con firma digital y la conciliación de pagos. Implementamos analítica educativa que permite detectar estudiantes en riesgo de abandono, medir el desempeño de cada curso y proyectar demanda de nuevas cohortes. Todo esto se apoya en una arquitectura cloud escalable, con controles de seguridad que cumplen estándares de protección de datos.",
      "Los resultados superaron las expectativas: el instituto incrementó un 45% la cantidad de alumnos activos en menos de un año, manteniendo la calidad académica y sin incrementar el equipo administrativo. Las tasas de finalización mejoraron gracias a la personalización de recordatorios, y los docentes adoptaron rápidamente las herramientas al percibir que facilitan el seguimiento y la interacción. La dirección ahora cuenta con reportes estratégicos para decidir nuevas carreras basadas en datos reales.",
      "El caso INEE refuerza nuestro enfoque: combinar tecnología robusta con comprensión del negocio educativo. Desde CapassoTech seguimos colaborando con su expansión regional y la incorporación de experiencias inmersivas. Si estás buscando un socio que traduzca tu visión académica en una plataforma viva, conocé más en https://capassotech.com.",
    ],
    readingTime: 6,
    tags: ["educacion", "saas", "experiencia-estudiantil"],
    serviceFocus: "Plataformas digitales",
  },
  {
    slug: "abs-depot-marketplace-ia-whatsapp",
    title: "ABS Depot: marketplace dominicano con atención inteligente por WhatsApp",
    date: "2024-08-05",
    category: "Comercio Digital",
    summary:
      "Impulsamos a ABS Depot con un marketplace de autopartes integrado a WhatsApp y asistentes de IA que responden al instante.",
    content: [
      "ABS Depot se consolidó como referente en la venta de autopartes en República Dominicana, pero su crecimiento digital se veía frenado por procesos manuales y canales desconectados. Los clientes llegaban por redes sociales, mensajería y referencias, y el equipo debía responder uno por uno, consultar planillas para verificar stock y armar cotizaciones desde cero. El tiempo de respuesta podía superar las dos horas en horarios pico, generando oportunidades perdidas en un mercado muy competitivo.",
      "La prioridad fue diseñar una experiencia de compra que uniera catálogo, logística y atención personalizada. Construimos un marketplace responsive donde los usuarios pueden buscar por marca, modelo y categoría, con filtros inteligentes que replican la experiencia de un vendedor experto. Cada ficha incluye compatibilidades, fotos y recomendaciones cruzadas. Implementamos un checkout sencillo con métodos de pago locales y cálculo automático de envíos en tiempo real.",
      "El diferencial estuvo en la integración con WhatsApp. Desarrollamos un asistente conversacional potenciado con IA que accede al catálogo y sugiere productos según los mensajes del cliente. Si alguien escribe “necesito pastillas de freno para un Civic 2018”, el bot identifica el modelo, muestra opciones disponibles, precios y tiempos de entrega. Cuando la consulta requiere intervención humana, el sistema deriva con contexto completo para que el asesor continúe sin repetir preguntas.",
      "Para el equipo interno construimos un panel centralizado que consolida pedidos del marketplace y conversaciones de WhatsApp. Allí pueden actualizar stock, gestionar devoluciones y seguir el performance de cada campaña de marketing. También integramos el flujo de ventas con el ERP existente para mantener inventario y contabilidad sincronizados. Con dashboards en tiempo real, la dirección monitorea ventas por segmento, ticket promedio y velocidad de respuesta.",
      "Los resultados fueron contundentes: el tiempo de respuesta bajó de horas a minutos, la tasa de conversión de consultas en ventas aumentó un 35% y los clientes valoran la rapidez con la que obtienen recomendaciones precisas. El equipo comercial redujo tareas repetitivas y ahora dedica más horas a acuerdos con talleres y flotas. Además, la plataforma quedó preparada para escalar a otros países del Caribe sin rehacer la infraestructura.",
      "En CapassoTech creemos que cada marketplace necesita combinar automatización con empatía. El caso ABS Depot demuestra cómo la IA y la mensajería, bien integradas, potencian negocios tradicionales. Si querés impulsar una operación similar, te esperamos en https://capassotech.com.",
    ],
    readingTime: 6,
    tags: ["whatsapp", "ia", "marketplace"],
    serviceFocus: "E-commerce & IA",
  },
  {
    slug: "gymfuze-gestion-gimnasios-saas",
    title: "GymFuze: la super app para gimnasios que ordena turnos, alumnos y entrenamientos",
    date: "2024-07-29",
    category: "SaaS",
    summary:
      "GymFuze eligió a CapassoTech para lanzar una plataforma integral que conecta equipos de recepción, coaches y alumnos en un mismo flujo.",
    content: [
      "Antes de trabajar con nosotros, GymFuze enfrentaba un escenario común en la industria del fitness: las franquicias crecían, pero la operación seguía dependiendo de planillas, llamadas y aplicaciones aisladas. Los administradores perdían tiempo conciliando pagos, los profesores no tenían visibilidad de los planes de cada alumno y los clientes finales debían agendar turnos vía WhatsApp o en recepción. El riesgo de sobreventa de clases y la falta de seguimiento personalizado atentaban contra la fidelización.",
      "Arrancamos con un descubrimiento profundo en sedes piloto. Observamos cómo se realizaban las reservas, cómo se asignaban profesores y qué indicadores necesitaba la dirección para medir retención. Con esa información diseñamos GymFuze: una plataforma SaaS modular que centraliza la operación de gimnasios, academias y estudios boutique. El núcleo es un calendario inteligente que administra cupos, bloqueos por mantenimiento y prioridades para socios premium.",
      "En el frente de los alumnos construimos una app mobile white-label que permite registrarse, reservar clases, recibir recordatorios y acceder a rutinas personalizadas. Las notificaciones push y emails dinámicos mantienen el compromiso sin abrumar. Cada usuario puede ver su historial de entrenamientos, registrar progreso y compartir objetivos con su coach. Implementamos integraciones con wearables para importar métricas de actividad cuando el gimnasio lo requiere.",
      "Para los equipos internos desarrollamos un panel con roles diferenciados. Los administradores controlan pagos, facturación recurrente, promociones y convenios corporativos. Los coaches gestionan agendas, asignan planes de entrenamiento basados en bibliotecas de ejercicios y registran asistencia en vivo desde tablets. Además, integramos GymFuze con gateways de pago locales y herramientas contables, reduciendo la carga manual del backoffice.",
      "Los resultados hablan por sí solos: la ocupación de clases mejoró un 28% gracias a la visibilidad de cupos en tiempo real y a las listas de espera automatizadas. El churn mensual se redujo porque los alumnos reciben planes consistentes y sienten un seguimiento continuo. La dirección ahora cuenta con reportes de rentabilidad por sede, participación de servicios adicionales y eficacia de campañas de marketing.",
      "El lanzamiento de GymFuze demostró cómo un SaaS bien diseñado puede transformar la experiencia de clientes y equipos por igual. En CapassoTech seguimos acompañando la expansión a nuevos países con infraestructura escalable y roadmap colaborativo. Si estás listo para profesionalizar la gestión de tu negocio fitness, visitanos en https://capassotech.com.",
    ],
    readingTime: 6,
    tags: ["fitness", "reservas", "saas"],
    serviceFocus: "Producto SaaS",
  },
  {
    slug: "efe-capital-plataforma-asesores-financieros",
    title: "EFE Capital: decisiones financieras respaldadas por datos en una sola plataforma",
    date: "2024-07-15",
    category: "Fintech",
    summary:
      "Desarrollamos para EFE Capital una suite digital que empodera a asesores con reportes, planes personalizados y cumplimiento normativo.",
    content: [
      "EFE Capital gestionaba carteras de inversión para cientos de clientes de alto patrimonio, pero la información clave estaba distribuida entre hojas de cálculo, CRMs genéricos y reportes manuales. Los asesores debían armar presentaciones a partir de múltiples fuentes, lo que consumía tiempo valioso y generaba riesgo de errores. La dirección buscaba unificar la operación para ganar velocidad, trazabilidad y cumplir con regulaciones cada vez más exigentes.",
      "Desde CapassoTech abordamos el proyecto con una mirada integral del negocio financiero. Realizamos entrevistas con asesores, área de cumplimiento y equipo directivo para entender qué métricas impulsaban decisiones diarias. A partir de ese discovery diseñamos una plataforma web segura que centraliza portafolios, objetivos del cliente, escenarios de proyección y documentación regulatoria. Implementamos autenticación robusta, trazabilidad de cambios y un sistema de permisos granular.",
      "El corazón de la solución es un motor de reportes dinámicos. Conectamos la plataforma a fuentes de mercado en tiempo real y a los sistemas internos de backoffice. Los asesores pueden generar informes personalizados en minutos, comparando performance contra benchmarks, evaluando riesgo y proponiendo ajustes de cartera basados en escenarios simulados. Cada reporte se puede compartir con el cliente mediante un portal seguro, con alertas cuando hay actualizaciones relevantes.",
      "Otro componente clave fue el módulo de planificación financiera. Allí los asesores modelan metas, horizonte temporal y tolerancia al riesgo de cada cliente. La plataforma sugiere estrategias basadas en plantillas validadas por el comité de inversiones, permitiendo ajustar aportes periódicos y reequilibrios automáticos. Todo queda registrado con notas y documentos que facilitan auditorías.",
      "Gracias a la implementación, EFE Capital redujo el tiempo de armado de reportes en un 65%, incrementó la frecuencia de reuniones consultivas y mejoró la satisfacción de los clientes premium, que ahora acceden a información actualizada desde cualquier dispositivo. El área de compliance ganó visibilidad total sobre aprobaciones y cambios, disminuyendo el riesgo operativo y fortaleciendo la relación con los reguladores.",
      "Este proyecto refuerza nuestro compromiso con soluciones fintech que combinan datos, experiencia de usuario y seguridad. Si tu organización necesita transformar la manera en que asesores y clientes colaboran, descubrí cómo podemos ayudarte en https://capassotech.com.",
    ],
    readingTime: 6,
    tags: ["finanzas", "reportes", "compliance"],
    serviceFocus: "Plataformas financieras",
  },
  {
    slug: "flow-family-dance-marketplace-videos",
    title: "Flow Family Dance: talento de la danza monetizado en un marketplace global",
    date: "2024-07-01",
    category: "Economía Creativa",
    summary:
      "Acompañamos a Flow Family Dance en la creación de un marketplace de videos que conecta artistas, fans y marcas en un mismo espacio.",
    content: [
      "Flow Family Dance había construido una comunidad vibrante en redes sociales, pero dependía de acuerdos puntuales con marcas para monetizar su talento. Los coreógrafos necesitaban una plataforma donde vender clases y coreografías exclusivas, mientras que los fans pedían una experiencia más personalizada que los streams ocasionales. El desafío era combinar contenidos premium, comunidad y oportunidades comerciales sin perder la esencia artística.",
      "Organizamos mesas de trabajo con artistas, productores y el equipo de marketing para entender expectativas y miedos. De ese intercambio surgió la idea de un marketplace curado de videos: clases on-demand, retos coreográficos y contenidos detrás de escena. Diseñamos la experiencia desde el móvil, con navegación por estilos, niveles y duración. Cada creador cuenta con un perfil autogestionado, estadísticas de ventas y herramientas para lanzar bundles o membresías.",
      "La plataforma incorpora un reproductor optimizado para streaming adaptativo, permitiendo consumir contenidos de alta calidad incluso con conexiones móviles. Sumamos funcionalidades sociales como comentarios moderados, favoritos y desafíos gamificados que incentivan la participación. Los fans pueden grabar sus versiones y enviarlas para feedback, generando un ciclo virtuoso de interacción y fidelización.",
      "Para los artistas era clave contar con ingresos previsibles. Implementamos un sistema de revenue share transparente, con liquidaciones automáticas y reportes detallados por país, moneda y tipo de producto. Integramos pasarelas de pago globales y wallets digitales, garantizando que el talento reciba sus ganancias sin fricciones. También habilitamos un módulo B2B para marcas interesadas en patrocinar retos o contratar coreografías a medida.",
      "A nivel operativo, el equipo de Flow Family Dance ahora dispone de un backoffice para curaduría, moderación y análisis de comportamiento. Los dashboards muestran qué estilos y niveles son más consumidos, permitiendo planificar nuevos lanzamientos y optimizar campañas de adquisición. Además, incorporamos analítica de churn para detectar cuándo un suscriptor necesita estímulos adicionales.",
      "El marketplace se transformó en el centro de la comunidad: los artistas multiplicaron sus ingresos, los fans disfrutan una experiencia premium y las marcas encuentran formatos auténticos para conectar. Para CapassoTech fue una oportunidad de demostrar que comprendemos las dinámicas creativas tanto como las tecnológicas. Si buscás monetizar tu comunidad con una plataforma de video hecha a medida, conocé nuestras soluciones en https://capassotech.com.",
    ],
    readingTime: 6,
    tags: ["videos", "economia-creativa", "marketplace"],
    serviceFocus: "Plataformas de contenido",
  },
  {
    slug: "app-logistica-control-combustible",
    title: "App Logística: control de combustible y reportes en manos de los choferes",
    date: "2024-06-17",
    category: "Logística",
    summary:
      "Construimos una app móvil que digitaliza las cargas de combustible, captura comprobantes y genera reportes confiables para flotas.",
    content: [
      "Una empresa regional de transporte nos convocó para resolver un problema crítico: el registro de combustible se realizaba con tickets físicos que tardaban días en llegar a la oficina central. Esto dificultaba el control de gastos, abría la puerta a inconsistencias y atrasaba la conciliación con proveedores. Los choferes percibían el proceso como burocrático y el área administrativa invertía muchas horas en ordenar la información.",
      "Decidimos co-crear la solución con quienes estaban en la ruta. Realizamos entrevistas en distintas bases operativas y acompañamos recorridos para entender la experiencia del chofer. Concluimos que la app debía ser extremadamente simple, funcionar offline y aprovechar la cámara del teléfono para validar cada carga. Así nació la App Logística: una herramienta nativa que combina captura de datos, geolocalización y flujos de aprobación ágiles.",
      "El proceso de registro se resuelve en tres pasos. El chofer ingresa el monto, selecciona el vehículo y carga una foto del comprobante. La app valida automáticamente la legibilidad del ticket, asocia la ubicación y compara los litros declarados con el tanque del vehículo. Si detecta discrepancias, solicita confirmación antes de enviar la información al supervisor. Todo funciona incluso sin señal, sincronizando apenas se recupera conexión.",
      "Para la oficina central desarrollamos un panel web con dashboards que muestran consumo por ruta, proveedor y conductor. El sistema genera alertas cuando se superan los presupuestos y facilita la conciliación automática con facturas. También integramos la app con el ERP y el sistema de mantenimiento preventivo, permitiendo anticipar servicios técnicos basados en kilómetros recorridos y uso de combustible.",
      "Tras la implementación, el tiempo de conciliación se redujo de una semana a menos de 24 horas y los desvíos en registros cayeron un 40%. Los choferes adoptaron rápidamente la herramienta porque simplifica su tarea y reciben feedback inmediato sobre su carga. La dirección cuenta ahora con datos confiables para negociar mejores acuerdos con estaciones y optimizar rutas.",
      "La App Logística es un ejemplo de cómo la tecnología puede adaptarse al ritmo de la operación sin imponer complejidad. En CapassoTech nos especializamos en convertir procesos críticos en experiencias digitales simples y seguras. Si tu flota necesita un salto de eficiencia, encontrá más información en https://capassotech.com.",
    ],
    readingTime: 6,
    tags: ["logistica", "mobile", "reportes"],
    serviceFocus: "Aplicaciones móviles",
  },
  {
    slug: "time-tracker-gestion-horas-proyectos",
    title: "Time Tracker: visibilidad total de horas y proyectos para equipos en crecimiento",
    date: "2024-06-03",
    category: "Productividad",
    summary:
      "Implementamos una plataforma interna que organiza tiempos, tareas y costos, brindando control operativo y financiero en tiempo real.",
    content: [
      "En CapassoTech también construimos soluciones para nuestra operación interna. El crecimiento del equipo y la diversidad de proyectos exigían un sistema mejor que las planillas compartidas. Necesitábamos entender dónde invertíamos las horas, cómo se comparaban con los presupuestos y qué aprendizajes podíamos capitalizar para futuras propuestas. La falta de datos consolidados complicaba las decisiones y generaba fricción entre áreas.",
      "Decidimos diseñar Time Tracker, una plataforma que combina gestión de horas, seguimiento de proyectos y análisis financiero. Iniciamos con entrevistas a líderes técnicos, PMs y áreas administrativas para definir qué información era crítica. De ese discovery surgió un modelo de datos que vincula proyectos, clientes, tipos de tarea y tarifas. Desarrollamos una experiencia web responsiva para que cada persona registre actividades en segundos, desde cualquier dispositivo.",
      "El registro de horas se apoya en automatizaciones que minimizan la carga operativa. Integraciones con herramientas de gestión de proyectos sugieren tareas activas, y los usuarios solo deben confirmar o ajustar su tiempo. Los líderes de equipo reciben alertas cuando un proyecto supera los umbrales previstos, permitiendo renegociar alcance o reasignar recursos antes de que sea tarde. Además, implementamos un sistema de aprobaciones que garantiza la calidad de los datos sin añadir burocracia.",
      "Time Tracker incluye un módulo de analítica con dashboards personalizados. Finanzas puede cruzar horas imputadas con facturación, identificar rentabilidad por cliente y proyectar flujo de caja. Recursos humanos analiza la carga de trabajo por perfil para planificar capacitaciones o nuevas contrataciones. Los directores acceden a reportes ejecutivos con visión consolidada de portafolio y comparativos contra estimaciones históricas.",
      "La adopción fue inmediata porque la herramienta resuelve problemas reales: cada colaborador entiende cómo se utilizan los datos y recibe visibilidad sobre sus contribuciones. Logramos reducir en un 50% el tiempo dedicado a consolidar información para reportes mensuales y mejoramos la precisión de nuestras propuestas comerciales al contar con históricos confiables. También utilizamos los insights para identificar oportunidades de automatización en nuestros procesos internos.",
      "Time Tracker refuerza una convicción: gestionar con datos es el camino para seguir creciendo de forma saludable. Si tu organización necesita transformar la manera en que controla horas y proyectos, conversemos en https://capassotech.com.",
    ],
    readingTime: 6,
    tags: ["productividad", "gestion", "analytics"],
    serviceFocus: "Herramientas internas",
  },
];
