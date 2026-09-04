import type { Locale } from "./i18n";

import * as en from "./content.en";
import * as fr from "./content.fr";

const content = { en, fr } as const;

/**
 * Content for a locale.
 *
 * Both locale modules are typed against the same Person / Home / About / …
 * types, so a missing field in one language is a compile error rather than a
 * silent gap at runtime.
 */
export function getContent(locale: Locale) {
  return content[locale];
}

export type Content = ReturnType<typeof getContent>;

// Locale-independent values (name, email, social links) are read from the
// English module, which acts as the canonical source for config and schema.
export {
  person,
  social,
  newsletter,
  home,
  about,
  blog,
  work,
  gallery,
  services,
  contact,
} from "./content.en";

export {
  locales,
  defaultLocale,
  localeNames,
  localeLabels,
  isLocale,
  localePath,
  stripLocale,
  localeFromPathname,
} from "./i18n";
export type { Locale } from "./i18n";

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
} from "./once-ui.config";
