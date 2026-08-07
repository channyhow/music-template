import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

import collectionsData from "./src/data/collections.json";
import globalBlocksData from "./src/data/globalBlocks.json";
import { blockRegistrySchema, collectionsSchema } from "./src/data/schemas";
import siteData from "./src/data/site.json";

function validateStaticData() {
  collectionsSchema.parse(collectionsData);
  blockRegistrySchema.parse(globalBlocksData);
}

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const areaTypeMap: Record<string, string> = {
  city: "City",
  region: "AdministrativeArea",
  country: "Country",
  place: "Place",
};

function seoIndexPlugin(): Plugin {
  const site = siteData.site;
  const seo = site.seo;
  const siteUrl = site.url.replace(/\/$/, "");
  const imageUrl = new URL(seo.defaultImage, `${siteUrl}/`).toString();
  const businessId = `${siteUrl}/#business`;

  const sameAs = Object.values(site.socials)
    .filter((social) => social.enabled && social.href)
    .map((social) => social.href);

  const areaServed = (seo.areaServed ?? [])
    .filter((area) => area.name)
    .map((area) => ({
      "@type": areaTypeMap[area.kind] ?? "Place",
      name: area.name,
    }));

  const services = (seo.services ?? []).filter((service) => service.name);

  const creator = site.credits?.studio
    ? {
        "@type": "Organization",
        name: site.credits.studio,
        ...(site.credits.href ? { url: site.credits.href } : {}),
      }
    : undefined;

  const business = {
    "@type": seo.organizationType,
    "@id": businessId,
    name: site.name,
    url: siteUrl,
    description: seo.defaultDescription,
    email: site.contact.email,
    telephone: site.contact.phone,
    image: imageUrl,
    ...(sameAs.length ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      postalCode: site.contact.address.postalCode,
      addressLocality: site.contact.address.city,
      addressCountry: site.contact.address.country,
    },
    ...(areaServed.length ? { areaServed } : {}),
    ...(seo.knowsAbout?.length ? { knowsAbout: seo.knowsAbout } : {}),
    ...(services.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: seo.offerCatalogName,
            itemListElement: services.map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.name,
                ...(service.description ? { description: service.description } : {}),
              },
            })),
          },
        }
      : {}),
  };

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      business,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        description: seo.defaultDescription,
        inLanguage: site.defaultLocale,
        publisher: { "@id": businessId },
        ...(creator ? { creator } : {}),
      },
    ],
  }).replaceAll("<", "\\u003c");

  const replacements: Record<string, string> = {
    __SITE_LANG__: site.defaultLocale,
    __THEME_COLOR__: seo.themeColor,
    __SEO_DESCRIPTION__: seo.defaultDescription,
    __SITE_URL__: siteUrl,
    __SITE_NAME__: site.name,
    __OG_LOCALE__: site.defaultLocale.replace("-", "_"),
    __SEO_TITLE__: seo.defaultTitle,
    __SEO_IMAGE__: imageUrl,
    __SEO_IMAGE_ALT__: seo.imageAlt,
    __TWITTER_CARD__: seo.twitterCard,
  };

  return {
    name: "chow-seo-index",
    transformIndexHtml(html) {
      const withMetadata = Object.entries(replacements).reduce(
        (result, [token, value]) => result.replaceAll(token, escapeHtml(value)),
        html,
      );
      return withMetadata.replace("__STRUCTURED_DATA__", structuredData);
    },
  };
}

export default defineConfig(() => {
  validateStaticData();

  return {
    plugins: [seoIndexPlugin(), react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      target: "es2022",
      cssCodeSplit: true,
      sourcemap: false,
    },
  };
});
