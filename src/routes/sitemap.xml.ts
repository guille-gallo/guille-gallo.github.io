import { SITE_URL } from "~/lib/site";

const pages = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/github-featured-projects", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
];

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(
      (page) =>
        `  <url>\n    <loc>${SITE_URL}${page.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
