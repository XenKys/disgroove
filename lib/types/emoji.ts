import type { User, RawUser, snowflake } from ".";

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface RawEmoji {
  id: snowflake | null;
  name: string | null;
  roles?: Array<snowflake>;
  user?: RawUser;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}

export interface Emoji {
  id: snowflake | null;
  name: string | null;
  roles?: Array<snowflake>;
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}

export interface CreateGuildEmojiParams {
  name: string;
  image: string;
  roles: Array<string>;
}

export interface EditGuildEmojiParams {
  name?: string;
  roles?: Array<string> | null;
}
