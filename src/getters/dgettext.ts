import { getLib } from "../library";

/**
 * Look up `msgid` in the `domainName` message catalog for the current
 * LC_MESSAGES locale.
 */
export function dgettext(domainName: string, msgid: string): string {
  const func = getLib().func(
    "char *dgettext (char *__domainname, char *__msgid)",
  );

  return func(domainName, msgid);
}
