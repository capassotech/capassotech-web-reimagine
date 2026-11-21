import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import NetworkTexture from "@/components/home/NetworkTexture";
import { abrirAgenda, abrirWhatsApp, seguirCursor } from "@/components/home/contacto";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";
import { trackEvent } from "@/lib/analytics";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useReveal } from "@/hooks/useReveal";

/** "Vialto — Control de Combustible" → { nombre: "Vialto", bajada: "Control de Combustible" } */
const partirTitulo = (titulo: string) => {
  const [nombre, ...resto] = titulo.split(" — ");
  return { nombre, bajada: resto.join(" — ") };
};

// Productos propios destacados, con el dolor que resuelve cada uno.
const DESTACADOS = [
  { slug: "vialto", logo: "/products/vialto.png", dolor: "Para empresas de transporte que no saben qué pasa con sus viajes y su combustible." },
  { slug: "faktia", logo: "/products/faktia.svg", dolor: "Para quien todavía hace cada factura a mano en ARCA." },
  { slug: "gymfuze", logo: "/products/gymfuze.png", dolor: "Para gimnasios que persiguen a sus alumnos para cobrar la cuota." },
];

const demora = (s: number) => ({ animationDelay: `${s}s` });

const Enlaces = ({ item }: { item: PortfolioItem }) =>
  item.caseSlug || item.externalUrl ? (
    <div className="flex flex-wrap items-center gap-5 text-sm font-semibold">
      {item.caseSlug && (
        <Link
          to={`/casos/${item.caseSlug}`}
          onClick={() => trackEvent("case_click", { location: `portfolio_${item.slug}` })}
          className="group/link inline-flex items-center gap-1.5 text-capasso-primary transition-colors hover:text-white"
        >
          Ver caso
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      )}
      {item.externalUrl && (
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("cta_click", { location: `portfolio_${item.slug}` })}
          className="group/link inline-flex items-center gap-1.5 text-white/60 transition-colors hover:text-capasso-primary"
        >
          {item.category === "Producto Propio" ? "Ver producto" : "Ver sitio"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      )}
    </div>
  ) : null;

const Portfolio = () => {
  const [categoria, setCategoria] = useState("todas");
  const destacadosRef = useReveal<HTMLElement>();
  const cierreRef = useReveal<HTMLElement>();

  const categorias = useMemo(() => {
    const unicas = new Set(portfolioItems.map((item) => item.category));
    return ["todas", ...Array.from(unicas).sort()];
  }, []);

  const filtrados = useMemo(
    () => (categoria === "todas" ? portfolioItems : portfolioItems.filter((item) => item.category === categoria)),
    [categoria],
  );

  const destacados = DESTACADOS.map((d) => ({ ...d, item: portfolioItems.find((p) => p.slug === d.slug) })).filter(
    (d): d is (typeof d & { item: PortfolioItem }) => Boolean(d.item),
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
    [],
  );

  usePageSEO({
    title: "Portafolio completo — CapassoTech",
    description: "Todos los proyectos que construimos: productos propios, sistemas a medida y sitios para clientes de distintos rubros.",
    canonical: "https://capassotech.com/portafolio",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "website",
    structuredData: portfolioStructuredData,
  });

  return (
    <div className="cx min-h-screen">
      <Header />
      <main>
        {/* ── Encabezado ── */}
        <section className="relative overflow-hidden pb-20 pt-40 md:pb-28 md:pt-48">
          <div
            className="pointer-events-none absolute -right-[10%] -top-[20%] h-[60vmax] w-[60vmax] rounded-full opacity-40 blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(73,181,231,0.45) 0%, rgba(33,106,217,0.15) 45%, transparent 70%)" }}
            aria-hidden="true"
          />
          <NetworkTexture
            variant="network"
            seed={5}
            className="right-0 top-0 h-full w-[min(65%,900px)] opacity-50"
            style={{
              maskImage: "radial-gradient(70% 70% at 70% 40%, #000 15%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(70% 70% at 70% 40%, #000 15%, transparent 75%)",
            }}
          />
          <div className="cx-axis" aria-hidden="true" />

          <div className="cx-content relative">
            <span className="cx-pill cx-rise" style={demora(0.1)}>
              <span className="cx-live" aria-hidden="true" />
              Nuestro trabajo
            </span>
            <h1 className="cx-display cx-title-xl cx-rise mt-8" style={demora(0.2)}>
              Lo que ya <span className="cx-gradient-text block pb-[0.08em]">construimos.</span>
            </h1>
            <dl className="cx-rise mt-14 flex flex-wrap gap-x-14 gap-y-8" style={demora(0.4)}>
              {[
                { valor: portfolioItems.length, etiqueta: "proyectos" },
                { valor: categorias.length - 1, etiqueta: "rubros" },
                { valor: portfolioItems.filter((p) => p.category === "Producto Propio").length, etiqueta: "productos propios" },
              ].map((d) => (
                <div key={d.etiqueta} className="flex flex-col-reverse border-l border-capasso-primary/50 pl-6">
                  <dt className="mt-2 text-base text-capasso-muted md:text-lg">{d.etiqueta}</dt>
                  <dd className="cx-display text-[clamp(48px,5.5vw,84px)] leading-none">{d.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Productos propios ── */}
        <section ref={destacadosRef} className="relative py-20 md:py-28">
          <div className="cx-content">
            <p className="cx-label reveal">Productos propios</p>
            <h2 className="cx-display cx-title-md reveal reveal-delay-1 mt-5 max-w-[18ch]">
              Problemas que vimos tantas veces que <span className="cx-gradient-text">los hicimos producto.</span>
            </h2>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {destacados.map(({ item, logo, dolor }, i) => {
                const { nombre, bajada } = partirTitulo(item.title);
                return (
                  <article
                    key={item.slug}
                    onPointerMove={seguirCursor}
                    className={`cx-card reveal reveal-delay-${i + 2} flex min-h-[380px] flex-col p-8 md:p-10`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5">
                        <img src={logo} alt="" className="max-h-full w-full object-contain" loading="lazy" />
                      </span>
                      <div>
                        <h3 className="cx-display text-[clamp(28px,2.4vw,38px)] font-bold leading-none">{nombre}</h3>
                        <p className="mt-1.5 text-sm text-capasso-muted">{bajada}</p>
                      </div>
                    </div>
                    <p className="cx-display mt-10 flex-1 text-[clamp(20px,1.7vw,26px)] font-semibold leading-snug text-white/90">
                      {dolor}
                    </p>
                    <div className="mt-8">
                      <Enlaces item={item} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Cinta con todos los nombres ── */}
        <section className="border-y border-white/10 py-10 md:py-14" aria-hidden="true">
          <div
            className="cx-marquee overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div className="cx-marquee-track">
              {[0, 1].map((copia) => (
                <div key={copia} className="flex shrink-0 items-center">
                  {portfolioItems.map((p) => (
                    <span key={`${copia}-${p.slug}`} className="flex items-center">
                      <span className="cx-display cx-outline whitespace-nowrap text-[clamp(40px,6vw,96px)]">
                        {partirTitulo(p.title).nombre}
                      </span>
                      <span className="mx-[0.5em] h-3 w-3 shrink-0 rounded-full bg-capasso-primary" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Todos los proyectos ── */}
        <section className="relative py-20 md:py-28">
          <div className="cx-content">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="cx-label">Todos</p>
                <h2 className="cx-display cx-title-md mt-5">
                  Para clientes de <span className="cx-gradient-text">todos los rubros.</span>
                </h2>
              </div>
              <p className="text-lg text-capasso-muted">
                <span className="font-bold text-white">{filtrados.length}</span>{" "}
                {filtrados.length === 1 ? "proyecto" : "proyectos"}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar por rubro">
              {categorias.map((cat) => {
                const activa = categoria === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={activa}
                    onClick={() => setCategoria(cat)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      activa
                        ? "border-capasso-primary bg-capasso-primary text-capasso-ink"
                        : "border-white/15 text-white/70 hover:border-capasso-primary hover:text-white"
                    }`}
                  >
                    {cat === "todas" ? "Todos" : cat}
                  </button>
                );
              })}
            </div>

            {/* La clave cambia con el filtro para volver a animar la entrada */}
            <div key={categoria} className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtrados.map((item, i) => {
                const { nombre, bajada } = partirTitulo(item.title);
                return (
                  <article
                    key={item.slug}
                    onPointerMove={seguirCursor}
                    className="cx-card cx-swap flex flex-col p-8"
                    style={{ animationDelay: `${Math.min(i, 8) * 60}ms`, animationFillMode: "both" }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-capasso-primary">{item.category}</span>
                      <span className="font-mono text-xs font-bold text-white/25">
                        {String(portfolioItems.indexOf(item) + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="cx-display mt-6 text-[clamp(26px,2.2vw,34px)] font-bold leading-[1.05]">{nombre}</h3>
                    {bajada && <p className="mt-2 font-semibold text-white/75">{bajada}</p>}
                    <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-capasso-muted">{item.description}</p>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {item.tech.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/55">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {(item.caseSlug || item.externalUrl) && (
                      <div className="mt-6 border-t border-white/10 pt-5">
                        <Enlaces item={item} />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Cierre ── */}
        <section ref={cierreRef} className="relative overflow-hidden py-28 md:py-40">
          <NetworkTexture
            variant="circuit"
            seed={21}
            className="bottom-0 left-0 h-[70%] w-full opacity-30"
            style={{
              maskImage: "linear-gradient(to top, #000 10%, transparent 80%)",
              WebkitMaskImage: "linear-gradient(to top, #000 10%, transparent 80%)",
            }}
          />
          <div className="cx-axis" aria-hidden="true" />
          <div className="cx-content relative">
            <h2 className="cx-display cx-title-xl reveal max-w-[12ch]">
              ¿El próximo <span className="cx-gradient-text">es el tuyo?</span>
            </h2>
            <p className="reveal reveal-delay-1 mt-8 max-w-xl text-lg text-capasso-muted md:text-2xl">
              Contanos qué te pasa y te decimos cómo lo resolvemos.
            </p>
            <div className="reveal reveal-delay-2 mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() =>
                  abrirWhatsApp("portfolio_cta", "Hola CapassoTech, vi sus proyectos y les quiero contar el mío")
                }
                className="cx-btn cx-btn-primary"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Hablemos por WhatsApp
              </button>
              <button type="button" onClick={() => abrirAgenda("portfolio_cta")} className="cx-btn cx-btn-ghost">
                Agendar 15 min
                <ArrowRight className="cx-arrow h-5 w-5" />
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

export default Portfolio;
