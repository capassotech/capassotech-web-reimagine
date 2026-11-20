import { useEffect, useRef } from "react";

/**
 * Red de partículas que se conecta con el cursor. Escucha el mouse en el elemento padre,
 * así responde aunque el contenido del hero quede por encima del canvas.
 * Se frena cuando sale de pantalla y queda quieta si el usuario prefiere menos movimiento.
 */
const ParticleField = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const padre = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !padre || !ctx) return;

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;

    const medir = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    medir();

    const cantidad = Math.round(Math.min(90, Math.max(36, (W * H) / 16000)));
    const MAX_D = 150;
    const pts = Array.from({ length: cantidad }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.6,
    }));

    const dibujar = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        if (!quieto) {
          // El cursor empuja apenas a las partículas cercanas.
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 120 && d > 0) {
            p.x += (dx / d) * 0.6;
            p.y += (dy / d) * 0.6;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(73,181,231,0.7)";
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < MAX_D) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(73,181,231,${(1 - d / MAX_D) * 0.18})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
        const dm = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
        if (dm < MAX_D * 1.5) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(73,181,231,${(1 - dm / (MAX_D * 1.5)) * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const tick = () => {
      dibujar();
      if (visible && !quieto) raf = requestAnimationFrame(tick);
    };

    const alMover = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (quieto) dibujar();
    };
    const alSalir = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      if (quieto) dibujar();
    };
    const alRedimensionar = () => {
      medir();
      dibujar();
    };

    const observador = new IntersectionObserver(([entrada]) => {
      const antes = visible;
      visible = entrada.isIntersecting;
      if (visible && !antes && !quieto) raf = requestAnimationFrame(tick);
    });
    observador.observe(canvas);

    padre.addEventListener("pointermove", alMover);
    padre.addEventListener("pointerleave", alSalir);
    window.addEventListener("resize", alRedimensionar);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observador.disconnect();
      padre.removeEventListener("pointermove", alMover);
      padre.removeEventListener("pointerleave", alSalir);
      window.removeEventListener("resize", alRedimensionar);
    };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
};

export default ParticleField;
