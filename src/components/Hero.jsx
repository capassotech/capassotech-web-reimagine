import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Code, Users, Zap } from "lucide-react";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCalendly = () => {
    trackEvent("calendly_click", { location: "hero" });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "hero" });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-capasso-dark via-capasso-secondary to-capasso-dark" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-capasso-primary/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-400/5 blur-3xl delay-1000" />
      </div>

      <div className="container relative z-10 mx-auto mt-[120px] mb-[120px] px-4 text-center">
        <div className="mx-auto max-w-4xl animate-fade-in">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-capasso-light/80 shadow-sm shadow-capasso-primary/20">
            <span className="h-2 w-2 rounded-full bg-capasso-primary" />
            Equipos ágiles, foco en resultados, integración con IA cuando aporta valor.
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Software que hace crecer tu <span className="text-gradient">negocio</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-capasso-light/80">
            Desarrollamos productos a medida, potenciamos tu equipo y te asesoramos para que escales sin fricción.
          </p>

          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={handleCalendly} className="btn-primary px-8 py-4 text-lg">
              Agendar 15 min
            </Button>
            <Button onClick={handleWhatsApp} className="btn-secondary px-8 py-4 text-lg">
              Escribir por WhatsApp
            </Button>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-capasso-secondary/50 p-6 hover-glow">
              <Code className="mb-4 h-8 w-8 text-capasso-primary" />
              <div className="text-3xl font-bold text-capasso-primary">15+</div>
              <div className="text-capasso-light/70">Tecnologías</div>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-capasso-secondary/50 p-6 hover-glow">
              <Users className="mb-4 h-8 w-8 text-capasso-primary" />
              <div className="text-3xl font-bold text-capasso-primary">Pods ágiles</div>
              <div className="text-capasso-light/70">PM, Tech Lead, Dev, QA</div>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-capasso-secondary/50 p-6 hover-glow">
              <Zap className="mb-4 h-8 w-8 text-capasso-primary" />
              <div className="text-3xl font-bold text-capasso-primary">5+</div>
              <div className="text-capasso-light/70">Años de experiencia</div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-2 text-capasso-light/60">
            <span>Preferís ver más primero?</span>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-capasso-primary transition-colors hover:text-capasso-primary/80"
            >
              Conocé nuestros servicios
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-capasso-primary">
          <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-capasso-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
