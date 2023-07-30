import { Guild, User } from ".";
import type { Client } from "..";
import { Endpoints } from "../rest";
import type { JSONGuildTemplate, RawGuildTemplate } from "../types";

export class GuildTemplate {
  private client!: Client;
  public code: string;
  public name: string;
  public description: string | null;
  public usageCount: number;
  public creatorId: string;
  public creator: User;
  public createdAt: string;
  public updatedAt: string;
  public sourceGuildId: string;
  public serializedSourceGuild: Guild;
  public isDirty: boolean | null;

  constructor(data: RawGuildTemplate, client: Client) {
    this.client = client;
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

  /* https://discord.com/developers/docs/resources/guild-template#sync-guild-template */
  public async sync(): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.request(
        "PUT",
        Endpoints.guildTemplate(this.sourceGuildId, this.code)
      ),
      this.client
    );
  }

  /* https://discord.com/developers/docs/resources/guild-template#modify-guild-template */
  public async modify(options: {
    name?: string;
    description?: string | null;
  }): Promise<GuildTemplate> {
    return new GuildTemplate(
      await this.client.rest.request(
        "PATCH",
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

  /* https://discord.com/developers/docs/resources/guild-template#delete-guild-template */
  public async delete(): Promise<JSONGuildTemplate> {
    const data: RawGuildTemplate = await this.client.rest.request(
      "DELETE",
      Endpoints.guildTemplate(this.sourceGuildId, this.code)
    );

    return {
      code: data.code,
      name: data.name,
      description: data.description,
      usageCount: data.usage_count,
      creatorId: data.creator_id,
      creator: new User(data.creator, this.client),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      sourceGuildId: data.source_guild_id,
      serializedSourceGuild: new Guild(
        data.serialized_source_guild,
        this.client
      ),
      isDirty: data.is_dirty,
    };
  }

  public toJSON(): JSONGuildTemplate {
    return {
      code: this.code,
      name: this.name,
      description: this.description,
      usageCount: this.usageCount,
      creatorId: this.creatorId,
      creator: this.creator,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      sourceGuildId: this.sourceGuildId,
      serializedSourceGuild: this.serializedSourceGuild,
      isDirty: this.isDirty,
    };
  }
}
