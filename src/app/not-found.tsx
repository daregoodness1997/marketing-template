"use client";

import { useEffect, useState } from "react";
import { routing, type Locale } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

const copy: Record<
  Locale,
  { title: string; heading: string; body: string; cta: string }
> = {
  cs: {
    title: "404 – Stránka nenalezena",
    heading: "Stránka nenalezena",
    body: "Omlouváme se, ale hledaná stránka neexistuje nebo byla přesunuta.",
    cta: "Zpět na hlavní stránku",
  },
  en: {
    title: "404 – Page Not Found",
    heading: "Page not found",
    body: "Sorry, the page you are looking for does not exist or has been moved.",
    cta: "Back to homepage",
  },
  fr: {
    title: "404 – Page introuvable",
    heading: "Page introuvable",
    body: "Desole, la page que vous recherchez n'existe pas ou a ete deplacee.",
    cta: "Retour a l'accueil",
  },
  es: {
    title: "404 – Pagina no encontrada",
    heading: "Pagina no encontrada",
    body: "Lo sentimos, la pagina que buscas no existe o ha sido movida.",
    cta: "Volver al inicio",
  },
  pt: {
    title: "404 – Pagina nao encontrada",
    heading: "Pagina nao encontrada",
    body: "Desculpe, a pagina que procura nao existe ou foi movida.",
    cta: "Voltar para a pagina inicial",
  },
  sw: {
    title: "404 – Ukurasa haujapatikana",
    heading: "Ukurasa haujapatikana",
    body: "Samahani, ukurasa unaoutafuta haupo au umehamishwa.",
    cta: "Rudi ukurasa wa mwanzo",
  },
  yo: {
    title: "404 – A ko ri oju-iwe",
    heading: "A ko ri oju-iwe",
    body: "Ma binu, oju-iwe ti o n wa ko si tabi a ti gbe e.",
    cta: "Pada si ile",
  },
  ha: {
    title: "404 – Ba a samu shafin ba",
    heading: "Ba a samu shafin ba",
    body: "Yi hakuri, shafin da kake nema baya nan ko an matsar da shi.",
    cta: "Koma shafin farko",
  },
  ja: {
    title: "404 - Page Not Found",
    heading: "Page not found",
    body: "Sorry, the page you are looking for does not exist or has been moved.",
    cta: "Back to homepage",
  },
  zh: {
    title: "404 - Page Not Found",
    heading: "Page not found",
    body: "Sorry, the page you are looking for does not exist or has been moved.",
    cta: "Back to homepage",
  },
};

function detectLocale(): Locale {
  if (typeof window === "undefined") return routing.defaultLocale;

  try {
    const stored = localStorage.getItem("site_locale");
    if (stored && routing.locales.includes(stored as Locale))
      return stored as Locale;
  } catch {
    // blocked
  }

  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith("site_locale="));
  if (match) {
    const val = match.split("=")[1];
    if (routing.locales.includes(val as Locale)) return val as Locale;
  }

  const seg = window.location.pathname.split("/")[1];
  if (routing.locales.includes(seg as Locale)) return seg as Locale;

  return routing.defaultLocale;
}

export default function NotFound() {
  const [locale, setLocale] = useState<Locale>(routing.defaultLocale);

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const t = copy[locale];
  const homeHref = locale === routing.defaultLocale ? "/" : `/${locale}/`;

  return (
    <html lang={locale}>
      <head>
        <title>{t.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="min-h-screen flex items-center justify-center bg-white font-sans">
        <div className="text-center px-6 max-w-md">
          <p
            className="text-sm font-bold uppercase tracking-widest text-primary mb-4"
            aria-hidden="true"
          >
            404
          </p>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
            {t.heading}
          </h1>
          <p className="text-slate-500 mb-8">{t.body}</p>
          <a
            href={homeHref}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {t.cta}
          </a>
        </div>
      </body>
    </html>
  );
}
