import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cases from "@/data/cases.json";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const Cases = () => {
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
              <p className="text-sm uppercase tracking-wide text-capasso-primary/70">Casos de éxito</p>
              <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Resultados que mueven el negocio</h1>
              <p className="mt-4 text-lg text-capasso-light/80">
                Historias reales de compañías que eligieron CapassoTech para acelerar sus productos, automatizar procesos y mejorar métricas clave.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-capasso-dark py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {cases.map((caseStudy) => (
                <article
                  key={caseStudy.slug}
                  className="flex h-full flex-col rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-8 shadow-lg shadow-black/10 transition-all duration-300 hover:border-capasso-primary hover:shadow-capasso-primary/20"
                >
                  <div className="flex items-center justify-between text-sm text-capasso-primary/70">
                    <span className="uppercase tracking-wide">{caseStudy.category}</span>
                    <span>{caseStudy.duration}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{caseStudy.title}</h2>
                  <p className="mt-3 text-capasso-light/70">{caseStudy.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {caseStudy.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded-full border border-capasso-primary/30 bg-capasso-dark px-3 py-1 text-xs text-capasso-primary">
                        {tech}
                      </span>
                    ))}
                    {caseStudy.technologies.length > 4 && (
                      <span className="rounded-full border border-capasso-primary/30 bg-capasso-dark px-3 py-1 text-xs text-capasso-primary">
                        +{caseStudy.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  <ul className="mt-6 space-y-2 text-sm text-capasso-light/80">
                    {caseStudy.results.slice(0, 3).map((result) => (
                      <li key={result} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex-1" />
                  <Link
                    to={`/casos/${caseStudy.slug}`}
                    className="mt-6 inline-flex items-center text-capasso-primary transition-colors hover:text-white"
                  >
                    Ver detalle →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-capasso-secondary/30 py-20">
          <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Queremos contar tu historia próxima</h2>
              <p className="mt-4 text-capasso-light/70">
                Coordinamos una reunión de 15 minutos para entender el desafío y proponerte un plan con métricas claras.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button onClick={() => openCalendly("cases_cta")} className="btn-primary px-8 py-4 text-lg">
                  Agendar 15 min
                </Button>
                <Button onClick={() => openWhatsApp("cases_cta")} className="btn-secondary px-8 py-4 text-lg">
                  Escribir por WhatsApp
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-6 shadow-lg shadow-black/10">
              <h3 className="text-xl font-semibold text-white">¿Qué analizamos en la call?</h3>
              <ul className="mt-4 space-y-2 text-sm text-capasso-light/80">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  Objetivos de negocio y métricas que querés mover
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  Tecnología actual, integraciones y restricciones
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  Equipo disponible y modelo de trabajo ideal
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cases;
