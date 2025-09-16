import { useState } from "react";
import testimonials from "@/data/testimonials.json";

const TestimonialCard = ({ testimonial }) => {
  const [fallback, setFallback] = useState(false);
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <article className="flex h-full flex-col gap-6 rounded-2xl border border-capasso-gray/60 bg-capasso-secondary/70 p-8 shadow-lg shadow-black/10">
      <p className="text-lg text-capasso-light/90">“{testimonial.quote}”</p>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-capasso-primary/40 bg-capasso-dark/60">
          {fallback ? (
            <span className="text-lg font-semibold text-capasso-primary">{initials}</span>
          ) : (
            <img
              src={testimonial.avatar}
              alt={`Foto de ${testimonial.name}`}
              loading="lazy"
              className="h-full w-full object-cover"
              onError={() => setFallback(true)}
            />
          )}
        </div>
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-capasso-light/60">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </article>
  );
};

const Testimonials = () => (
  <section className="bg-capasso-secondary/30 py-20" id="testimonios">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Testimonios que respaldan nuestros resultados
        </h2>
        <p className="mt-4 text-lg text-capasso-light/70">
          Nos integramos con tu equipo y entregamos valor medible desde el primer sprint.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
