import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NetworkTexture from "@/components/home/NetworkTexture";
import { usePageSEO } from "@/hooks/usePageSEO";

const NotFound = () => {
  usePageSEO({
    title: "Página no encontrada — CapassoTech",
    description: "La página que buscás no existe o se movió.",
    noindex: true,
  });

  return (
    <div className="cx min-h-screen">
      <Header />
      <main className="relative flex min-h-[80svh] items-center overflow-hidden pt-32">
        <NetworkTexture
          variant="circuit"
          seed={404}
          className="inset-0 h-full w-full opacity-30"
          style={{
            maskImage: "radial-gradient(60% 60% at 70% 50%, #000, transparent 75%)",
            WebkitMaskImage: "radial-gradient(60% 60% at 70% 50%, #000, transparent 75%)",
          }}
        />
        <div className="cx-axis" aria-hidden="true" />
        <div className="cx-content relative pb-24">
          <p className="cx-display cx-outline text-[clamp(100px,18vw,260px)] leading-none" aria-hidden="true">
            404
          </p>
          <h1 className="cx-display cx-title-md mt-6 max-w-[16ch]">
            Esta página <span className="cx-gradient-text">no existe.</span>
          </h1>
          <p className="mt-6 text-lg text-capasso-muted">Puede que se haya movido o que el link esté mal escrito.</p>
          <Link to="/" className="cx-btn cx-btn-primary mt-10">
            Volver al inicio
            <ArrowRight className="cx-arrow h-5 w-5" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
