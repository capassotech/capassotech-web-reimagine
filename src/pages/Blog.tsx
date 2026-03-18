import { useMemo, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { blogPosts } from "@/data/blog-posts";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useReveal } from "@/hooks/useReveal";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Search } from "lucide-react";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const Blog = () => {
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const [searchQuery, setSearchQuery]       = useState("");
  const headerRef = useReveal();

  const blogStructuredData = useMemo(
    () => [{
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog de CapassoTech",
      description: "Artículos sobre desarrollo de software, automatizaciones y tecnología aplicada a negocios reales.",
      url: "https://capassotech.com/blog",
      inLanguage: "es",
      publisher: {
        "@type": "Organization",
        name: "CapassoTech",
        url: "https://capassotech.com/",
        logo: { "@type": "ImageObject", url: "https://capassotech.com/logo-light.png" },
      },
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.date,
        dateModified: post.date,
        description: post.summary,
        url: `https://capassotech.com/blog/${post.slug}`,
        inLanguage: "es",
        keywords: post.tags.join(", "),
        author: { "@type": "Organization", name: "CapassoTech" },
      })),
    }],
    []
  );

  usePageSEO({
    title: "Blog — CapassoTech",
    description: "Casos reales, aprendizajes y consejos sobre software, automatizaciones e IA aplicada a negocios.",
    canonical: "https://capassotech.com/blog",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "blog",
    structuredData: blogStructuredData,
  });

  const sortedPosts = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  const categories = useMemo(() => {
    const unique = new Set(sortedPosts.map((p) => p.category));
    return ["todas", ...unique];
  }, [sortedPosts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sortedPosts.filter((p) => {
      const matchCat    = categoryFilter === "todas" || p.category === categoryFilter;
      const matchSearch = !q || [p.title, p.summary, p.category, p.tags.join(" "), p.content.join(" ")]
        .join(" ").toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [categoryFilter, searchQuery, sortedPosts]);

  const featuredPost = sortedPosts[0];

  const handleCalendly = (from: string) => {
    trackEvent("calendly_click", { location: from });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = (from: string) => {
    trackEvent("whatsapp_click", { location: from });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white text-capasso-dark">
      <Header />
      <main>

        {/* ── Hero ── */}
        <section ref={headerRef} className="bg-capasso-light-blue pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">

              <div className="reveal">
                <span className="section-label">Blog</span>
                <h1 className="mt-3 text-[2.5rem] font-extrabold leading-tight tracking-tight text-capasso-dark md:text-[3rem]">
                  Casos reales y aprendizajes{" "}
                  <span className="text-gradient">sin filtro</span>
                </h1>
                <p className="mt-4 text-lg text-capasso-dark-grey">
                  Lo que aprendemos en cada proyecto, contado de forma simple.
                  Sin marketing, sin buzzwords.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => handleCalendly("blog_hero")} className="btn-primary text-base">
                    Hablemos de tu proyecto
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleWhatsApp("blog_hero")} className="btn-outline text-base">
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Featured post */}
              {featuredPost && (
                <article className="reveal reveal-delay-1 content-card shadow-card">
                  <span className="tag-pill mb-3 inline-block">Último artículo</span>
                  <h2 className="mb-2 text-xl font-bold leading-snug text-capasso-dark">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-4 text-sm text-capasso-dark-grey">{featuredPost.summary}</p>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="tech-badge">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-capasso-medium-grey">
                      {format(new Date(featuredPost.date), "d 'de' MMMM yyyy", { locale: es })} · {featuredPost.readingTime} min
                    </span>
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      onClick={() => trackEvent("blog_featured_open", { slug: featuredPost.slug })}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-capasso-primary hover:text-capasso-primary-hover transition-colors"
                    >
                      Leer <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        {/* ── Posts ── */}
        <section className="section-default bg-white">
          <div className="mx-auto max-w-6xl px-6">

            {/* Filters */}
            <div className="mb-10 flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-capasso-medium-grey" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar artículos..."
                  className="field-input pl-9 py-2.5 text-sm"
                  style={{ minHeight: "auto" }}
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      categoryFilter === cat
                        ? "bg-capasso-primary text-white"
                        : "bg-capasso-mid-blue text-capasso-primary hover:bg-capasso-primary/20"
                    }`}
                  >
                    {cat === "todas" ? "Todos" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="content-card flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-capasso-primary/20"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="tag-pill">{post.category}</span>
                      <span className="text-xs text-capasso-medium-grey">
                        {format(new Date(post.date), "d MMM yyyy", { locale: es })} · {post.readingTime} min
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-bold leading-snug text-capasso-dark">
                      {post.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-capasso-dark-grey">
                      {post.summary}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tech-badge">{tag}</span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Link
                        to={`/blog/${post.slug}`}
                        onClick={() => trackEvent("blog_post_open", { slug: post.slug })}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-capasso-primary hover:text-capasso-primary-hover transition-colors"
                      >
                        Leer artículo <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      {post.relatedCaseSlug && (
                        <Link
                          to={`/casos/${post.relatedCaseSlug}`}
                          className="text-sm font-medium text-capasso-dark-grey hover:text-capasso-primary transition-colors"
                        >
                          Ver caso de éxito
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="content-card py-16 text-center">
                <h3 className="text-xl font-bold text-capasso-dark">Sin resultados para esa búsqueda.</h3>
                <p className="mt-2 text-sm text-capasso-dark-grey">Probá con otra palabra clave o limpiá los filtros.</p>
                <button
                  onClick={() => { setCategoryFilter("todas"); setSearchQuery(""); }}
                  className="btn-outline mt-5 text-sm"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-capasso-dark section-large">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-capasso-primary">
              Siguiente paso
            </span>
            <h2 className="text-[2.5rem] font-extrabold leading-tight text-white md:text-[3rem]">
              ¿Algo de esto aplica a tu negocio?
            </h2>
            <p className="mt-5 mx-auto max-w-xl text-lg text-white/60">
              Contanos en qué estás y te decimos cómo lo encaramos.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button onClick={() => handleCalendly("blog_cta")} className="btn-primary text-base">
                Agendar 15 min gratis
                <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => handleWhatsApp("blog_cta")} className="btn-white text-base">
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

export default Blog;
