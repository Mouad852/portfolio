import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, isLocale } from "@/resources/i18n";

/**
 * Serves the default locale unprefixed.
 *
 * `/about` is rewritten internally to `/en/about` so the `[locale]` segment
 * always resolves, while the address bar keeps the clean URL. Prefixed locales
 * (`/fr/about`) pass through untouched.
 *
 * This is a rewrite, not a redirect — visitors and crawlers get the content in
 * one hop. Browser-language sniffing is deliberately not implemented: it breaks
 * crawling and overrides an explicit choice. The header switcher is the only
 * thing that changes locale.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const firstSegment = pathname.split("/").filter(Boolean)[0];

  // Already carries a locale prefix — nothing to do.
  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * Skip API routes, Next internals, and anything that looks like a file
   * (favicon.ico, images, sitemap.xml, robots.txt, the CV pdf, …).
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
