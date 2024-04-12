import { getLib } from "../library";

/**
 * Specify that the `domainName` message catalog will be found
 * in `dirName` rather than in the system locale data base.
 */
export function bindTextDomain(
  domainName: string,
  dirName?: string,
): string | undefined {
  const func = getLib().func(
    "char *bindtextdomain (char *__domainname, char *__dirname)",
  );

  return func(domainName, dirName || null) || undefined;
}
