// ─────────────────────────────────────────────────────────────────────────────
// Backend API transport.
//
// Set NEXT_PUBLIC_API_URL to point at a local backend during development
// (http://localhost:8000). The deployed Render instance is the fallback so a
// build without the env var still resolves in production.
// ─────────────────────────────────────────────────────────────────────────────

const FALLBACK_API_URL = "https://leo-portfolio-f9vp.onrender.com";

/** Free-tier hosting sleeps when idle; don't let a cold start hang a render. */
const DEFAULT_TIMEOUT_MS = 6000;

/** How long Next may serve a cached payload before revalidating. */
const DEFAULT_REVALIDATE_S = 120;

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || FALLBACK_API_URL
).replace(/\/+$/, "");

/** Build an absolute backend URL from a root-relative path, e.g. "/api/decay". */
export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * The backend is a separate deploy that can be asleep, redeploying, or down.
 * Callers get an explicit reachability flag instead of an exception, so a page
 * can render an honest "feed offline" state rather than crashing or, worse,
 * silently showing stale invented numbers.
 */
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; data: null; error: string };

export async function fetchApi<T>(
  path: string,
  options: { revalidate?: number; timeoutMs?: number } = {},
): Promise<ApiResult<T>> {
  const {
    revalidate = DEFAULT_REVALIDATE_S,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  try {
    const res = await fetch(apiUrl(path), {
      signal: AbortSignal.timeout(timeoutMs),
      next: { revalidate },
    });

    if (!res.ok) {
      return { ok: false, data: null, error: `HTTP ${res.status}` };
    }

    return { ok: true, data: (await res.json()) as T };
  } catch (e) {
    const error =
      e instanceof DOMException && e.name === "TimeoutError"
        ? `Timed out after ${timeoutMs}ms`
        : e instanceof Error
          ? e.message
          : "Unknown error";
    return { ok: false, data: null, error };
  }
}
