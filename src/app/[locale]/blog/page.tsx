import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/sections/BlogCard";
import { routing, type Locale } from "@/i18n/routing";

const POST_SLUGS = ["getting-started", "best-practices", "product-update"];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" className="grow">
        <Section size="large">
          <SectionHeading
            title={t("title")}
            subtitle={t("subtitle")}
            align="center"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POST_SLUGS.map((slug) => (
              <BlogCard key={slug} slug={slug} locale={locale as Locale} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
