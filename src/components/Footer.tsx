import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const navigateOrScroll = (sectionId: string) => {
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const handleCalendly = (from: string) => {
    trackEvent("calendly_click", { location: from });
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = (from: string) => {
    trackEvent("whatsapp_click", { location: from });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-capasso-dark border-t border-capasso-gray">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src="/logo-dark.png" alt="CapassoTech" className="mb-4 h-10 w-auto" />
            <p className="text-capasso-light/70">
              Tu partner tecnológico para desarrollo a medida, pods ágiles y consultoría enfocada en resultados.
            </p>
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => handleWhatsApp("footer")}
                className="rounded-lg bg-capasso-secondary p-3 text-capasso-light transition-all duration-300 hover:bg-capasso-primary hover:text-white"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.439 9.884-9.885 9.884" />
                </svg>
              </button>
              <button
                onClick={() => handleCalendly("footer")}
                className="rounded-lg bg-capasso-secondary p-3 text-capasso-light transition-all duration-300 hover:bg-capasso-primary hover:text-white"
                aria-label="Agendar 15 minutos"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 9h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-capasso-light">Servicios</h3>
            <ul className="space-y-2 text-capasso-light/70">
              <li>
                <button onClick={() => navigateOrScroll("servicios")} className="transition-colors hover:text-capasso-primary">
                  Desarrollo a medida
                </button>
              </li>
              <li>
                <button onClick={() => navigateOrScroll("servicios")} className="transition-colors hover:text-capasso-primary">
                  Outsourcing de equipos
                </button>
              </li>
              <li>
                <Link to="/servicios" className="transition-colors hover:text-capasso-primary">
                  Consultoría &amp; IA
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="transition-colors hover:text-capasso-primary">
                  Mantenimiento proactivo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-capasso-light">Recursos</h3>
            <ul className="space-y-2 text-capasso-light/70">
              <li>
                <button onClick={() => navigateOrScroll("tecnologias")} className="transition-colors hover:text-capasso-primary">
                  Stack tecnológico
                </button>
              </li>
              <li>
                <Link to="/casos" className="transition-colors hover:text-capasso-primary">
                  Casos de éxito
                </Link>
              </li>
              <li>
                <Link to="/book" className="transition-colors hover:text-capasso-primary">
                  Agenda una reunión
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="transition-colors hover:text-capasso-primary">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-capasso-light">Empresa</h3>
            <ul className="space-y-2 text-capasso-light/70">
              <li>
                <Link to="/nosotros" className="transition-colors hover:text-capasso-primary">
                  Sobre CapassoTech
                </Link>
              </li>
              <li>
                <button onClick={() => navigateOrScroll("proceso")} className="transition-colors hover:text-capasso-primary">
                  Nuestro proceso
                </button>
              </li>
              <li>
                <a href="mailto:contacto@capasso.tech" className="transition-colors hover:text-capasso-primary">
                  Trabajá con nosotros
                </a>
              </li>
              <li>
                <a href="mailto:contacto@capasso.tech" className="transition-colors hover:text-capasso-primary">
                  contacto@capasso.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-capasso-gray pt-8 text-sm text-capasso-light/60">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>© {currentYear} CapassoTech. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="/privacidad" className="hover:text-capasso-primary">
                Política de privacidad
              </a>
              <a href="/terminos" className="hover:text-capasso-primary">
                Términos y condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
