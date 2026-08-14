import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const [siteData, pages, navigation, blocks, collections, media] = await Promise.all([
  readJson("src/data/site.json"),
  readJson("src/data/pages.json"),
  readJson("src/data/navigation.json"),
  readJson("src/data/globalBlocks.json"),
  readJson("src/data/collections.json"),
  readJson("src/data/media.json"),
]);

const errors = [];
const report = (condition, message) => { if (!condition) errors.push(message); };
const site = siteData.site ?? {};
const ids = new Set();
const slugs = new Set();
const indexedTitles = new Set();
const indexedDescriptions = new Set();
const routes = new Set(pages.map((page) => page.slug));

for (const collection of Object.values(collections)) {
  if (!Array.isArray(collection)) continue;
  for (const item of collection) {
    if (typeof item?.href === "string" && item.href.startsWith("/")) routes.add(item.href);
  }
}

const forbiddenSeo = [/og-placeholder/i, /lorem ipsum/i];
const isExternal = (href = "") => /^(?:https?:|mailto:|tel:)/.test(href) || href.startsWith("#");
const auditSeo = (seo, context) => {
  report(seo?.title?.trim(), `${context} needs an SEO title`);
  report(seo?.description?.trim(), `${context} needs an SEO description`);
  if (seo?.canonical) report(/^https:\/\//.test(seo.canonical), `${context} canonical must be absolute HTTPS`);
  forbiddenSeo.forEach((pattern) => report(!pattern.test(JSON.stringify(seo ?? {})), `${context} contains placeholder SEO`));

  if (seo?.robots?.index === false) return;
  if (seo?.title) {
    report(!indexedTitles.has(seo.title), `duplicate indexed title "${seo.title}"`);
    indexedTitles.add(seo.title);
  }
  if (seo?.description) {
    report(!indexedDescriptions.has(seo.description), `${context} duplicates another indexed description`);
    indexedDescriptions.add(seo.description);
  }
};

const walk = (value, context) => {
  if (Array.isArray(value)) return value.forEach((item, index) => walk(item, `${context}[${index}]`));
  if (!value || typeof value !== "object") return;
  if (typeof value.href === "string" && !isExternal(value.href)) {
    const pathname = value.href.split(/[?#]/, 1)[0] || "/";
    report(routes.has(pathname), `${context} links to unknown route "${value.href}"`);
  }
  Object.entries(value).forEach(([key, child]) => walk(child, `${context}.${key}`));
};

const checkEntry = (entry, context) => {
  if (entry?.ref) {
    report(Boolean(blocks[entry.ref]), `${context} references missing block "${entry.ref}"`);
    return;
  }
  if (entry?.type === "Section" && entry.source?.collection) {
    report(Array.isArray(collections[entry.source.collection]), `${context} references missing collection "${entry.source.collection}"`);
  }
  if (entry?.type === "Group") {
    (entry.blocks ?? []).forEach((item, index) => checkEntry(item, `${context}.blocks[${index}]`));
    (entry.panels ?? []).forEach((panel, panelIndex) =>
      (panel.blocks ?? []).forEach((item, index) => checkEntry(item, `${context}.panels[${panelIndex}].blocks[${index}]`)),
    );
  }
};

report(site.name?.trim(), "site.name is required");
report(site.url?.startsWith("https://"), "site.url must be an absolute HTTPS URL");
report(site.credits?.name?.trim(), "site creator name is required");
report(site.credits?.studio === "Chow Studio", "site.credits.studio must be Chow Studio");
report(site.credits?.href?.startsWith("https://"), "site creator credit needs an HTTPS link");
report(site.seo?.defaultTitle?.trim(), "site.seo.defaultTitle is required");
report(site.seo?.defaultDescription?.trim(), "site.seo.defaultDescription is required");
report(site.seo?.defaultImage && !forbiddenSeo.some((pattern) => pattern.test(site.seo.defaultImage)), "site.seo.defaultImage must not be a placeholder");

for (const page of pages) {
  report(page.id?.trim(), "every page needs an id");
  report(page.slug?.startsWith("/"), `page "${page.id}" needs an absolute slug`);
  report(!ids.has(page.id), `duplicate page id "${page.id}"`);
  report(!slugs.has(page.slug), `duplicate page slug "${page.slug}"`);
  ids.add(page.id);
  slugs.add(page.slug);
  auditSeo(page.seo, `page "${page.id}"`);
  (page.blocks ?? []).forEach((entry, index) => checkEntry(entry, `page "${page.id}" block ${index + 1}`));
}
report(slugs.has("/"), "a home page at / is required");

for (const [id, block] of Object.entries(blocks)) {
  report(block.id === id, `block key "${id}" does not match its id`);
  if (block.source?.collection) report(Array.isArray(collections[block.source.collection]), `block "${id}" references missing collection "${block.source.collection}"`);
}

for (const [collectionName, collection] of Object.entries(collections)) {
  if (!Array.isArray(collection)) continue;
  for (const [index, item] of collection.entries()) {
    if (item?.seo) auditSeo(item.seo, `${collectionName}[${index}]`);
  }
}

const mediaRefs = new Set();
const collectMedia = (value) => {
  if (Array.isArray(value)) return value.forEach(collectMedia);
  if (!value || typeof value !== "object") return;
  if (typeof value.media === "string") mediaRefs.add(value.media);
  if (Array.isArray(value.media)) value.media.forEach((ref) => mediaRefs.add(ref));
  if (Array.isArray(value.gallery)) value.gallery.forEach((ref) => typeof ref === "string" && mediaRefs.add(ref));
  Object.values(value).forEach(collectMedia);
};
collectMedia(blocks);
collectMedia(collections);
mediaRefs.forEach((ref) => report(Boolean(media[ref]), `missing media record "${ref}"`));
for (const [id, item] of Object.entries(media)) {
  report(item.id === id, `media key "${id}" does not match its id`);
  report(item.alt?.trim(), `media "${id}" needs alternative text`);
}

walk(blocks, "globalBlocks");
walk(collections, "collections");
walk(navigation, "navigation");

const chowCredit = JSON.stringify({ blocks, navigation, site }).toLowerCase();
report(chowCredit.includes("chow studio"), "public content must retain a Chow Studio credit");

if (errors.length) {
  console.error("\nContent audit failed:\n");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`Content audit passed: ${pages.length} pages, ${Object.keys(blocks).length} blocks, ${Object.keys(media).length} media records.`);
}
