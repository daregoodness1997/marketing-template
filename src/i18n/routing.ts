import { defineRouting } from "next-intl/routing";

export const supportedLocales = [
  "cs",
  "en",
  "fr",
  "es",
  "pt",
  "sw",
  "yo",
  "ha",
  "ja",
  "zh",
] as const;

export const routing = defineRouting({
  locales: supportedLocales,
  defaultLocale: "cs",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
