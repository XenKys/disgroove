import type { snowflake } from "./common";
import type { RawUser, User } from "./user";

/** https://discord.com/developers/docs/resources/soundboard#soundboard-sound-structure */
export interface RawSoundboardSound {
  name: string;
  sound_id: snowflake;
  volume: number;
  emoji_id: snowflake | null;
  emoji_name: string | null;
  guild_id?: snowflake;
  available: boolean;
  user?: RawUser;
}

/** https://discord.com/developers/docs/resources/soundboard#soundboard-sound-structure */

export interface SoundboardSound {
  name: string;
  soundId: snowflake;
  volume: number;
  emojiId: snowflake | null;
  emojiName: string | null;
  guildId?: snowflake;
  available: boolean;
  user?: User;
}
