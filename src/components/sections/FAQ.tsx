"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
  ];

  return (
    <section id="faq" className="py-32 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            id="faq-heading"
            className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4"
          >
            {t("title")}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" aria-hidden="true" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "border border-slate-200 rounded-3xl overflow-hidden transition-all duration-500 bg-white",
                openIndex === i
                  ? "shadow-slick border-primary/20 scale-[1.02]"
                  : "hover:border-primary/20 hover:shadow-lg",
              )}
            >
              <h3>
                <button
                  id={`faq-question-${i}`}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle
                      className={cn(
                        "w-5 h-5",
                        openIndex === i ? "text-primary" : "text-slate-400",
                      )}
                      aria-hidden="true"
                    />
                    <span className="font-bold text-lg text-slate-800">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-transform",
                      openIndex === i
                        ? "rotate-180 text-primary"
                        : "text-slate-400",
                    )}
                    aria-hidden="true"
                  />
                </button>
              </h3>

              <motion.div
                id={`faq-answer-${i}`}
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                className="overflow-hidden"
                role="region"
                aria-labelledby={`faq-question-${i}`}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed pl-14">
                  {faq.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
