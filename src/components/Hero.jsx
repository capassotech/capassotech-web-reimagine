import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const stats = [
  { value: "7+",  label: "Años de experiencia" },
  { value: "30+", label: "Proyectos entregados" },
];

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.querySelectorAll(".reveal").forEach((n) => n.classList.add("revealed"));
    }, 80);
    return () => clearTimeout(t);
  }, []);

  const handleCalendly = () => {
    trackEvent("calendly_click", { location: "hero" });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "hero" });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleScrollDown = (e) => {
    e.preventDefault();
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* Subtle dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #E9E9E9 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Light blue gradient blob */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #EFF8FD 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: text content ── */}
          <div>
            {/* Category tag */}
            <div className="reveal mb-6">
              <span className="section-label">Para negocios que quieren crecer</span>
            </div>

            {/* Main heading */}
            <h1
              className="reveal reveal-delay-1 mb-6 text-[3rem] font-extrabold leading-[1.15] tracking-tight text-capasso-dark md:text-[3.5rem] lg:text-[3.875rem]"
            >
              Hacemos que la tecnología{" "}
              <span className="text-gradient">trabaje para vos</span>
            </h1>

            {/* Subtitle */}
            <p className="reveal reveal-delay-2 mb-10 max-w-lg text-lg font-normal leading-relaxed text-capasso-dark-grey">
              Tenés una idea, un problema o un sistema que da guerra.
              Nosotros lo resolvemos — sin llenar tu cabeza de términos técnicos,
              con fechas reales y resultados que podés medir.
            </p>

            {/* CTA buttons */}
            <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-4">
              <button onClick={handleCalendly} className="btn-primary text-base">
                Contanos tu proyecto
              </button>
              <button onClick={handleWhatsApp} className="btn-outline text-base">
                Escribir por WhatsApp
              </button>
            </div>

            {/* Stats row */}
            <div className="reveal reveal-delay-4 mt-12 flex flex-wrap gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold text-capasso-primary">{s.value}</div>
                  <div className="mt-0.5 text-sm font-medium text-capasso-dark-grey">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: visual card ── */}
          <div className="reveal reveal-delay-2">
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #49b5e7 0%, #216AD9 100%)",
                minHeight: "420px",
                boxShadow: "0 32px 80px rgba(73, 181, 231, 0.25)",
              }}
            >
              {/* Inner pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Content inside card */}
              <div className="relative z-10 flex h-full flex-col justify-center gap-4 p-8">
                {[
                  {
                    title: "Tu problema, primero",
                    desc:  "Entendemos tu negocio antes de escribir una línea de código.",
                  },
                  {
                    title: "Plazos honestos",
                    desc:  "Sin sorpresas ni excusas a mitad del proyecto.",
                  },
                  {
                    title: "Tu resultado, no el código",
                    desc:  "El software es el medio — tu crecimiento es el fin.",
                  },
                ].map((m) => (
                  <div
                    key={m.title}
                    className="rounded-2xl bg-white/15 px-6 py-5 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-white/80" />
                      <p className="text-base font-bold text-white">{m.title}</p>
                    </div>
                    <p className="mt-1.5 pl-[18px] text-sm leading-relaxed text-white/60">{m.desc}</p>
                  </div>
                ))}
              </div>

              {/* Decorative bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-700/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="reveal reveal-delay-5 mt-16 flex justify-center">
          <a
            href="#servicios"
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-2 text-sm font-medium text-capasso-dark-grey transition-colors hover:text-capasso-primary"
          >
            <span>¿Qué hacemos?</span>
            <div className="flex h-9 w-6 justify-center rounded-full border-2 border-current">
              <div className="mt-1.5 h-2.5 w-0.5 animate-bounce rounded-full bg-current" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
