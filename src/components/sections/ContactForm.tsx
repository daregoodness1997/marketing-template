"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Input, Textarea, Button, Alert } from "@/components/ui";
import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact";
import {
  submitContactForm,
  isRetryable,
  type ContactResult,
} from "@/lib/services/contact";
import { trackFormSubmit } from "@/lib/analytics";
import { pushDataLayer } from "@/lib/gtm";

const SUBMIT_COOLDOWN = 3_000;

export function ContactForm() {
  const t = useTranslations("contact");
  const [result, setResult] = useState<ContactResult | null>(null);
  const lastSubmitRef = useRef(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      _hp: "",
    },
  });

  const fieldError = (field: keyof ContactFormValues) => {
    const msg = errors[field]?.message;
    if (!msg) return undefined;
    try {
      return t(msg);
    } catch {
      return msg;
    }
  };

  const onSubmit = async (values: ContactFormValues) => {
    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_COOLDOWN) return;
    lastSubmitRef.current = now;

    if (values._hp) {
      setResult({ ok: true });
      return;
    }

    pushDataLayer("form_start", { form_id: "contact" });

    const res = await submitContactForm(values);
    setResult(res);

    if (res.ok) {
      trackFormSubmit("contact");
      reset();
    } else {
      pushDataLayer("form_error", {
        form_id: "contact",
        error_code: res.code,
      });
    }
  };

  const handleReset = () => {
    setResult(null);
    reset();
  };

  const errorMessage = (r: ContactResult) => {
    if (r.ok) return "";
    const map: Record<string, string> = {
      VALIDATION: "error_validation",
      RATE_LIMIT: "error_rate_limit",
      SERVER: "error",
      NETWORK: "error_network",
    };
    try {
      return t(map[r.code] ?? "error");
    } catch {
      return t("error");
    }
  };

  const showSuccess = result?.ok;
  const showError = result && !result.ok;
  const canRetry = result && !result.ok && isRetryable(result);

  return (
    <section
      id="contact"
      className="py-40 bg-slate-50 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div
        className="absolute inset-0 grid-bg opacity-[0.03]"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-white p-12 md:p-20 rounded-[48px] shadow-slick border border-slate-200 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1 bg-primary"
            aria-hidden="true"
          />

          <div className="text-center mb-16">
            <h2
              id="contact-heading"
              className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4"
            >
              {t("title")}
            </h2>
            <p className="text-slate-500 text-xl font-medium">
              {t("subtitle")}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {showSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12 space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.15,
                  }}
                >
                  <CheckCircle2
                    className="w-16 h-16 text-emerald-500 mx-auto"
                    aria-hidden="true"
                  />
                </motion.div>
                <h3 className="text-2xl font-black text-slate-900">
                  {t("success_title")}
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  {t("success")}
                </p>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={handleReset}
                  icon={<RotateCcw className="w-4 h-4" />}
                  iconPosition="left"
                >
                  {t("send_another")}
                </Button>
              </motion.div>
            )}

            {!showSuccess && (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
                noValidate
              >
                {/* Honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="contact-hp">Leave empty</label>
                  <input
                    id="contact-hp"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    {...register("_hp")}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <Input
                    id="contact-name"
                    label={t("name")}
                    type="text"
                    autoComplete="name"
                    placeholder="Jan Novák"
                    error={fieldError("name")}
                    disabled={isSubmitting}
                    {...register("name")}
                  />
                  <Input
                    id="contact-email"
                    label={t("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="jan@example.com"
                    error={fieldError("email")}
                    disabled={isSubmitting}
                    {...register("email")}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <Input
                    id="contact-company"
                    label={t("company")}
                    type="text"
                    autoComplete="organization"
                    placeholder={t("company_placeholder")}
                    error={fieldError("company")}
                    disabled={isSubmitting}
                    {...register("company")}
                  />
                  <Input
                    id="contact-phone"
                    label={t("phone")}
                    type="tel"
                    autoComplete="tel"
                    placeholder="+420 …"
                    error={fieldError("phone")}
                    disabled={isSubmitting}
                    {...register("phone")}
                  />
                </div>

                <Textarea
                  id="contact-message"
                  label={t("message")}
                  rows={6}
                  error={fieldError("message")}
                  disabled={isSubmitting}
                  {...register("message")}
                />

                <AnimatePresence>
                  {showError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Alert variant="error">{errorMessage(result)}</Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  variant="dark"
                  size="block"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  icon={
                    canRetry ? (
                      <RotateCcw className="w-5 h-5" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )
                  }
                >
                  {canRetry ? t("retry") : t("send")}
                </Button>

                <p
                  className={cn(
                    "text-xs text-right pr-1 transition-colors",
                    (errors.message?.message ?? "").includes("max")
                      ? "text-error"
                      : "text-text-tertiary",
                  )}
                  aria-live="polite"
                >
                  {t("characters_hint", { max: 2000 })}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
