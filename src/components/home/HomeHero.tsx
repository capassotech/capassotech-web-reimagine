import type { MouseEvent } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import ParticleField from "./ParticleField";
import NetworkTexture from "./NetworkTexture";
import { abrirWhatsApp } from "./contacto";

const demora = (s: number) => ({ animationDelay: `${s}s` });

const HomeHero = () => {
  const irADolores = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("dolores")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Cortina de entrada: se abre desde el centro */}
      <div className="cx-veil cx-veil-l" aria-hidden="true" />
      <div className="cx-veil cx-veil-r" aria-hidden="true" />
      <div className="cx-trazo" aria-hidden="true" />

      <ParticleField />

      {/* Halo de luz y trama de red */}
      <div
        className="pointer-events-none absolute -right-[10%] top-[8%] h-[70vmax] w-[70vmax] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(73,181,231,0.45) 0%, rgba(33,106,217,0.18) 40%, transparent 70%)" }}
        aria-hidden="true"
      />
      <NetworkTexture
        variant="network"
        seed={11}
        className="right-0 top-0 h-full w-[min(70%,1000px)] opacity-60"
        style={{
          maskImage: "radial-gradient(70% 70% at 70% 45%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(70% 70% at 70% 45%, #000 20%, transparent 75%)",
        }}
      />

      <div className="cx-axis" aria-hidden="true" />

      <div className="cx-content relative z-10 w-full pb-28 pt-36">
        <div className="relative">
          <span
            className="cx-axis-tick top-[120px] hidden md:block"
            style={{ left: "calc(-1 * clamp(20px, 4vw, 72px) - 4px)" }}
            aria-hidden="true"
          />

          <span className="cx-pill cx-rise" style={demora(0.9)}>
            <span className="cx-live" aria-hidden="true" />
            Software a medida para empresas
          </span>

          <h1 className="cx-display cx-title-xl mt-8">
            <span className="cx-rise block" style={demora(1.05)}>Tu empresa creció.</span>
            <span className="cx-rise cx-gradient-text block pb-[0.08em]" style={demora(1.2)}>Tus sistemas, no.</span>
          </h1>

          <p
            className="cx-rise mt-8 max-w-2xl text-lg font-light leading-snug text-capasso-muted md:text-2xl"
            style={demora(1.4)}
          >
            Hacemos el software que tu empresa necesita para el tamaño que tiene hoy.
          </p>

          <div className="cx-rise mt-10 flex flex-wrap gap-4" style={demora(1.55)}>
            <button
              type="button"
              onClick={() => abrirWhatsApp("hero", "Hola CapassoTech, les quiero contar un problema de mi empresa")}
              className="cx-btn cx-btn-primary"
            >
              Contanos tu problema
              <ArrowRight className="cx-arrow h-5 w-5" />
            </button>
            <button type="button" onClick={() => abrirWhatsApp("hero_whatsapp")} className="cx-btn cx-btn-ghost">
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      <a
        href="#dolores"
        onClick={irADolores}
        className="cx-rise absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-capasso-primary"
        style={demora(1.9)}
      >
        ¿Te suena?
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current">
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </span>
      </a>
    </section>
  );
};

export default HomeHero;
