import { LC } from "../lc";
import { dcgettext } from "./dcgettext";
import { dgettext } from "./dgettext";
import { gettext } from "./gettext";

/**
 * Similar to `gettext` but allows to add context to the message.
 */
export function pgettext(_msgctxt: string, msgid: string): string {
  return gettext(msgid);
}

/**
 * Similar to `dgettext` but allows to add context to the message.
 */
export function dpgettext(
  domainName: string,
  _msgctxt: string,
  msgid: string,
): string {
  return dgettext(domainName, msgid);
}

/**
 * Similar to `dcgettext` but allows to add context to the message.
 */
export function dcpgettext(
  domainName: string,
  _msgctxt: string,
  msgid: string,
  category: LC,
): string {
  return dcgettext(domainName, msgid, category);
}
