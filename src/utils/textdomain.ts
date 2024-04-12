import { getLib } from "../library";

/**
 * Set the current default message catalog to `domainName`.
 * If `domainName` is null, return the current default.
 * If `domainName` is "", reset to the default of "messages".
 */
export function textDomain(domainName?: string): string | undefined {
  const func = getLib().func("char *textdomain (char *__domainname)");

  return func(domainName || null) || undefined;
}
