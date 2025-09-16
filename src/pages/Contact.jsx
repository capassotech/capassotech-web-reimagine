import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const Contact = () => {
  const openCalendly = (origin) => {
    trackEvent("calendly_click", { location: origin });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const openWhatsApp = (origin) => {
    trackEvent("whatsapp_click", { location: origin });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-capasso-dark text-capasso-light mt-24">
      <Header />
      <main>
        <section className="bg-capasso-secondary/20 pt-32 pb-16">
          <div className="container mx-auto px-4 text-center md:text-left">
            <div className="mx-auto max-w-3xl">
              <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Contanos qué querés construir</h1>
              <p className="mt-4 text-lg text-capasso-light/80">
                Respondemos dentro de 1 día hábil con un plan inicial, stack sugerido y próximos pasos.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-capasso-secondary/30 py-20">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-6 shadow-lg shadow-black/10">
              <ContactForm context="contact" />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">Agendá cuando te quede cómodo</h2>
                <p className="mt-2 text-capasso-light/70">
                  Elegí un horario libre en nuestra agenda y llevá la charla con los decision makers que necesites.
                </p>
                <Button onClick={() => openCalendly("contact_page")} className="btn-primary mt-4 w-full sm:w-auto px-8 py-4 text-lg">
                  Agendar 15 min
                </Button>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">¿Preferís WhatsApp?</h2>
                <p className="mt-2 text-capasso-light/70">
                  Enviános tu mensaje y coordinamos por ahí.
                </p>
                <Button onClick={() => openWhatsApp("contact_page")} className="btn-secondary mt-4 w-full sm:w-auto px-8 py-4 text-lg">
                  Escribir por WhatsApp
                </Button>
              </div>
              <div className="rounded-2xl border border-capasso-primary/20 bg-capasso-primary/10 p-6">
                <h3 className="text-lg font-semibold text-white">También podés escribirnos</h3>
                <p className="mt-2 text-capasso-light/70">contacto@capasso.tech</p>
                <p className="text-capasso-light/70">+54 9 343 5332132</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
