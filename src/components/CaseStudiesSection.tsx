
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CaseStudiesSection = () => {
  const cases = [
    {
      title: "Sistema de Gestión Empresarial",
      description: "Desarrollo de plataforma web completa para gestión de inventarios, ventas y reportes en tiempo real.",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
      results: [
        "70% reducción en tiempo de procesamiento",
        "Automatización de 15+ procesos manuales",
        "Dashboard en tiempo real"
      ],
      category: "E-commerce",
      gradient: "from-blue-500 to-capasso-primary"
    },
    {
      title: "App Móvil de Delivery",
      description: "Aplicación móvil con sistema de pedidos, pagos integrados y tracking en tiempo real.",
      technologies: ["React Native", ".NET Core", "Firebase", "Google Maps"],
      results: [
        "5,000+ usuarios activos",
        "Integración con 3 pasarelas de pago",
        "Sistema de notificaciones push"
      ],
      category: "Delivery",
      gradient: "from-capasso-primary to-cyan-400"
    },
    {
      title: "Portal de Gestión Educativa",
      description: "Plataforma web para institución educativa con gestión de alumnos, docentes y contenidos.",
      technologies: ["Angular", ".NET Framework", "SQL Server", "Bootstrap"],
      results: [
        "1,200+ usuarios registrados",
        "Módulo de evaluaciones online",
        "Generación automática de reportes"
      ],
      category: "Educación",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      title: "Sistema de Turnos Online",
      description: "Solución web para gestión de turnos con calendario inteligente y notificaciones automáticas.",
      technologies: ["React", "Express", "MongoDB", "WhatsApp API"],
      results: [
        "95% reducción en llamadas telefónicas",
        "Integración con WhatsApp",
        "Calendario sincronizado"
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
