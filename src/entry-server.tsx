import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";
import { empezarCapturaSEO, terminarCapturaSEO } from "./hooks/usePageSEO";
import { blogPosts } from "./data/blog-posts";
import cases from "./data/cases.json";

/** Todas las rutas que se pre-renderizan. Una ruta nueva en App.tsx se agrega acá. */
export const RUTAS = [
  "/",
  "/servicios",
  "/casos",
  "/portafolio",
  "/nosotros",
  "/contacto",
  "/book",
  "/blog",
  ...blogPosts.map((p) => `/blog/${p.slug}`),
  ...cases.map((c) => `/casos/${c.slug}`),
];

/** Ruta que no existe, para generar la página 404. */
export const RUTA_404 = "/__404";

/**
 * Renderiza una ruta a HTML para el pre-renderizado del build. Devuelve también el SEO
 * que declaró la página con usePageSEO, para escribirlo en el <head>.
 */
export const render = (url: string) => {
  empezarCapturaSEO();
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
  return { html, seo: terminarCapturaSEO() };
};
