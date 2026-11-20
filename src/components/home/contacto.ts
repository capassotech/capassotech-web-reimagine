import type { PointerEvent } from "react";
import { trackEvent } from "@/lib/analytics";

export const WHATSAPP_NUMBER = "5493435332132";
export const CALENDLY_URL = "https://calendly.com/capassoelias/15min";
export const MENSAJE_POR_DEFECTO = "Hola CapassoTech, quiero asesoría";

export const abrirWhatsApp = (desde: string, mensaje: string = MENSAJE_POR_DEFECTO) => {
  trackEvent("whatsapp_click", { location: desde });
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener,noreferrer");
};

export const abrirAgenda = (desde: string) => {
  trackEvent("calendly_click", { location: desde });
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
};

/** Mueve la luz de una `.cx-card` hacia donde está el cursor. */
export const seguirCursor = (e: PointerEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
};
