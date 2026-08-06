// ─────────────────────────────────────────────────────────────────────────────
// Backend API base URL.
//
// Set NEXT_PUBLIC_API_URL to point at a local backend during development
// (http://localhost:8000). The deployed Render instance is the fallback so a
// build without the env var still resolves in production.
// ─────────────────────────────────────────────────────────────────────────────

const FALLBACK_API_URL = "https://leo-portfolio-f9vp.onrender.com";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || FALLBACK_API_URL
).replace(/\/+$/, "");

/** Build an absolute backend URL from a root-relative path, e.g. "/api/decay". */
export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
