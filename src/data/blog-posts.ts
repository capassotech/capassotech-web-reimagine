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
    slug: "pod-agil-time-to-market",
    title: "Cómo un pod ágil acelera el time-to-market sin romper la calidad",
    date: "2024-08-05",
    category: "Pods ágiles",
    summary:
      "Te contamos cómo armar un pod ágil nearshore que entrega iteraciones productivas cada dos semanas, con visibilidad total y deuda técnica bajo control.",
    content: [
      "Los pods ágiles combinan PM, tech lead, diseñadores y desarrolladores senior para cubrir discovery, delivery y medición sin handoffs innecesarios. Cuando cada rol entiende métricas de negocio y se trabaja con roadmaps trimestrales visibles, el equipo sostiene un throughput predecible desde el sprint uno.",
      "El secreto está en definir Definition of Ready y Definition of Done compartidas, sumado a tableros visibles que reflejan bloqueos en tiempo real. Con este modelo logramos reducir en 35% el ciclo de feedback con founders y stakeholders porque todos hablan el mismo lenguaje de valor entregado.",
      "En CapassoTech desplegamos pods dedicados en menos de diez días, con herramientas de automatización y QA desde el inicio. Así evitamos cuellos de botella, logramos releases semanales sin sobresaltos y liberamos a tu equipo in-house para enfocarse en estrategia y revenue.",
    ],
    readingTime: 6,
    tags: ["outsourcing", "pods ágiles", "time-to-market"],
    serviceFocus: "Outsourcing de equipos",
  },
  {
    slug: "migracion-cloud-sin-downtime",
    title: "Checklist para migrar tu producto a la nube sin downtime ni sorpresas de costos",
    date: "2024-07-22",
    category: "DevOps & Cloud",
    summary:
      "Esta guía resume los hitos críticos para planificar una migración cloud exitosa: assessment, arquitectura híbrida, pruebas de carga y monitoreo FinOps desde el día cero.",
    content: [
      "Antes de migrar, evaluamos dependencias, SLAs y la criticidad de cada módulo. Con esa foto diseñamos un roadmap de oleadas priorizando componentes que ya soportan contenedores y automatizando pipelines de despliegue.",
      "Ejecutamos ambientes espejo para validar performance con tráfico real y feature flags para activar gradualmente a usuarios. Esta estrategia nos permitió sostener 99,98% de disponibilidad en migraciones de plataformas transaccionales.",
      "El monitoreo FinOps complementa el proceso: dashboards de consumo, alertas de sobrecostos y políticas de apagado automático nos ayudaron a reducir en promedio 27% el gasto mensual post migración.",
    ],
    readingTime: 7,
    tags: ["cloud", "devops", "finops"],
    serviceFocus: "Mantenimiento proactivo",
  },
  {
    slug: "automatizaciones-ia-roi-90-dias",
    title: "3 automatizaciones con IA que generan ROI en 90 días",
    date: "2024-06-10",
    category: "Inteligencia Artificial",
    summary:
      "Analizamos casos reales donde la inteligencia artificial libera horas operativas y aumenta conversiones rápidamente: scoring de leads, soporte asistido y generación de documentos.",
    content: [
      "Arrancamos identificando procesos con alto volumen y reglas claras. El scoring de leads con modelos supervisados nos permitió priorizar oportunidades comerciales, incrementando 22% la tasa de cierre al enfocar SDRs en prospects listos para comprar.",
      "Para soporte implementamos asistentes que se entrenan con la base de conocimiento existente y entregan respuestas sugeridas en vivo. Resultado: reducción del tiempo promedio de respuesta a la mitad sin perder tono humano.",
      "La tercera automatización apunta a generar documentación técnica y legales repetitivas. Con templates y validaciones humanas finales, los equipos liberan hasta 15 horas semanales que vuelven a la innovación del producto.",
    ],
    readingTime: 5,
    tags: ["automatización", "ia aplicada", "productividad"],
    serviceFocus: "Consultoría & IA",
  },
  {
    slug: "escalar-mvp-producto-enterprise",
    title: "Cómo escalar un MVP a producto enterprise sin frenar la operación",
    date: "2024-05-02",
    category: "Desarrollo a medida",
    summary:
      "Compartimos el blueprint que usamos para llevar MVPs con tracción a plataformas enterprise: modularización, observabilidad y governance de releases.",
    content: [
      "El primer paso es auditar la arquitectura actual para detectar cuellos de botella en performance y seguridad. Diseñamos un plan de refactor incremental donde cada iteración deja valor visible y no bloquea la operación en producción.",
      "Implementamos observabilidad con métricas de negocio y logs centralizados. Así identificamos problemas antes de que impacten a usuarios enterprise y podemos accionar mejoras basadas en datos.",
      "Finalmente definimos governance de releases: branch strategy, feature toggles y ambientes automatizados. El equipo logra releases predecibles y auditables, requisito clave para vender a corporaciones.",
    ],
    readingTime: 8,
    tags: ["escalabilidad", "arquitectura", "governance"],
    serviceFocus: "Desarrollo a medida",
  },
  {
    slug: "metricas-producto-digital",
    title: "Las métricas que miramos para acelerar un producto digital B2B",
    date: "2024-04-15",
    category: "Estrategia de producto",
    summary:
      "Un framework práctico para alinear producto, tecnología y negocio midiendo adopción, eficiencia operativa y expansión de cuentas.",
    content: [
      "Partimos de objetivos trimestrales claros y los descomponemos en métricas accionables: activation rate, cycle time y expansión neta. Cada squad tiene ownership sobre uno de estos indicadores.",
      "Reforzamos la analítica con dashboards compartidos y rituales quincenales de insights. Esto habilita decisiones rápidas, como priorizar features que aumentan la adopción o automatizaciones que liberan tiempo del equipo de customer success.",
      "El resultado es un backlog alineado al negocio y una comunicación transparente con inversores y clientes enterprise, que ven cómo cada release mueve la aguja.",
    ],
    readingTime: 6,
    tags: ["métricas", "b2b", "product management"],
    serviceFocus: "Consultoría & IA",
  },
];
