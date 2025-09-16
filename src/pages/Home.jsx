import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import TechStackSection from "@/components/TechStackSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import StickyCTA from "@/components/StickyCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const differentiators = [
  {
    title: "Velocidad con calidad",
    description: "Sprints cortos, entregables utilizables desde el día 1 y feedback continuo.",
  },
  {
    title: "Enfoque en resultado",
    description: "Traducimos objetivos de negocio a roadmap técnico y métricas.",
  },
  {
    title: "Escalable y mantenible",
    description: "Arquitecturas que soportan el crecimiento sin dolores a los 6 meses.",
  },
  {
    title: "IA cuando conviene",
    description: "Automatizamos con IA solo donde genera ROI real, sin vender humo.",
  },
  {
    title: "Transparencia total",
    description: "Comunicación clara, tableros visibles y decisiones compartidas.",
  },
];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const targetId = location.state && typeof location.state === "object" ? location.state.scrollTo : undefined;
    if (targetId) {
      navigate(location.pathname, { replace: true, state: {} });
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, [location, navigate]);

  const handleCalendly = (from) => {
    trackEvent("calendly_click", { location: from });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = (from) => {
    trackEvent("whatsapp_click", { location: from });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-capasso-dark text-capasso-light">
      <Header />
      <main>
        <Hero />

        <section className="bg-capasso-secondary/20 py-20" id="por-que">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-bold md:text-5xl">¿Por qué CapassoTech?</h2>
              <p className="mt-4 text-lg text-capasso-light/70">
                Nos integramos como parte de tu equipo para diseñar soluciones que mueven indicadores, no solo features.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/60 p-6 transition-all duration-300 hover:border-capasso-primary hover:shadow-lg hover:shadow-capasso-primary/10"
                >
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-capasso-light/70">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ServicesSection />
        <TechStackSection />
        <CaseStudiesSection />
        <ProcessSection />
        <Testimonials />

        <section className="bg-capasso-primary/10 py-20">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center">
            <h3 className="text-3xl font-semibold text-white md:text-4xl">
              ¿Listo para escalar tu producto sin fricción?
            </h3>
            <p className="max-w-2xl text-capasso-light/80">
              Contanos qué querés lograr este trimestre y te proponemos un plan con hitos, métricas y equipo asignado.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => handleCalendly("home_cta_final")} className="btn-primary px-8 py-4 text-lg">
                Agendar 15 min
              </Button>
              <Button onClick={() => handleWhatsApp("home_cta_final")} className="btn-secondary px-8 py-4 text-lg">
                Escribir por WhatsApp
              </Button>
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-capasso-secondary/30 py-20">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-white">Contanos tu desafío.</h2>
              <p className="mt-4 text-lg text-capasso-light/70">
                Agendamos una discovery call de 15 minutos para entender contexto, objetivos y restricciones. En 24 horas te enviamos un plan de acción.
              </p>
              <div className="mt-8 space-y-4">
                <div className="rounded-xl border border-capasso-primary/20 bg-capasso-dark/60 p-4">
                  <p className="text-sm uppercase tracking-wide text-capasso-primary/70">Preferís mensaje directo</p>
                  <Button onClick={() => handleWhatsApp("home_contact")} className="btn-secondary mt-3 w-full sm:w-auto">
                    Escribir por WhatsApp
                  </Button>
                </div>
                <div className="rounded-xl border border-capasso-primary/20 bg-capasso-dark/60 p-4">
                  <p className="text-sm uppercase tracking-wide text-capasso-primary/70">O agenda cuando te quede cómodo</p>
                  <Button onClick={() => handleCalendly("home_contact")} className="btn-primary mt-3 w-full sm:w-auto">
                    Ver agenda de 15 min
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-6 shadow-lg shadow-black/10">
              <ContactForm context="home" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Home;
