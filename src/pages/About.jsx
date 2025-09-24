import Header from "@/components/Header";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const values = [
  {
    title: "Accountability",
    description: "Nos hacemos cargo de los resultados y comunicamos con total transparencia cada decisión.",
  },
  {
    title: "Aprendizaje continuo",
    description: "Capacitaciones internas, guilds técnicos y rotación de roles para mantenernos al día.",
  },
  {
    title: "Colaboración sin silos",
    description: "Producto, diseño y tecnología trabajan como un solo equipo, junto al cliente.",
  },
  {
    title: "Impacto medible",
    description: "Cada iniciativa tiene una métrica objetivo y un plan para validarla.",
  },
];

const About = () => {
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
              <p className="text-sm uppercase tracking-wide text-capasso-primary/70">Nosotros</p>
              <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Equipo ágil, obsesionado por el resultado</h1>
              <p className="mt-4 text-lg text-capasso-light/80">
                CapassoTech nació para acompañar a empresas que necesitan construir o escalar productos digitales sin sumar burocracia. Nuestra experiencia en proyectos B2B, retail, servicios y SaaS nos permite conectar estrategia y ejecución.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-capasso-dark py-20">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
            <div className="mx-auto max-w-sm overflow-hidden rounded-3xl border border-capasso-primary/20 bg-capasso-secondary/50 shadow-2xl">
              <img
                src="/images/about/elias-capasso.svg"
                alt="Elías Capasso, fundador de CapassoTech"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-capasso-primary/70">Quién lidera CapassoTech</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Elías Capasso</h2>
              <p className="mt-4 text-capasso-light/80">
                Soy Elías Capasso, Ingeniero en Sistemas de Información con más de siete años liderando equipos y construyendo soluciones digitales end-to-end para fintechs, retail y servicios profesionales.
              </p>
              <p className="mt-4 text-capasso-light/70">
                Comencé mi carrera en consultoras tecnológicas y pasé por roles de developer, tech lead y product owner. Hoy acompaño a compañías de LATAM y España a transformar ideas en productos medibles, con discovery profundo, QA continuo y despliegues sin fricción.
              </p>
              <p className="mt-4 text-capasso-light/70">
                Desde el día uno me involucro personalmente con cada cliente para alinear expectativas, destrabar decisiones y asegurar que cada entrega esté diseñada para generar confianza e impacto real en el negocio.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-capasso-primary/20 bg-capasso-secondary/40 p-4">
                  <p className="text-2xl font-bold text-white">7+ años</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-capasso-light/60">liderando productos digitales</p>
                </div>
                <div className="rounded-2xl border border-capasso-primary/20 bg-capasso-secondary/40 p-4">
                  <p className="text-2xl font-bold text-white">20+ lanzamientos</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-capasso-light/60">en startups y corporaciones</p>
                </div>
                <div className="rounded-2xl border border-capasso-primary/20 bg-capasso-secondary/40 p-4">
                  <p className="text-2xl font-bold text-white">Confianza</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-capasso-light/60">procesos auditables y foco en métricas</p>
                </div>
              </div>
              <div className="mt-8 rounded-3xl border border-capasso-primary/20 bg-capasso-secondary/40 p-6">
                <h3 className="text-lg font-semibold text-white">Un equipo comprometido desde el día uno</h3>
                <p className="mt-3 text-sm text-capasso-light/80">
                  CapassoTech es un equipo multidisciplinario de desarrolladores, diseñadores, especialistas en producto y datos que se involucra para comprender tu negocio y co-crear soluciones que generen confianza y resultados sostenibles.
                </p>
                <ul className="mt-4 space-y-3 text-sm text-capasso-light/70">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-capasso-primary" />
                    Diagnóstico inmersivo para entender tu modelo de negocio, a tus usuarios y las métricas clave antes de escribir la primera línea de código.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-capasso-primary" />
                    Roadmaps co-creados y ceremonias ágiles que aseguran visibilidad permanente y un compromiso compartido con los objetivos planteados.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-capasso-primary" />
                    Implementación, soporte y mejora continua para adaptar la solución a la realidad del negocio y asegurar adopción en cada etapa.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-capasso-dark py-20">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Nuestros valores</h2>
              <p className="mt-4 text-capasso-light/70">
                Construimos relaciones de largo plazo basadas en confianza, comunicación directa y foco en KPI’s de negocio.
              </p>
              <div className="mt-8 grid gap-6">
                {values.map((value) => (
                  <div key={value.title} className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-6">
                    <h3 className="text-xl font-semibold text-white">{value.title}</h3>
                    <p className="mt-3 text-capasso-light/70">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-capasso-primary/20 bg-capasso-primary/10 p-8">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Nuestra metodología</h2>
              <p className="mt-4 text-capasso-light/70">
                Trabajamos con Scrum y prácticas ágiles adaptadas a cada cliente. Cada sprint tiene objetivos claros, demos con stakeholders y métricas visibles en tableros compartidos.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-capasso-light/80">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  Sprint Planning, Daily, Review y Retro facilitadas por Scrum Master certificado
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  Roadmaps trimestrales y OKRs para alinear negocio y tecnología
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  Tableros con métricas de throughput, calidad y satisfacción del usuario
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button onClick={() => openCalendly("about_methodology")} className="btn-primary px-8 py-4 text-lg">
                  Agendar 15 min
                </Button>
                <Button onClick={() => openWhatsApp("about_methodology")} className="btn-secondary px-8 py-4 text-lg">
                  Escribir por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ProcessSection />

        <section className="bg-capasso-secondary/30 py-20">
          <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">¿Hablamos?</h2>
              <p className="mt-4 text-capasso-light/70">
                Coordinemos una reunión para entender tu desafío y proponerte un plan accionable en menos de 24 horas.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={() => openCalendly("about_cta")} className="btn-primary px-8 py-4 text-lg">
                Agendar 15 min
              </Button>
              <Button onClick={() => openWhatsApp("about_cta")} className="btn-secondary px-8 py-4 text-lg">
                Escribir por WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
