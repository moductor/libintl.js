import { LC } from "../lc";
import { getLib } from "../library";

/**
 * Set and/or return the current locale.
 */
export function setLocale(category: LC, locale?: string): string | undefined {
  const func = getLib().func(
    "char *setlocale (int __category, char *__locale)",
  );

  return func(category, locale || null) || undefined;
}
