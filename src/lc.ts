/**
 * The purposes that locales serve are grouped into categories, so that a user
 * or a program can choose the locale for each category independently.
 */
export enum LC {
  /**
   * Selects the character classification category of the C locale.
   */
  ctype,

  /**
   * Selects the numeric formatting category of the C locale.
   */
  numeric,

  /**
   * Selects the time formatting category of the C locale.
   */
  time,

  /**
   * Selects the collation category of the C locale.
   */
  collate,

  /**
   * Selects the monetary formatting category of the C locale.
   */
  monetary,

  /**
   * The language that should be used.
   */
  messages,

  /**
   * Selects the entire C locale.
   */
  all,
}
