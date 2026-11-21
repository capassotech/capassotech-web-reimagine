import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import HomeHero from "@/components/home/HomeHero";
import PainsSection from "@/components/home/PainsSection";
import SystemsMarquee from "@/components/home/SystemsMarquee";
import WhatWeDo from "@/components/home/WhatWeDo";
import StepsSection from "@/components/home/StepsSection";
import ClientsSection from "@/components/home/ClientsSection";
import ClosingSection from "@/components/home/ClosingSection";
import FaqSection from "@/components/home/FaqSection";
import { PREGUNTAS } from "@/data/preguntas-frecuentes";
import { usePageSEO } from "@/hooks/usePageSEO";

// El catálogo de sistemas (Service + OfferCatalog) ya va en todas las páginas desde vite.config.ts.
const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://capassotech.com/#inicio",
    url: "https://capassotech.com/",
    name: "CapassoTech - Software a medida para empresas",
    inLanguage: "es-AR",
    isPartOf: { "@id": "https://capassotech.com/#sitio" },
    about: { "@id": "https://capassotech.com/#organizacion" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PREGUNTAS.map(({ pregunta, respuesta }) => ({
      "@type": "Question",
      name: pregunta,
      acceptedAnswer: { "@type": "Answer", text: respuesta },
    })),
  },
];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  usePageSEO({
    title: "CapassoTech | Software a medida para empresas en Argentina",
    description: "Desarrollamos software a medida: facturación electrónica con ARCA, sistemas para transporte, integración con Mercado Libre, punto de venta, plataformas de cursos y automatizaciones con IA. Desde Paraná para toda Argentina.",
    canonical: "https://capassotech.com/",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "website",
    structuredData: homeStructuredData,
  });

  useEffect(() => {
    const targetId = location.state && typeof location.state === "object" ? location.state.scrollTo : undefined;
    if (targetId) {
      navigate(location.pathname, { replace: true, state: {} });
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [location, navigate]);

  return (
    <div className="cx min-h-screen">
      <Header />
      <main>
        <HomeHero />
        <PainsSection />
        <SystemsMarquee />
        <WhatWeDo />
        <StepsSection />
        <ClientsSection />
        <FaqSection />
        <ClosingSection />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Home;
