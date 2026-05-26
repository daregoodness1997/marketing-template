import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Clock } from "lucide-react";
import type { Locale } from "@/i18n/routing";

interface BlogCardProps {
  slug: string;
  locale: Locale;
}

export function BlogCard({ slug }: BlogCardProps) {
  const t = useTranslations("blog");

  const title = t(`posts.${slug}.title`);
  const excerpt = t(`posts.${slug}.excerpt`);
  const date = t(`posts.${slug}.date`);
  const readTime = t(`posts.${slug}.readTime`);

  return (
    <Card variant="interactive" as="article">
      <div className="flex flex-col h-full">
        <time
          dateTime={date}
          className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4"
        >
          {date}
        </time>
        <h3 className="text-xl font-bold text-text mb-3">{title}</h3>
        <p className="text-slate-600 mb-6 grow">{excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="flex items-center gap-1.5 text-sm text-slate-400">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {t("min_read", { minutes: readTime })}
          </span>
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            {t("read_more")}
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
