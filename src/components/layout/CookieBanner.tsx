"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, Settings2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { updateConsentMode } from "@/lib/gtm";
import {
  type ConsentState,
  type ConsentCategory,
  CONSENT_ALL,
  CONSENT_DENIED,
  getStoredConsent,
  saveConsent,
} from "@/lib/consent";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(CONSENT_DENIED);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      updateConsentMode(stored);
    } else {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const applyConsent = useCallback((state: ConsentState) => {
    saveConsent(state);
    updateConsentMode(state);
    setIsVisible(false);
  }, []);

  const handleAcceptAll = () => applyConsent(CONSENT_ALL);
  const handleNecessaryOnly = () => applyConsent(CONSENT_DENIED);
  const handleSavePreferences = () => applyConsent(consent);

  const toggleCategory = (category: ConsentCategory) => {
    setConsent((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const categories: { key: ConsentCategory; labelKey: string }[] = [
    { key: "analytics", labelKey: "cat_analytics" },
    { key: "marketing", labelKey: "cat_marketing" },
    { key: "personalization", labelKey: "cat_personalization" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-100"
          role="dialog"
          aria-label={t("title")}
        >
          <div className="bg-slate-900 border border-slate-800 text-white p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck
                className="text-primary w-6 h-6"
                aria-hidden="true"
              />
              <h4 className="font-bold text-lg">{t("title")}</h4>
            </div>

            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              {t("desc")}
            </p>

            <button
              onClick={() => setShowSettings((v) => !v)}
              className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-6 uppercase tracking-widest"
              aria-expanded={showSettings}
              aria-controls="consent-settings"
            >
              <Settings2 className="w-4 h-4" aria-hidden="true" />
              {t("settings")}
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform",
                  showSettings && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {showSettings && (
                <motion.div
                  id="consent-settings"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl">
                      <div>
                        <span className="text-sm font-bold">
                          {t("cat_necessary")}
                        </span>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {t("cat_necessary_desc")}
                        </p>
                      </div>
                      <div
                        role="switch"
                        aria-checked={true}
                        aria-label={t("cat_necessary")}
                        aria-disabled="true"
                        className="w-10 h-6 bg-primary rounded-full relative cursor-not-allowed shrink-0 ml-4"
                      >
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>

                    {categories.map(({ key, labelKey }) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl"
                      >
                        <div>
                          <span
                            className="text-sm font-bold"
                            id={`consent-label-${key}`}
                          >
                            {t(labelKey)}
                          </span>
                          <p className="text-slate-500 text-xs mt-0.5">
                            {t(`${labelKey}_desc`)}
                          </p>
                        </div>
                        <button
                          role="switch"
                          aria-checked={consent[key]}
                          aria-labelledby={`consent-label-${key}`}
                          onClick={() => toggleCategory(key)}
                          className={cn(
                            "w-10 h-6 rounded-full relative transition-colors shrink-0 ml-4 cursor-pointer",
                            consent[key] ? "bg-primary" : "bg-slate-700",
                          )}
                        >
                          <div
                            className={cn(
                              "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                              consent[key] ? "right-1" : "left-1",
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all grow"
              >
                {t("accept")}
              </button>
              {showSettings ? (
                <button
                  onClick={handleSavePreferences}
                  className="bg-slate-800 text-slate-300 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-all grow"
                >
                  {t("save")}
                </button>
              ) : (
                <button
                  onClick={handleNecessaryOnly}
                  className="bg-slate-800 text-slate-300 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-all grow"
                >
                  {t("necessary")}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
