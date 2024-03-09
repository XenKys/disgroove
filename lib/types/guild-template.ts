import type { Guild, User, RawGuild, RawUser } from ".";

/** https://discord.com/developers/docs/resources/guild-template#guild-template-object-guild-template-structure */
export interface RawGuildTemplate {
  code: string;
  name: string;
  description: string | null;
  usage_count: number;
  creator_id: string;
  creator: RawUser;
  created_at: string;
  updated_at: string;
  source_guild_id: string;
  serialized_source_guild: RawGuild;
  is_dirty: boolean | null;
}

export interface GuildTemplate {
  code: string;
  name: string;
  description: string | null;
  usageCount: number;
  creatorId: string;
  creator: User;
  createdAt: string;
  updatedAt: string;
  sourceGuildId: string;
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
