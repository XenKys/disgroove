import type { RawGuildTemplate, GuildTemplate } from "../types/guild-template";
import { Guilds } from "./Guilds";
import { Users } from "./Users";

export class GuildTemplates {
  static guildTemplateFromRaw(guildTemplate: RawGuildTemplate): GuildTemplate {
    return {
      code: guildTemplate.code,
      name: guildTemplate.name,
      description: guildTemplate.description,
      usageCount: guildTemplate.usage_count,
      creatorId: guildTemplate.creator_id,
      creator: Users.userFromRaw(guildTemplate.creator),
      createdAt: guildTemplate.created_at,
      updatedAt: guildTemplate.updated_at,
      sourceGuildId: guildTemplate.source_guild_id,
      serializedSourceGuild: Guilds.guildFromRaw(
        guildTemplate.serialized_source_guild
      ),
      isDirty: guildTemplate.is_dirty,
    };
  }

  static guildTemplateToRaw(guildTemplate: GuildTemplate): RawGuildTemplate {
    return {
      code: guildTemplate.code,
      name: guildTemplate.name,
      description: guildTemplate.description,
      usage_count: guildTemplate.usageCount,
      creator_id: guildTemplate.creatorId,
      creator: Users.userToRaw(guildTemplate.creator),
      created_at: guildTemplate.createdAt,
      updated_at: guildTemplate.updatedAt,
      source_guild_id: guildTemplate.sourceGuildId,
      serialized_source_guild: Guilds.guildToRaw(
        guildTemplate.serializedSourceGuild
      ),
      is_dirty: guildTemplate.isDirty,
    };
  }
}
