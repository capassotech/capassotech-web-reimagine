import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const StickyCTA = () => {
  const handleClick = () => {
    trackEvent("whatsapp_click", { location: "sticky_cta" });
    const message = "Hola CapassoTech, quiero agendar una llamada de 15 minutos";
    window.open(`https://wa.me/5493435332132?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 sm:hidden">
      <Button onClick={handleClick} className="btn-primary w-full text-lg shadow-xl shadow-capasso-primary/30">
        Agendar 15 min
      </Button>
    </div>
  );
};

export default StickyCTA;
