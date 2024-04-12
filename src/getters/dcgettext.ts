import { LC } from "../lc";
import { getLib } from "../library";

/**
 * Look up `msgid` in the `domainName` message catalog for the current
 * `category` locale.
 */
export function dcgettext(
  domainName: string,
  msgid: string,
  category: LC,
): string {
  const func = getLib().func(
    "char *dcgettext (char *__domainname, char *__msgid, int __category)",
  );

  return func(domainName, msgid, category);
}
