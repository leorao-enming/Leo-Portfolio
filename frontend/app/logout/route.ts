import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Clears the auth cookie and returns the operator to the login screen.
 *
 * The dashboard header links here rather than straight to /login — linking to
 * /login on its own left the cookie in place, so the session stayed valid and
 * the proxy would have waved the user straight back into /dashboard.
 */
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));

  response.cookies.set("auth-token", "", {
    path: "/",
    maxAge: 0,
    sameSite: "strict",
  });

  return response;
}
