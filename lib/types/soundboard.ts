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

export interface SoundboardSound {
  name: string;
  soundID: snowflake;
  volume: number;
  emojiID: snowflake | null;
  emojiName: string | null;
  guildID?: snowflake;
  available: boolean;
  user?: User;
}
