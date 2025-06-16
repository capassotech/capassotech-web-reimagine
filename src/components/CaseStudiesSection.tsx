
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CaseStudiesSection = () => {
  const cases = [
    {
      title: "App de Gestión Logística",
      description: "Desarrollamos una app de escritorio y mobile para registrar cargas de combustible, controlar gastos y exportar reportes en tiempo real.",
      technologies: ["React", "Node.js", "SQLite", "Electron", "Excel Export"],
      results: [
        "Control total de cargas y gastos por camión",
        "Exportación de reportes en Excel",
        "Mayor trazabilidad y control administrativo"
      ],
      category: "Logística",
      gradient: "from-blue-500 to-capasso-primary"
    },
    {
      title: "Catálogo Web de Autopartes",
      description: "Sistema de catalogación y sitio web público para búsqueda de autopartes, con integración entre backend administrativo y frontend de consulta.",
      technologies: [".NET", "Blazor", "SQL Server", "Bootstrap 5", "Mercado Libre API"],
      results: [
        "Miles de productos publicados",
        "Filtros por marca, categoría y compatibilidades",
        "Actualización en tiempo real desde sistema interno"
      ],
      category: "Distribución",
      gradient: "from-capasso-primary to-cyan-400"
    },
    {
      title: "Web de Pisos con WhatsApp Integrado",
      description: "Sitio web institucional con catálogo visual de productos y botón directo a WhatsApp para cotizaciones rápidas.",
      technologies: ["HTML5", "TailwindCSS", "Firebase", "WhatsApp API"],
      results: [
        "Incremento en consultas por producto",
        "Carga autoadministrable de productos",
        "Integración directa con WhatsApp para ventas"
      ],
      category: "E-commerce",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      title: "Sistema de Turnos Online",
      description: "Página web simple y eficaz para reserva de turnos online, incluyendo opción de turnos recurrentes y notificaciones automáticas.",
      technologies: ["Angular", "Firebase", "TailwindCSS", "Calendar API"],
      results: [
        "Gestión sin llamadas telefónicas",
        "Reservas frecuentes automatizadas",
        "Interfaz optimizada para dispositivos móviles"
      ],
      category: "Servicios",
      gradient: "from-blue-500 to-capasso-primary"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="casos-exito" className="py-20 bg-capasso-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Casos de <span className="text-gradient">Éxito</span>
          </h2>
          <p className="text-xl text-capasso-light/80 max-w-3xl mx-auto">
            Estos son algunos de los proyectos que hemos desarrollado,
            cada uno con resultados concretos y medibles para nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {cases.map((caseStudy, index) => (
            <Card
              key={index}
              className="bg-capasso-secondary border-capasso-gray hover:border-capasso-primary transition-all duration-500 hover-glow overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${caseStudy.gradient}`}></div>

              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-sm text-capasso-primary font-medium mb-2">
                      {caseStudy.category}
                    </div>
                    <CardTitle className="text-2xl text-capasso-light group-hover:text-capasso-primary transition-colors duration-300">
                      {caseStudy.title}
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-capasso-light/70 text-base leading-relaxed">
                  {caseStudy.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-capasso-light mb-3">Tecnologías utilizadas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-capasso-dark text-capasso-primary px-3 py-1 rounded-full text-sm font-medium border border-capasso-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-capasso-light mb-3">Resultados obtenidos:</h4>
                  <ul className="space-y-2">
                    {caseStudy.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center text-capasso-light/80 text-sm">
                        <div className="w-2 h-2 bg-capasso-primary rounded-full mr-3 flex-shrink-0"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-capasso-secondary border border-capasso-gray rounded-lg p-8 hover-glow">
          <h3 className="text-2xl font-semibold text-capasso-light mb-4">
            ¿Querés ver tu proyecto aquí?
          </h3>
          <p className="text-capasso-light/80 mb-6 max-w-2xl mx-auto">
            Cada proyecto es único y nos enfocamos en generar resultados medibles
            que impulsen el crecimiento de tu negocio.
          </p>
          <Button
            onClick={() => scrollToSection('contacto')}
            className="btn-primary text-lg px-8 py-4"
          >
            Empezá tu proyecto
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;