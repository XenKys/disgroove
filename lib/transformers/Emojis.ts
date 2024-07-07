import type { RawEmoji, Emoji } from "../types/emoji";
import { Users } from "./Users";

export class Emojis {
  static emojiFromRaw(emoji: RawEmoji): Emoji {
    return {
      id: emoji.id,
      name: emoji.name,
      roles: emoji.roles,
      user:
        emoji.user !== undefined ? Users.userFromRaw(emoji.user) : undefined,
      requireColons: emoji.require_colons,
      managed: emoji.managed,
      animated: emoji.animated,
      available: emoji.available,
    };
  }

  static emojiToRaw(emoji: Emoji): RawEmoji {
    return {
      id: emoji.id,
      name: emoji.name,
      roles: emoji.roles,
      user: emoji.user !== undefined ? Users.userToRaw(emoji.user) : undefined,
      require_colons: emoji.requireColons,
      managed: emoji.managed,
      animated: emoji.animated,
      available: emoji.available,
    };
  }
}
