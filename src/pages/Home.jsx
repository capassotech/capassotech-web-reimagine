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
import { usePageSEO } from "@/hooks/usePageSEO";
import { TYPEWRITER_WORDS } from "@/data/typewriter-words";

const homeServiceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Desarrollo de software a medida",
  provider: {
    "@type": "Organization",
    name: "CapassoTech",
    url: "https://capassotech.com/",
  },
  areaServed: "AR",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sistemas y soluciones que desarrollamos",
    itemListElement: TYPEWRITER_WORDS.map((name, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: { "@type": "Service", name },
    })),
  },
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  usePageSEO({
    title: "CapassoTech - Desarrollo y mantenimiento de software, automatizaciones e IA",
    description: "Desarrollamos software a medida: sistemas de facturación, CRM, ERP, bots de WhatsApp con IA y más. Outsourcing de equipos y mantenimiento con foco en resultados.",
    canonical: "https://capassotech.com/",
    image: "https://capassotech.com/og-image.jpg",
    ogType: "website",
    structuredData: homeServiceStructuredData,
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
        <ClosingSection />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Home;
