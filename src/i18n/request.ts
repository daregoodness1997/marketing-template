import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

import "./types";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  let mergedMessages = messages;
  if (locale !== routing.defaultLocale) {
    const fallback = (await import(`../messages/${routing.defaultLocale}.json`))
      .default;
    mergedMessages = deepMerge(fallback, messages);
  }

  return {
    locale,
    messages: mergedMessages,
    defaultTranslationValues: {
      br: () => "\n",
    },
    onError(error) {
      if (error.code === "MISSING_MESSAGE") {
        if (process.env.NODE_ENV === "development") {
          console.warn(`[i18n] ${error.message}`);
        }
      } else {
        throw error;
      }
    },
    getMessageFallback({ namespace, key }) {
      return `${namespace}.${key}`;
    },
  };
});

/** Deep-merge two flat/nested message objects (source wins over base). */
function deepMerge(
  base: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(source)) {
    const bVal = base[key];
    const sVal = source[key];
    if (
      typeof bVal === "object" &&
      bVal !== null &&
      typeof sVal === "object" &&
      sVal !== null &&
      !Array.isArray(sVal)
    ) {
      result[key] = deepMerge(
        bVal as Record<string, unknown>,
        sVal as Record<string, unknown>,
      );
    } else {
      result[key] = sVal;
    }
  }
  return result;
}
