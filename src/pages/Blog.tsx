import { useMemo, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { blogPosts } from "@/data/blog-posts";
import { usePageSEO } from "@/hooks/usePageSEO";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const Blog = () => {
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const [serviceFilter, setServiceFilter] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const blogStructuredData = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Blog de CapassoTech",
        description:
          "Consejos accionables sobre desarrollo de software a medida, pods ágiles e IA aplicada para compañías en crecimiento.",
        url: "https://capassotech.com/blog",
        inLanguage: "es",
        publisher: {
          "@type": "Organization",
          name: "CapassoTech",
          url: "https://capassotech.com/",
          logo: {
            "@type": "ImageObject",
            url: "https://capassotech.com/logo-light.png",
          },
        },
        blogPost: blogPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          dateModified: post.date,
          description: post.summary,
          url: `https://capassotech.com/blog#${post.slug}`,
          inLanguage: "es",
          keywords: post.tags.join(", "),
          author: {
            "@type": "Organization",
            name: "CapassoTech",
          },
        })),
      },
    ],
    []
  );

  usePageSEO({
    title: "Blog de CapassoTech — Desarrollo de software, pods ágiles e IA aplicada",
    description:
      "Aprendé con nuestros especialistas cómo escalar productos digitales con pods ágiles, migraciones cloud e inteligencia artificial enfocada en ROI.",
    canonical: "https://capassotech.com/blog",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "blog",
    structuredData: blogStructuredData,
  });

  const sortedPosts = useMemo(
    () =>
      [...blogPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  );

  const categories = useMemo(() => {
    const unique = new Set(sortedPosts.map((post) => post.category));
    return ["todas", ...unique];
  }, [sortedPosts]);

  const serviceLines = useMemo(() => {
    const unique = new Set(sortedPosts.map((post) => post.serviceFocus));
    return ["todos", ...unique];
  }, [sortedPosts]);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return sortedPosts.filter((post) => {
      const matchesCategory =
        categoryFilter === "todas" || post.category === categoryFilter;
      const matchesService =
        serviceFilter === "todos" || post.serviceFocus === serviceFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [post.title, post.summary, post.serviceFocus, post.category, post.tags.join(" "), post.content.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesService && matchesSearch;
    });
  }, [categoryFilter, serviceFilter, sortedPosts, searchQuery]);

  const featuredPost = sortedPosts[0];

  const handleCalendly = (origin: string) => {
    trackEvent("calendly_click", { location: origin });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = (origin: string) => {
    trackEvent("whatsapp_click", { location: origin });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const resetFilters = () => {
    setCategoryFilter("todas");
    setServiceFilter("todos");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-capasso-dark text-capasso-light">
      <Header />
      <main>
        <section className="bg-capasso-secondary/20 pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-wide text-capasso-primary/70">Blog CapassoTech</p>
                <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
                  Estrategias para construir productos que mueven la aguja
                </h1>
                <p className="mt-5 text-lg text-capasso-light/80">
                  Publicamos guías y aprendizajes reales de proyectos en Latinoamérica y Estados Unidos. Son artículos pensados para founders, CTOs y líderes de producto que necesitan velocidad sin perder calidad.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button onClick={() => handleCalendly("blog_hero")} className="btn-primary px-8 py-4 text-lg">
                    Planificar proyecto
                  </Button>
                  <Button onClick={() => handleWhatsApp("blog_hero")} className="btn-secondary px-8 py-4 text-lg">
                    Escribir por WhatsApp
                  </Button>
                </div>
              </div>
              {featuredPost && (
                <article className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/60 p-6 shadow-lg shadow-black/10">
                  <span className="inline-flex items-center rounded-full bg-capasso-primary/20 px-3 py-1 text-sm font-medium text-capasso-primary">
                    Nuevo
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{featuredPost.title}</h2>
                  <p className="mt-3 text-capasso-light/80">{featuredPost.summary}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-capasso-light/60">
                    <span>{format(new Date(featuredPost.date), "d 'de' MMMM yyyy", { locale: es })}</span>
                    <span>• {featuredPost.readingTime} min de lectura</span>
                    <span>• {featuredPost.category}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <Badge
                        key={`${featuredPost.slug}-${tag}`}
                        variant="secondary"
                        className="border border-capasso-gray/40 bg-capasso-dark text-capasso-light"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        <section className="bg-capasso-dark py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-white md:text-4xl">Explorá los artículos</h2>
                <p className="mt-3 text-capasso-light/70">
                  Filtrá por categoría, línea de servicio o buscá palabras clave para encontrar ideas listas para implementar en tu equipo.
                </p>
              </div>
              <div className="grid w-full gap-4 md:w-auto md:grid-cols-3">
                <label className="flex flex-col text-sm text-capasso-light/70">
                  <span className="mb-2 font-semibold text-capasso-light">Buscar</span>
                  <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Ej: migración cloud"
                    className="border-capasso-gray bg-capasso-secondary/70 text-capasso-light placeholder:text-capasso-light/50"
                  />
                </label>
                <label className="flex flex-col text-sm text-capasso-light/70">
                  <span className="mb-2 font-semibold text-capasso-light">Categoría</span>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="border-capasso-gray bg-capasso-secondary/70 text-capasso-light">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent className="border border-capasso-gray bg-capasso-dark text-capasso-light">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "todas" ? "Todas las categorías" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
                <label className="flex flex-col text-sm text-capasso-light/70">
                  <span className="mb-2 font-semibold text-capasso-light">Servicio</span>
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger className="border-capasso-gray bg-capasso-secondary/70 text-capasso-light">
                      <SelectValue placeholder="Todas las líneas" />
                    </SelectTrigger>
                    <SelectContent className="border border-capasso-gray bg-capasso-dark text-capasso-light">
                      {serviceLines.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service === "todos" ? "Todos los servicios" : service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
              </div>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  id={post.slug}
                  className="flex h-full flex-col justify-between rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-8 shadow-lg shadow-black/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-capasso-primary/10"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-capasso-light/70">
                      <span className="rounded-full bg-capasso-primary/20 px-3 py-1 text-capasso-primary">{post.category}</span>
                      <span>{format(new Date(post.date), "d 'de' MMMM yyyy", { locale: es })}</span>
                      <span>• {post.readingTime} min de lectura</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-white">{post.title}</h3>
                    <p className="mt-3 text-base text-capasso-light/80">{post.summary}</p>
                    <div className="mt-4 space-y-4 text-sm leading-relaxed text-capasso-light/75">
                      {post.content.map((paragraph, index) => (
                        <p key={`${post.slug}-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {post.tags.map((tag) => (
                      <Badge
                        key={`${post.slug}-${tag}`}
                        variant="secondary"
                        className="border border-capasso-gray/40 bg-capasso-dark text-capasso-light"
                      >
                        {tag}
                      </Badge>
                    ))}
                    <Button
                      onClick={() => handleCalendly(`blog_post_${post.slug}`)}
                      className="btn-primary ml-auto px-6 py-3"
                    >
                      Conversar proyecto
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="mt-12 rounded-2xl border border-dashed border-capasso-gray/60 bg-capasso-secondary/50 p-12 text-center">
                <h3 className="text-2xl font-semibold text-white">No encontramos artículos para esa búsqueda.</h3>
                <p className="mt-3 text-capasso-light/70">
                  Probá con otra palabra clave o escribinos y armamos un plan a medida para tu proyecto digital.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Button onClick={resetFilters} className="btn-secondary px-6 py-3">
                    Limpiar filtros
                  </Button>
                  <Button onClick={() => handleWhatsApp("blog_empty_state")} className="btn-primary px-6 py-3">
                    Hablar con un especialista
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="bg-capasso-secondary/30 py-20">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Llevemos estas ideas a tu roadmap</h2>
              <p className="mt-4 text-capasso-light/70">
                Contanos en qué etapa está tu producto y diseñamos una propuesta con hitos, métricas y equipo asignado en menos de 48 horas.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button onClick={() => handleCalendly("blog_cta")} className="btn-primary px-8 py-4 text-lg">
                  Agendar 15 min
                </Button>
                <Button onClick={() => handleWhatsApp("blog_cta")} className="btn-secondary px-8 py-4 text-lg">
                  Escribir por WhatsApp
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-6 shadow-lg shadow-black/10">
              <h3 className="text-2xl font-semibold text-white">¿Qué te llevás en la primera reunión?</h3>
              <ul className="mt-4 space-y-3 text-capasso-light/75">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  <span>Diagnóstico express del estado de tu producto o proceso.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  <span>Ideas priorizadas según impacto en revenue, eficiencia o experiencia de usuario.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                  <span>Roadmap sugerido con pods ágiles, automatizaciones o consultoría según tu objetivo.</span>
                </li>
              </ul>
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
