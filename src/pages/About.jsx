import Header from "@/components/Header";
import TechStackSection from "@/components/TechStackSection";
import TeamSection from "@/components/TeamSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { trackEvent } from "@/lib/analytics";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useReveal } from "@/hooks/useReveal";
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getYearsOfExperience } from "@/lib/experience";

const defaultWhatsappMessage = "Hola CapassoTech, quiero asesoría";
const yearsOfExperience = getYearsOfExperience();


const About = () => {
  const heroRef  = useReveal();
  const bioRef   = useReveal();
  const ctaRef   = useReveal();

  usePageSEO({
    title: "Nosotros - el equipo detrás de tu software",
    description:
      `Conocé a CapassoTech. Más de ${yearsOfExperience} años resolviendo problemas reales con tecnología, sin vueltas y sin tecnicismos.`,
    canonical: "https://capassotech.com/nosotros",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "website",
  });

  window.scrollTo(0, 0);

  const handleWhatsApp = (from, message = defaultWhatsappMessage) => {
    trackEvent("whatsapp_click", { location: from });
    window.open(`https://wa.me/5493435332132?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white text-capasso-dark">
      <Header />
      <main>

        {/* ── Hero ── */}
        <section ref={heroRef} className="bg-white pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <div className="reveal">
              <span className="section-label">Quiénes somos</span>
              <h1 className="mt-4 text-[2.5rem] font-extrabold leading-tight tracking-tight text-capasso-dark md:text-[3.5rem]">
                Un equipo, con ganas de{" "}
                <span className="text-gradient">hacer las cosas bien</span>
              </h1>
              <p className="mt-5 mx-auto max-w-2xl text-lg text-capasso-dark-grey">
                Somos personas distribuidas por Argentina, con base en Paraná.
                Arrancamos como una idea y hoy tenemos estructura, proceso y experiencia.
                No tenemos la burocracia de las grandes empresas ni la incertidumbre de contratar
                a una sola persona. El punto medio que la mayoría de las empresas necesita.
              </p>
            </div>
          </div>
        </section>

        {/* ── Elías ── */}
        <section ref={bioRef} className="bg-capasso-light-blue section-default">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">

              <div className="reveal">
                <span className="section-label">La persona detrás</span>
                <h2 className="mt-3 text-[2rem] font-extrabold leading-tight text-capasso-dark md:text-[2.5rem]">
                  Hola, soy Elías
                </h2>
                <p className="mt-4 text-lg text-capasso-dark-grey">
                  Ingeniero en Sistemas con más de {yearsOfExperience} años trabajando en
                  proyectos de software, desde startups hasta empresas medianas y grandes.
                  Pasé por muchos roles tales como programador, líder técnico,
                  responsable de producto, y toda esa experiencia me ayuda a entender el problema
                  completo, no solo la parte técnica.
                </p>
                <p className="mt-4 text-capasso-dark-grey">
                  Arranqué CapassoTech porque vi que muchas empresas necesitaban
                  tecnología pero no querían lidiar con la burocracia de una
                  consultora grande. Nosotros entendemos lo que
                  necesitás, lo implementamos de la mejor manera y te contamos todo en el camino.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => handleWhatsApp("about_bio", "Hola Elías, quiero charlar sobre mi proyecto")} className="btn-primary text-base">
                    Charlar con Elías
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="reveal reveal-delay-1 flex flex-col gap-5">
                <div className="overflow-hidden rounded-3xl shadow-card">
                  <img
                    src="/images/about/eliascapasso.png"
                    alt="Elías Capasso, fundador de CapassoTech"
                    className="w-full object-cover"
                    loading="lazy"
                    style={{ maxHeight: "380px" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="content-card text-center">
                    <p className="text-3xl font-extrabold text-capasso-primary">{yearsOfExperience}+</p>
                    <p className="mt-1 text-sm text-capasso-dark-grey">Años de experiencia</p>
                  </div>
                  <div className="content-card text-center">
                    <p className="text-3xl font-extrabold text-capasso-primary">30+</p>
                    <p className="mt-1 text-sm text-capasso-dark-grey">Proyectos entregados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ── Equipo ── */}
        <TeamSection />

        {/* ── Cómo trabajamos ── */}
        <HowWeWorkSection />

        {/* ── Tech Stack ── */}
        <TechStackSection />

        {/* ── CTA final ── */}
        <section ref={ctaRef} className="bg-capasso-dark section-large">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <div className="reveal">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-capasso-primary">
                Siguiente paso
              </span>
              <h2 className="text-[2.5rem] font-extrabold leading-tight text-white md:text-[3rem]">
                ¿Querés que trabajemos juntos?
              </h2>
            </div>
            <p className="reveal reveal-delay-1 mt-5 mx-auto max-w-xl text-lg text-white/60">
              Contanos tu problema y te decimos cómo lo
              encaramos, con quién y en qué tiempo.
            </p>
            <div className="reveal reveal-delay-2 mt-10 flex flex-wrap justify-center gap-4">
              <button onClick={() => handleWhatsApp("about_cta", "Hola CapassoTech, quiero agendar una llamada para hablar de mi proyecto")} className="btn-primary text-base">
                Agendar 15 min gratis
                <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => handleWhatsApp("about_cta")} className="btn-white inline-flex items-center gap-2 text-base">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default About;
