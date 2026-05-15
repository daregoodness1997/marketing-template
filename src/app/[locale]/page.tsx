import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Hero } from "@/components/sections/Hero";
import {
  JsonLd,
  organizationSchema,
  webSiteSchema,
  softwareApplicationSchema,
  breadcrumbSchema,
  faqStructuredData,
  SITE_URL,
  SITE_NAME,
} from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Below-fold sections — lazy-loaded for smaller initial JS bundle
const Features = dynamic(() =>
  import("@/components/sections/Features").then((m) => m.Features),
);
const Audience = dynamic(() =>
  import("@/components/sections/Audience").then((m) => m.Audience),
);
const Integrations = dynamic(() =>
  import("@/components/sections/Integrations").then((m) => m.Integrations),
);
const FAQ = dynamic(() =>
  import("@/components/sections/FAQ").then((m) => m.FAQ),
);
const ContactForm = dynamic(() =>
  import("@/components/sections/ContactForm").then((m) => m.ContactForm),
);
const CookieBanner = dynamic(() =>
  import("@/components/layout/CookieBanner").then((m) => m.CookieBanner),
);
const ScrollTracker = dynamic(() =>
  import("@/components/layout/ScrollTracker").then((m) => m.ScrollTracker),
);

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "faq" });
  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
  ];

  const breadcrumbs = [
    { name: SITE_NAME, url: SITE_URL },
    {
      name: locale === "cs" ? "Domů" : "Home",
      url: locale === "cs" ? `${SITE_URL}/` : `${SITE_URL}/en/`,
    },
  ];

  return (
    <>
      {/* Structured Data — Organization */}
      <JsonLd data={organizationSchema()} />
      {/* Structured Data — WebSite */}
      <JsonLd data={webSiteSchema()} />
      {/* Structured Data — SoftwareApplication */}
      <JsonLd data={softwareApplicationSchema(locale as Locale)} />
      {/* Structured Data — BreadcrumbList */}
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      {/* Structured Data — FAQPage */}
      <JsonLd data={faqStructuredData(faqs)} />

      <SkipLink />
      <Header />
      <main id="main-content" className="grow">
        <Hero />
        <Features />
        <Audience />
        <Integrations />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <CookieBanner />
      <ScrollTracker />
    </>
  );
}
