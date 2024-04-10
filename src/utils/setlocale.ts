import { LC } from "../lc";
import { getLib } from "../library";

const func = getLib().func("char *setlocale (int __category, char *__locale)");

/**
 * Set and/or return the current locale.
 */
export function setLocale(category: LC, locale?: string): string | undefined {
  return func(category, locale || null) || undefined;
}
