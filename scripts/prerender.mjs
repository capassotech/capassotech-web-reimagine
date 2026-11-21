// Pre-renderiza cada ruta del sitio a HTML estático, con su propio <head> (título,
// descripción, canonical, Open Graph y JSON-LD). Así los buscadores y los motores de IA
// que no ejecutan JavaScript ven el contenido real de cada página, no una SPA vacía.
//
// Corre después de `vite build` (cliente, en dist/) y `vite build --ssr` (en dist-ssr/).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(raiz, "dist");
const distSsr = path.join(raiz, "dist-ssr");

const IMAGEN_POR_DEFECTO = "https://capassotech.com/og-image.jpg";
const ATRIBUTO_JSONLD_PAGINA = "data-seo-pagina";

const plantilla = readFileSync(path.join(dist, "index.html"), "utf-8");
const { render, RUTAS, RUTA_404 } = await import(pathToFileURL(path.join(distSsr, "entry-server.js")).href);

const escapar = (texto) =>
  String(texto).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// JSON dentro de <script>: que "</script>" en un texto no corte el bloque.
const jsonSeguro = (dato) => JSON.stringify(dato).replace(/</g, "\\u003c");

// Las etiquetas del <head> que cambian por página: se quitan de la plantilla y se vuelven a escribir.
const META_POR_PAGINA =
  /\s*<meta\s+(?:name|property)="(?:description|robots|og:title|og:description|og:type|og:url|og:image|twitter:title|twitter:description|twitter:image)"[\s\S]*?\/?>/g;
const TITULO = /<title>[\s\S]*?<\/title>/;
const CANONICAL = /\s*<link\s+rel="canonical"[^>]*>/;

const armarHead = (seo) => {
  const imagen = seo.image ?? IMAGEN_POR_DEFECTO;
  const esquemas = seo.structuredData ? [].concat(seo.structuredData) : [];
  const lineas = [
    `<title>${escapar(seo.title)}</title>`,
    `<meta name="description" content="${escapar(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    seo.canonical && `<link rel="canonical" href="${escapar(seo.canonical)}" />`,
    `<meta property="og:type" content="${escapar(seo.ogType ?? "website")}" />`,
    `<meta property="og:title" content="${escapar(seo.title)}" />`,
    `<meta property="og:description" content="${escapar(seo.description)}" />`,
    seo.canonical && `<meta property="og:url" content="${escapar(seo.canonical)}" />`,
    `<meta property="og:image" content="${escapar(imagen)}" />`,
    `<meta name="twitter:title" content="${escapar(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapar(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapar(imagen)}" />`,
    ...esquemas.map((e) => `<script type="application/ld+json" ${ATRIBUTO_JSONLD_PAGINA}>${jsonSeguro(e)}</script>`),
  ];
  return lineas.filter(Boolean).map((l) => `    ${l}`).join("\n");
};

const pagina = (url) => {
  const { html, seo } = render(url);
  if (!seo) throw new Error(`La ruta ${url} no llamó a usePageSEO`);
  if (!html.trim()) throw new Error(`La ruta ${url} quedó vacía`);
  return plantilla
    .replace(TITULO, "")
    .replace(META_POR_PAGINA, "")
    .replace(CANONICAL, "")
    .replace("</head>", `${armarHead(seo)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

const escribir = (archivo, contenido) => {
  const destino = path.join(dist, archivo);
  mkdirSync(path.dirname(destino), { recursive: true });
  writeFileSync(destino, contenido);
};

// "/" → index.html, "/blog/x" → blog/x.html (Firebase Hosting con cleanUrls los sirve sin ".html").
for (const ruta of RUTAS) {
  escribir(ruta === "/" ? "index.html" : `${ruta.slice(1)}.html`, pagina(ruta));
}
escribir("404.html", pagina(RUTA_404));

rmSync(distSsr, { recursive: true, force: true });
console.log(`Pre-renderizadas ${RUTAS.length} rutas y la 404.`);
