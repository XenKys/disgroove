import type { RawSoundboardSound, SoundboardSound } from "../types/soundboard";
import { Users } from "./Users";

export class Soundboards {
  static soundboardSoundFromRaw(sound: RawSoundboardSound): SoundboardSound {
    return {
      name: sound.name,
      soundID: sound.sound_id,
      volume: sound.volume,
      emojiID: sound.emoji_id,
      emojiName: sound.emoji_name,
      guildID: sound.guild_id,
      available: sound.available,
      user:
        sound.user !== undefined ? Users.userFromRaw(sound.user) : undefined,
    };
  }

  static soundboardSoundToRaw(sound: SoundboardSound): RawSoundboardSound {
    return {
      name: sound.name,
      sound_id: sound.soundID,
      volume: sound.volume,
      emoji_id: sound.emojiID,
      emoji_name: sound.emojiName,
      guild_id: sound.guildID,
      available: sound.available,
      user: sound.user !== undefined ? Users.userToRaw(sound.user) : undefined,
    };
  }
}
