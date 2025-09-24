import Header from "@/components/Header";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { usePageSEO } from "@/hooks/usePageSEO";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const servicesDetail = [
  {
    title: "Desarrollo a medida",
    intro: "Transformamos ideas en productos digitales robustos, escalables y preparados para iterar.",
    bullets: [
      "Discovery colaborativo para priorizar funcionalidades críticas",
      "Diseño UX/UI alineado a métricas de adopción y conversión",
      "Arquitecturas modulares listas para integrarse con tus sistemas",
      "QA automatizado y pipelines CI/CD desde el inicio",
    ],
    outcomes: [
      "MVP listo para validar en semanas, no meses",
      "Roadmap claro para evolucionar el producto",
      "Transferencia de conocimiento y documentación completa",
    ],
  },
  {
    title: "Outsourcing de equipos",
    intro: "Pods ágiles con PM, Tech Lead, Devs y QA que se integran a tu operación sin fricción.",
    bullets: [
      "Onboarding express y setup de tableros compartidos",
      "Procesos ágiles con ceremonias y reportes transparentes",
      "Cobertura de husos horarios para stakeholders globales",
      "Capacidad de escalar o reducir el equipo en cuestión de días",
    ],
    outcomes: [
      "Backlog priorizado y ejecutado sprint a sprint",
      "Visibilidad de métricas de productividad y calidad",
      "Velocidad constante sin sacrificar maintainability",
    ],
  },
  {
    title: "Consultoría & IA",
    intro: "Te ayudamos a decidir dónde invertir, qué automatizar y cómo medir el impacto real.",
    bullets: [
      "Workshops de discovery y priorización de iniciativas",
      "Auditorías de arquitectura y performance con recomendaciones accionables",
      "Identificación de oportunidades de automatización con IA",
      "PoCs medibles para validar hipótesis de negocio",
    ],
    outcomes: [
      "Roadmap estratégico con quick wins y visión a 6-12 meses",
      "Estimaciones de ROI para cada iniciativa",
      "Plan de implementación y acompañamiento hands-on",
    ],
  },
  {
    title: "Mantenimiento proactivo",
    intro: "Cuidamos tus plataformas en producción con un equipo listo para responder y optimizar.",
    bullets: [
      "SLA y canales de soporte definidos para incidentes",
      "Monitoreo preventivo de performance, seguridad y costos",
      "Plan de mejoras trimestrales basado en métricas",
      "Automatización de deploys y backups",
    ],
    outcomes: [
      "Disponibilidad y performance consistente",
      "Reducción de costos de infraestructura",
      "Usuarios finales satisfechos y sin interrupciones",
    ],
  },
];

const Services = () => {
  usePageSEO({
    title: "Servicios CapassoTech — Desarrollo a medida, pods ágiles, consultoría e IA",
    description:
      "Planes modulares para construir MVPs, sumar squads ágiles, auditar arquitectura y aplicar inteligencia artificial con foco en resultados.",
    canonical: "https://capassotech.com/servicios",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "website",
  });

  const openCalendly = (origin) => {
    trackEvent("calendly_click", { location: origin });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const openWhatsApp = (origin) => {
    trackEvent("whatsapp_click", { location: origin });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-capasso-dark text-capasso-light">
      <Header />
      <main>
        <section className="bg-capasso-secondary/20 pt-32 pb-16">
          <div className="container mx-auto px-4 text-center md:text-left">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm uppercase tracking-wide text-capasso-primary/70">Servicios</p>
              <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Planes para construir, escalar y optimizar</h1>
              <p className="mt-6 text-lg text-capasso-light/80">
                Nos sumamos en la etapa que estés: desde discovery y MVP hasta scaling y soporte 24/7. Podés contratarnos por proyecto o como extensión de tu equipo.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button onClick={() => openCalendly("services_hero")} className="btn-primary px-8 py-4 text-lg">
                  Agendar 15 min
                </Button>
                <Button onClick={() => openWhatsApp("services_hero")} className="btn-secondary px-8 py-4 text-lg">
                  Escribir por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ServicesSection />

        <section className="bg-capasso-dark py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Cómo trabajamos cada servicio
              </h2>
              <p className="mt-4 text-lg text-capasso-light/70">
                Transparencia, métricas y ownership end-to-end. Sumamos expertise en producto, ingeniería y datos para acompañarte más allá de un entregable puntual.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {servicesDetail.map((service) => (
                <article key={service.title} className="flex h-full flex-col rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-8 shadow-lg shadow-black/10">
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-capasso-light/80">{service.intro}</p>
                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-capasso-primary/70">Qué incluye</p>
                    <ul className="mt-3 space-y-2 text-sm text-capasso-light/80">
                      {service.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-capasso-primary/70">Resultados</p>
                    <ul className="mt-3 space-y-2 text-sm text-capasso-light/80">
                      {service.outcomes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-capasso-secondary/30 py-20">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Armemos un plan a tu medida</h2>
              <p className="mt-4 text-capasso-light/70">
                Contanos qué querés lograr este trimestre y en 24 horas te enviamos una propuesta con roadmap, métricas y stack recomendado.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button onClick={() => openCalendly("services_form")} className="btn-primary px-8 py-4 text-lg">
                  Agendar 15 min
                </Button>
                <Button onClick={() => openWhatsApp("services_form")} className="btn-secondary px-8 py-4 text-lg">
                  Escribir por WhatsApp
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-6 shadow-lg shadow-black/10">
              <ContactForm context="services" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
