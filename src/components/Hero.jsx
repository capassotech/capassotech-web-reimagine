import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const Hero = () => {
  const handleCalendly = () => {
    trackEvent("calendly_click", { location: "hero" });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "hero" });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative overflow-hidden bg-capasso-dark pt-32 pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-capasso-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 text-center md:flex-row md:items-center md:text-left">
        <div className="md:w-3/5">
          <p className="mb-4 inline-flex items-center rounded-full border border-capasso-primary/40 bg-capasso-secondary/70 px-4 py-2 text-sm text-capasso-primary">
            Equipos ágiles, foco en resultados, integración con IA cuando aporta valor.
          </p>
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Software que hace crecer tu negocio.
          </h1>
          <p className="mt-6 text-lg text-capasso-light/80 md:text-xl">
            Desarrollamos productos a medida, potenciamos tu equipo y te asesoramos para que escales sin fricción.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button onClick={handleCalendly} className="btn-primary text-base md:text-lg">
              Agendar 15 min
            </Button>
            <Button onClick={handleWhatsApp} variant="outline" className="btn-secondary text-base md:text-lg">
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/60 p-6 backdrop-blur">
          <div>
            <h3 className="text-sm uppercase tracking-wide text-capasso-primary">Resultados recientes</h3>
            <p className="mt-2 text-2xl font-semibold text-white">+42% de eficiencia operativa</p>
            <p className="text-sm text-capasso-light/70">en la carga de pedidos de retail en 8 semanas.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-left text-capasso-light/80">
            <div>
              <p className="text-3xl font-semibold text-white">15+</p>
              <p className="text-xs uppercase tracking-wide text-capasso-light/50">Tecnologías dominadas</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">2 semanas</p>
              <p className="text-xs uppercase tracking-wide text-capasso-light/50">Tiempo promedio del primer sprint</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">5+</p>
              <p className="text-xs uppercase tracking-wide text-capasso-light/50">Años construyendo productos</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">98%</p>
              <p className="text-xs uppercase tracking-wide text-capasso-light/50">Reuniones con decisiones accionables</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
