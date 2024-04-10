import { getLib } from "../library";

const func = getLib().func(
  "char *bindtextdomain (char *__domainname, char *__dirname)",
);

/**
 * Specify that the `domainName` message catalog will be found
 * in `dirName` rather than in the system locale data base.
 */
export function bindTextDomain(
  domainName: string,
  dirName?: string,
): string | undefined {
  return func(domainName, dirName || null) || undefined;
}
