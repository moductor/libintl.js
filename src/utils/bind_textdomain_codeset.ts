import { getLib } from "../library";

const func = getLib().func(
  "char *bind_textdomain_codeset (char *__domainname, char *__codeset)",
);

/**
 * Specify the character encoding in which the messages from the
 * `domainName` message catalog will be returned.
 */
export function bindTextDomainCodeset(
  domainName: string,
  codeset?: string,
): string | undefined {
  return func(domainName, codeset || null) || undefined;
}
