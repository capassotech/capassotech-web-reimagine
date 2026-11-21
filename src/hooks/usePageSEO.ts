import { useEffect } from "react";

type StructuredData = Record<string, unknown>;

export interface SEOOptions {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  ogType?: string;
  structuredData?: StructuredData | StructuredData[];
  /** Para páginas que no deben aparecer en buscadores (por ejemplo, la 404). */
  noindex?: boolean;
}

/* ─────────────────────────────────────────────
   Captura para el pre-renderizado (build)
   Durante renderToString los efectos no corren: el hook deja lo que declaró la
   página acá y scripts/prerender.mjs lo escribe en el <head> de su HTML.
───────────────────────────────────────────── */
let capturando = false;
let capturado: SEOOptions | null = null;

export const empezarCapturaSEO = () => {
  capturando = true;
  capturado = null;
};

export const terminarCapturaSEO = () => {
  capturando = false;
  return capturado;
};

/** Marca de los JSON-LD propios de cada página que escribe el pre-renderizado. */
export const ATRIBUTO_JSONLD_PAGINA = "data-seo-pagina";

const ponerMeta = (clave: string, atributo: "name" | "property", valor: string) => {
  let el = document.head.querySelector(`meta[${atributo}="${clave}"]`) as HTMLMetaElement | null;
  const creado = !el;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(atributo, clave);
    document.head.appendChild(el);
  }
  const anterior = el.getAttribute("content");
  el.setAttribute("content", valor);
  const meta = el;
  return () => {
    if (creado) meta.remove();
    else if (anterior !== null) meta.setAttribute("content", anterior);
  };
};

const ponerCanonical = (href: string) => {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  const creado = !el;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  const anterior = el.getAttribute("href");
  el.setAttribute("href", href);
  const link = el;
  return () => {
    if (creado) link.remove();
    else if (anterior !== null) link.setAttribute("href", anterior);
  };
};

export const usePageSEO = (opciones: SEOOptions) => {
  if (capturando) capturado = opciones;

  const { title, description, canonical, image, ogType = "website", structuredData, noindex } = opciones;

  useEffect(() => {
    if (typeof document === "undefined") return;

    const tituloAnterior = document.title;
    document.title = title;

    const deshacer: (() => void)[] = [
      ponerMeta("description", "name", description),
      ponerMeta("og:title", "property", title),
      ponerMeta("og:description", "property", description),
      ponerMeta("og:type", "property", ogType),
      ponerMeta("twitter:title", "name", title),
      ponerMeta("twitter:description", "name", description),
      ponerMeta("robots", "name", noindex ? "noindex, follow" : "index, follow, max-image-preview:large"),
    ];
    if (image) {
      deshacer.push(ponerMeta("og:image", "property", image), ponerMeta("twitter:image", "name", image));
    }
    if (canonical) {
      deshacer.push(ponerCanonical(canonical), ponerMeta("og:url", "property", canonical));
    }

    // El HTML pre-renderizado ya trae los JSON-LD de la página: se reemplazan por los del hook
    // para no duplicarlos y para que cambien al navegar.
    document.head.querySelectorAll(`script[${ATRIBUTO_JSONLD_PAGINA}]`).forEach((s) => s.remove());

    const esquemas = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];
    const scripts = esquemas.map((esquema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(esquema);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      document.title = tituloAnterior;
      deshacer.forEach((fn) => fn());
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, canonical, image, ogType, structuredData, noindex]);
};
