
import { useEffect, useRef, useState, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

/* ─────────────────────────────────────────────
   Particle network canvas
───────────────────────────────────────────── */
const ParticleCanvas = ({ onMouseMove }) => {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const animRef   = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    onMouseMove(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  }, [onMouseMove]);

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
   Live Build Card data
───────────────────────────────────────────── */
const SCOPE_ITEMS = [
  { icon: "🖥️", label: "Landing page" },
  { icon: "🛒", label: "E-commerce"   },
  { icon: "⚙️", label: "Panel admin"  },
  { icon: "📱", label: "App móvil"    },
];

const BUILD_BLOCKS = [
  { icon: "🎨", label: "Diseño UI",        pct: 25 },
  { icon: "⚙️", label: "Funcionalidades",  pct: 55 },
  { icon: "🔗", label: "Integraciones",    pct: 80 },
  { icon: "🚀", label: "Listo para lanzar",pct: 100 },
];

const METRICS = [
  { value: "+64%", label: "Más conversiones",   color: "#28c840" },
  { value: "98%",  label: "Clientes felices",   color: "#49b5e7" },
  { value: "0.8s", label: "Tiempo de carga",    color: "#28c840" },
  { value: "3x",   label: "Más tráfico",        color: "#49b5e7" },
];

const LIVE_FEED = [
  "🟢  Visita desde Buenos Aires",
  "🛒  Nueva venta — hace 8s",
  "🟢  Visita desde Córdoba",
  "📩  Nuevo contacto recibido",
];

/* ─────────────────────────────────────────────
   LiveBuildCard — 3 fases simples
   0 = Planificando  1 = Construyendo  2 = En vivo
───────────────────────────────────────────── */
const LiveBuildCard = ({ mx, my }) => {
  const [phase, setPhase]     = useState(0);
  const [step,  setStep]      = useState(0);
  const [badgesIn, setBadgesIn] = useState(false);
  const [feedIdx, setFeedIdx] = useState(0);

  const STATUS  = ["Planificando…", "Construyendo…", "¡En vivo!"];
  const isLive  = phase === 2;
  const tiltX   = (my - 0.5) * 9;
  const tiltY   = (mx - 0.5) * -9;

  useEffect(() => {
    setStep(0); setBadgesIn(false); setFeedIdx(0);
    const timers = []; let feedIv = null;
    const addT = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); };

    if (phase === 0) {
      SCOPE_ITEMS.forEach((_, i) => addT(() => setStep(i + 1), (i + 1) * 500));
      addT(() => setPhase(1), SCOPE_ITEMS.length * 500 + 700);
    }

    if (phase === 1) {
      BUILD_BLOCKS.forEach((_, i) => addT(() => setStep(i + 1), (i + 1) * 600));
      addT(() => setPhase(2), BUILD_BLOCKS.length * 600 + 600);
    }

    if (phase === 2) {
      METRICS.forEach((_, i) => addT(() => setStep(i + 1), (i + 1) * 320));
      addT(() => setBadgesIn(true), 300);
      feedIv = setInterval(() => setFeedIdx(c => Math.min(c + 1, LIVE_FEED.length)), 1100);
      addT(() => setPhase(0), 6500);
    }

    return () => { timers.forEach(clearTimeout); if (feedIv) clearInterval(feedIv); };
  }, [phase]);

  return (
    <div
      className="relative"
      style={{ transform: `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`, transition: "transform 0.15s ease-out" }}
    >
      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl pointer-events-none" style={{
        background: isLive
          ? "radial-gradient(ellipse at 50% 50%, rgba(40,200,64,0.14) 0%, transparent 70%)"
          : "radial-gradient(ellipse at 50% 50%, rgba(73,181,231,0.16) 0%, transparent 70%)",
        filter: "blur(22px)", transition: "background 1s ease",
      }} />

      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden shadow-[0_28px_64px_rgba(0,0,0,0.55)] border border-white/10 bg-[#0f0f1c]">

        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#09090f] border-b border-white/8">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-2 px-3 py-1 rounded bg-white/5 text-[11px] text-white/25 font-mono truncate">
            tu-proyecto.com
          </div>
          <div
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all duration-700"
            style={{
              background:  isLive ? "rgba(40,200,64,0.12)"  : "rgba(73,181,231,0.1)",
              borderColor: isLive ? "rgba(40,200,64,0.35)"  : "rgba(73,181,231,0.25)",
              color:       isLive ? "#28c840"                : "#49b5e7",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: isLive ? "#28c840" : "#febc2e" }} />
            {STATUS[phase]}
          </div>
        </div>

        {/* ── FASE 0: Planificando ── */}
        {phase === 0 && (
          <div className="p-5 space-y-4">
            <p className="text-[11px] font-semibold text-white/35 uppercase tracking-wider">¿Qué necesitás?</p>
            <div className="grid grid-cols-2 gap-2.5">
              {SCOPE_ITEMS.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl border transition-all duration-500"
                  style={{
                    opacity:      step > i ? 1 : 0.15,
                    transform:    step > i ? "scale(1)" : "scale(0.93)",
                    background:   step > i ? "rgba(73,181,231,0.08)" : "rgba(255,255,255,0.03)",
                    borderColor:  step > i ? "rgba(73,181,231,0.3)"  : "rgba(255,255,255,0.07)",
                    transitionDelay: `${i * 30}ms`,
                  }}
                >
                  <span className="text-lg leading-none">{item.icon}</span>
                  <span className="text-[13px] font-medium text-white/75">{item.label}</span>
                  {step > i && <span className="ml-auto text-[#49b5e7] text-xs font-bold">✓</span>}
                </div>
              ))}
            </div>

            {/* Timeline estimada */}
            <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
              <div>
                <p className="text-[10px] text-white/30 mb-0.5">Tiempo estimado</p>
                <p className="text-2xl font-extrabold text-white">3 semanas</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {["Diseño", "Desarrollo", "Lanzamiento"].map((s, i) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <span className="text-[10px] text-white/30">{s}</span>
                    <span className="w-2 h-2 rounded-full transition-all duration-500"
                      style={{ background: step >= i + 2 ? "#49b5e7" : "rgba(255,255,255,0.12)" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FASE 1: Construyendo ── */}
        {phase === 1 && (
          <div className="p-5 space-y-3">
            <p className="text-[11px] font-semibold text-white/35 uppercase tracking-wider">Progreso del proyecto</p>
            <div className="space-y-2.5">
              {BUILD_BLOCKS.map((block, i) => (
                <div key={block.label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm leading-none">{block.icon}</span>
                      <span className="text-[12px] font-medium text-white/70">{block.label}</span>
                    </div>
                    <span
                      className="text-[11px] font-bold transition-all duration-500"
                      style={{ color: step > i ? "#28c840" : "rgba(255,255,255,0.2)" }}
                    >
                      {step > i ? `${block.pct}%` : "—"}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: step > i ? `${block.pct}%` : "0%",
                        background: "linear-gradient(90deg, #49b5e7, #216AD9)",
                        transitionDelay: `${i * 80}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FASE 2: En vivo ── */}
        {phase === 2 && (
          <div className="p-5 space-y-3">
            {/* Metrics 2×2 */}
            <div className="grid grid-cols-2 gap-2.5">
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className="rounded-xl border p-3 text-center transition-all duration-500"
                  style={{
                    opacity:     step > i ? 1 : 0,
                    transform:   step > i ? "scale(1)" : "scale(0.88)",
                    background:  step > i ? `${m.color}0d` : "rgba(255,255,255,0.02)",
                    borderColor: step > i ? `${m.color}30` : "rgba(255,255,255,0.07)",
                    transitionDelay: `${i * 40}ms`,
                  }}
                >
                  <div className="text-2xl font-extrabold leading-none" style={{ color: m.color }}>{m.value}</div>
                  <div className="text-[10px] text-white/40 mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Live feed */}
            <div className="rounded-xl border border-white/8 overflow-hidden">
              <div className="px-3 py-1.5 bg-white/[0.02] border-b border-white/8 flex items-center gap-1.5 text-[10px] text-white/35">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
                Actividad en tiempo real
              </div>
              <div className="min-h-[52px]">
                {feedIdx === 0
                  ? <div className="px-3 py-2 text-[11px] text-white/20">Esperando actividad…</div>
                  : LIVE_FEED.slice(0, Math.min(feedIdx, 2)).map((text, i) => (
                    <div key={i} className="px-3 py-1.5 text-[11px] text-white/60 border-b border-white/5 last:border-0">
                      {text}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div className="border-t border-white/8 grid grid-cols-3 divide-x divide-white/8">
          {[
            { v: isLive ? "0.8s" : "—", l: "Carga"   },
            { v: isLive ? "100"  : "—", l: "Score"   },
            { v: isLive ? "0"    : "—", l: "Errores" },
          ].map((m) => (
            <div key={m.l} className="px-3 py-2.5 text-center">
              <div className="text-sm font-bold transition-all duration-700"
                style={{ color: isLive ? "#28c840" : "rgba(255,255,255,0.12)" }}>
                {m.v}
              </div>
              <div className="text-[10px] text-white/25">{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badges (only live) */}
      <div className="absolute -top-4 -right-4 transition-all duration-500"
        style={{ opacity: badgesIn ? 1 : 0, transform: badgesIn ? "scale(1)" : "scale(0.7) translateY(6px)" }}>
        <div className="bg-[#28c840]/12 backdrop-blur-sm border border-[#28c840]/40 rounded-xl px-3 py-2 text-[11px] font-bold text-[#28c840] shadow-xl whitespace-nowrap">
          ✓ Entregado a tiempo
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 transition-all duration-700"
        style={{
          opacity: badgesIn ? 1 : 0,
          transform: badgesIn ? "scale(1)" : "scale(0.7) translateY(6px)",
          transitionDelay: badgesIn ? "200ms" : "0ms",
        }}>
        <div className="bg-[#216AD9]/18 backdrop-blur-sm border border-[#216AD9]/40 rounded-xl px-3 py-2 text-[11px] font-bold text-[#49b5e7] shadow-xl whitespace-nowrap">
          ⭐ 98% satisfacción
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
const TYPEWRITER_WORDS = ["software a medida", "APIs escalables", "equipos remotos", "soluciones web", "apps móviles"];
const stats = [
  { value: "7+",  label: "Años de experiencia" },
  { value: "30+", label: "Proyectos entregados" },
];

const Hero = () => {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const typed = useTypewriter(TYPEWRITER_WORDS);
  const handleMouse = useCallback((x, y) => setMouse({ x, y }), []);

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
      <ParticleCanvas onMouseMove={handleMouse} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #49b5e7 0%, transparent 70%)", top: "8%", left: "4%" }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, #216AD9 0%, transparent 70%)", bottom: "12%", right: "8%" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-36">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">

          {/* LEFT */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#49b5e7]/10 border border-[#49b5e7]/20 text-[#49b5e7] text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#49b5e7] animate-pulse" />
              Para negocios que quieren crecer
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
              Hacemos que la tecnología{" "}
              <span style={{ background: "linear-gradient(135deg, #49b5e7 0%, #216AD9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                trabaje para vos
              </span>
            </h1>

            <div className="mb-6 flex items-center gap-2 text-xl font-semibold text-white/70">
              <span className="text-[#49b5e7]">&gt;</span>
              <span className="font-mono">
                {typed}
                <span className="inline-block w-[2px] h-[1em] bg-[#49b5e7] ml-[2px] align-middle animate-pulse" />
              </span>
            </div>

            <p className="mb-10 max-w-lg text-lg leading-relaxed text-white/55">
              Tenés una idea, un problema o un sistema que da guerra.
              Nosotros lo resolvemos — con fechas reales y resultados que podés medir.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button onClick={handleNosotros} className="btn-primary text-base">Conocenos</button>
              <button onClick={handleWhatsApp} className="btn-secondary text-base">Escribir por WhatsApp</button>
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

          {/* RIGHT */}
          <div className="hidden lg:block relative" style={{ animation: "float 5s ease-in-out infinite" }}>
            <LiveBuildCard mx={mouse.x} my={mouse.y} />
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
