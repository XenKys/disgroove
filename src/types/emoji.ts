import type { RawUser } from ".";
import type { User } from "../structures";

/* https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
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
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}
