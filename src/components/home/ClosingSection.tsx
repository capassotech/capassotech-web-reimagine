import { ArrowRight, CalendarDays, Check } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useReveal } from "@/hooks/useReveal";
import NetworkTexture from "./NetworkTexture";
import { abrirAgenda, abrirWhatsApp } from "./contacto";

const PROMESAS = ["Sin tecnicismos", "Avances desde el principio", "Sabés siempre qué pasa"];

const ClosingSection = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="contacto" ref={sectionRef} className="relative overflow-hidden py-28 md:py-40">
      <div
        className="pointer-events-none absolute -left-[15%] bottom-0 h-[60vmax] w-[60vmax] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(73,181,231,0.5), transparent 70%)" }}
        aria-hidden="true"
      />
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
        <h2 className="cx-display cx-title-xl reveal max-w-[13ch]">
          El software se adapta a tu empresa. <span className="cx-gradient-text">No al revés.</span>
        </h2>

        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal reveal-delay-1">
            <p className="cx-display text-[clamp(28px,3vw,44px)] font-bold leading-tight">Contanos qué te pasa.</p>
            <p className="mt-4 text-lg text-capasso-muted md:text-xl">Te respondemos en menos de un día hábil.</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => abrirWhatsApp("home_cierre", "Hola CapassoTech, quiero hablar sobre mi proyecto")}
                className="cx-btn cx-btn-primary"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Hablemos por WhatsApp
              </button>
              <button type="button" onClick={() => abrirAgenda("home_cierre")} className="cx-btn cx-btn-ghost">
                <CalendarDays className="h-5 w-5" />
                Agendar 15 min
                <ArrowRight className="cx-arrow h-5 w-5" />
              </button>
            </div>

            <ul className="mt-12 space-y-4">
              {PROMESAS.map((p) => (
                <li key={p} className="flex items-center gap-4 text-lg text-white/80">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-capasso-primary/15 text-capasso-primary">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="cx-form reveal reveal-delay-2 rounded-[28px] border border-white/10 bg-capasso-ink-2/80 p-6 backdrop-blur md:p-10">
            <ContactForm context="home" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
