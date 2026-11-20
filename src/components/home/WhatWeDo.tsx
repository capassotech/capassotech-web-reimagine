import { Link } from "react-router-dom";
import { ArrowUpRight, Bot, Code2, Users, Wrench } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { trackEvent } from "@/lib/analytics";
import { seguirCursor } from "./contacto";

const SERVICIOS = [
  { icono: Code2, titulo: "Software a medida", linea: "Hecho para cómo trabaja tu empresa." },
  { icono: Bot, titulo: "Automatización e IA", linea: "Que lo repetitivo se haga solo." },
  { icono: Wrench, titulo: "Mantenimiento", linea: "Cuidamos lo que ya tenés funcionando." },
  { icono: Users, titulo: "Equipo dedicado", linea: "Desarrolladores en tu equipo, sin contratar." },
];

const WhatWeDo = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="servicios" ref={sectionRef} className="relative py-28 md:py-40">
      <div className="cx-content">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="cx-label reveal">Qué hacemos</p>
            <h2 className="cx-display cx-title-lg reveal reveal-delay-1 mt-5">
              Tecnología que <span className="cx-gradient-text">trabaja por vos.</span>
            </h2>
          </div>
          <Link
            to="/servicios"
            onClick={() => trackEvent("services_click", { location: "home" })}
            className="reveal reveal-delay-2 group inline-flex shrink-0 items-center gap-2 text-lg font-semibold text-white/70 transition-colors hover:text-capasso-primary"
          >
            Ver servicios
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICIOS.map(({ icono: Icono, titulo, linea }, i) => (
            <article
              key={titulo}
              onPointerMove={seguirCursor}
              className={`cx-card reveal reveal-delay-${i + 1} flex min-h-[320px] flex-col justify-between p-8`}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-capasso-primary/40 bg-capasso-primary/10 text-capasso-primary">
                  <Icono className="h-7 w-7" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-sm font-bold text-white/30">0{i + 1}</span>
              </div>
              <div>
                <h3 className="cx-display text-[clamp(26px,2.2vw,34px)] font-bold leading-[1.05]">{titulo}</h3>
                <p className="mt-3 text-lg text-capasso-muted">{linea}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
