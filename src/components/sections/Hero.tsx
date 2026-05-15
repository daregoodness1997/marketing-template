"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { trackCtaClick } from "@/lib/analytics";

const DemoForm = dynamic(() => import("./DemoForm").then((m) => m.DemoForm), {
  ssr: false,
});

export function Hero() {
  const t = useTranslations("hero");
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section
      className="relative min-h-screen pt-40 pb-20 flex items-center overflow-hidden bg-white border-b border-slate-200"
      aria-labelledby="hero-heading"
    >
      <AnimatePresence>
        {isDemoOpen && (
          <DemoForm isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
        )}
      </AnimatePresence>

      {/* Background decoration */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-4 text-primary font-bold text-xs tracking-widest uppercase mb-8">
            <span className="w-12 h-px bg-primary" aria-hidden="true" />
            {t("tagline")}
          </div>

          <h1
            id="hero-heading"
            className="text-6xl md:text-[84px] leading-[0.9] font-black tracking-tighter text-slate-900 mb-8 max-w-2xl"
          >
            {t("titleLine1")}
            <br />
            <span className="accent-serif text-slate-500">
              {t("titleAccent")}
            </span>{" "}
            {t("titleLine2")}
          </h1>

          <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-lg font-normal">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={() => {
                trackCtaClick("demo_request", t("cta_demo"));
                setIsDemoOpen(true);
              }}
              className="group bg-slate-900 text-white px-10 py-5 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:bg-primary transition-all text-lg hover:scale-105 active:scale-95"
            >
              {t("cta_demo")}
              <ArrowRight
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <div className="px-8 py-4 flex items-center gap-4 text-sm font-semibold text-slate-500 border-l border-slate-100 transition-all hover:bg-slate-50 rounded-xl">
              <span className="flex flex-col">
                <span>{t("integration_label")}</span>
                <span className="text-primary">{t("integration_value")}</span>
              </span>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 pt-10 border-t border-slate-100 max-w-xl">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">
                {t("stat1_value")}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">
                {t("stat1_label")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">
                {t("stat2_value")}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">
                {t("stat2_label")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">
                {t("stat3_value")}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">
                {t("stat3_label")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Preview — customize this per project */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative hidden lg:block"
          aria-hidden="true"
        >
          <div className="w-full aspect-4/5 bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden flex flex-col group">
            <div className="h-14 bg-slate-900 flex items-center px-6 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <div className="ml-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                {t("demo_title")}
              </div>
            </div>
            <div className="flex-1 bg-slate-50 relative p-5 flex flex-col">
              <div className="absolute inset-0 grid-bg opacity-10" />

              {/* Placeholder visualization area */}
              <div className="relative flex-1 rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden mb-4 flex items-center justify-center">
                <div className="text-center text-slate-300 p-8">
                  <div className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-primary/20 rounded-lg" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest">
                    Your product preview
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 relative z-10">
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {t("demo_metric1")}
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {t("demo_metric1_value")}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {t("demo_metric2")}
                  </div>
                  <div className="text-2xl font-black text-emerald-500 underline decoration-emerald-500/30">
                    {t("demo_metric2_value")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
