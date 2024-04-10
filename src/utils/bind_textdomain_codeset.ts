import { getLib } from "../library";

const func = getLib().func(
  "char *bind_textdomain_codeset (char *__domainname, char *__codeset)",
);

/**
 * Specify that the `domainName` message catalog will be found
 * in `dirName` rather than in the system locale data base.
 */
export function bindTextDomainCodeset(
  domainName: string,
  codeset?: string,
): string | undefined {
  return func(domainName, codeset || null) || undefined;
}
