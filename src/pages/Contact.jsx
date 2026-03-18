import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import StickyCTA from "@/components/StickyCTA";
import { trackEvent } from "@/lib/analytics";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useReveal } from "@/hooks/useReveal";
import { ArrowRight } from "lucide-react";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const Contact = () => {
  const sectionRef = useReveal();

  usePageSEO({
    title: "Contacto — CapassoTech",
    description: "Escribinos o agendá una charla de 15 minutos. Te respondemos dentro de 1 día hábil con un plan concreto.",
    canonical: "https://capassotech.com/contacto",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "website",
  });

  window.scrollTo(0, 0);

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

        <section ref={sectionRef} className="bg-capasso-light-blue section-default pt-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">

              {/* Left */}
              <div className="flex flex-col justify-center reveal">
                <span className="section-label">Hablemos</span>
                <h1 className="text-[2rem] font-extrabold leading-tight text-capasso-dark md:text-[2.5rem]">
                  Contanos tu desafío.
                </h1>
                <p className="mt-4 text-lg text-capasso-dark-grey">
                  Agendamos una charla de 15 minutos para entender qué necesitás.
                  En 24 horas te enviamos un plan concreto.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="content-card">
                    <p className="text-xs font-bold uppercase tracking-widest text-capasso-primary">
                      Preferís mensaje directo
                    </p>
                    <button
                      onClick={() => handleWhatsApp("contact_page")}
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
                      onClick={() => handleCalendly("contact_page")}
                      className="btn-primary mt-3 text-sm"
                    >
                      Ver agenda de 15 min
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="content-card">
                    <p className="text-xs font-bold uppercase tracking-widest text-capasso-primary">
                      Email
                    </p>
                    <a
                      href="mailto:contacto@capasso.tech"
                      className="mt-2 block text-sm font-semibold text-capasso-dark hover:text-capasso-primary transition-colors"
                    >
                      contacto@capasso.tech
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="reveal reveal-delay-1 content-card shadow-card">
                <ContactForm context="contact" />
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

export default Contact;
