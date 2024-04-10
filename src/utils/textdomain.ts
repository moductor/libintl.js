import { getLib } from "../library";

const func = getLib().func("char *textdomain (char *__domainname)");

/**
 * Specify that the `domainName` message catalog will be found
 * in `dirName` rather than in the system locale data base.
 */
export function textDomain(domainName?: string): string | undefined {
  return func(domainName || null) || undefined;
}
