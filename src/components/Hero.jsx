import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const stats = [
  { label: "Tecnologías dominadas", value: "15+" },
  { label: "Primer sprint listo", value: "2 semanas" },
  { label: "Años construyendo productos", value: "5+" },
  { label: "Reuniones con decisiones accionables", value: "98%" },
];

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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b141c] via-capasso-dark to-[#050505]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 top-24 h-80 w-80 rounded-full bg-capasso-primary/25 blur-3xl" />
        <div className="absolute right-[-10%] top-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(73,181,231,0.18),_transparent_55%)]" />
      </div>
      <div className="relative container px-4 pb-24 pt-36">
        <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-8 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-capasso-light/80 shadow-sm shadow-capasso-primary/20">
              <span className="h-2 w-2 rounded-full bg-capasso-primary" />
              Equipos ágiles, foco en resultados, integración con IA cuando aporta valor.
            </span>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                Software que hace crecer tu negocio.
              </h1>
              <p className="max-w-xl text-lg text-capasso-light/80 md:text-xl">
                Desarrollamos productos a medida, potenciamos tu equipo y te asesoramos para que escales sin fricción.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button onClick={handleCalendly} className="btn-primary text-base md:text-lg">
                Agendar 15 min
              </Button>
              <Button onClick={handleWhatsApp} variant="outline" className="btn-secondary text-base md:text-lg">
                Escribir por WhatsApp
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-capasso-primary" />
                <div>
                  <p className="text-base font-semibold text-white">Entregables útiles en semanas</p>
                  <p className="text-sm text-capasso-light/60">Sprints de 2 semanas, roadmap claro y priorizado con vos.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-capasso-primary" />
                <div>
                  <p className="text-base font-semibold text-white">Equipo senior end-to-end</p>
                  <p className="text-sm text-capasso-light/60">Discovery, diseño, desarrollo y QA trabajando alineados.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-capasso-primary" />
                <div>
                  <p className="text-base font-semibold text-white">IA solo cuando suma</p>
                  <p className="text-sm text-capasso-light/60">Automatizaciones con ROI medible y métricas visibles.</p>
                </div>
              </div>
            </div>
          </div>
          <aside className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-xl shadow-black/30 backdrop-blur">
            <div className="absolute right-[-20%] top-[-20%] h-48 w-48 rounded-full bg-capasso-primary/10 blur-3xl" />
            <div className="absolute bottom-[-30%] left-[-20%] h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative">
              <p className="text-sm uppercase tracking-wide text-capasso-light/60">Caso destacado</p>
              <p className="mt-3 text-3xl font-semibold text-white">+42% de eficiencia operativa</p>
              <p className="mt-2 text-sm text-capasso-light/70">Optimización del flujo de pedidos para retail LATAM en 8 semanas.</p>
            </div>
            <div className="relative grid gap-4 text-left text-capasso-light/80 sm:grid-cols-2">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-capasso-light/50">{item.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
