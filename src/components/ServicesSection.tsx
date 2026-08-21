import { Code, Cog, Users, GraduationCap, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    icon: Code,
    title: "Desarrollo de software a medida",
    tagline: "Tu sistema a la medida de tu negocio.",
    features: ["Apps web y móviles a medida", "Integración con tus sistemas actuales", "Arquitectura pensada para escalar", "Acompañamiento después del lanzamiento"],
  },
  {
    icon: Cog,
    title: "Mantenimiento de sistemas existentes",
    tagline: "Cuidamos lo que ya tenés funcionando.",
    features: ["Corrección de errores y soporte continuo", "Monitoreo antes de que algo falle", "Actualizaciones y mejoras de performance", "Nuevas funciones sobre lo que ya existe"],
  },
  {
    icon: Users,
    title: "Outsourcing de equipos",
    tagline: "Sumamos gente a tu equipo, sin que tengas que contratar.",
    features: ["Devs, QA y líderes técnicos disponibles", "Se integran a tu forma de trabajar", "Comunicación directa, sin intermediarios", "Escalás o reducís el equipo cuando quieras"],
  },
  {
    icon: GraduationCap,
    title: "Capacitaciones",
    tagline: "Formamos a tu equipo para que gane autonomía.",
    features: ["Talleres a medida según tu stack", "Buenas prácticas de desarrollo", "Mentoría para perfiles junior", "Contenido práctico, no solo teoría"],
  },
];

const ServicesSection = () => {
  const sectionRef = useReveal<HTMLElement>();

  const handleWhatsApp = (loc: string, message: string) => {
    trackEvent("whatsapp_click", { location: loc });
    window.open(`https://wa.me/5493435332132?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="servicios" ref={sectionRef} className="bg-capasso-light-blue section-default">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 text-center reveal">
          <span className="section-label">En qué te podemos ayudar</span>
          <h2 className="text-[2.5rem] font-extrabold leading-tight tracking-tight text-capasso-dark md:text-[3rem]">
            Cuales son{" "}
            <span className="text-gradient">nuestros servicios</span>
          </h2>
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
            <p className="mt-1 text-sm text-white/80">Contanos el problema y te decimos cómo lo encaramos.</p>
          </div>
          <button
            onClick={() => handleWhatsApp("services_cta", "Hola CapassoTech, no sé bien por dónde empezar con mi proyecto y quiero agendar una llamada")}
            className="btn-white flex-shrink-0 text-sm"
          >
            Agendar reunión
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
