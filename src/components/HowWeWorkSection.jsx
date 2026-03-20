import { useReveal } from "@/hooks/useReveal";

const RITUALS = [
  {
    time: "Todos los días",
    title: "Daily por proyecto",
    desc: "Cada proyecto tiene su daily. Corta, concreta y sin rodeos: qué se hizo, qué viene y si hay algo que está trabando. El equipo siempre está alineado.",
    accent: "#49b5e7",
  },
  {
    time: "Jueves",
    title: "Planning semanal",
    desc: "Los jueves planificamos la semana siguiente. Se priorizan tareas, se estiman tiempos y se asegura que todos arranquen el lunes con el camino claro.",
    accent: "#216AD9",
  },
  {
    time: "1 vez por semana",
    title: "Weekly con el cliente",
    desc: "Una reunión semanal con los clientes que la necesitan. Se muestra el avance, se alinean expectativas y se toman decisiones sin acumular dudas.",
    accent: "#49b5e7",
  },
];

const PILLARS = [
  {
    icon: "💬",
    title: "Comunicación async primero",
    desc: "Slack, comentarios en el código, actualizaciones escritas. No interrumpimos para todo — pero siempre hay respuesta el mismo día.",
  },
  {
    icon: "👁️",
    title: "El cliente siempre sabe qué pasa",
    desc: "Acceso al tablero de tareas, actualizaciones semanales, demos frecuentes. Nunca vas a tener que preguntar '¿en qué están?'.",
  },
  {
    icon: "🔁",
    title: "Entregas chicas, mejoras constantes",
    desc: "No esperamos al final para mostrar. Cada semana hay algo concreto que ver, probar y ajustar si hace falta.",
  },
  {
    icon: "📲",
    title: "Siempre hay alguien disponible",
    desc: "No vas a quedar esperando días una respuesta. Si surge algo, el equipo está. Eso no significa que no descansamos — significa que nos organizamos para que ningún cliente quede en el aire.",
  },
];

const HowWeWorkSection = () => {
  const headerRef  = useReveal();
  const ritualsRef = useReveal();
  const pillarsRef = useReveal();
  const calloutRef = useReveal();

  return (
    <section className="section-default bg-capasso-dark overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <div className="reveal">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-capasso-primary mb-4">
              El día a día
            </span>
            <h2 className="text-[2.5rem] font-extrabold leading-tight tracking-tight text-white md:text-[3rem]">
              Así trabajamos,{" "}
              <span className="text-gradient">sin vueltas</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-white/55">
              Somos remote-first desde el primer día. Eso nos obligó a desarrollar
              una forma de trabajar que no depende de estar en la misma habitación —
              sino de comunicarnos bien y entregar con consistencia.
            </p>
          </div>
        </div>

        {/* Ritmos semanales */}
        <div ref={ritualsRef} className="mb-16">
          <div className="reveal mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-white/30">Ritmo semanal</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {RITUALS.map((r, i) => (
              <div
                key={r.title}
                className={`reveal reveal-delay-${i + 1} relative rounded-2xl border border-white/8 bg-white/4 p-6 overflow-hidden`}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{ background: r.accent }} />

                <span className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: r.accent }}>
                  {r.time}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">{r.title}</h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pilares */}
        <div ref={pillarsRef}>
          <div className="reveal mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-white/30">Cómo nos manejamos</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className={`reveal reveal-delay-${i + 1} flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-6 transition-all duration-300 hover:bg-white/7 hover:border-white/15`}
              >
                <span className="text-2xl shrink-0 mt-0.5">{p.icon}</span>
                <div>
                  <h3 className="font-bold text-white">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-white/50 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Callout: cada persona importa */}
        <div ref={calloutRef}>
          <div className="reveal relative rounded-2xl overflow-hidden p-8 md:p-10">
            {/* Fondo con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-capasso-primary/20 via-[#49b5e7]/10 to-transparent" />
            <div className="absolute inset-0 rounded-2xl border border-capasso-primary/30" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <span className="text-4xl shrink-0">⚙️</span>
              <div>
                <h3 className="text-xl font-extrabold text-white">
                  Cada integrante es un engranaje fundamental
                </h3>
                <p className="mt-2 text-white/60 leading-relaxed max-w-2xl">
                  En CapassoTech no hay voces más importantes que otras. Cada propuesta,
                  idea o mejora que surge de cualquier miembro del equipo se escucha,
                  se evalúa y — si tiene sentido — se implementa. Creemos que las
                  mejores soluciones aparecen cuando todos se sienten parte real del proyecto,
                  no solo ejecutores de una lista de tareas.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowWeWorkSection;
