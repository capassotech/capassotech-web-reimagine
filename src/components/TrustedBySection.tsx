import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { useReveal } from "@/hooks/useReveal";
import { ArrowRight } from "lucide-react";

const clients = [
  { name: "Andretich", logo: "/logos/andretich.jpg", url: "https://carlosandretich.com/" },
  { name: "INEE", logo: "/logos/inee.png", url: "https://ineeoficial.com/" },
  { name: "EPEFI", logo: "/logos/epefi.png", url: "https://epefi.com.ar/" },
  { name: "Home Pisos Vinílicos", logo: "/logos/home-pisos-vinilicos.png", url: "https://homepisos.com.ar/" },
  { name: "ZYcris", logo: "/logos/zycris.png" },
  { name: "ABS Depot", logo: "/logos/abs-depot.png", url: "https://www.instagram.com/absdepot/" },
];

const TrustedBySection = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="casos-exito" ref={sectionRef} className="section-default bg-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 text-center reveal">
          <span className="section-label">Algunos de nuestros clientes</span>
          <h2 className="text-[2.5rem] font-extrabold leading-tight tracking-tight text-capasso-dark md:text-[3rem]">
            Quiénes confían <span className="text-gradient">en nosotros</span>
          </h2>
          <p className="mt-3 text-sm text-capasso-medium-grey">Empresas de distintos rubros que ya digitalizaron su operación con nosotros.</p>
        </div>

        {/* Client logos carousel */}
        <div className="reveal group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((client, i) => {
              const cardClass = "flex w-[200px] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-capasso-light-grey bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-capasso-primary/30 hover:shadow-card sm:w-[260px] lg:w-[340px]";
              const content = (
                <>
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-14 w-full object-contain"
                    loading="lazy"
                  />
                  <span className="text-center text-xs font-semibold text-capasso-dark-grey">{client.name}</span>
                </>
              );

              return client.url ? (
                <a
                  key={`${client.name}-${i}`}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                  onClick={() => trackEvent("client_logo_click", { client: client.name })}
                >
                  {content}
                </a>
              ) : (
                <div key={`${client.name}-${i}`} className={cardClass}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="reveal mt-10 flex justify-center">
          <Link
            to="/portafolio"
            className="btn-primary text-base"
            onClick={() => trackEvent("portfolio_click", { location: "trusted_by" })}
          >
            Ver todos los proyectos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TrustedBySection;
