"use client";

import { useEffect } from "react";
import { routing, type Locale } from "@/i18n/routing";

export default function RootPage() {
  useEffect(() => {
    let preferred: string | null = null;

    try {
      preferred = localStorage.getItem("site_locale");
    } catch {
      // blocked
    }

    if (!preferred) {
      const match = document.cookie
        .split("; ")
        .find((c) => c.startsWith("site_locale="));
      if (match) preferred = match.split("=")[1];
    }

    if (!preferred && typeof navigator !== "undefined") {
      const lang = navigator.language.split("-")[0];
      if (routing.locales.includes(lang as Locale)) {
        preferred = lang;
      }
    }

    const locale =
      preferred && routing.locales.includes(preferred as Locale)
        ? preferred
        : routing.defaultLocale;

    const target = locale === routing.defaultLocale ? "/" : `/${locale}/`;

    if (target === "/" && window.location.pathname === "/") {
      window.location.replace(`/${routing.defaultLocale}/`);
    } else {
      window.location.replace(target);
    }
  }, []);

  return (
    <html lang={routing.defaultLocale}>
      <body />
    </html>
  );
}
