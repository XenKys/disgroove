import type { JSONUser, RawUser } from ".";

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface RawEmoji {
  id: string | null;
  name: string | null;
  roles?: Array<string>;
  user?: RawUser;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}

export interface JSONEmoji {
  id: string | null;
  name: string | null;
  roles?: Array<string>;
  user?: JSONUser;
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
