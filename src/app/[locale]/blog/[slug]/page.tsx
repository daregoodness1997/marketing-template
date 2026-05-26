import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { routing } from "@/i18n/routing";

const POST_SLUGS = ["getting-started", "best-practices", "product-update"];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    POST_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!POST_SLUGS.includes(slug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });

  const title = t(`posts.${slug}.title`);
  const content = t(`posts.${slug}.content`);
  const date = t(`posts.${slug}.date`);
  const readTime = t(`posts.${slug}.readTime`);

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" className="grow">
        <Section size="large" narrow>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {t("back_to_blog")}
          </Link>

          <article>
            <header className="mb-12">
              <h1 className="text-4xl md:text-6xl heading-editorial text-text mb-6">
                {title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <time dateTime={date}>{t("published", { date })}</time>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  {t("min_read", { minutes: readTime })}
                </span>
              </div>
            </header>

            <div className="prose prose-lg prose-slate max-w-none">
              {content.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg text-slate-600 leading-relaxed mb-6"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </Section>
      </main>
      <Footer />
    </>
  );
}
