export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

export type ConsentCategory = keyof Omit<ConsentState, "necessary">;

const CONSENT_COOKIE = "site_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export const CONSENT_DENIED: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  personalization: false,
};

export const CONSENT_ALL: ConsentState = {
  necessary: true,
  analytics: true,
  marketing: true,
  personalization: true,
};

/** Read the persisted consent state. Returns null if no decision was made. */
export function getStoredConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;

  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")[1];

  if (!raw) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      personalization: !!parsed.personalization,
    };
  } catch {
    return null;
  }
}

/** Persist consent state to a first-party cookie. */
export function saveConsent(state: ConsentState) {
  if (typeof document === "undefined") return;

  const value = encodeURIComponent(
    JSON.stringify({
      analytics: state.analytics,
      marketing: state.marketing,
      personalization: state.personalization,
    }),
  );

  document.cookie = `${CONSENT_COOKIE}=${value};path=/;max-age=${CONSENT_MAX_AGE};SameSite=Lax`;

  try {
    localStorage.setItem(
      CONSENT_COOKIE,
      state.analytics && state.marketing ? "all" : "necessary",
    );
  } catch {
    // storage blocked
  }
}

/** Check whether the user has made any consent decision. */
export function hasConsentDecision(): boolean {
  return getStoredConsent() !== null;
}
