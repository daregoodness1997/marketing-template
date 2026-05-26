"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { trackCtaClick, trackLanguageSwitch } from "@/lib/analytics";
import { Globe, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "#";

const languageOptions: Array<{ code: Locale; label: string; short: string }> = [
  { code: "cs", label: "Čeština", short: "CS" },
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "sw", label: "Kiswahili", short: "SW" },
  { code: "yo", label: "Yoruba", short: "YO" },
  { code: "ha", label: "Hausa", short: "HA" },
  { code: "ja", label: "日本語", short: "JA" },
  { code: "zh", label: "中文", short: "ZH" },
];

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [mobileMenuOpen, handleEscape]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: Array<{ name: string; id: string; href?: string }> = [
    { name: t("features"), id: "features" },
    { name: t("audience"), id: "audience" },
    { name: t("integrations"), id: "integrations" },
    { name: t("faq"), id: "faq" },
    { name: t("contact"), id: "contact" },
    { name: t("blog"), id: "blog", href: "/blog" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    try {
      localStorage.setItem("site_locale", newLocale);
      document.cookie = `site_locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    } catch {
      // SSR or storage blocked
    }

    trackLanguageSwitch(locale, newLocale);

    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(pathname + hash, { locale: newLocale });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-slate-200 py-3"
          : "bg-transparent py-5",
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
          aria-label="Home"
        >
          <Logo className="transition-transform group-hover:scale-105" />
        </a>

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navItems.map((item) =>
            item.href ? (
              <Link
                key={item.id}
                href={item.href}
                className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <div
            className="flex items-center border border-slate-200 rounded-full px-3 py-1 bg-slate-100/50"
            role="group"
            aria-label="Language"
          >
            <Globe className="w-4 h-4 text-slate-500 mr-2" aria-hidden="true" />
            <select
              value={locale}
              onChange={(e) => switchLocale(e.target.value as Locale)}
              aria-label="Language"
              className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none"
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.short}
                </option>
              ))}
            </select>
          </div>

          <a
            href={APP_URL}
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            onClick={() => trackCtaClick("signin", t("signin"))}
          >
            {t("signin")}
          </a>
        </div>

        <button
          className="md:hidden text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.nav
          id="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) =>
            item.href ? (
              <Link
                key={item.id}
                href={item.href}
                className="text-lg font-medium text-slate-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-lg font-medium text-slate-900"
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.name}
              </a>
            ),
          )}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <Globe className="w-5 h-5 mt-1" aria-hidden="true" />
              <div className="grid grid-cols-2 gap-2 w-full">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => switchLocale(option.code)}
                    className={cn(
                      "text-left rounded-lg px-3 py-2 border text-sm font-medium",
                      locale === option.code
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-900 border-slate-200",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <a
              href={APP_URL}
              className="w-full bg-primary text-white py-4 rounded-xl text-center font-bold text-lg"
            >
              {t("signin")}
            </a>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
