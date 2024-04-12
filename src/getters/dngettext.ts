import { getLib } from "../library";

/**
 * Similar to `dgettext` but select the plural form corresponding to the
 * number `n`.
 */
export function dngettext(
  domainName: string,
  msgid1: string,
  msgid2: string,
  n: number,
): string {
  const func = getLib().func(
    "char *dngettext (char *__domainname, char *__msgid1, char *__msgid2, int __n)",
  );
  return func(domainName, msgid1, msgid2, n);
}
