import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link, Navigate, useParams } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";
import { usePageSEO } from "@/hooks/usePageSEO";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts.find((candidate) => candidate.slug === slug);

  const canonicalUrl = post ? `https://capassotech.com/blog/${post.slug}` : undefined;

  const articleStructuredData = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.date,
        dateModified: post.date,
        description: post.summary,
        articleBody: post.content.join("\n\n"),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        url: canonicalUrl,
        inLanguage: "es",
        keywords: post.tags.join(", "),
        author: {
          "@type": "Organization",
          name: "CapassoTech",
        },
        publisher: {
          "@type": "Organization",
          name: "CapassoTech",
          url: "https://capassotech.com/",
          logo: {
            "@type": "ImageObject",
            url: "https://capassotech.com/logo-light.png",
          },
        },
      }
    : undefined;

  const breadcrumbStructuredData = post
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Blog",
            item: "https://capassotech.com/blog",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: post.title,
            item: canonicalUrl,
          },
        ],
      }
    : undefined;

  usePageSEO({
    title: post ? `${post.title} — Blog de CapassoTech` : "Artículo del blog — CapassoTech",
    description:
      post?.summary ??
      "Historias accionables sobre desarrollo de software, pods ágiles e IA aplicada por el equipo de CapassoTech.",
    canonical: canonicalUrl,
    image: "https://capassotech.com/og-image.jpg",
    ogType: "article",
    structuredData:
      articleStructuredData && breadcrumbStructuredData
        ? [articleStructuredData, breadcrumbStructuredData]
        : undefined,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts
    .filter((entry) => entry.slug !== post.slug)
    .slice(0, 3);

  const handleCalendly = (origin: string) => {
    trackEvent("calendly_click", { location: origin, slug: post.slug });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = (origin: string) => {
    trackEvent("whatsapp_click", { location: origin, slug: post.slug });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-capasso-dark text-capasso-light">
      <Header />
      <main>
        <section className="bg-capasso-secondary/20 pt-32 pb-16">
          <div className="container mx-auto flex flex-col gap-8 px-4 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 text-sm text-capasso-light/70">
                <span className="rounded-full bg-capasso-primary/20 px-3 py-1 text-capasso-primary">
                  {post.category}
                </span>
                <span>
                  {format(new Date(post.date), "d 'de' MMMM yyyy", { locale: es })}
                </span>
                <span>• {post.readingTime} min de lectura</span>
              </div>
              <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">{post.title}</h1>
              <p className="mt-5 text-lg text-capasso-light/80">{post.summary}</p>
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
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  onClick={() => handleCalendly("blog_post_header")}
                  className="btn-primary px-8 py-4 text-lg"
                >
                  Planificar proyecto
                </Button>
                <Button
                  onClick={() => handleWhatsApp("blog_post_header")}
                  className="btn-secondary px-8 py-4 text-lg"
                >
                  Escribir por WhatsApp
                </Button>
              </div>
            </div>
            <div className="w-full max-w-xs rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/60 p-6 text-sm text-capasso-light/80">
              <p className="font-semibold uppercase tracking-wide text-capasso-primary">
                ¿Por qué este artículo importa?
              </p>
              <p className="mt-3">
                Está basado en proyectos reales donde aplicamos este enfoque. Podés usarlo como checklist para tu próximo sprint o roadmap.
              </p>
              <Button asChild variant="link" className="mt-4 px-0 text-capasso-primary">
                <Link to="/blog" className="hover:underline">
                  Volver al listado del blog
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <article className="bg-capasso-dark py-16">
          <div className="container mx-auto max-w-4xl space-y-8 px-4 text-lg leading-relaxed text-capasso-light/80">
            {post.content.map((paragraph, index) => (
              <p key={`${post.slug}-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
        </article>

        <section className="bg-capasso-secondary/30 py-20">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Llevemos estas ideas a tu roadmap
              </h2>
              <p className="mt-4 text-capasso-light/70">
                Contanos en qué etapa está tu producto y diseñamos una propuesta con hitos, métricas y equipo asignado en menos de 48 horas.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button onClick={() => handleCalendly("blog_post_cta")} className="btn-primary px-8 py-4 text-lg">
                  Agendar 15 min
                </Button>
                <Button onClick={() => handleWhatsApp("blog_post_cta")} className="btn-secondary px-8 py-4 text-lg">
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

        {relatedPosts.length > 0 && (
          <section className="bg-capasso-dark py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Seguí explorando
              </h2>
              <p className="mt-3 max-w-2xl text-capasso-light/70">
                Más artículos seleccionados para complementar este tema.
              </p>
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <article
                    key={related.slug}
                    className="flex h-full flex-col justify-between rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-6 shadow-lg shadow-black/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-capasso-primary/10"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-capasso-light/70">
                        <span className="rounded-full bg-capasso-primary/20 px-2 py-1 text-capasso-primary">
                          {related.category}
                        </span>
                        <span>
                          {format(new Date(related.date), "d 'de' MMMM yyyy", { locale: es })}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-white">{related.title}</h3>
                      <p className="mt-3 text-sm text-capasso-light/80">{related.summary}</p>
                    </div>
                    <Button asChild className="btn-secondary mt-6 px-4 py-2 text-sm">
                      <Link
                        to={`/blog/${related.slug}`}
                        onClick={() => trackEvent("blog_related_open", { slug: related.slug, from: post.slug })}
                      >
                        Leer siguiente
                      </Link>
                    </Button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default BlogPost;
