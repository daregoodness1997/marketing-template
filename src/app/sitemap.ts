import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com";

function localePath(locale: Locale): string {
  return locale === routing.defaultLocale ? "/" : `/${locale}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}${localePath(locale as Locale)}`]),
  );

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}${localePath(locale as Locale)}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1.0 : 0.9,
    alternates: {
      languages,
    },
  }));
}
