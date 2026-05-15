import type { ContactFormValues } from "@/lib/schemas/contact";

const CONTACT_API = process.env.NEXT_PUBLIC_CONTACT_API_URL ?? "/api/contact";
const REQUEST_TIMEOUT = 15_000;

export type ContactResult =
  | { ok: true }
  | { ok: false; code: "VALIDATION" | "RATE_LIMIT" | "SERVER" | "NETWORK" };

type ContactErrorCode = Extract<ContactResult, { ok: false }>["code"];

const RETRYABLE: ContactErrorCode[] = ["SERVER", "NETWORK"];

export function isRetryable(result: ContactResult): boolean {
  return !result.ok && RETRYABLE.includes(result.code);
}

async function postContact(
  data: Omit<ContactFormValues, "_hp">,
  signal?: AbortSignal,
): Promise<ContactResult> {
  try {
    const res = await fetch(CONTACT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal,
    });

    if (res.ok) return { ok: true };
    if (res.status === 422) return { ok: false, code: "VALIDATION" };
    if (res.status === 429) return { ok: false, code: "RATE_LIMIT" };
    return { ok: false, code: "SERVER" };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { ok: false, code: "NETWORK" };
    }
    return { ok: false, code: "NETWORK" };
  }
}

/**
 * Submit the contact form with automatic retry (exponential back-off).
 * Only retries on transient errors (SERVER, NETWORK).
 */
export async function submitContactForm(
  values: ContactFormValues,
  maxRetries = 2,
): Promise<ContactResult> {
  const { _hp: _, ...data } = values;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const result = await postContact(data, controller.signal);

    clearTimeout(timeout);

    if (result.ok || !isRetryable(result) || attempt === maxRetries) {
      return result;
    }

    await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
  }

  return { ok: false, code: "NETWORK" };
}
