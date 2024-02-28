import { Base, Guild, User } from ".";
import type { Client } from "../Client";
import { Endpoints } from "../rest";
import type { JSONGuildTemplate, RawGuildTemplate } from "../types";

/** https://discord.com/developers/docs/resources/guild-template */
export class GuildTemplate extends Base {
  protected override raw: RawGuildTemplate;

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

  constructor(data: RawGuildTemplate, client: Client) {
    super(client);

    this.raw = data;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.usageCount = data.usage_count;
    this.creatorId = data.creator_id;
    this.createdAt = data.created_at;
    this.creator = new User(data.creator, client);
    this.updatedAt = data.updated_at;
    this.sourceGuildId = data.source_guild_id;
    this.serializedSourceGuild = new Guild(
      data.serialized_source_guild,
      client
    );
    this.isDirty = data.is_dirty;
  }

  /** https://discord.com/developers/docs/resources/guild-template#delete-guild-template */
  async delete(): Promise<JSONGuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.delete<RawGuildTemplate>(
        Endpoints.guildTemplate(this.sourceGuildId, this.code)
      ),
      this.client
    ).toJSON();
  }

  /** https://discord.com/developers/docs/resources/guild-template#modify-guild-template */
  async edit(options: {
    name?: string;
    description?: string | null;
  }): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.patch<RawGuildTemplate>(
        Endpoints.guildTemplate(this.sourceGuildId, this.code),
        {
          json: {
            name: options.name,
            description: options.description,
          },
        }
      ),
      this.client
    );
  }

  /** https://discord.com/developers/docs/resources/guild-template#sync-guild-template */
  async sync(): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.put<RawGuildTemplate>(
        Endpoints.guildTemplate(this.sourceGuildId, this.code)
      ),
      this.client
    );
  }

  override toRaw(): RawGuildTemplate {
    return this.raw;
  }

  override toJSON(): JSONGuildTemplate {
    return {
      code: this.code,
      name: this.name,
      description: this.description,
      usageCount: this.usageCount,
      creatorId: this.creatorId,
      creator: this.creator.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      sourceGuildId: this.sourceGuildId,
      serializedSourceGuild: this.serializedSourceGuild.toJSON(),
      isDirty: this.isDirty,
    };
  }
}
