import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const publicDir = resolve(root, "public");

const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const escapeXml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

const siteData = await readJson("src/data/site.json");
const pages = await readJson("src/data/pages.json");
const site = siteData.site;
const seo = site.seo;
const pwa = site.pwa;
const baseUrl = site.url.replace(/\/$/, "");
const indexablePages = pages.filter((page) => page.seo?.robots?.index !== false);

const manifest = {
  name: pwa.name,
  short_name: pwa.shortName,
  description: pwa.description,
  lang: site.defaultLocale,
  start_url: pwa.startUrl,
  scope: "/",
  display: pwa.display,
  background_color: siteData.theme.colors.secondary,
  theme_color: seo.themeColor,
  icons: [
    {
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any",
    },
  ],
};

const robots = [
  "User-agent: *",
  "Allow: /",
  "Disallow: /system",
  "Disallow: /branding",
  "Disallow: /netlify-forms.html",
  `Sitemap: ${baseUrl}/sitemap.xml`,
  "",
].join("\n");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexablePages.map((page) => {
    const canonical = page.seo?.canonical ?? `${baseUrl}${page.slug === "/" ? "" : page.slug}`;
    return `  <url><loc>${escapeXml(canonical)}</loc></url>`;
  }),
  "</urlset>",
  "",
].join("\n");

const areas = (seo.areaServed ?? []).map((area) => area.name).filter(Boolean);
const expertise = (seo.knowsAbout ?? []).filter(Boolean);
const services = (seo.services ?? []).map((service) => service.name).filter(Boolean);

const llms = [
  `# ${site.name}`,
  "",
  `> ${site.baseline}`,
  "",
  `Canonical site: ${baseUrl}`,
  `Language: ${site.defaultLocale}`,
  "",
  "## Public pages",
  "",
  ...indexablePages.map((page) => `- ${page.seo?.title ?? page.id}: ${baseUrl}${page.slug === "/" ? "" : page.slug}`),
  ...(services.length
    ? [
        "",
        "## Services",
        "",
        ...services.map((service) => `- ${service}`),
      ]
    : []),
  ...(expertise.length
    ? [
        "",
        "## Expertise",
        "",
        ...expertise.map((item) => `- ${item}`),
      ]
    : []),
  ...(areas.length
    ? [
        "",
        "## Areas served",
        "",
        ...areas.map((area) => `- ${area}`),
      ]
    : []),
  "",
  "## Contact",
  "",
  `- Email: ${site.contact.email}`,
  `- Location: ${site.contact.address.city}, ${site.contact.address.country}`,
  "",
  "This file is generated from src/data/site.json and src/data/pages.json. Keep those sources accurate.",
  "",
].join("\n");

await mkdir(publicDir, { recursive: true });
await Promise.all([
  writeFile(resolve(publicDir, "site.webmanifest"), `${JSON.stringify(manifest, null, 2)}\n`),
  writeFile(resolve(publicDir, "robots.txt"), robots),
  writeFile(resolve(publicDir, "sitemap.xml"), sitemap),
  writeFile(resolve(publicDir, "llms.txt"), llms),
]);

console.log("SEO assets generated from site.json + pages.json");
