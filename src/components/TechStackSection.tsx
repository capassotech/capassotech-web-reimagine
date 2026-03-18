import { useReveal } from "@/hooks/useReveal";

const categories = [
  {
    title: "Frontend",
    items: ["React", "Angular", "Blazor", "TailwindCSS", "Bootstrap 5", "HTML5 / SCSS"],
    color: "text-capasso-primary",
    bg: "bg-capasso-mid-blue",
    backTitle: "Lo que ves en pantalla",
    backDesc: "Hacemos que tu producto sea rápido, fácil de usar y que se vea bien en cualquier dispositivo.",
    backItems: ["Sitios web", "Paneles de control", "Apps web", "Experiencias mobile"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", ".NET Core", ".NET Framework", "Firebase", "Java", "SpringBoot"],
    color: "text-blue-600",
    bg: "bg-blue-50",
    backTitle: "El motor detrás",
    backDesc: "La lógica que procesa, valida y conecta todo. Sin este, nada funciona bien.",
    backItems: ["APIs y servicios", "Autenticación y seguridad", "Integración con sistemas", "Procesamiento de datos"],
  },
  {
    title: "DevOps",
    items: ["Docker", "Nginx", "Firebase Hosting", "GitHub Actions"],
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    backTitle: "Para que no se caiga",
    backDesc: "Tu sistema siempre disponible, con despliegues automáticos y sin intervención manual.",
    backItems: ["Deploy automático", "Entornos de prueba", "Monitoreo", "Escalado sin fricciones"],
  },
  {
    title: "Bases de Datos",
    items: ["PostgreSQL", "MySQL", "SQL Server", "Firestore", "MongoDB"],
    color: "text-capasso-primary",
    bg: "bg-capasso-mid-blue",
    backTitle: "Tu información, segura",
    backDesc: "Diseñamos la estructura de datos para que tu negocio pueda crecer sin que nada se rompa.",
    backItems: ["Almacenamiento confiable", "Consultas rápidas", "Backups automáticos", "Migraciones sin pérdidas"],
  },
  {
    title: "Integraciones",
    items: ["WhatsApp API", "MercadoLibre API", "Google Maps", "REST APIs", "Git", "Jira"],
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    backTitle: "Conectado con el mundo",
    backDesc: "Tu sistema habla con las herramientas que ya usás o con las que necesitás sumar.",
    backItems: ["Pagos y cobros", "Mensajería automática", "Mapas y geolocalización", "Marketplaces"],
  },
];

const TechStackSection = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="tecnologias" ref={sectionRef} className="section-default bg-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 text-center reveal">
          <span className="section-label">Con qué trabajamos</span>
          <h2 className="text-[2.5rem] font-extrabold leading-tight tracking-tight text-capasso-dark md:text-[3rem]">
            Tecnologías que{" "}
            <span className="text-gradient">dominamos</span>
          </h2>
          <p className="mt-3 text-sm text-capasso-medium-grey">Pasá el cursor por cada categoría para ver qué resuelve.</p>
        </div>

        {/* Flip cards grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} flip-card`}
              style={{ minHeight: "300px" }}
            >
              <div className="flip-card-inner" style={{ minHeight: "300px" }}>

                {/* Front */}
                <div className="flip-card-front">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`rounded-xl ${cat.bg} px-3 py-1.5`}>
                      <span className={`text-xs font-extrabold uppercase tracking-widest ${cat.color}`}>
                        {cat.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Back */}
                <div className="flip-card-back">
                  <p className="mb-1 text-xs font-extrabold uppercase tracking-widest text-white/60">
                    {cat.title}
                  </p>
                  <h3 className="mb-2 text-lg font-extrabold text-white">{cat.backTitle}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-white/80">{cat.backDesc}</p>
                  <ul className="space-y-1.5">
                    {cat.backItems.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="reveal mt-8 content-card text-center">
          <h3 className="text-xl font-bold text-capasso-dark">¿No ves la tecnología que necesitás?</h3>
          <p className="mt-2 text-sm text-capasso-dark-grey">Contanos qué usás — nos adaptamos.</p>
        </div>

      </div>
    </section>
  );
};

export default TechStackSection;
