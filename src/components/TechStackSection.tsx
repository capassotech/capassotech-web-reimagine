
const TechStackSection = () => {
  const techStack = {
    frontend: [
      { name: "React", category: "frontend" },
      { name: "Angular", category: "frontend" },
      { name: "Blazor", category: "frontend" },
      { name: "Vite", category: "frontend" },
      { name: "TailwindCSS", category: "frontend" },
      { name: "Bootstrap 5", category: "frontend" },
      { name: "HTML5 / SCSS", category: "frontend" }
    ],
    backend: [
      { name: "Node.js", category: "backend" },
      { name: "Express", category: "backend" },
      { name: ".NET Core", category: "backend" },
      { name: ".NET Framework", category: "backend" },
      { name: "Firebase", category: "backend" },
      { name: "Java", category: "backend" },
      { name: "SpringBoot", category: "backend" }
    ],
    devops: [
      { name: "Docker", category: "devops" },
      { name: "Nginx", category: "devops" },
      { name: "Firebase Hosting", category: "devops" },
      { name: "GitHub Actions", category: "devops" }
    ],
    databases: [
      { name: "PostgreSQL", category: "database" },
      { name: "MySQL", category: "database" },
      { name: "SQL Server", category: "database" },
      { name: "Firestore", category: "database" },
      { name: "MongoDB", category: "database" }
    ],
    tools: [
      { name: "REST APIs", category: "tools" },
      { name: "Git", category: "tools" },
      { name: "Jira", category: "tools" },
      { name: "Scrum", category: "tools" },
      { name: "WhatsApp API", category: "tools" },
      { name: "MercadoLibre API", category: "tools" },
      { name: "Google Maps", category: "tools" }
    ]
  };

  const categories = [
    {
      title: "Frontend",
      items: techStack.frontend,
      color: "from-blue-500 to-capasso-primary",
      icon: "🎨"
    },
    {
      title: "Backend",
      items: techStack.backend,
      color: "from-capasso-primary to-cyan-400",
      icon: "⚙️"
    },
    {
      title: "DevOps",
      items: techStack.devops,
      color: "from-cyan-400 to-blue-500",
      icon: "🚀"
    },
    {
      title: "Bases de Datos",
      items: techStack.databases,
      color: "from-blue-500 to-capasso-primary",
      icon: "💾"
    },
    {
      title: "Herramientas",
      items: techStack.tools,
      color: "from-capasso-primary to-cyan-400",
      icon: "🛠️"
    }
  ];

  return (
    <section id="tecnologias" className="py-20 bg-capasso-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestro <span className="text-gradient">Stack Tecnológico</span>
          </h2>
          <p className="text-xl text-capasso-light/80 max-w-3xl mx-auto">
            Trabajamos con las tecnologías más modernas y robustas del mercado para garantizar 
            soluciones escalables y de alta calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-capasso-secondary border border-capasso-gray rounded-lg p-6 hover-glow transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                  <span className="text-xl">{category.icon}</span>
                </div>
                <h3 className="text-2xl font-semibold text-capasso-light">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.items.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="tech-badge"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-capasso-secondary border border-capasso-gray rounded-lg p-8 max-w-4xl mx-auto hover-glow">
            <h3 className="text-2xl font-semibold text-capasso-light mb-4">
              ¿No ves la tecnología que necesitas?
            </h3>
            <p className="text-capasso-light/80 mb-6">
              Nuestro equipo se adapta rápidamente a nuevas tecnologías. 
              Contanos qué necesitas y encontraremos la mejor solución.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-capasso-primary/20 text-capasso-primary px-4 py-2 rounded-full">
                Metodologías Ágiles
              </span>
              <span className="bg-capasso-primary/20 text-capasso-primary px-4 py-2 rounded-full">
                Clean Code
              </span>
              <span className="bg-capasso-primary/20 text-capasso-primary px-4 py-2 rounded-full">
                Testing
              </span>
              <span className="bg-capasso-primary/20 text-capasso-primary px-4 py-2 rounded-full">
                CI/CD
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
