"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Server,
  Cpu,
  Link as LinkIcon,
  Command,
  Activity,
  Monitor,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Integrations() {
  const t = useTranslations("integrations");

  return (
    <section
      id="integrations"
      className="py-32 bg-slate-900 text-white overflow-hidden relative"
      aria-labelledby="integrations-heading"
    >
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-250 border-[0.5px] border-white rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 border-[0.5px] border-dashed border-white rounded-full opacity-20" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="inline-flex items-center gap-4 text-primary font-bold text-xs tracking-widest uppercase mb-8">
              <span className="w-12 h-px bg-primary" aria-hidden="true" />
              {t("tagline")}
            </div>
            <h2
              id="integrations-heading"
              className="text-5xl md:text-7xl font-black tracking-tighter mb-12"
            >
              {t("title")}
            </h2>
            <div className="space-y-10">
              <div className="flex gap-8">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Server className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3">
                    {t("integration1_title")}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {t("integration1_desc")}
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Cpu className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3">
                    {t("integration2_title")}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {t("integration2_desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative flex items-center justify-center group"
            aria-hidden="true"
          >
            <div className="relative w-80 h-80 transition-transform duration-700 group-hover:rotate-12">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
              <div className="absolute inset-0 border border-white/10 rounded-full scale-110 group-hover:scale-125 transition-transform" />

              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-primary shadow-2xl transition-all group-hover:bg-white group-hover:text-slate-900 group-hover:-translate-y-8">
                <LinkIcon className="w-7 h-7" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-primary shadow-2xl transition-all group-hover:bg-white group-hover:text-slate-900 group-hover:translate-y-8">
                <Command className="w-7 h-7" />
              </div>
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-primary shadow-2xl transition-all group-hover:bg-white group-hover:text-slate-900 group-hover:-translate-x-8">
                <Monitor className="w-7 h-7" />
              </div>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-primary shadow-2xl transition-all group-hover:bg-white group-hover:text-slate-900 group-hover:translate-x-8">
                <Activity className="w-7 h-7" />
              </div>

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary rounded-4xl flex items-center justify-center shadow-[0_20px_50px_rgba(70,95,255,0.4)] border border-white/20 backdrop-blur-sm"
              >
                <Logo size="sm" className="[&_span]:text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
