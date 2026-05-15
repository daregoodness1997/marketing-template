"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building,
  Users,
  Target,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackFormSubmit, trackCtaClick } from "@/lib/analytics";
import { pushDataLayer } from "@/lib/gtm";

export function DemoForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("demo");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    size: "",
    needs: "",
  });

  const nextStep = () => {
    pushDataLayer("demo_form_step", { step });
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmit("demo_request", {
      company_size: formData.size,
      needs: formData.needs,
    });
    setStep(4);
  };

  if (!isOpen) return null;

  return (
    <DemoFormDialog onClose={onClose} title={t("title")}>
      <div className="p-12">
        {step < 4 && (
          <div
            className="flex gap-2 mb-8"
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-label={`Step ${step} of 3`}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all flex-1",
                  i <= step ? "bg-primary" : "bg-slate-100",
                )}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-primary mb-2">
                <Users className="w-5 h-5" aria-hidden="true" />
                <h3 className="font-bold text-sm uppercase tracking-widest">
                  {t("step1")}
                </h3>
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                {t("title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="demo-name" className="sr-only">
                    {t("fullName")}
                  </label>
                  <input
                    id="demo-name"
                    type="text"
                    autoComplete="name"
                    placeholder={t("fullName")}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-primary transition-all"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="demo-email" className="sr-only">
                    {t("workEmail")}
                  </label>
                  <input
                    id="demo-email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("workEmail")}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-primary transition-all"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                onClick={nextStep}
                disabled={!formData.name || !formData.email}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {t("continue")}{" "}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-primary mb-2">
                <Building className="w-5 h-5" aria-hidden="true" />
                <h3 className="font-bold text-sm uppercase tracking-widest">
                  {t("step2")}
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="demo-company" className="sr-only">
                    {t("companyName")}
                  </label>
                  <input
                    id="demo-company"
                    type="text"
                    autoComplete="organization"
                    placeholder={t("companyName")}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-primary transition-all"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="demo-size" className="sr-only">
                    {t("company_size")}
                  </label>
                  <select
                    id="demo-size"
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-primary transition-all"
                    value={formData.size}
                    onChange={(e) =>
                      setFormData({ ...formData, size: e.target.value })
                    }
                  >
                    <option value="">{t("company_size")}</option>
                    <option value="1-10">{t("employees_small")}</option>
                    <option value="11-50">{t("employees_medium")}</option>
                    <option value="50+">{t("employees_large")}</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
                >
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" />{" "}
                  {t("back")}
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.company || !formData.size}
                  className="flex-2 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {t("next")}{" "}
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-primary mb-2">
                <Target className="w-5 h-5" aria-hidden="true" />
                <h3 className="font-bold text-sm uppercase tracking-widest">
                  {t("step3")}
                </h3>
              </div>
              <div>
                <label htmlFor="demo-needs" className="sr-only">
                  {t("needs")}
                </label>
                <textarea
                  id="demo-needs"
                  placeholder={t("needs")}
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-primary transition-all resize-none"
                  value={formData.needs}
                  onChange={(e) =>
                    setFormData({ ...formData, needs: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
              >
                {t("submit")} <Target className="w-5 h-5" aria-hidden="true" />
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                {t("success")}
              </h2>
              <button
                onClick={onClose}
                className="text-primary font-bold uppercase tracking-widest text-xs border-b border-primary"
              >
                {t("close")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DemoFormDialog>
  );
}

function DemoFormDialog({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      ref={dialogRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        {children}
      </motion.div>
    </div>
  );
}
