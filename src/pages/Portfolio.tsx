import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { portfolioItems } from "@/data/portfolio";
import { trackEvent } from "@/lib/analytics";
import { usePageSEO } from "@/hooks/usePageSEO";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const defaultWhatsappMessage = "Hola CapassoTech, quiero asesoría";

const Portfolio = () => {
  const [categoryFilter, setCategoryFilter] = useState("todas");

  const categories = useMemo(() => {
    const unique = new Set(portfolioItems.map((item) => item.category));
    return ["todas", ...Array.from(unique).sort()];
  }, []);

  const filteredItems = useMemo(
    () => (categoryFilter === "todas" ? portfolioItems : portfolioItems.filter((item) => item.category === categoryFilter)),
    [categoryFilter]
  );

  const portfolioStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Portafolio de proyectos CapassoTech",
      itemListElement: portfolioItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.description,
      })),
    }),
    []
  );

  usePageSEO({
    title: "Portafolio completo — CapassoTech",
    description: "Todos los proyectos que construimos: productos propios, sistemas a medida y sitios para clientes de distintos rubros.",
    canonical: "https://capassotech.com/portafolio",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "website",
    structuredData: portfolioStructuredData,
  });

  const openWhatsApp = (origin: string, message: string = defaultWhatsappMessage) => {
    trackEvent("whatsapp_click", { location: origin });
    window.open(`https://wa.me/5493435332132?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-capasso-dark text-capasso-light">
      <Header />
      <main>
        <section className="bg-capasso-secondary/20 pt-32 pb-16">
          <div className="container mx-auto px-4 text-center md:text-left">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm uppercase tracking-wide text-capasso-primary/70">Portafolio completo</p>
              <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Todo lo que construimos</h1>
              <p className="mt-4 text-lg text-capasso-light/80">
                Además de los casos que detallamos en profundidad, este es el mapa completo de productos, sistemas y sitios que desarrollamos:
                para clientes de distintos rubros y también productos propios de CapassoTech.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-capasso-dark py-16">
          <div className="container mx-auto px-4">
            {/* Category filter */}
            <div className="mb-10 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    categoryFilter === cat
                      ? "bg-capasso-primary text-white"
                      : "border border-capasso-gray/50 text-capasso-light/70 hover:border-capasso-primary hover:text-white"
                  }`}
                >
                  {cat === "todas" ? "Todos" : cat}
                </button>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <article
                  key={item.slug}
                  className="flex h-full flex-col rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-8 shadow-lg shadow-black/10 transition-all duration-300 hover:border-capasso-primary hover:shadow-capasso-primary/20"
                >
                  <span className="text-sm uppercase tracking-wide text-capasso-primary/70">{item.category}</span>
                  <h2 className="mt-3 text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 flex-1 text-sm text-capasso-light/80">{item.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span key={tech} className="rounded-full border border-capasso-primary/30 bg-capasso-dark px-3 py-1 text-xs text-capasso-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(item.caseSlug || item.externalUrl) && (
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                      {item.caseSlug && (
                        <Link
                          to={`/casos/${item.caseSlug}`}
                          className="inline-flex items-center text-capasso-primary transition-colors hover:text-white"
                          onClick={() => trackEvent("case_click", { location: `portfolio_${item.slug}` })}
                        >
                          Ver caso completo →
                        </Link>
                      )}
                      {item.externalUrl && (
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-capasso-light/70 transition-colors hover:text-capasso-primary"
                          onClick={() => trackEvent("cta_click", { location: `portfolio_${item.slug}` })}
                        >
                          Ver producto →
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-capasso-secondary/30 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">¿Tu proyecto podría ser el próximo?</h2>
            <p className="mt-4 mx-auto max-w-xl text-capasso-light/70">
              Contanos qué necesitás y te decimos cómo lo encaramos, con quién y en qué tiempo.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button onClick={() => openWhatsApp("portfolio_cta", "Hola CapassoTech, vi el portafolio completo y quiero agendar una llamada para contarles mi proyecto")} className="btn-primary px-8 py-4 text-lg">
                Agendar 15 min
              </Button>
              <Button onClick={() => openWhatsApp("portfolio_cta")} className="btn-secondary inline-flex items-center gap-2 px-8 py-4 text-lg">
                <WhatsAppIcon className="h-4 w-4" />
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

export default Portfolio;
