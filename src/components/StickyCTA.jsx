import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const StickyCTA = () => {
  const handleClick = () => {
    trackEvent("calendly_click", { location: "sticky_cta" });
    window.open("https://calendly.com/capassoelias/15min", "_blank", "noopener,noreferrer");
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
