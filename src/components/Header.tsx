import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { ChevronDown } from "lucide-react";

const defaultWhatsappMessage = "Hola CapassoTech, quiero asesoría";

const products = [
  { label: "Vialto Software",           url: "https://vialto.uno/",                                              logo: "/products/vialto.png" },
  { label: "GymFuze",          url: "https://gymfuzeapp.web.app/",                                       logo: "/products/gymfuze.png" },
  { label: "Control de gastos", url: "https://play.google.com/store/apps/details?id=gastos.app",         logo: "/products/gastos.png" },
];

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
    { label: "Inicio",    type: "section" as const,  target: "inicio" },
    { label: "Servicios", type: "section" as const,  target: "servicios" },
    { label: "Productos", type: "dropdown" as const, items: products },
    { label: "Clientes",  type: "section" as const,  target: "casos-exito" },
    { label: "Proyectos", type: "route" as const,    path: "/portafolio" },
    { label: "Nosotros",  type: "route" as const,    path: "/nosotros" },
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
          {menuItems.map((item) => {
            if (item.type === "dropdown") {
              return (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    className={`nav-link ${isScrolled ? "" : "nav-link-inverted"} flex items-center gap-1`}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-capasso-light-grey bg-white p-2 shadow-card">
                      {item.items.map((product) => (
                        <a
                          key={product.label}
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent("product_click", { product: product.label, location: "header" })}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-capasso-dark transition-colors hover:bg-capasso-light-blue hover:text-capasso-primary"
                        >
                          <img src={product.logo} alt="" className="h-7 w-7 shrink-0 rounded-md object-contain" />
                          {product.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return item.type === "route" ? (
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
            );
          })}
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
        <div className="border-t border-capasso-light-grey bg-white shadow-card md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-5">
            {menuItems.map((item) => {
              if (item.type === "dropdown") {
                return (
                  <div key={item.label} className="px-4 py-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-capasso-medium-grey">{item.label}</p>
                    <div className="mt-1 flex flex-col">
                      {item.items.map((product) => (
                        <a
                          key={product.label}
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => { trackEvent("product_click", { product: product.label, location: "header_mobile" }); setIsMobileMenuOpen(false); }}
                          className="flex items-center gap-3 rounded-xl px-0 py-2 text-base font-semibold text-capasso-dark hover:text-capasso-primary transition-colors"
                        >
                          <img src={product.logo} alt="" className="h-8 w-8 shrink-0 rounded-md object-contain" />
                          {product.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return item.type === "route" ? (
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
              );
            })}
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
