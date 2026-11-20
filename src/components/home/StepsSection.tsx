import { useReveal } from "@/hooks/useReveal";

const PASOS = [
  { titulo: "Nos contás", linea: "Una llamada de 15 minutos, sin costo." },
  { titulo: "Te proponemos", linea: "Qué hacemos, cuánto sale y cuándo está." },
  { titulo: "Lo usás", linea: "Ves avances desde el principio." },
];

const StepsSection = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="proceso" ref={sectionRef} className="relative overflow-hidden bg-capasso-ink-2 py-28 md:py-40">
      <div className="cx-content">
        <p className="cx-label reveal">Cómo trabajamos</p>
        <h2 className="cx-display cx-title-lg reveal reveal-delay-1 mt-5">
          Así de <span className="cx-gradient-text">simple.</span>
        </h2>

        <ol className="reveal mt-20 grid gap-14 md:grid-cols-3 md:gap-8">
          {PASOS.map((p, i) => (
            <li key={p.titulo} className="relative pt-10">
              <span className="absolute left-0 right-0 top-0 h-px bg-white/10" aria-hidden="true" />
              <span
                className="cx-draw absolute left-0 right-0 top-0 h-px bg-capasso-primary"
                style={{ transitionDelay: `${0.2 + i * 0.35}s` }}
                aria-hidden="true"
              />
              <span
                className="absolute -top-[5px] left-0 h-[11px] w-[11px] rounded-full bg-capasso-primary shadow-[0_0_16px_#49b5e7]"
                aria-hidden="true"
              />
              <span className="cx-display cx-gradient-text block text-[clamp(80px,10vw,160px)] leading-none" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="cx-display mt-6 text-[clamp(28px,2.6vw,40px)] font-bold">{p.titulo}</h3>
              <p className="mt-3 text-lg text-capasso-muted">{p.linea}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default StepsSection;
