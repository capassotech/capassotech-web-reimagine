import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cases from "@/data/cases.json";
import { blogPosts } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { usePageSEO } from "@/hooks/usePageSEO";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const CaseDetail = () => {
  window.scrollTo(0, 0);
  const { caseId } = useParams();

  const caseStudy = useMemo(() => cases.find((item) => item.slug === caseId), [caseId]);
  const relatedArticle = useMemo(
    () =>
      caseStudy?.relatedBlogSlug
        ? blogPosts.find((post) => post.slug === caseStudy.relatedBlogSlug)
        : undefined,
    [caseStudy?.relatedBlogSlug]
  );

  const seoTitle = caseStudy ? `${caseStudy.title} — Caso de éxito CapassoTech` : "Caso de éxito — CapassoTech";
  const seoDescription = caseStudy
    ? caseStudy.description
    : "Casos de éxito de CapassoTech en desarrollo de software, automatización e IA.";
  const canonicalUrl = caseStudy
    ? `https://capassotech.com/casos/${caseStudy.slug}`
    : "https://capassotech.com/casos";

  usePageSEO({
    title: seoTitle,
    description: seoDescription,
    canonical: canonicalUrl,
    image: "https://capassotech.com/og-image.jpg",
    ogType: "article",
  });

  if (!caseStudy) {
    return <Navigate to="/casos" replace />;
  }

  const openCalendly = (origin) => {
    trackEvent("calendly_click", { location: origin, case: caseStudy.slug });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const openWhatsApp = (origin) => {
    trackEvent("whatsapp_click", { location: origin, case: caseStudy.slug });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-capasso-dark text-capasso-light">
      <Header />
      <main>
        <section className="bg-capasso-secondary/20 pt-32 pb-16">
          <div className="container mx-auto px-4">
            <Link to="/casos" className="text-sm text-capasso-primary hover:text-white">
              ← Volver a casos
            </Link>
            <div className="mt-6 max-w-4xl">
              <p className="text-sm uppercase tracking-wide text-capasso-primary/70">{caseStudy.category}</p>
              <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">{caseStudy.title}</h1>
              <p className="mt-4 text-lg text-capasso-light/80">{caseStudy.description}</p>
              {relatedArticle && (
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-capasso-light/70">
                  <span>Profundizá en la historia completa:</span>
                  <Button asChild className="btn-secondary px-5 py-2 text-sm">
                    <Link to={`/blog/${relatedArticle.slug}`}>Leer artículo del blog</Link>
                  </Button>
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-capasso-light/60">
                <span className="rounded-full border border-capasso-primary/30 bg-capasso-secondary/60 px-4 py-2">{caseStudy.duration}</span>
                {caseStudy.services?.map((service) => (
                  <span key={service} className="rounded-full border border-capasso-primary/30 bg-capasso-secondary/60 px-4 py-2">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-capasso-dark py-20">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              <div className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-8">
                <h2 className="text-2xl font-semibold text-white">Desafío</h2>
                <ul className="mt-4 space-y-2 text-sm text-capasso-light/80">
                  {caseStudy.challenges.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-8">
                <h2 className="text-2xl font-semibold text-white">Solución</h2>
                <ul className="mt-4 space-y-2 text-sm text-capasso-light/80">
                  {caseStudy.solution.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-8">
                <h2 className="text-2xl font-semibold text-white">Resultados</h2>
                <ul className="mt-4 space-y-2 text-sm text-capasso-light/80">
                  {caseStudy.results.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-8">
              <div className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-6">
                <h3 className="text-lg font-semibold text-white">Stack utilizado</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-capasso-primary/30 bg-capasso-dark px-3 py-1 text-xs text-capasso-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {relatedArticle && (
                <div className="rounded-2xl border border-capasso-primary/20 bg-capasso-primary/10 p-6">
                  <h3 className="text-lg font-semibold text-white">Leé el análisis completo</h3>
                  <p className="mt-3 text-sm text-capasso-light/80">
                    Detallamos este proyecto en nuestro blog con métricas, aprendizajes y próximos pasos.
                  </p>
                  <Button asChild className="btn-secondary mt-4 w-full">
                    <Link to={`/blog/${relatedArticle.slug}`}>Ir al artículo</Link>
                  </Button>
                </div>
              )}
              <div className="rounded-2xl border border-capasso-primary/20 bg-capasso-primary/10 p-6">
                <h3 className="text-lg font-semibold text-white">¿Caso parecido al tuyo?</h3>
                <p className="mt-3 text-sm text-capasso-light/80">
                  Coordinemos una call para mostrarte cómo adaptar esta solución a tu contexto.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Button onClick={() => openCalendly("case_detail_sidebar")} className="btn-primary w-full">
                    Agendar 15 min
                  </Button>
                  <Button onClick={() => openWhatsApp("case_detail_sidebar")} className="btn-secondary w-full">
                    Escribir por WhatsApp
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-capasso-secondary/30 py-20">
          <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Tu próximo caso de éxito empieza acá</h2>
              <p className="mt-4 text-capasso-light/70">
                Te proponemos un plan de abordaje con roadmap, métricas de éxito y equipo sugerido en menos de 24 horas.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button onClick={() => openCalendly("case_detail_cta")} className="btn-primary px-8 py-4 text-lg">
                  Agendar 15 min
                </Button>
                <Button onClick={() => openWhatsApp("case_detail_cta")} className="btn-secondary px-8 py-4 text-lg">
                  Escribir por WhatsApp
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-6 shadow-lg shadow-black/10">
              <h3 className="text-xl font-semibold text-white">Qué incluye la primera reunión</h3>
              <ul className="mt-4 space-y-2 text-sm text-capasso-light/80">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  Revisión del desafío actual y métricas a mejorar
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  Identificación de quick wins y riesgos
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  Plan de próximos pasos con prioridades claras
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

export default CaseDetail;
