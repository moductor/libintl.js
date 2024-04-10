import { LC } from "../lc";
import { getLib } from "../library";

const func = getLib().func(
  "char *dcngettext (char *__domainname, char *__msgid1, char *__msgid2, int __n, int __category)",
);

/**
 * Similar to `dcgettext` but select the plural form corresponding to the
 * number `n`.
 */
export function dcngettext(
  domainName: string,
  msgid1: string,
  msgid2: string,
  n: number,
  category: LC,
): string {
  return func(domainName, msgid1, msgid2, n, category);
}
