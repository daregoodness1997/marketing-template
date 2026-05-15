"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Building2, LayoutPanelLeft, Headphones } from "lucide-react";

const GROUPS = [
  { icon: Building2, key: "group1" },
  { icon: LayoutPanelLeft, key: "group2" },
  { icon: Headphones, key: "group3" },
] as const;

export function Audience() {
  const t = useTranslations("audience");

  return (
    <section
      id="audience"
      className="py-32 bg-slate-50"
      aria-labelledby="audience-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2
            id="audience-heading"
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            {t("title")}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {GROUPS.map((item, i) => (
            <motion.article
              key={item.key}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-12 rounded-[40px] shadow-slick shadow-slick-hover border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform"
            >
              <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-primary mb-8 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                <item.icon className="w-10 h-10" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                {t(`${item.key}.title`)}
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                {t(`${item.key}.desc`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
