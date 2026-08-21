import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const defaultWhatsappMessage = "Hola CapassoTech, quiero asesoría";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInternalNavigation = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (location.pathname === "/") {
      event.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    } else {
      event.preventDefault();
      navigate("/", { state: { scrollTo: sectionId } });
      setIsMobileMenuOpen(false);
    }
  };

  const handleWhatsApp = (from: string, message: string = defaultWhatsappMessage) => {
    trackEvent("whatsapp_click", { location: from });
    window.open(`https://wa.me/5493435332132?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const menuItems = [
    { label: "Inicio",    type: "section" as const, target: "inicio" },
    { label: "Servicios", type: "section" as const, target: "servicios" },
    { label: "Casos",     type: "section" as const, target: "casos-exito" },
    { label: "Blog",      type: "route" as const,   path: "/blog" },
    { label: "Nosotros",  type: "route" as const,   path: "/nosotros" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-capasso-light-grey"
          : "bg-capasso-dark/70 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex-shrink-0">
          <img
            src={isScrolled ? "/logo-light.png" : "/logo-dark.png"}
            alt="CapassoTech"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-link ${isScrolled ? "" : "nav-link-inverted"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={`/#${item.target}`}
                onClick={(e) => handleInternalNavigation(e, item.target)}
                className={`nav-link ${isScrolled ? "" : "nav-link-inverted"}`}
              >
                {item.label}
              </a>
            ),
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => handleWhatsApp("header")}
            className="btn-outline inline-flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen((p) => !p)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label="Abrir menú"
        >
          <span className={`h-[2px] w-5 rounded transition-all duration-300 ${isScrolled ? "bg-capasso-dark" : "bg-white"} ${isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-5 rounded transition-opacity duration-300 ${isScrolled ? "bg-capasso-dark" : "bg-white"} ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-5 rounded transition-all duration-300 ${isScrolled ? "bg-capasso-dark" : "bg-white"} ${isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-capasso-light-grey bg-white/98 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-5">
            {menuItems.map((item) =>
              item.type === "route" ? (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-capasso-dark hover:bg-capasso-light-blue hover:text-capasso-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={`/#${item.target}`}
                  onClick={(e) => handleInternalNavigation(e, item.target)}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-capasso-dark hover:bg-capasso-light-blue hover:text-capasso-primary transition-colors"
                >
                  {item.label}
                </a>
              ),
            )}
            <div className="mt-3 flex flex-col gap-3">
              <button
                onClick={() => { handleWhatsApp("header_mobile"); setIsMobileMenuOpen(false); }}
                className="btn-outline inline-flex w-full items-center justify-center gap-2 py-3 text-base"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
