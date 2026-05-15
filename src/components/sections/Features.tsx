"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Activity,
  Shield,
  BarChart3,
  Users,
  Settings,
  Zap,
} from "lucide-react";

const FEATURES = [
  { icon: Activity, key: "feature1" },
  { icon: Shield, key: "feature2" },
  { icon: BarChart3, key: "feature3" },
  { icon: Users, key: "feature4" },
  { icon: Settings, key: "feature5" },
  { icon: Zap, key: "feature6" },
] as const;

export function Features() {
  const t = useTranslations("features");

  return (
    <section
      id="features"
      className="py-32 bg-white"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl heading-editorial text-slate-900 mb-6"
          >
            {t("title")}
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto" aria-hidden="true" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-12 rounded-3xl border border-slate-200 bg-white shadow-slick shadow-slick-hover flex flex-col relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                aria-hidden="true"
              />

              <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                <f.icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4 uppercase">
                {t(`${f.key}.title`)}
              </h3>
              <p className="text-slate-500 leading-relaxed text-lg font-medium">
                {t(`${f.key}.desc`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
