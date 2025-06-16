
const ProcessSection = () => {
  const processSteps = [
    {
      step: "01",
      title: "Análisis y Planificación",
      description: "Entendemos tu negocio, analizamos requerimientos y definimos la arquitectura más adecuada.",
      items: [
        "Reunión inicial y descubrimiento",
        "Análisis de requerimientos",
        "Propuesta técnica y comercial",
        "Definición de alcance y cronograma"
      ],
      duration: "1-2 semanas"
    },
    {
      step: "02",
      title: "Diseño y Prototipado",
      description: "Creamos wireframes, diseños UI/UX y prototipos funcionales para validar la solución.",
      items: [
        "Wireframes y mockups",
        "Diseño de interfaz de usuario",
        "Prototipo interactivo",
        "Validación con el cliente"
      ],
      duration: "2-3 semanas"
    },
    {
      step: "03",
      title: "Desarrollo Iterativo",
      description: "Desarrollamos usando metodologías ágiles con entregas frecuentes y feedback continuo.",
      items: [
        "Sprints de 2 semanas",
        "Demos regulares",
        "Testing continuo",
        "Integración continua"
      ],
      duration: "4-16 semanas"
    },
    {
      step: "04",
      title: "Testing y QA",
      description: "Realizamos pruebas exhaustivas para garantizar calidad, rendimiento y seguridad.",
      items: [
        "Testing funcional",
        "Pruebas de rendimiento",
        "Testing de seguridad",
        "Pruebas de usuario"
      ],
      duration: "1-2 semanas"
    },
    {
      step: "05",
      title: "Deploy y Puesta en Producción",
      description: "Desplegamos la solución en el ambiente productivo con monitoreo y soporte completo.",
      items: [
        "Configuración de servidores",
        "Migración de datos",
        "Capacitación del equipo",
        "Documentación técnica"
      ],
      duration: "1 semana"
    },
    {
      step: "06",
      title: "Soporte y Mantenimiento",
      description: "Brindamos soporte continuo, actualizaciones y nuevas funcionalidades según las necesidades.",
      items: [
        "Monitoreo 24/7",
        "Soporte técnico",
        "Actualizaciones regulares",
        "Nuevas funcionalidades"
      ],
      duration: "Continuo"
    }
  ];

  return (
    <section id="proceso" className="py-20 bg-capasso-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestro <span className="text-gradient">Proceso</span>
          </h2>
          <p className="text-xl text-capasso-light/80 max-w-3xl mx-auto">
            Un proceso estructurado y transparente que garantiza resultados exitosos,
            desde la idea inicial hasta el producto final en producción.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-capasso-primary via-cyan-400 to-capasso-primary opacity-30"></div>

          <div className="space-y-16 lg:space-y-24">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
              >
                {/* Step number - center on large screens */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-capasso-primary to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 lg:w-1/2">
                  <div className="bg-capasso-secondary border border-capasso-gray rounded-lg p-8 hover-glow transition-all duration-300">
                    {/* Mobile step number */}
                    <div className="lg:hidden flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-capasso-primary to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {step.step}
                      </div>
                      <div className="text-sm text-capasso-primary font-medium">
                        {step.duration}
                      </div>
                    </div>

                    <div className="hidden lg:block text-right mb-2">
                      <span className="text-sm text-capasso-primary font-medium">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold text-capasso-light mb-4">
                      {step.title}
                    </h3>

                    <p className="text-capasso-light/80 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-capasso-light/70">
                          <div className="w-2 h-2 bg-capasso-primary rounded-full mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for large screens */}
                <div className="hidden lg:block flex-1 lg:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-capasso-secondary border border-capasso-gray rounded-lg p-8 max-w-4xl mx-auto hover-glow">
            <h3 className="text-2xl font-semibold text-capasso-light mb-4">
              Metodología Comprobada
            </h3>
            <p className="text-capasso-light/80 mb-6">
              Nuestro proceso se basa en metodologías ágiles como Scrum,
              garantizando flexibilidad, transparencia y entregas de valor constantes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-capasso-primary/20 text-capasso-primary px-4 py-2 rounded-full">
                Scrum Master Certificado
              </span>
              <span className="bg-capasso-primary/20 text-capasso-primary px-4 py-2 rounded-full">
                Daily Standups
              </span>
              <span className="bg-capasso-primary/20 text-capasso-primary px-4 py-2 rounded-full">
                Sprint Reviews
              </span>
              <span className="bg-capasso-primary/20 text-capasso-primary px-4 py-2 rounded-full">
                Retrospectivas
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-capasso-secondary border border-capasso-gray rounded-lg p-6 max-w-3xl mx-auto hover-glow">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg
                className="w-6 h-6 text-capasso-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M16 3.13a4 4 0 11-4.42 6.74M8 3.13a4 4 0 104.42 6.74"
                />
              </svg>
              <h4 className="text-xl font-semibold text-capasso-light">
                Trabajo Colaborativo
              </h4>
            </div>
            <p className="text-capasso-light/80 leading-relaxed text-lg">
              Si el proyecto lo requiere, estamos totalmente abiertos a colaborar con profesionales o equipos externos como marketing, contaduría, legales, entre otros. Nos adaptamos con flexibilidad para encontrar la mejor forma de trabajar en conjunto y alcanzar los objetivos de forma eficiente.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
