import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import cases from "@/data/cases.json";
import { trackEvent } from "@/lib/analytics";

const gradientMap: Record<string, string> = {
  "app-gestion-logistica": "from-blue-500 to-capasso-primary",
  "catalogo-web-autopartes": "from-capasso-primary to-cyan-400",
  "web-pisos-whatsapp": "from-cyan-400 to-blue-500",
  "sistema-turnos-online": "from-blue-500 to-capasso-primary",
};

const CaseStudiesSection = () => {
  window.scrollTo(0, 0);
  
  const caseList = cases.filter((caseStudy) => caseStudy.slug !== "gymfuze-app");
  const productCase = cases.find((caseStudy) => caseStudy.slug === "gymfuze-app");

  const handleCalendly = (location: string) => {
    trackEvent("calendly_click", { location });
    window.open("https://calendly.com/capassoelias/15min", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="casos-exito" className="bg-capasso-secondary/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Casos de <span className="text-gradient">Éxito</span>
          </h2>
          <p className="text-xl text-capasso-light/80 max-w-3xl mx-auto">
            Cada proyecto que encaramos tiene métricas concretas de éxito. Estas son algunas implementaciones recientes y lo que generaron.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {caseList.map((caseStudy) => (
            <Card
              key={caseStudy.slug}
              className="group flex h-full flex-col border border-capasso-gray bg-capasso-secondary/80 transition-all duration-500 hover:border-capasso-primary hover:shadow-lg hover:shadow-capasso-primary/10"
            >
              <div className={`h-2 bg-gradient-to-r ${gradientMap[caseStudy.slug] ?? "from-capasso-primary to-blue-500"}`} />
              <CardHeader>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium uppercase tracking-wide text-capasso-primary/80">
                    {caseStudy.category}
                  </span>
                  <CardTitle className="text-2xl text-capasso-light transition-colors duration-300 group-hover:text-capasso-primary">
                    {caseStudy.title}
                  </CardTitle>
                </div>
                <CardDescription className="mt-4 text-base text-capasso-light/70">
                  {caseStudy.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-capasso-light">Tecnologías</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-capasso-primary/30 bg-capasso-dark px-3 py-1 text-xs font-medium text-capasso-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-capasso-light">Resultados</h4>
                  <ul className="mt-2 space-y-2 text-sm text-capasso-light/80">
                    {caseStudy.results.map((result) => (
                      <li key={result} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  {caseStudy.relatedBlogSlug && (
                    <Button asChild className="btn-secondary px-6 py-3 text-sm">
                      <Link to={`/blog/${caseStudy.relatedBlogSlug}`}>Leer artículo del proyecto</Link>
                    </Button>
                  )}
                  <Button asChild variant="link" className="px-0 text-capasso-primary">
                    <Link to={`/casos/${caseStudy.slug}`}>Ver caso completo →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {productCase && (
          <Card className="mt-12 border border-capasso-gray bg-capasso-secondary/80 transition-all duration-500 hover:border-capasso-primary hover:shadow-lg hover:shadow-capasso-primary/10">
            <div className="h-2 bg-gradient-to-r from-green-500 to-capasso-primary" />
            <CardHeader>
              <span className="text-sm font-medium uppercase tracking-wide text-capasso-primary/80">{productCase.category}</span>
              <CardTitle className="mt-2 text-3xl text-capasso-light">{productCase.title}</CardTitle>
              <CardDescription className="mt-4 text-base text-capasso-light/70">{productCase.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-capasso-light">Qué resolvimos</h4>
                  <ul className="mt-2 space-y-2 text-sm text-capasso-light/80">
                    {productCase.challenges.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-capasso-light">Lo que entregamos</h4>
                  <ul className="mt-2 space-y-2 text-sm text-capasso-light/80">
                    {productCase.solution.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-capasso-light">Resultados</h4>
                <ul className="mt-2 space-y-2 text-sm text-capasso-light/80">
                  {productCase.results.map((result) => (
                    <li key={result} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-capasso-primary" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-capasso-primary/20 bg-capasso-primary/5 p-6">
                <div>
                  <p className="text-sm uppercase tracking-wide text-capasso-primary/70">¿Querés conocerlo en vivo?</p>
                  <p className="text-lg text-capasso-light/80">Te mostramos un demo y adaptamos módulos a tu gimnasio.</p>
                </div>
                <Button
                  asChild
                  className="btn-primary px-6 py-3 text-base"
                  onClick={() => trackEvent("cta_click", { location: "gymfuze_case" })}
                >
                  <a href="https://gymfuzeapp.web.app/" target="_blank" rel="noopener noreferrer">
                    Más información
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 rounded-2xl border border-capasso-gray bg-capasso-secondary/80 p-10 text-center">
          <h3 className="text-2xl font-semibold text-capasso-light">¿Querés ver tu proyecto acá?</h3>
          <p className="mt-4 text-capasso-light/80">
            Cada partnership empieza con una charla corta para entender el objetivo y convertirlo en roadmap.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button onClick={() => handleCalendly("case_studies")} className="btn-primary px-8 py-4 text-lg">
              Agendar 15 min
            </Button>
            <Button
              onClick={() => {
                trackEvent("whatsapp_click", { location: "case_studies" });
                window.open("https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa", "_blank", "noopener,noreferrer");
              }}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;