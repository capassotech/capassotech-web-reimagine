
import type { MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Code, Users, Zap } from 'lucide-react';

const HeroSection = () => {
  const handleAnchorNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    const element = document.getElementById(sectionId);
    if (element) {
      event.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-capasso-dark via-capasso-secondary to-capasso-dark"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-capasso-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 mt-[120px] mb-[120px]">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Desarrollo de{' '}
            <span className="text-gradient">software a medida</span>
            {' '}para empresas
          </h1>

          <p className="text-xl md:text-2xl text-capasso-light/80 mb-8 max-w-3xl mx-auto">
            Somos tu partner tecnológico especializado en desarrollo de software, outsourcing de equipos y consultoría.
            Transformamos ideas en soluciones escalables.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild className="btn-primary text-lg px-8 py-4">
              <a
                href="#contacto"
                onClick={(event) => handleAnchorNavigation(event, 'contacto')}
              >
                Solicitá una reunión
              </a>
            </Button>
            <Button asChild className="btn-secondary text-lg px-8 py-4">
              <a
                href="#servicios"
                onClick={(event) => handleAnchorNavigation(event, 'servicios')}
              >
                Conocé nuestros servicios
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-capasso-secondary/50 rounded-lg hover-glow">
              <Code className="w-8 h-8 text-capasso-primary mb-4" />
              <div className="text-3xl font-bold text-capasso-primary">15+</div>
              <div className="text-capasso-light/70">Tecnologías</div>
            </div>
            {/* <div className="flex flex-col items-center p-6 bg-capasso-secondary/50 rounded-lg hover-glow">
              <Users className="w-8 h-8 text-capasso-primary mb-4" />
              <div className="text-3xl font-bold text-capasso-primary">10+</div>
              <div className="text-capasso-light/70">Proyectos</div>
            </div> */}
            <div className="flex flex-col items-center p-6 bg-capasso-secondary/50 rounded-lg hover-glow">
              <Zap className="w-8 h-8 text-capasso-primary mb-4" />
              <div className="text-3xl font-bold text-capasso-primary">5+</div>
              <div className="text-capasso-light/70">Años de experiencia</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-capasso-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-capasso-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
