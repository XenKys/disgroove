import type { RawSoundboardSound, SoundboardSound } from "../types/soundboard";
import { Users } from "./Users";

export class Soundboards {
  static soundboardSoundFromRaw(sound: RawSoundboardSound): SoundboardSound {
    return {
      name: sound.name,
      soundId: sound.sound_id,
      volume: sound.volume,
      emojiId: sound.emoji_id,
      emojiName: sound.emoji_name,
      guildId: sound.guild_id,
      available: sound.available,
      user:
        sound.user !== undefined ? Users.userFromRaw(sound.user) : undefined,
    };
  }

  static soundboardSoundToRaw(sound: SoundboardSound): RawSoundboardSound {
    return {
      name: sound.name,
      sound_id: sound.soundId,
      volume: sound.volume,
      emoji_id: sound.emojiId,
      emoji_name: sound.emojiName,
      guild_id: sound.guildId,
      available: sound.available,
      user: sound.user !== undefined ? Users.userToRaw(sound.user) : undefined,
    };
  }
}
