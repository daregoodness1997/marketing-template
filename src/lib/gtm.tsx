"use client";

import Script from "next/script";
import type { ConsentState } from "./consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Push an event (+ optional params) to the GTM dataLayer. */
export function pushDataLayer(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

/**
 * Consent-mode defaults — must be the very first snippet in <head>.
 */
export function GtmConsent() {
  if (!GTM_ID || GTM_ID === "GTM-XXXXXXX") return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: [
          "window.dataLayer=window.dataLayer||[];",
          "function gtag(){dataLayer.push(arguments)}",
          "gtag('consent','default',{",
          "  'ad_storage':'denied',",
          "  'ad_user_data':'denied',",
          "  'ad_personalization':'denied',",
          "  'analytics_storage':'denied',",
          "  'functionality_storage':'denied',",
          "  'personalization_storage':'denied',",
          "  'security_storage':'granted',",
          "  'wait_for_update':500",
          "});",
          "dataLayer.push({",
          "  event:'consent_default',",
          "  consent_analytics:'denied',",
          "  consent_marketing:'denied',",
          "  consent_personalization:'denied'",
          "});",
        ].join("\n"),
      }}
    />
  );
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments as unknown as Record<string, unknown>);
    };
  }
}

/** Map granular consent categories to Consent Mode v2 signals. */
export function updateConsentMode(consent: ConsentState) {
  if (typeof window === "undefined") return;

  ensureGtag();

  const analytics = consent.analytics ? "granted" : "denied";
  const marketing = consent.marketing ? "granted" : "denied";
  const personalization = consent.personalization ? "granted" : "denied";

  window.gtag("consent", "update", {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: personalization,
    functionality_storage: "granted",
    personalization_storage: personalization,
  });

  pushDataLayer("consent_update", {
    consent_analytics: analytics,
    consent_marketing: marketing,
    consent_personalization: personalization,
  });
}

/** GTM container script (afterInteractive). */
export function GtmScript() {
  if (!GTM_ID || GTM_ID === "GTM-XXXXXXX") return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** GTM <noscript> fallback. */
export function GtmNoScript() {
  if (!GTM_ID || GTM_ID === "GTM-XXXXXXX") return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
