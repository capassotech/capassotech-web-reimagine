import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { componentTagger } from "lovable-tagger";
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

const staticRoutes = [
  "/servicios",
  "/casos",
  "/nosotros",
  "/contacto",
  "/book",
  "/blog",
];
const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
const caseRoutes = cases.map((c) => `/casos/${c.slug}`);
const dynamicRoutes = [...staticRoutes, ...blogRoutes, ...caseRoutes];

// Priority: homepage 1.0, main sections 0.8, secondary 0.5
const priority: Record<string, number> = {
  "/": 1.0,
  "/servicios": 0.8,
  "/casos": 0.8,
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
    Sitemap({
      hostname,
      dynamicRoutes,
      exclude: ["/404"],
      changefreq: "weekly",
      priority,
      generateRobotsTxt: true,
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
