import type { Guild, User, RawGuild, RawUser, snowflake, timestamp } from ".";

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
  creatorId: snowflake;
  creator: User;
  createdAt: timestamp;
  updatedAt: timestamp;
  sourceGuildId: snowflake;
  serializedSourceGuild: Guild;
  isDirty: boolean | null;
}

export interface CreateGuildFromGuildTemplateParams {
  name: string;
  icon?: string;
}

export interface CreateGuildTemplateParams {
  name: string;
  description?: string | null;
}

export interface EditGuildTemplateParams {
  name?: string;
  description?: string | null;
}
