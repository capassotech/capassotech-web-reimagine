
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-capasso-dark/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gradient">
            CapassoTech
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-capasso-light hover:text-capasso-primary transition-colors duration-300"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-capasso-light hover:text-capasso-primary transition-colors duration-300"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('tecnologias')}
              className="text-capasso-light hover:text-capasso-primary transition-colors duration-300"
            >
              Tecnologías
            </button>
            <button
              onClick={() => scrollToSection('casos-exito')}
              className="text-capasso-light hover:text-capasso-primary transition-colors duration-300"
            >
              Casos de Éxito
            </button>
            <button
              onClick={() => scrollToSection('proceso')}
              className="text-capasso-light hover:text-capasso-primary transition-colors duration-300"
            >
              Proceso
            </button>
          </div>

          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('contacto')}
              className="btn-primary"
            >
              Contactar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-capasso-light"
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-capasso-secondary rounded-lg">
            <div className="flex flex-col space-y-4 px-4">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-capasso-light hover:text-capasso-primary transition-colors duration-300 text-left"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('servicios')}
                className="text-capasso-light hover:text-capasso-primary transition-colors duration-300 text-left"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('tecnologias')}
                className="text-capasso-light hover:text-capasso-primary transition-colors duration-300 text-left"
              >
                Tecnologías
              </button>
              <button
                onClick={() => scrollToSection('casos-exito')}
                className="text-capasso-light hover:text-capasso-primary transition-colors duration-300 text-left"
              >
                Casos de Éxito
              </button>
              <button
                onClick={() => scrollToSection('proceso')}
                className="text-capasso-light hover:text-capasso-primary transition-colors duration-300 text-left"
              >
                Proceso
              </button>
              <Button
                onClick={() => scrollToSection('contacto')}
                className="btn-primary w-full mt-4"
              >
                Contactar
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
