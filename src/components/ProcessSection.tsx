import { useEffect, useRef, useState } from "react";

const steps = [
  { n: "01", title: "Análisis y Planificación",  desc: "Entendemos tu negocio antes de escribir una línea.",    items: ["Discovery inicial", "Propuesta técnica", "Alcance y tiempos"],       dur: "1-2 sem." },
  { n: "02", title: "Diseño y Prototipado",       desc: "Validamos la solución con vos antes de construirla.",   items: ["Wireframes y mockups", "Prototipo interactivo", "Validación"],        dur: "2-3 sem." },
  { n: "03", title: "Desarrollo",                 desc: "Entregas frecuentes para que siempre sepas cómo va.",   items: ["Ciclos cortos de entrega", "Demos regulares", "Testing continuo"],     dur: "4-16 sem." },
  { n: "04", title: "Testing y QA",               desc: "Nos aseguramos de que todo funcione antes de salir.",   items: ["Testing funcional", "Rendimiento", "Pruebas de usuario"],             dur: "1-2 sem." },
  { n: "05", title: "Lanzamiento",                desc: "Salimos a producción con monitoreo desde el minuto uno.", items: ["Deploy en producción", "Migración de datos", "Capacitación"],       dur: "1 sem." },
  { n: "06", title: "Soporte y Crecimiento",      desc: "Seguimos con vos después del lanzamiento.",             items: ["Monitoreo continuo", "Soporte cuando lo necesitás", "Nuevas mejoras"], dur: "Continuo" },
];

// SVG path designed for viewBox "0 0 80 960"
// Each step row = 160px → 6 steps = 960px total
// Path leans LEFT for odd steps (1,3,5) and RIGHT for even steps (2,4,6)
// Step dot centers: y = 80, 240, 400, 560, 720, 880
const SVG_PATH = [
  "M 40 0",
  "C 40 30, 15 50, 15 80",    // → step 1 (left, y=80)
  "C 15 110, 40 130, 40 160", // back to center
  "C 40 190, 65 210, 65 240", // → step 2 (right, y=240)
  "C 65 270, 40 290, 40 320", // back to center
  "C 40 350, 15 370, 15 400", // → step 3 (left, y=400)
  "C 15 430, 40 450, 40 480", // back to center
  "C 40 510, 65 530, 65 560", // → step 4 (right, y=560)
  "C 65 590, 40 610, 40 640", // back to center
  "C 40 670, 15 690, 15 720", // → step 5 (left, y=720)
  "C 15 750, 40 770, 40 800", // back to center
  "C 40 830, 65 850, 65 880", // → step 6 (right, y=880)
  "C 65 910, 40 940, 40 960", // end
].join(" ");

const DOT_POSITIONS = [
  { x: 15, y: 80  }, // step 1 — left
  { x: 65, y: 240 }, // step 2 — right
  { x: 15, y: 400 }, // step 3 — left
  { x: 65, y: 560 }, // step 4 — right
  { x: 15, y: 720 }, // step 5 — left
  { x: 65, y: 880 }, // step 6 — right
];

const STEP_THRESHOLDS = DOT_POSITIONS.map(d => d.y / 960);

const ROW_HEIGHT = 160; // px — must match minHeight on each row div

const ProcessSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const pathRef     = useRef<SVGPathElement>(null);
  const pathLenRef  = useRef<number>(0);
  const [progress, setProgress] = useState(0);

  // Measure path length once on mount
  useEffect(() => {
    if (pathRef.current) {
      pathLenRef.current = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray  = `${pathLenRef.current}`;
      pathRef.current.style.strokeDashoffset = `${pathLenRef.current}`;
    }
  }, []);

  // Animate on scroll
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect    = section.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      const total    = rect.height + window.innerHeight * 0.4;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drive strokeDashoffset
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !pathLenRef.current) return;
    path.style.strokeDashoffset = `${pathLenRef.current * (1 - progress)}`;
  }, [progress]);

  return (
    <section id="proceso" ref={sectionRef} className="section-default bg-capasso-light-blue">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 text-center">
          <span className="section-label">Cómo trabajamos</span>
          <h2 className="text-[2.5rem] font-extrabold leading-tight tracking-tight text-capasso-dark md:text-[3rem]">
            Nuestro <span className="text-gradient">Proceso</span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-lg text-capasso-dark-grey">
            Del primer mensaje hasta el producto funcionando — sin sorpresas en el camino.
          </p>
        </div>

        {/* ── DESKTOP: zigzag timeline ── */}
        <div className="relative hidden md:block">

          {/* SVG route — sits in the center 10% of the container */}
          <svg
            className="pointer-events-none absolute top-0 h-full"
            style={{ left: "45%", width: "10%", overflow: "visible" }}
            viewBox="0 0 80 960"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            {/* Ghost path (gray guide) */}
            <path
              d={SVG_PATH}
              stroke="#D0E8F5"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated blue path */}
            <path
              ref={pathRef}
              d={SVG_PATH}
              stroke="#49b5e7"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke-dashoffset 0.06s linear" }}
            />
            {/* Step dots */}
            {DOT_POSITIONS.map((dot, i) => (
              <circle
                key={i}
                cx={dot.x}
                cy={dot.y}
                r="5"
                fill={progress >= STEP_THRESHOLDS[i] ? "#49b5e7" : "#D0E8F5"}
                stroke="white"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                style={{ transition: "fill 0.4s ease" }}
              />
            ))}
          </svg>

          {/* Step rows */}
          {steps.map((s, i) => {
            const isLeft  = i % 2 === 0;
            const visible = progress >= STEP_THRESHOLDS[i];
            const card = (
              <div
                className={`content-card transition-all duration-500 ease-out ${
                  visible
                    ? "opacity-100 translate-x-0"
                    : isLeft ? "opacity-0 -translate-x-6" : "opacity-0 translate-x-6"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-capasso-primary text-sm font-extrabold text-white"
                    style={{ fontFamily: "'Source Code Pro', monospace" }}
                  >
                    {s.n}
                  </div>
                  <span className="rounded-full bg-capasso-mid-blue px-3 py-1 text-xs font-bold text-capasso-primary">
                    {s.dur}
                  </span>
                </div>
                <h3 className="mb-1.5 font-bold text-capasso-dark">{s.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-capasso-dark-grey">{s.desc}</p>
                <ul className="space-y-1">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-capasso-dark-grey">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-capasso-primary" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );

            return (
              <div key={s.n} className="flex items-center" style={{ minHeight: `${ROW_HEIGHT}px` }}>
                {isLeft ? (
                  <>
                    <div className="w-[45%] pr-6">{card}</div>
                    <div className="w-[10%]" />
                    <div className="w-[45%]" />
                  </>
                ) : (
                  <>
                    <div className="w-[45%]" />
                    <div className="w-[10%]" />
                    <div className="w-[45%] pl-6">{card}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ── MOBILE: vertical timeline ── */}
        <div className="relative md:hidden pl-8">
          {/* Vertical line */}
          <div
            className="absolute left-3 top-0 w-0.5 bg-capasso-light-grey transition-all duration-100"
            style={{ height: `${progress * 100}%` }}
          />
          <div className="absolute left-3 top-0 w-0.5 bg-[#D0E8F5] h-full" />
          <div
            className="absolute left-3 top-0 w-0.5 bg-capasso-primary transition-all duration-75"
            style={{ height: `${progress * 100}%` }}
          />

          {steps.map((s, i) => {
            const visible = progress >= STEP_THRESHOLDS[i];
            return (
              <div
                key={s.n}
                className={`relative mb-5 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-30 translate-y-3"}`}
              >
                {/* Dot on the line */}
                <div
                  className="absolute -left-[21px] top-4 h-3 w-3 rounded-full border-2 border-white transition-colors duration-400"
                  style={{ backgroundColor: visible ? "#49b5e7" : "#D0E8F5" }}
                />
                <div className="content-card">
                  <div className="mb-2 flex items-center justify-between">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-capasso-primary text-xs font-extrabold text-white"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    >
                      {s.n}
                    </div>
                    <span className="rounded-full bg-capasso-mid-blue px-3 py-1 text-xs font-bold text-capasso-primary">
                      {s.dur}
                    </span>
                  </div>
                  <h3 className="mb-1 font-bold text-capasso-dark">{s.title}</h3>
                  <p className="mb-2 text-sm text-capasso-dark-grey">{s.desc}</p>
                  <ul className="space-y-1">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-capasso-dark-grey">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-capasso-primary" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
