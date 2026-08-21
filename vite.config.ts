import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import Sitemap from "vite-plugin-sitemap";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configurable hostname for multi-domain deployment (capasso.tech | capassotech.com)
const hostname =
  process.env.SITE_URL || process.env.VITE_SITE_URL || "https://capasso.tech";

// Collect dynamic routes from React Router data sources
const cases = JSON.parse(
  readFileSync(path.join(__dirname, "src/data/cases.json"), "utf-8")
) as { slug: string; updatedAt?: string }[];
const { blogPosts } = await import("./src/data/blog-posts.ts");
const { TYPEWRITER_WORDS } = await import("./src/data/typewriter-words.ts");

const staticRoutes = [
  "/servicios",
  "/casos",
  "/portafolio",
  "/nosotros",
  "/contacto",
  "/book",
  "/blog",
];

// Injects the full list of systems/solutions we build as static JSON-LD, so
// crawlers that don't execute JavaScript (many AI/GEO bots included) still
// see it — not just whatever word the homepage's JS typewriter happens to be
// showing at fetch time. Single source of truth: src/data/typewriter-words.ts.
const offerCatalogStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Desarrollo de software a medida",
  provider: { "@type": "Organization", name: "CapassoTech", url: "https://capassotech.com/" },
  areaServed: "AR",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sistemas y soluciones que desarrollamos",
    itemListElement: TYPEWRITER_WORDS.map((name: string, index: number) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: { "@type": "Service", name },
    })),
  },
};

const injectOfferCatalogPlugin: Plugin = {
  name: "inject-offer-catalog-jsonld",
  transformIndexHtml(html) {
    const script = `<script type="application/ld+json">${JSON.stringify(offerCatalogStructuredData)}</script>`;
    return html.replace("</head>", `${script}\n  </head>`);
  },
};
const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
const caseRoutes = cases.map((c) => `/casos/${c.slug}`);
const dynamicRoutes = [...staticRoutes, ...blogRoutes, ...caseRoutes];

// Priority: homepage 1.0, main sections 0.8, secondary 0.5
const priority: Record<string, number> = {
  "/": 1.0,
  "/servicios": 0.8,
  "/casos": 0.8,
  "/portafolio": 0.8,
  "/nosotros": 0.8,
  "/contacto": 0.8,
  "/blog": 0.8,
  "/book": 0.5,
  "*": 0.5,
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    injectOfferCatalogPlugin,
    Sitemap({
      hostname,
      dynamicRoutes,
      exclude: ["/404"],
      changefreq: "weekly",
      priority,
      generateRobotsTxt: true,
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
