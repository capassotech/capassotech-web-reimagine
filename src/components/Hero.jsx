
import { useEffect, useRef, useState, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getYearsOfExperience, PROJECTS_DELIVERED } from "@/lib/experience";

const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

/* ─────────────────────────────────────────────
   Particle network canvas
───────────────────────────────────────────── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const animRef   = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const COUNT = 65, MAX_D = 140;
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(73,181,231,0.6)"; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < MAX_D) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(73,181,231,${(1 - d / MAX_D) * 0.2})`; ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
        const dm = Math.hypot(pts[i].x - mx, pts[i].y - my);
        if (dm < MAX_D * 1.6) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(73,181,231,${(1 - dm / (MAX_D * 1.6)) * 0.55})`; ctx.lineWidth = 1; ctx.stroke();
        }
      }
      animRef.current = requestAnimationFrame(tick);
    };
    tick();
    const resize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" onMouseMove={handleMouseMove} />;
};

/* ─────────────────────────────────────────────
   Typewriter hook
───────────────────────────────────────────── */
const useTypewriter = (words, typingSpeed = 75, pauseMs = 2200, deletingSpeed = 40) => {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx % words.length];
    let t;
    if (!deleting && display === current)          t = setTimeout(() => setDeleting(true), pauseMs);
    else if (deleting && display === "")           { setDeleting(false); setWordIdx(i => (i + 1) % words.length); return; }
    else t = setTimeout(() => setDisplay(deleting ? display.slice(0, -1) : current.slice(0, display.length + 1)), deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(t);
  }, [display, wordIdx, deleting, words, typingSpeed, pauseMs, deletingSpeed]);
  return display;
};

/* ─────────────────────────────────────────────
   Animated counter
───────────────────────────────────────────── */
const AnimatedCount = ({ value }) => {
  const numMatch = value.match(/(\d+)/);
  const suffix = value.replace(/\d+/, "");
  const target = numMatch ? parseInt(numMatch[1], 10) : 0;
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let cur = 0;
      const inc = target / 40;
      const t = setInterval(() => {
        cur += inc;
        if (cur >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(cur));
      }, 30);
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
const TYPEWRITER_WORDS = ["software a medida", "APIs escalables", "equipos remotos", "soluciones web", "apps móviles"];
const stats = [
  { value: `${getYearsOfExperience()}+`, label: "Años de experiencia" },
  { value: `${PROJECTS_DELIVERED}+`, label: "Proyectos entregados" },
];

const Hero = () => {
  const typed = useTypewriter(TYPEWRITER_WORDS);

  const handleNosotros = () => window.open("/nosotros", "_blank", "noopener,noreferrer");
  const handleWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "hero" });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };
  const handleScrollDown = (e) => {
    e.preventDefault();
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d1a]">
      <ParticleCanvas />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #49b5e7 0%, transparent 70%)", top: "8%", left: "4%" }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, #216AD9 0%, transparent 70%)", bottom: "12%", right: "8%" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-36">
        <div className="animate-fade-in">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
            Adaptá el software a tu empresa.<br/>
            <span style={{ background: "linear-gradient(135deg, #49b5e7 0%, #216AD9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            NO al revés.
            </span>
          </h1>

          <p className="mb-6 max-w-xl text-lg leading-relaxed text-white/55">
            Desarrollamos sistemas con la precisión que tu negocio exige.
          </p>

          <div className="mb-6 flex items-center gap-2 text-xl font-semibold text-white/70">
            <span className="text-[#49b5e7]">&gt;</span>
            <span className="font-mono">
              {typed}
              <span className="inline-block w-[2px] h-[1em] bg-[#49b5e7] ml-[2px] align-middle animate-pulse" />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button onClick={handleNosotros} className="btn-primary text-base">Conocenos</button>
            <button onClick={handleWhatsApp} className="btn-secondary inline-flex items-center gap-2 text-base">
              <WhatsAppIcon className="h-4 w-4" />
              Escribir por WhatsApp
            </button>
          </div>

          <div className="flex flex-wrap gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-start gap-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-3xl font-extrabold text-white font-mono"><AnimatedCount value={s.value} /></div>
                <div className="text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#servicios" onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-[#49b5e7]">
          <span>¿Qué hacemos?</span>
          <div className="flex h-9 w-6 justify-center rounded-full border-2 border-current">
            <div className="mt-1.5 h-2.5 w-0.5 animate-bounce rounded-full bg-current" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
