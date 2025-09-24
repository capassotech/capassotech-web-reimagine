import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { blogPosts } from "../src/data/blog-posts";
import cases from "../src/data/cases.json";

const BASE_URL = "https://capassotech.com";
const OUTPUT_FILE = "../public/sitemap.xml";

type SitemapEntry = {
  path: string;
  priority?: number;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
};

const staticRoutes: SitemapEntry[] = [
  { path: "/", priority: 1.0 },
  { path: "/servicios", priority: 0.9 },
  { path: "/casos", priority: 0.9 },
  { path: "/nosotros", priority: 0.8 },
  { path: "/contacto", priority: 0.9 },
  { path: "/book", priority: 0.7 },
  { path: "/blog", priority: 0.8 },
];

const blogEntries: SitemapEntry[] = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  priority: 0.7,
  lastmod: normalizeDate(post.date),
}));

const caseEntries: SitemapEntry[] = (cases as { slug: string; updatedAt?: string }[]).map((caseStudy) => ({
  path: `/casos/${caseStudy.slug}`,
  priority: 0.8,
  lastmod: caseStudy.updatedAt ? normalizeDate(caseStudy.updatedAt) : undefined,
}));

const allEntries: SitemapEntry[] = [...staticRoutes, ...blogEntries, ...caseEntries];

const urlset = buildSitemap(allEntries);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, OUTPUT_FILE);

await writeFile(outputPath, urlset, "utf8");
console.log(`Sitemap generated with ${allEntries.length} URLs at ${outputPath}`);

function buildSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => ({
      ...entry,
      loc: `${BASE_URL}${entry.path}`,
    }))
    .map((entry) => createUrlNode(entry))
    .join("\n");

  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

function createUrlNode({
  loc,
  priority,
  lastmod,
  changefreq,
}: SitemapEntry & { loc: string }): string {
  const elements = [`  <loc>${loc}</loc>`];

  if (lastmod) {
    elements.push(`  <lastmod>${lastmod}</lastmod>`);
  }

  if (changefreq) {
    elements.push(`  <changefreq>${changefreq}</changefreq>`);
  }

  if (typeof priority === "number") {
    elements.push(`  <priority>${priority.toFixed(1)}</priority>`);
  }

  return `<url>\n${elements.join("\n")}\n</url>`;
}

function normalizeDate(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
}
