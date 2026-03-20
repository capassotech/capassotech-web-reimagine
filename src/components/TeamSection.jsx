import { useReveal } from "@/hooks/useReveal";

const TEAM = [
  { name: "Elías Capasso",    photo: "/images/avatars/Elias.jpeg",         group: "tech"  },
  { name: "Federico Herrera", photo: "/images/avatars/Fede.png",           group: "tech"  },
  { name: "Florencia Foos",   photo: "/images/avatars/Flor.jpeg",          group: "tech"  },
  { name: "Franco Brizuela",  photo: "/images/avatars/Franco.png",         group: "tech"  },
  { name: "Gonzalo Ríos",     photo: "/images/avatars/Gonza.png",          group: "tech"  },
  { name: "Manuel Herrera",   photo: "/images/avatars/manuel.png",         group: "tech"  },
  { name: "Agustín Núñez",    photo: "/images/avatars/Agustin.png",        group: "tech"  },
  { name: "Abril Pizzini",    photo: "/images/avatars/Abril.png",          group: "admin" },
  { name: "Agostina Torres",  photo: "/images/avatars/Agostina.png",       group: "admin" },
  { name: "Karen Celes",      photo: "/images/avatars/Karen.png",          group: "admin" },
  { name: "Mariel Boher",     photo: "/images/avatars/Maru.png",           group: "admin" },
];

const TeamSection = () => {
  const sectionRef = useReveal();

  return (
    <section className="section-default bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={sectionRef} className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">

          {/* LEFT — copy */}
          <div>
            <div className="reveal">
              <span className="section-label">El equipo</span>
              <h2 className="mt-4 text-[2rem] font-extrabold leading-tight tracking-tight text-capasso-dark md:text-[2.75rem]">
                Personas reales,<br />
                <span className="text-gradient">resultados concretos</span>
              </h2>
              <p className="mt-5 text-lg text-capasso-dark-grey leading-relaxed">
                Somos ingenieros, diseñadores, project managers y comerciales
                distribuidos por toda Argentina, con base en Paraná, Entre Ríos.
                Lo que nos une no es estar en la misma ciudad sino la forma en que
                trabajamos: con compromiso, comunicación constante y resultados que
                se miden.
              </p>
              <p className="mt-4 text-capasso-dark-grey">
                Cada proyecto que sale tiene la huella de este equipo.
                Desde el primer commit hasta que el cliente dice
                "esto es exactamente lo que necesitaba".
              </p>
            </div>

            {/* Stats */}
            <div className="reveal reveal-delay-1 mt-10 flex flex-wrap gap-4">
              {[
                { value: "11", label: "personas en el equipo" },
                { value: "100%", label: "trabajo remoto" },
                { value: "7+", label: "años de experiencia" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-start px-5 py-4 rounded-xl bg-capasso-light-blue border border-capasso-primary/10">
                  <span className="text-2xl font-extrabold text-capasso-primary">{s.value}</span>
                  <span className="text-sm text-capasso-dark-grey mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — photo grid */}
          <div className="reveal reveal-delay-1">
            <div className="grid grid-cols-4 gap-4">
              {TEAM.map((member, i) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center gap-2 group"
                  style={{
                    marginTop: i % 2 === 1 ? "20px" : "0px",
                  }}
                >
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-soft border-2 border-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-card">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    {/* Subtle group indicator */}
                    <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                      style={{ background: member.group === "tech" ? "#216AD9" : "#49b5e7" }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-capasso-dark text-center leading-tight">
                    {member.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>

            {/* Leyenda */}
            <div className="mt-6 flex items-center gap-5 justify-center text-xs text-capasso-dark-grey">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-capasso-primary" /> Equipo técnico
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#49b5e7]" /> Equipo administrativo
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamSection;
