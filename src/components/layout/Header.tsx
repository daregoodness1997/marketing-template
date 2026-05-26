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
            className="flex items-center border border-slate-200 rounded-full px-1 py-1 bg-slate-100/50"
            role="group"
            aria-label="Language"
          >
            <button
              onClick={() => switchLocale("cs")}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-full transition-all",
                locale === "cs"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-400",
              )}
              aria-current={locale === "cs" ? "true" : undefined}
              aria-label="Čeština"
            >
              CS
            </button>
            <button
              onClick={() => switchLocale("en")}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-full transition-all",
                locale === "en"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-400",
              )}
              aria-current={locale === "en" ? "true" : undefined}
              aria-label="English"
            >
              EN
            </button>
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
            <button
              onClick={() => switchLocale(locale === "cs" ? "en" : "cs")}
              className="flex items-center gap-2 text-lg font-medium text-slate-900"
            >
              <Globe className="w-5 h-5" aria-hidden="true" />
              {locale === "cs" ? "English" : "Čeština"}
            </button>
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
