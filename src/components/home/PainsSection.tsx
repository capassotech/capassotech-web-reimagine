import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import NetworkTexture from "./NetworkTexture";
import { abrirWhatsApp } from "./contacto";

// Cada dolor sale de un proyecto real (entre paréntesis), sin nombrarlo en la página.
const DOLORES = [
  {
    // Faktia
    dolor: "Hacés cada factura a mano en ARCA.",
    solucion: "Facturás en segundos, o las facturas salen solas desde tu sistema.",
    etiqueta: "Facturación electrónica",
    mensaje: "Hola CapassoTech, hacemos las facturas a mano en ARCA y queremos automatizarlo",
  },
  {
    // Vialto
    dolor: "Hay viajes que se hicieron y nunca se facturaron.",
    solucion: "Cada viaje queda registrado con su chofer, su camión y su costo, y pasa directo a facturar.",
    etiqueta: "Logística y transporte",
    mensaje: "Hola CapassoTech, tenemos una empresa de transporte y queremos ordenar los viajes y la facturación",
  },
  {
    // Vialto
    dolor: "No sabés cuánto combustible carga cada camión.",
    solucion: "El chofer carga el ticket desde el celular y ves el consumo de cada unidad.",
    etiqueta: "Control de flota",
    mensaje: "Hola CapassoTech, queremos controlar el combustible de nuestra flota",
  },
  {
    // Andretich
    dolor: "Publicás miles de productos a mano.",
    solucion: "Los cargás una vez y salen en tu web y en Mercado Libre, con precio y stock al día.",
    etiqueta: "Catálogo y Mercado Libre",
    mensaje: "Hola CapassoTech, tenemos muchos productos y queremos publicarlos en la web y en Mercado Libre sin cargarlos a mano",
  },
  {
    // ZYcris
    dolor: "El stock nunca coincide con lo que vendiste.",
    solucion: "Cada venta descuenta el stock al instante, en todas tus sucursales.",
    etiqueta: "Punto de venta y stock",
    mensaje: "Hola CapassoTech, queremos un punto de venta con el stock al día",
  },
  {
    // EPEFI
    dolor: "Mandás los cursos por mail y corregís exámenes a mano.",
    solucion: "Tus alumnos estudian en tu propia plataforma y los exámenes se corrigen solos.",
    etiqueta: "Plataforma de cursos",
    mensaje: "Hola CapassoTech, damos cursos y queremos una plataforma propia",
  },
  {
    // GymFuze
    dolor: "Perseguís a tus clientes para cobrar la cuota.",
    solucion: "Avisos de vencimiento automáticos y cada pago registrado.",
    etiqueta: "Cobros y cuotas",
    mensaje: "Hola CapassoTech, queremos automatizar el cobro de cuotas",
  },
];

const INTERVALO_MS = 5200;

const PainsSection = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [activo, setActivo] = useState(0);
  // Avanza solo hasta que la persona elige un dolor.
  const [automatico, setAutomatico] = useState(true);
  const [enPantalla, setEnPantalla] = useState(false);
  const listaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setEnPantalla(e.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!automatico || !enPantalla) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActivo((i) => (i + 1) % DOLORES.length), INTERVALO_MS);
    return () => clearTimeout(t);
  }, [activo, automatico, enPantalla]);

  const elegir = (i: number) => {
    setAutomatico(false);
    setActivo(i);
  };

  const actual = DOLORES[activo];

  return (
    <section id="dolores" ref={sectionRef} className="relative overflow-hidden py-28 md:py-40">
      <div className="cx-axis" aria-hidden="true" />

      <div className="cx-content relative">
        <p className="cx-label reveal">¿Te suena?</p>
        <h2 className="cx-display cx-title-lg reveal reveal-delay-1 mt-5 max-w-[14ch]">
          ¿Cuál es tu <span className="cx-gradient-text">dolor de cabeza?</span>
        </h2>

        <div ref={listaRef} className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Lista de dolores */}
          <div className="reveal reveal-delay-2 lg:col-span-7" role="list">
            {DOLORES.map((d, i) => {
              const seleccionado = i === activo;
              return (
                <div key={d.dolor} role="listitem">
                  <button
                    type="button"
                    className="cx-pain cx-display text-[clamp(22px,2.7vw,42px)] font-bold"
                    aria-expanded={seleccionado}
                    aria-controls="dolor-solucion"
                    onClick={() => elegir(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && elegir(i)}
                  >
                    {seleccionado && automatico && enPantalla && (
                      <span
                        key={activo}
                        className="cx-pain-progress"
                        style={{ animation: `cx-progress ${INTERVALO_MS}ms linear forwards` }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="mr-4 align-top font-mono text-sm font-bold text-capasso-primary md:mr-6 md:text-base">
                      0{i + 1}
                    </span>
                    <span className="cx-pain-text">{d.dolor}</span>
                  </button>

                  {/* En pantallas chicas la solución se abre debajo */}
                  {seleccionado && (
                    <div className="cx-swap pb-8 pl-10 lg:hidden">
                      <p className="text-lg font-medium leading-snug text-white">{d.solucion}</p>
                      <button
                        type="button"
                        onClick={() => abrirWhatsApp(`dolor_${i + 1}`, d.mensaje)}
                        className="mt-4 inline-flex items-center gap-2 font-semibold text-capasso-primary"
                      >
                        Quiero resolver esto <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="border-t border-white/10" />
          </div>

          {/* Panel de solución (escritorio) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div
              id="dolor-solucion"
              aria-live="polite"
              className="cx-card sticky top-32 flex min-h-[460px] flex-col justify-between p-10"
            >
              <NetworkTexture
                variant="circuit"
                seed={activo + 3}
                className="inset-0 h-full w-full opacity-40"
                style={{
                  maskImage: "linear-gradient(to top, #000, transparent 70%)",
                  WebkitMaskImage: "linear-gradient(to top, #000, transparent 70%)",
                }}
              />
              <div key={activo} className="cx-swap relative">
                <div className="flex items-center justify-between">
                  <span className="cx-pill">La solución · {actual.etiqueta}</span>
                  <span className="cx-display cx-outline text-7xl" aria-hidden="true">
                    0{activo + 1}
                  </span>
                </div>
                <p className="cx-display mt-10 text-[clamp(28px,2.6vw,42px)] font-bold leading-[1.1]">
                  {actual.solucion}
                </p>
              </div>
              <button
                type="button"
                onClick={() => abrirWhatsApp(`dolor_${activo + 1}`, actual.mensaje)}
                className="cx-btn cx-btn-primary relative mt-10 self-start"
              >
                Quiero resolver esto
                <ArrowRight className="cx-arrow h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainsSection;
