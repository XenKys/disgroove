import type { snowflake, timestamp } from "./common";
import type { RawGuild, Guild } from "./guild";
import type { RawUser, User } from "./user";

/** https://discord.com/developers/docs/resources/guild-template#guild-template-object-guild-template-structure */
export interface RawGuildTemplate {
  code: string;
  name: string;
  description: string | null;
  usage_count: number;
  creator_id: snowflake;
  creator: RawUser;
  created_at: timestamp;
  updated_at: timestamp;
  source_guild_id: snowflake;
  serialized_source_guild: RawGuild;
  is_dirty: boolean | null;
}

export interface GuildTemplate {
  code: string;
  name: string;
  description: string | null;
  usageCount: number;
  creatorID: snowflake;
  creator: User;
  createdAt: timestamp;
  updatedAt: timestamp;
  sourceGuildID: snowflake;
  serializedSourceGuild: Guild;
  isDirty: boolean | null;
}
