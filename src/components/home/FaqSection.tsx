import { Plus } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { PREGUNTAS } from "@/data/preguntas-frecuentes";

const FaqSection = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="preguntas" ref={sectionRef} className="relative py-28 md:py-40">
      <div className="cx-content grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="cx-label reveal">Preguntas frecuentes</p>
          <h2 className="cx-display cx-title-md reveal reveal-delay-1 mt-5 max-w-[12ch]">
            Lo que todos <span className="cx-gradient-text">nos preguntan.</span>
          </h2>
        </div>

        <div className="reveal reveal-delay-2 lg:col-span-7">
          {PREGUNTAS.map(({ pregunta, respuesta }) => (
            <details key={pregunta} className="group border-t border-white/10 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="cx-display text-[clamp(19px,1.6vw,24px)] font-bold leading-snug text-white/85 transition-colors group-hover:text-white group-open:text-white">
                  {pregunta}
                </h3>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-capasso-primary transition-all duration-300 group-open:rotate-45 group-open:border-capasso-primary group-open:bg-capasso-primary group-open:text-capasso-ink">
                  <Plus className="h-5 w-5" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-lg leading-relaxed text-capasso-muted">{respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
