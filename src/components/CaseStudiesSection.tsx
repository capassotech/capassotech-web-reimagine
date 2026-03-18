import { Link } from "react-router-dom";
import cases from "@/data/cases.json";
import { trackEvent } from "@/lib/analytics";
import { useReveal } from "@/hooks/useReveal";
import { ArrowRight } from "lucide-react";

const accentMap: Record<string, { from: string; to: string; text: string }> = {
  "app-gestion-logistica":   { from: "#49b5e7", to: "#3a9fd4", text: "Logística" },
  "catalogo-web-autopartes": { from: "#438DF9", to: "#216AD9", text: "E-commerce" },
  "web-pisos-whatsapp":      { from: "#22d3ee", to: "#49b5e7", text: "Web + WhatsApp" },
  "sistema-turnos-online":   { from: "#6E7ED4", to: "#438DF9", text: "SaaS" },
};

const CaseStudiesSection = () => {
  const sectionRef = useReveal<HTMLElement>();

  const productSlugs = ["gymfuze-app", "vialto-app"];
  const caseList     = cases.filter((c) => !productSlugs.includes(c.slug));
  const productCases = cases.filter((c) =>  productSlugs.includes(c.slug));

  const handleCalendly = (loc: string) => {
    trackEvent("calendly_click", { location: loc });
    window.open("https://calendly.com/capassoelias/15min", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="casos-exito" ref={sectionRef} className="section-default bg-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 text-center reveal">
          <span className="section-label">Resultados reales</span>
          <h2 className="text-[2.5rem] font-extrabold leading-tight tracking-tight text-capasso-dark md:text-[3rem]">
            Casos de <span className="text-gradient">Éxito</span>
          </h2>
          <p className="mt-3 text-sm text-capasso-medium-grey">Pasá el cursor sobre cada caso para ver los resultados.</p>
        </div>

        {/* Flip cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {caseList.map((c, i) => {
            const accent = accentMap[c.slug] ?? { from: "#49b5e7", to: "#3a9fd4", text: c.category };
            return (
              <div
                key={c.slug}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} flip-card`}
                style={{ minHeight: "340px" }}
              >
                <div className="flip-card-inner" style={{ minHeight: "340px" }}>

                  {/* Front */}
                  <div className="flip-card-front flex flex-col justify-between">
                    {/* Top stripe */}
                    <div
                      className="mb-5 h-1.5 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
                    />
                    <div className="flex-1">
                      <span className="tag-pill mb-3 inline-block">{accent.text}</span>
                      <h3 className="text-xl font-bold leading-snug text-capasso-dark">{c.title}</h3>
                      <p className="mt-2 text-sm text-capasso-medium-grey">{c.summary}</p>
                    </div>
                    <p className="mt-4 text-xs font-semibold text-capasso-primary/60">
                      {c.technologies.slice(0, 3).join(" · ")}
                      {c.technologies.length > 3 ? ` · +${c.technologies.length - 3}` : ""}
                    </p>
                  </div>

                  {/* Back */}
                  <div
                    className="flip-card-back flex flex-col justify-between"
                    style={{ background: `linear-gradient(135deg, ${accent.from} 0%, ${accent.to} 100%)` }}
                  >
                    <div>
                      <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
                        {accent.text}
                      </span>
                      <h3 className="mb-4 text-lg font-extrabold text-white">{c.title}</h3>
                      <ul className="space-y-2">
                        {c.results.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-white/90">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {c.relatedBlogSlug && (
                        <Link
                          to={`/blog/${c.relatedBlogSlug}`}
                          className="text-sm font-semibold text-white/80 underline underline-offset-2 hover:text-white transition-colors"
                          onClick={() => trackEvent("blog_click", { location: c.slug })}
                        >
                          Leer artículo
                        </Link>
                      )}
                      <Link
                        to={`/casos/${c.slug}`}
                        className="inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/30 transition-colors"
                        onClick={() => trackEvent("case_click", { location: c.slug })}
                      >
                        Ver caso completo <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Product cases */}
        {productCases.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {productCases.map((p) => {
              const isGymFuze   = p.slug === "gymfuze-app";
              const externalUrl = (p as any).externalUrl;
              const previewImg  = (p as any).previewImage;
              const logoSrc     = isGymFuze ? "/logo-gymfuze.jpg" : "/logo-vialto.png";
              const gradientClass = isGymFuze
                ? "from-emerald-400 to-capasso-primary"
                : "from-orange-400 to-orange-600";

              return (
                <div key={p.slug} className="reveal content-card flex flex-col overflow-hidden p-0">

                  {/* Preview image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-capasso-light-blue">
                    {previewImg && (
                      <img
                        src={previewImg}
                        alt={`${p.title} preview`}
                        className="h-full w-full object-cover object-center"
                      />
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Logo on top of image */}
                    <img
                      src={logoSrc}
                      alt={p.title}
                      className={`absolute bottom-3 left-4 w-auto object-contain drop-shadow-md ${isGymFuze ? "h-10 rounded-lg" : "h-7"}`}
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-capasso-dark">
                      Producto propio
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className={`mb-3 h-1 rounded-full bg-gradient-to-r ${gradientClass}`} />
                    <h3 className="mb-1.5 text-lg font-bold text-capasso-dark">{p.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-capasso-dark-grey">{p.summary}</p>

                    <ul className="mb-4 space-y-1.5">
                      {p.results.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-capasso-dark-grey">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-capasso-primary" />
                          {r}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={externalUrl ?? (isGymFuze ? "https://gymfuzeapp.web.app/" : "#")}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("cta_click", { location: p.slug })}
                      className="btn-primary mt-auto text-sm"
                    >
                      Ver demo <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="reveal mt-6 content-card text-center">
          <h3 className="text-xl font-bold text-capasso-dark">¿Querés ver tu proyecto acá?</h3>
          <p className="mt-2 text-sm text-capasso-dark-grey">Empezamos con una charla corta para entender qué necesitás.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => handleCalendly("case_studies")} className="btn-primary text-base">
              Agendar 15 min
            </button>
            <button
              onClick={() => {
                trackEvent("whatsapp_click", { location: "case_studies" });
                window.open("https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa", "_blank", "noopener,noreferrer");
              }}
              className="btn-outline text-base"
            >
              Escribir por WhatsApp
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CaseStudiesSection;
