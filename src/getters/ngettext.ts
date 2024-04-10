import { getLib } from "../library";

const func = getLib().func(
  "char *ngettext (char *__msgid1, char *__msgid2, int __n)",
);

/**
 * Similar to `gettext` but select the plural form corresponding to the
 * number `n`.
 */
export function ngettext(msgid1: string, msgid2: string, n: number): string {
  return func(msgid1, msgid2, n);
}
