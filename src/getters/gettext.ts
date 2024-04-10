import { getLib } from "../library";

const func = getLib().func("char *gettext (char *__msgid)");

/**
 * Look up `msgid` in the current default message catalog for the current
 * LC_MESSAGES locale.  If not found, returns `msgid` itself (the default
 * text).
 */
export function gettext(msgid: string): string {
  return func(msgid);
}
