"use client";

import { usePathname } from "next/navigation";

import { Line, Row, ToggleButton } from "@once-ui-system/core";

import {
  localeFromPathname,
  localeLabels,
  localeNames,
  localePath,
  locales,
  stripLocale,
} from "@/resources";

/**
 * Switches locale while staying on the same route.
 *
 * Locale is read from the URL rather than from state, so the choice survives a
 * reload, is shareable as a link, and stays crawlable. There is deliberately no
 * browser-language auto-redirect — this switcher is the only thing that changes
 * language.
 */
export const LanguageSwitcher = () => {
  const pathname = usePathname() ?? "/";

  const activeLocale = localeFromPathname(pathname);
  const route = stripLocale(pathname);

  return (
    <>
      <Line background="neutral-alpha-medium" vert maxHeight="24" />
      <Row gap="2" vertical="center">
        {locales.map((locale) => (
          <ToggleButton
            key={locale}
            href={localePath(locale, route)}
            label={localeLabels[locale]}
            selected={locale === activeLocale}
            aria-label={`Switch language to ${localeNames[locale]}`}
            lang={locale}
          />
        ))}
      </Row>
    </>
  );
};
