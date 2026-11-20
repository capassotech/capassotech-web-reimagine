import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { trackEvent } from "@/lib/analytics";
import { getYearsOfExperience, PROJECTS_DELIVERED } from "@/lib/experience";

const CLIENTES = [
  { nombre: "Andretich", logo: "/logos/andretich.jpg", url: "https://carlosandretich.com/" },
  { nombre: "INEE", logo: "/logos/inee.png", url: "https://ineeoficial.com/" },
  { nombre: "EPEFI", logo: "/logos/epefi.png", url: "https://epefi.com.ar/" },
  { nombre: "Home Pisos Vinílicos", logo: "/logos/home-pisos-vinilicos.png", url: "https://homepisos.com.ar/" },
  { nombre: "ZYcris", logo: "/logos/zycris.png" },
  { nombre: "ABS Depot", logo: "/logos/abs-depot.png", url: "https://www.instagram.com/absdepot/" },
];

const Contador = ({ hasta, sufijo = "" }: { hasta: number; sufijo?: string }) => {
  const [valor, setValor] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValor(hasta);
      return;
    }
    let raf = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const inicio = performance.now();
        const paso = (t: number) => {
          const p = Math.min(1, (t - inicio) / 1600);
          setValor(Math.round(hasta * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(paso);
        };
        raf = requestAnimationFrame(paso);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [hasta]);

  return (
    <span ref={ref}>
      {valor}
      {sufijo}
    </span>
  );
};

const ClientsSection = () => {
  const sectionRef = useReveal<HTMLElement>();
  const datos = [
    { hasta: getYearsOfExperience(), etiqueta: "años haciendo software" },
    { hasta: PROJECTS_DELIVERED, etiqueta: "proyectos entregados" },
  ];

  return (
    <section id="casos-exito" ref={sectionRef} className="relative py-28 md:py-40">
      <div className="cx-content">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="cx-label reveal">Clientes</p>
            <h2 className="cx-display cx-title-lg reveal reveal-delay-1 mt-5">
              Ya confían <span className="cx-gradient-text">en nosotros.</span>
            </h2>
          </div>
          <dl className="reveal reveal-delay-2 grid grid-cols-2 gap-8">
            {datos.map((d) => (
              <div key={d.etiqueta} className="flex flex-col-reverse border-l border-capasso-primary/50 pl-6">
                <dt className="mt-3 text-base text-capasso-muted md:text-lg">{d.etiqueta}</dt>
                <dd className="cx-display text-[clamp(56px,7vw,110px)] leading-none">
                  <Contador hasta={d.hasta} sufijo="+" />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Logos en movimiento */}
      <div
        className="reveal group mt-20 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]">
          {[...CLIENTES, ...CLIENTES].map((c, i) => {
            const clase =
              "flex h-28 w-56 shrink-0 items-center justify-center rounded-3xl bg-white p-6 grayscale opacity-70 transition-all duration-500 hover:-translate-y-1 hover:opacity-100 hover:grayscale-0 md:h-32 md:w-72";
            const img = <img src={c.logo} alt={c.nombre} className="max-h-full w-full object-contain" loading="lazy" />;
            return c.url ? (
              <a
                key={`${c.nombre}-${i}`}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className={clase}
                aria-hidden={i >= CLIENTES.length || undefined}
                tabIndex={i >= CLIENTES.length ? -1 : undefined}
                onClick={() => trackEvent("client_logo_click", { client: c.nombre })}
              >
                {img}
              </a>
            ) : (
              <div key={`${c.nombre}-${i}`} className={clase} aria-hidden={i >= CLIENTES.length || undefined}>
                {img}
              </div>
            );
          })}
        </div>
      </div>

      <div className="cx-content mt-12">
        <Link
          to="/portafolio"
          onClick={() => trackEvent("portfolio_click", { location: "home_clients" })}
          className="group inline-flex items-center gap-2 text-lg font-semibold text-white/70 transition-colors hover:text-capasso-primary"
        >
          Ver proyectos
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
};

export default ClientsSection;
