import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageSEO } from "@/hooks/usePageSEO";

const Book = () => {
  usePageSEO({
    title: "Agenda CapassoTech — Reservá una reunión de 15 minutos",
    description:
      "Elegí un horario en la agenda de CapassoTech para conversar sobre tu proyecto de software, automatización o IA.",
    canonical: "https://capassotech.com/book",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "website",
  });

  return (
    <div className="min-h-screen bg-capasso-dark text-capasso-light">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm uppercase tracking-wide text-capasso-primary/70">Agenda</p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Reservá 15 minutos con nuestro equipo</h1>
            <p className="mt-4 text-lg text-capasso-light/80">
              Elegí el horario que prefieras para conversar sobre tu proyecto y definir próximos pasos.
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <iframe
              title="Agenda CapassoTech"
              src="https://calendly.com/capassoelias/15min?hide_landing_page_details=1&hide_gdpr_banner=1"
              className="h-[900px] w-full max-w-4xl rounded-2xl border border-capasso-gray/60 bg-white"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Book;
