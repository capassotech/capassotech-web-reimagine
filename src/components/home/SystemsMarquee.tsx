import { TYPEWRITER_WORDS } from "@/data/typewriter-words";

// Palabras cortas para la cinta gigante. La lista completa queda en texto oculto para buscadores.
const FILA_1 = ["Facturación electrónica", "Logística", "Mercado Libre", "Punto de venta", "Cursos online", "Cobros"];
const FILA_2 = ["Stock", "Control de flota", "Catálogos", "Tableros", "Turnos", "Integraciones", "Apps móviles"];

const Separador = () => (
  <svg viewBox="0 0 24 24" className="mx-[0.35em] inline-block h-[0.4em] w-[0.4em] shrink-0 self-center text-capasso-primary" aria-hidden="true">
    <path fill="currentColor" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
  </svg>
);

const Fila = ({ palabras, invertida = false, rellena = false }: { palabras: string[]; invertida?: boolean; rellena?: boolean }) => (
  <div className="cx-marquee overflow-hidden" aria-hidden="true">
    <div className={`cx-marquee-track ${invertida ? "cx-reverse" : ""}`}>
      {[0, 1].map((copia) => (
        <div key={copia} className="flex shrink-0 items-center">
          {palabras.map((p) => (
            <span key={`${copia}-${p}`} className="flex items-center">
              <span
                className={`cx-display whitespace-nowrap text-[clamp(44px,7.5vw,120px)] ${
                  rellena ? "text-white/[0.08] transition-colors duration-300 hover:text-white" : "cx-outline"
                }`}
              >
                {p}
              </span>
              <Separador />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const SystemsMarquee = () => (
  <section className="relative border-y border-white/10 py-14 md:py-20" aria-label="Sistemas que desarrollamos">
    <p className="cx-label mb-8 text-center">Lo que construimos</p>
    <div
      className="flex flex-col gap-2"
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <Fila palabras={FILA_1} />
      <Fila palabras={FILA_2} invertida rellena />
    </div>
    <p className="sr-only">
      Desarrollamos software a medida, incluyendo {TYPEWRITER_WORDS.join(", ")}, entre otros sistemas y soluciones para empresas.
    </p>
  </section>
);

export default SystemsMarquee;
