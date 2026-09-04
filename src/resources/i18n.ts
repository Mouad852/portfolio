/**
 * Locale configuration.
 *
 * The default locale is served unprefixed (`/about`), every other locale is
 * prefixed (`/fr/about`). Middleware rewrites unprefixed paths onto the
 * `[locale]` segment so the URL stays clean without an extra redirect hop.
 */

export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Human-readable names, used by the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/** Short labels for the switcher UI. */
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Build an href for a route in a given locale.
 * The default locale is unprefixed; others get a `/<locale>` prefix.
 *
 *   localePath("en", "/work")  -> "/work"
 *   localePath("fr", "/work")  -> "/fr/work"
 *   localePath("fr", "/")      -> "/fr"
 */
export function localePath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (locale === defaultLocale) {
    return normalized;
  }

  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

/**
 * Strip the locale prefix from a pathname, returning the route-relative path.
 *
 *   stripLocale("/fr/work/medcore") -> "/work/medcore"
 *   stripLocale("/work/medcore")    -> "/work/medcore"
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return pathname === "" ? "/" : pathname;
}

/** Read the active locale out of a pathname, falling back to the default. */
export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}
