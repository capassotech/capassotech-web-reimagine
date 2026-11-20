import { useMemo, type CSSProperties } from "react";

/** Generador pseudoaleatorio con semilla: la textura sale igual en cada render. */
const crearAzar = (semilla: number) => () => {
  semilla = (semilla + 0x6d2b79f5) | 0;
  let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type Props = {
  variant?: "network" | "circuit";
  seed?: number;
  className?: string;
  style?: CSSProperties;
};

const W = 1200;
const H = 800;

/**
 * Textura decorativa de nodos conectados ("network") o de pistas de circuito ("circuit").
 * Se usa difuminada con una máscara, como la trama de la página de referencia.
 */
const NetworkTexture = ({ variant = "network", seed = 7, className = "", style }: Props) => {
  const contenido = useMemo(() => {
    const azar = crearAzar(seed);

    if (variant === "network") {
      const nodos = Array.from({ length: 70 }, () => ({ x: azar() * W, y: azar() * H, r: azar() * 2.2 + 0.8 }));
      const lineas: { a: number; b: number; o: number }[] = [];
      nodos.forEach((n, i) => {
        nodos
          .map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
          .filter(({ j, d }) => j > i && d < 190)
          .sort((p, q) => p.d - q.d)
          .slice(0, 3)
          .forEach(({ j, d }) => lineas.push({ a: i, b: j, o: 1 - d / 190 }));
      });
      return (
        <>
          {lineas.map((l, k) => (
            <line
              key={k}
              x1={nodos[l.a].x}
              y1={nodos[l.a].y}
              x2={nodos[l.b].x}
              y2={nodos[l.b].y}
              stroke="#49b5e7"
              strokeOpacity={0.15 + l.o * 0.5}
              strokeWidth={1}
            />
          ))}
          {nodos.map((n, k) => (
            <circle key={k} cx={n.x} cy={n.y} r={n.r} fill={k % 7 === 0 ? "#ffffff" : "#49b5e7"} />
          ))}
        </>
      );
    }

    // Pistas de circuito: tramos horizontales y diagonales a 45°, con un anillo al final.
    const pistas = Array.from({ length: 34 }, () => {
      let x = azar() * W;
      let y = azar() * H;
      const puntos = [[x, y]];
      const tramos = 2 + Math.floor(azar() * 3);
      const sentido = azar() > 0.5 ? 1 : -1;
      for (let i = 0; i < tramos; i++) {
        if (i % 2 === 0) {
          x += sentido * (60 + azar() * 180);
        } else {
          const d = (30 + azar() * 70) * (azar() > 0.5 ? 1 : -1);
          x += sentido * Math.abs(d);
          y += d;
        }
        puntos.push([x, y]);
      }
      return puntos;
    });
    return pistas.map((p, k) => {
      const [fx, fy] = p[p.length - 1];
      return (
        <g key={k} stroke="#49b5e7" fill="none" strokeWidth={1.2} strokeOpacity={0.55}>
          <polyline points={p.map((q) => q.join(",")).join(" ")} strokeLinejoin="round" />
          <circle cx={p[0][0]} cy={p[0][1]} r={2.4} fill="#49b5e7" stroke="none" />
          <circle cx={fx} cy={fy} r={4.5} />
        </g>
      );
    });
  }, [variant, seed]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`cx-texture ${className}`}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {contenido}
    </svg>
  );
};

export default NetworkTexture;
