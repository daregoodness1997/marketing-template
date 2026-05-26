import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

// ─── Constants — CHANGE THESE PER PROJECT ───────────────────────────────────
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com";
export const SITE_NAME = "Your Brand";
const OG_IMAGE_PATH = "/og-image.png";

// ─── URL Helpers ────────────────────────────────────────────────────────────

/** Resolve a locale-aware absolute URL. Czech (default) uses root `/`. */
export function localeUrl(locale: Locale, path = "/"): string {
  const prefix = locale === "cs" ? "" : `/${locale}`;
  const normalized = path === "/" ? "" : path;
  return `${SITE_URL}${prefix}${normalized}/`;
}

// ─── Alternates & Canonical ─────────────────────────────────────────────────

export function buildAlternates(locale: Locale) {
  const languages = Object.fromEntries(
    routing.locales.map((supportedLocale) => [
      supportedLocale,
      localeUrl(supportedLocale as Locale),
    ]),
  ) as Record<Locale, string>;

  return {
    canonical: localeUrl(locale),
    languages: {
      ...languages,
      "x-default": localeUrl("cs"),
    },
  };
}

// ─── Open Graph Images ─────────────────────────────────────────────────────

function ogImages(locale: Locale) {
  return [
    {
      url: `${SITE_URL}${OG_IMAGE_PATH}`,
      width: 1200,
      height: 630,
      alt:
        locale === "cs"
          ? `${SITE_NAME} – Popis produktu`
          : `${SITE_NAME} – Product Description`,
      type: "image/png",
    },
  ];
}

// ─── Metadata Generator ────────────────────────────────────────────────────

interface MetadataInput {
  locale: Locale;
  title: string;
  description: string;
}

export function generatePageMetadata({
  locale,
  title,
  description,
}: MetadataInput): Metadata {
  const ogLocaleByLanguage: Record<Locale, string> = {
    cs: "cs_CZ",
    en: "en_US",
    fr: "fr_FR",
    es: "es_ES",
    pt: "pt_PT",
    sw: "sw_KE",
    yo: "yo_NG",
    ha: "ha_NG",
    ja: "ja_JP",
    zh: "zh_CN",
  };

  const ogLocale = ogLocaleByLanguage[locale] ?? "en_US";

  return {
    title,
    description,
    alternates: buildAlternates(locale),
    openGraph: {
      title,
      description,
      url: localeUrl(locale),
      type: "website",
      locale: ogLocale,
      siteName: SITE_NAME,
      images: ogImages(locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages(locale),
    },
  };
}

// ─── Structured Data Helpers ────────────────────────────────────────────────

function jsonLd(data: Record<string, unknown>) {
  return { "@context": "https://schema.org" as const, ...data };
}

export function organizationSchema() {
  return jsonLd({
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: [
        "Czech",
        "English",
        "French",
        "Spanish",
        "Portuguese",
        "Swahili",
        "Yoruba",
        "Hausa",
        "Japanese",
        "Chinese",
      ],
    },
  });
}

export function webSiteSchema() {
  return jsonLd({
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: [...routing.locales],
    publisher: { "@type": "Organization", name: SITE_NAME },
  });
}

export function softwareApplicationSchema(locale: Locale) {
  return jsonLd({
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    operatingSystem: "Web",
    applicationCategory: "BusinessApplication",
    description:
      locale === "cs"
        ? "Popis vašeho produktu v češtině."
        : "Your product description in English.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CZK",
      availability: "https://schema.org/OnlineOnly",
    },
  });
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return jsonLd({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function faqStructuredData(faqs: { q: string; a: string }[]) {
  return jsonLd({
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  });
}

/** Render a JSON-LD <script> tag from a structured data object. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
