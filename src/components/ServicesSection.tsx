import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Cog, Users, BrainCircuit } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "Desarrollo a medida",
      description:
        "Diseñamos y construimos software web, mobile e integraciones que responden a tus objetivos comerciales.",
      features: [
        "Aplicaciones web y mobile listas para escalar",
        "Integraciones con ERPs, CRMs y APIs de terceros",
        "Modernización de sistemas legacy sin interrumpir la operación",
        "Equipos dedicados para evolutivos y soporte continuo",
      ],
      color: "from-blue-500 to-capasso-primary",
    },
    {
      icon: Users,
      title: "Outsourcing de equipos",
      description:
        "Podemos sumarnos con pods ágiles y multidisciplinarios para acelerar tu roadmap sin fricción.",
      features: [
        "Pods con PM, Tech Lead, Devs y QA",
        "Onboarding express para integrarnos a tu stack",
        "Gestión transparente con tableros y métricas",
        "Cobertura de husos horarios para LATAM y EEUU",
      ],
      color: "from-capasso-primary to-cyan-400",
    },
    {
      icon: BrainCircuit,
      title: "Consultoría & IA",
      description:
        "Te ayudamos a traducir tus objetivos de negocio en decisiones técnicas, automatizaciones y pruebas de valor.",
      features: [
        "Workshops de discovery y definición de roadmap",
        "Arquitecturas escalables y planes de migración",
        "Automatizaciones con IA cuando genera ROI real",
        "PoCs medibles para validar con stakeholders",
      ],
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: Cog,
      title: "Mantenimiento proactivo",
      description:
        "Monitoreamos, optimizamos y evolucionamos tus plataformas con acuerdos de servicio claros.",
      features: [
        "SLA definidos y soporte post-lanzamiento",
        "Monitoreo preventivo de performance y seguridad",
        "Roadmaps trimestrales basados en métricas",
        "Planes de optimización de costos en infraestructura",
      ],
      color: "from-cyan-400 to-blue-500",
    },
  ];

  const handleCalendlyClick = (location: string) => {
    trackEvent("calendly_click", { location });
    window.open("https://calendly.com/capassoelias/15min", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="servicios" className="bg-capasso-secondary/30 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros <span className="text-gradient">Servicios</span>
          </h2>
          <p className="text-xl text-capasso-light/80 max-w-3xl mx-auto">
            Construimos, potenciamos y asesoramos equipos digitales con foco absoluto en mover indicadores de negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group flex h-full flex-col border border-capasso-gray bg-capasso-secondary/80 transition-all duration-500 hover:border-capasso-primary hover:shadow-lg hover:shadow-capasso-primary/10"
            >
              <CardHeader className="flex-1">
                <div className="mb-4 flex items-center">
                  <div className={`mr-4 rounded-lg bg-gradient-to-r p-3 ${service.color}`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-capasso-light transition-colors duration-300 group-hover:text-capasso-primary">
                    {service.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-base text-capasso-light/70">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-capasso-light/80">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-capasso-primary/30 bg-capasso-primary/10 p-8 text-center">
          <p className="text-lg text-capasso-light/80">
            ¿Tenés un objetivo para este trimestre? Conversemos 15 minutos y armamos un plan.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button onClick={() => handleCalendlyClick("services_intermediate")} className="btn-primary px-8 py-4 text-lg">
              Agendar 15 min
            </Button>
            <Button
              onClick={() => {
                trackEvent("whatsapp_click", { location: "services_intermediate" });
                window.open("https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa", "_blank", "noopener,noreferrer");
              }}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
