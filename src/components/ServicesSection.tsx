import { Code, Users, BrainCircuit, Cog, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    icon: Code,
    title: "Tu idea, convertida en software",
    tagline: "De la idea al producto.",
    features: ["Apps web y móviles a medida", "Conexión con tus sistemas actuales", "Modernización de sistemas viejos", "Seguimiento y mejoras post-lanzamiento"],
  },
  {
    icon: Users,
    title: "Tu equipo tech, sin el dolor de cabeza",
    tagline: "Gente que arranca rápido.",
    features: ["Equipo completo desde el día uno", "Se adaptan a cómo trabajás vos", "Comunicación directa, sin intermediarios", "Disponibles en tu zona horaria"],
  },
  {
    icon: BrainCircuit,
    title: "Tecnología que resuelve problemas reales",
    tagline: "Sin modas, sin jerga.",
    features: ["Análisis de lo que realmente necesitás", "Automatizaciones que se pagan solas", "IA cuando tiene sentido, no por moda", "Sin tecnicismos en ninguna reunión"],
  },
  {
    icon: Cog,
    title: "Tu sistema siempre funcionando",
    tagline: "Sin caídas ni sorpresas.",
    features: ["Monitoreo antes de que algo falle", "Soporte cuando lo necesitás", "Nuevas funciones cuando el negocio lo pide", "Costos claros, sin letra chica"],
  },
];

const ServicesSection = () => {
  const sectionRef = useReveal<HTMLElement>();

  const handleCalendly = (loc: string) => {
    trackEvent("calendly_click", { location: loc });
    window.open("https://calendly.com/capassoelias/15min", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="servicios" ref={sectionRef} className="bg-capasso-light-blue section-default">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 text-center reveal">
          <span className="section-label">En qué te podemos ayudar</span>
          <h2 className="text-[2.5rem] font-extrabold leading-tight tracking-tight text-capasso-dark md:text-[3rem]">
            Lo que hacemos,{" "}
            <span className="text-gradient">dicho sin vueltas</span>
          </h2>
          <p className="mt-3 text-sm text-capasso-medium-grey">Pasá el cursor sobre cada servicio para ver el detalle.</p>
        </div>

        {/* Flip cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} flip-card`}
                style={{ minHeight: "300px" }}
              >
                <div className="flip-card-inner" style={{ minHeight: "300px" }}>

                  {/* Front */}
                  <div className="flip-card-front flex flex-col items-start justify-center gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-capasso-mid-blue text-capasso-primary">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-snug text-capasso-dark">{s.title}</h3>
                      <p className="mt-1.5 text-sm text-capasso-medium-grey">{s.tagline}</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="flip-card-back">
                    <h3 className="mb-4 text-base font-extrabold text-white">{s.title}</h3>
                    <ul className="space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-white/90">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div
          className="reveal mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl p-8 text-center md:flex-row md:text-left"
          style={{ background: "linear-gradient(135deg, #49b5e7 0%, #216AD9 100%)" }}
        >
          <div>
            <h3 className="text-xl font-bold text-white">¿No sabés bien por dónde empezar?</h3>
            <p className="mt-1 text-sm text-white/80">Contanos el problema en 15 minutos y te decimos cómo lo encaramos.</p>
          </div>
          <button
            onClick={() => handleCalendly("services_cta")}
            className="btn-white flex-shrink-0 text-sm"
          >
            Agendar 15 min
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
