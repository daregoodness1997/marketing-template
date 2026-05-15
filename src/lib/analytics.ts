import { pushDataLayer } from "./gtm";

/** Form submission — contact form or demo request. */
export function trackFormSubmit(
  formId: string,
  extra?: Record<string, unknown>,
) {
  pushDataLayer("form_submit", { form_id: formId, ...extra });
}

/** CTA button click. */
export function trackCtaClick(ctaType: string, ctaText?: string) {
  pushDataLayer("cta_click", { cta_type: ctaType, cta_text: ctaText });
}

/** Language switch toggle. */
export function trackLanguageSwitch(from: string, to: string) {
  pushDataLayer("language_switch", {
    language_from: from,
    language_to: to,
  });
}

/** Phone number link click. */
export function trackPhoneClick(phoneNumber: string) {
  pushDataLayer("phone_click", { phone_number: phoneNumber });
}

/** Email link click. */
export function trackEmailClick(emailAddress: string) {
  pushDataLayer("email_click", { email_address: emailAddress });
}

/** Scroll-depth milestone. */
export function trackScrollDepth(percent: number) {
  pushDataLayer("scroll_depth", { scroll_percent: percent });
}

/** Google Ads conversion event via GTM. */
export function trackAdsConversion(
  conversionId: string,
  conversionLabel: string,
  value?: number,
  currency?: string,
) {
  pushDataLayer("ads_conversion", {
    conversion_id: conversionId,
    conversion_label: conversionLabel,
    conversion_value: value,
    conversion_currency: currency ?? "CZK",
  });
}

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

/** Start observing scroll depth. Call once on page mount. Returns cleanup. */
export function initScrollTracking(): () => void {
  if (typeof window === "undefined") return () => {};

  const reached = new Set<number>();

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const percent = Math.round((scrollTop / docHeight) * 100);

    for (const threshold of SCROLL_THRESHOLDS) {
      if (percent >= threshold && !reached.has(threshold)) {
        reached.add(threshold);
        trackScrollDepth(threshold);
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
