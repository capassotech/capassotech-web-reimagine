import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ProcessSection from "@/components/ProcessSection";
import StickyCTA from "@/components/StickyCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { trackEvent } from "@/lib/analytics";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useReveal } from "@/hooks/useReveal";
import { ArrowRight, CheckCircle } from "lucide-react";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const differentiators = [
  { title: "Resultados rápidos, sin apuros",    description: "No te hacemos esperar meses para ver algo. Desde el primer momento trabajamos para que tengas avances concretos." },
  { title: "Hablamos tu idioma",                description: "Sin tecnicismos innecesarios. Te explicamos qué se hace, por qué y cuánto cuesta, en términos que tienen sentido para tu negocio." },
  { title: "Lo que construimos, dura",          description: "No hacemos parches. Pensamos en que lo que entregamos hoy siga funcionando bien cuando tu negocio crezca." },
  { title: "Usamos IA solo cuando tiene sentido", description: "No te vendemos inteligencia artificial porque está de moda. La usamos cuando de verdad te ahorra tiempo o plata." },
  { title: "Sabés en todo momento qué pasa",   description: "Sin sorpresas. Te contamos cómo va el proyecto, qué decidimos y por qué. Siempre." },
];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const whyRef    = useReveal();
  const ctaRef    = useReveal();
  const contactRef = useReveal();

  usePageSEO({
    title: "CapassoTech — Software a medida, pods ágiles e IA enfocada en ROI",
    description: "Equipo de producto y tecnología que diseña y escala software, automatizaciones e IA con métricas claras desde el primer sprint.",
    canonical: "https://capassotech.com/",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "website",
  });

  useEffect(() => {
    const targetId = location.state && typeof location.state === "object" ? location.state.scrollTo : undefined;
    if (targetId) {
      navigate(location.pathname, { replace: true, state: {} });
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
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
    <div className="min-h-screen bg-white text-capasso-dark">
      <Header />
      <main>
        <Hero />

        {/* ── ¿Por qué CapassoTech? (light white section) ── */}
        <section id="por-que" ref={whyRef} className="section-default bg-white">
          <div className="mx-auto max-w-6xl px-6">

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
              {/* Left: heading */}
              <div className="reveal">
                <span className="section-label">Por qué trabajar con nosotros</span>
                <h2 className="text-[2.5rem] font-extrabold leading-tight tracking-tight text-capasso-dark md:text-[3rem]">
                  Somos el equipo tech que{" "}
                  <span className="text-gradient">quisieras tener adentro</span>
                </h2>
                <p className="mt-5 text-lg text-capasso-dark-grey">
                  Sin las complicaciones de contratar, capacitar y retener. Te sumamos
                  experiencia real desde el primer día.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => handleCalendly("why_section")} className="btn-primary text-base">
                    Hablar con el equipo
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleWhatsApp("why_section")} className="btn-outline text-base">
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Right: checklist cards */}
              <div className="space-y-4">
                {differentiators.map((item, i) => (
                  <div
                    key={item.title}
                    className={`reveal reveal-delay-${Math.min(i + 1, 5)} flex items-start gap-4 rounded-2xl border border-capasso-light-grey bg-white p-5 shadow-soft transition-all duration-300 hover:border-capasso-primary/30 hover:shadow-card`}
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-capasso-primary" strokeWidth={2} />
                    <div>
                      <h3 className="font-bold text-capasso-dark">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-capasso-dark-grey">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServicesSection />
<CaseStudiesSection />
        <ProcessSection />

        {/* ── Final CTA (dark section like Diveria) ── */}
        <section ref={ctaRef} className="bg-capasso-dark section-large">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <div className="reveal">
              <span
                className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-capasso-primary"
              >
                Siguiente paso
              </span>
              <h2 className="text-[2.5rem] font-extrabold leading-tight text-white md:text-[3rem]">
                ¿Listo para escalar tu producto<br className="hidden md:block" /> sin fricción?
              </h2>
            </div>
            <p className="reveal reveal-delay-1 mt-5 mx-auto max-w-xl text-lg text-white/60">
              Contanos qué querés lograr este trimestre y te proponemos un plan
              con hitos, métricas y equipo asignado.
            </p>
            <div className="reveal reveal-delay-2 mt-10 flex flex-wrap justify-center gap-4">
              <button onClick={() => handleCalendly("home_cta_final")} className="btn-primary text-base">
                Agendar 15 min gratis
                <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => handleWhatsApp("home_cta_final")} className="btn-white text-base">
                WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* ── Contacto ── */}
        <section id="contacto" ref={contactRef} className="section-default bg-capasso-light-blue">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">

              {/* Left: contact info */}
              <div className="flex flex-col justify-center reveal">
                <span className="section-label">Hablemos</span>
                <h2 className="text-[2rem] font-extrabold leading-tight text-capasso-dark md:text-[2.5rem]">
                  Contanos tu desafío.
                </h2>
                <p className="mt-4 text-lg text-capasso-dark-grey">
                  Agendamos una discovery call de 15 minutos para entender tu
                  contexto, objetivos y restricciones. En 24&nbsp;horas te enviamos
                  un plan de acción.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="content-card">
                    <p className="text-xs font-bold uppercase tracking-widest text-capasso-primary">
                      Preferís mensaje directo
                    </p>
                    <button
                      onClick={() => handleWhatsApp("home_contact")}
                      className="btn-outline mt-3 text-sm"
                    >
                      Escribir por WhatsApp
                    </button>
                  </div>
                  <div className="content-card">
                    <p className="text-xs font-bold uppercase tracking-widest text-capasso-primary">
                      O agendá cuando te quede cómodo
                    </p>
                    <button
                      onClick={() => handleCalendly("home_contact")}
                      className="btn-primary mt-3 text-sm"
                    >
                      Ver agenda de 15 min
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="reveal reveal-delay-1 content-card shadow-card">
                <ContactForm context="home" />
              </div>
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
