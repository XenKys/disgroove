import type { Locales } from "../constants";

export type LocaleMap = Partial<Record<Locales, string>>;

/** https://discord.com/developers/docs/reference#snowflakes */
export type snowflake = string;

/** https://discord.com/developers/docs/reference#iso8601-datetime */
export type timestamp = string;
