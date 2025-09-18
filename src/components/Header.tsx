import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const calendlyUrl = "https://calendly.com/capassoelias/15min";
const whatsappUrl = "https://wa.me/5493435332132?text=Hola%20CapassoTech%2C%20quiero%20asesor%C3%ADa";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateOrScroll = (sectionId: string) => {
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
      setIsMobileMenuOpen(false);
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

  const menuItems = [
    { label: "Inicio", type: "section" as const, target: "inicio" },
    { label: "Servicios", type: "section" as const, target: "servicios" },
    { label: "Tecnologías", type: "section" as const, target: "tecnologias" },
    { label: "Casos", type: "section" as const, target: "casos-exito" },
    { label: "Blog", type: "route" as const, path: "/blog" },
    { label: "Nosotros", type: "route" as const, path: "/nosotros" },
    { label: "Contacto", type: "route" as const, path: "/contacto" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-capasso-dark/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
          <img src="/logo-dark.png" alt="CapassoTech" className="h-10 w-auto" />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-capasso-light md:flex">
          {menuItems.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.label}
                to={item.path}
                className="hover:text-capasso-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => navigateOrScroll(item.target)}
                className="hover:text-capasso-primary transition-colors"
              >
                {item.label}
              </button>
            ),
          )}
        </div>
        <div className="hidden gap-3 md:flex">
          <Button onClick={() => handleCalendly("header")} className="btn-primary">
            Agendar 15 min
          </Button>
          <Button onClick={() => handleWhatsApp("header")} className="btn-secondary">
            WhatsApp
          </Button>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="text-capasso-light md:hidden"
          aria-label="Abrir menú"
        >
          <div className="flex h-6 w-6 flex-col justify-between">
            <span className={`h-0.5 w-full bg-current transition-transform ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-full bg-current transition-opacity ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-0.5 w-full bg-current transition-transform ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="bg-capasso-secondary/95 shadow-lg md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-6 text-capasso-light">
            {menuItems.map((item) =>
              item.type === "route" ? (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base"
                >
                  {item.label}
                </Link>
              ) : (
                <button key={item.label} onClick={() => navigateOrScroll(item.target)} className="text-base text-left">
                  {item.label}
                </button>
              ),
            )}
            <div className="mt-4 flex flex-col gap-3">
              <Button onClick={() => handleCalendly("header_mobile")} className="btn-primary w-full">
                Agendar 15 min
              </Button>
              <Button onClick={() => handleWhatsApp("header_mobile")} className="btn-secondary w-full">
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
