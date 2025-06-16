
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Cog, Users, Search } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "Desarrollo a Medida",
      description: "Creamos soluciones de software personalizadas que se adaptan exactamente a las necesidades de tu empresa.",
      features: ["Aplicaciones web y móviles", "Sistemas de gestión", "APIs y microservicios", "Integraciones con terceros"],
      color: "from-blue-500 to-capasso-primary"
    },
    {
      icon: Users,
      title: "Outsourcing de Equipos",
      description: "Escalá tu equipo técnico con desarrolladores expertos en las tecnologías que necesités.",
      features: ["Equipos dedicados", "Metodologías ágiles", "Comunicación constante", "Flexibilidad total"],
      color: "from-capasso-primary to-cyan-400"
    },
    {
      icon: Cog,
      title: "Mantenimiento y Soporte",
      description: "Mantenemos tus sistemas funcionando de manera óptima con soporte técnico especializado.",
      features: ["Soporte 24/7", "Actualizaciones y mejoras", "Monitoreo continuo", "Resolución proactiva"],
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Search,
      title: "Consultoría Tecnológica",
      description: "Te ayudamos a tomar las mejores decisiones tecnológicas para el crecimiento de tu negocio.",
      features: ["Arquitectura de software", "Análisis de rendimiento", "Estrategia digital", "Migración de sistemas"],
      color: "from-blue-500 to-capasso-primary"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-20 bg-capasso-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros <span className="text-gradient">Servicios</span>
          </h2>
          <p className="text-xl text-capasso-light/80 max-w-3xl mx-auto">
            Ofrecemos soluciones integrales para empresas que buscan innovar y crecer con tecnología de vanguardia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-capasso-secondary border-capasso-gray hover:border-capasso-primary transition-all duration-500 hover-glow group"
            >
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${service.color} mr-4`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-capasso-light group-hover:text-capasso-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-capasso-light/70 text-lg">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-capasso-light/80">
                      <div className="w-2 h-2 bg-capasso-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => scrollToSection('contacto')}
            className="btn-primary text-lg px-8 py-4"
          >
            Contanos tu proyecto
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
