import type { Channel, RawChannel } from "../types/channel";
import type { snowflake } from "../types/common";
import type { GuildMember, RawGuildMember } from "../types/guild";
import type {
  RawInteraction,
  Interaction,
  RawResolvedData,
  ResolvedData,
  RawInteractionCallbackResponse,
  InteractionCallbackResponse,
} from "../types/interaction";
import type { Role, RawRole } from "../types/role";
import type { User, RawUser } from "../types/user";
import { Channels } from "./Channels";
import { Guilds } from "./Guilds";
import { Users } from "./Users";
import { Entitlements } from "./Entitlements";
import { Roles } from "./Roles";
import { Messages } from "./Messages";
import type {
  RawMessageInteractionMetadata,
  MessageInteractionMetadata,
  Message,
  Attachment,
  RawMessage,
  RawAttachment,
} from "../types/message";

export class Interactions {
  static interactionCallbackResponseFromRaw(
    interactionCallbackResponse: RawInteractionCallbackResponse
  ): InteractionCallbackResponse {
    return {
      interaction: {
        id: interactionCallbackResponse.interaction.id,
        type: interactionCallbackResponse.interaction.type,
        activityInstanceID:
          interactionCallbackResponse.interaction.activity_instance_id,
        responseMessageID:
          interactionCallbackResponse.interaction.response_message_id,
        responseMessageLoading:
          interactionCallbackResponse.interaction.response_message_loading,
        responseMessageEphemeral:
          interactionCallbackResponse.interaction.response_message_ephemeral,
      },
      resource:
        interactionCallbackResponse.resource !== undefined
          ? {
              type: interactionCallbackResponse.resource.type,
              activityInstance:
                interactionCallbackResponse.resource.activity_instance,
              message:
                interactionCallbackResponse.resource.message !== undefined
                  ? Messages.messageFromRaw(
                      interactionCallbackResponse.resource.message
                    )
                  : undefined,
            }
          : undefined,
    };
  }

  static interactionCallbackResponseToRaw(
    interactionCallbackResponse: InteractionCallbackResponse
  ): RawInteractionCallbackResponse {
    return {
      interaction: {
        id: interactionCallbackResponse.interaction.id,
        type: interactionCallbackResponse.interaction.type,
        activity_instance_id:
          interactionCallbackResponse.interaction.activityInstanceID,
        response_message_id:
          interactionCallbackResponse.interaction.responseMessageID,
        response_message_loading:
          interactionCallbackResponse.interaction.responseMessageLoading,
        response_message_ephemeral:
          interactionCallbackResponse.interaction.responseMessageEphemeral,
      },
      resource:
        interactionCallbackResponse.resource !== undefined
          ? {
              type: interactionCallbackResponse.resource.type,
              activity_instance:
                interactionCallbackResponse.resource.activityInstance,
              message:
                interactionCallbackResponse.resource.message !== undefined
                  ? Messages.messageToRaw(
                      interactionCallbackResponse.resource.message
                    )
                  : undefined,
            }
          : undefined,
    };
  }

  static interactionFromRaw(interaction: RawInteraction): Interaction {
    return {
      id: interaction.id,
      applicationID: interaction.application_id,
      type: interaction.type,
      data:
        interaction.data !== undefined
          ? {
              id: interaction.data.id,
              name: interaction.data.name,
              type: interaction.data.type,
              resolved:
                interaction.data.resolved !== undefined
                  ? Interactions.resolvedDataFromRaw(interaction.data.resolved)
                  : undefined,
              options: interaction.data.options,
              guildID: interaction.data.guild_id,
              targetID: interaction.data.target_id,
              customID: interaction.data.custom_id,
              componentType: interaction.data.component_type,
              values: interaction.data.values,
              components: interaction.data.components?.map((component) => ({
                type: component.type,
                components: component.components?.map((c) => ({
                  type: c.type,
                  customID: c.custom_id,
                  style: c.style,
                  label: c.label,
                  minLength: c.min_length,
                  maxLength: c.max_length,
                  required: c.required,
                  value: c.value,
                  placeholder: c.placeholder,
                })),
              })),
            }
          : undefined,
      guild:
        interaction.guild !== undefined
          ? {
              locale: interaction.guild.locale,
              id: interaction.guild.id,
              features: interaction.guild.features,
            }
          : undefined,
      guildID: interaction.guild_id,
      channel:
        interaction.channel !== undefined
          ? Channels.channelFromRaw(interaction.channel)
          : undefined,
      channelID: interaction.channel_id,
      member:
        interaction.member !== undefined
          ? Guilds.guildMemberFromRaw(interaction.member)
          : undefined,
      user:
        interaction.user !== undefined
          ? Users.userFromRaw(interaction.user)
          : undefined,
      token: interaction.token,
      version: interaction.version,
      message:
        interaction.message !== undefined
          ? Messages.messageFromRaw(interaction.message)
          : undefined,
      appPermissions: interaction.app_permissions,
      locale: interaction.locale,
      guildLocale: interaction.guild_locale,
      entitlements: interaction.entitlements.map((entitlement) =>
        Entitlements.entitlementFromRaw(entitlement)
      ),
      authorizingIntegrationOwners: {
        "0": interaction.authorizing_integration_owners[0],
        "1": interaction.authorizing_integration_owners[1],
      },
      context: interaction.context,
    };
  }

  static interactionMetadataFromRaw(
    interactionMetadata: RawMessageInteractionMetadata
  ): MessageInteractionMetadata {
    return {
      id: interactionMetadata.id,
      type: interactionMetadata.type,
      user: Users.userFromRaw(interactionMetadata.user),
      authorizingIntegrationOwners: {
        "0": interactionMetadata.authorizing_integration_owners[0],
        "1": interactionMetadata.authorizing_integration_owners[1],
      },
      originalResponseMessageID:
        interactionMetadata.original_response_message_id,
      interactedMessageID: interactionMetadata.interacted_message_id,
      triggeringInteractionMetadata:
        interactionMetadata.triggering_interaction_metadata !== undefined
          ? Interactions.interactionMetadataFromRaw(
              interactionMetadata.triggering_interaction_metadata
            )
          : undefined,
    };
  }

  static interactionMetadataToRaw(
    interactionMetadata: MessageInteractionMetadata
  ): RawMessageInteractionMetadata {
    return {
      id: interactionMetadata.id,
      type: interactionMetadata.type,
      user: Users.userToRaw(interactionMetadata.user),
      authorizing_integration_owners: {
        "0": interactionMetadata.authorizingIntegrationOwners[0],
        "1": interactionMetadata.authorizingIntegrationOwners[1],
      },
      original_response_message_id:
        interactionMetadata.originalResponseMessageID,
      interacted_message_id: interactionMetadata.interactedMessageID,
      triggering_interaction_metadata:
        interactionMetadata.triggeringInteractionMetadata !== undefined
          ? Interactions.interactionMetadataToRaw(
              interactionMetadata.triggeringInteractionMetadata
            )
          : undefined,
    };
  }

  static interactionToRaw(interaction: Interaction): RawInteraction {
    return {
      id: interaction.id,
      application_id: interaction.applicationID,
      type: interaction.type,
      data:
        interaction.data !== undefined
          ? {
              id: interaction.data.id,
              name: interaction.data.name,
              type: interaction.data.type,
              resolved:
                interaction.data.resolved !== undefined
                  ? Interactions.resolvedDataToRaw(interaction.data.resolved)
                  : undefined,
              options: interaction.data.options,
              guild_id: interaction.data.guildID,
              target_id: interaction.data.targetID,
              custom_id: interaction.data.customID,
              component_type: interaction.data.componentType,
              values: interaction.data.values,
              components: interaction.data.components?.map((component) => ({
                type: component.type,
                components: component.components?.map((c) => ({
                  type: c.type,
                  custom_id: c.customID,
                  style: c.style,
                  label: c.label,
                  min_length: c.minLength,
                  max_length: c.maxLength,
                  required: c.required,
                  value: c.value,
                  placeholder: c.placeholder,
                })),
              })),
            }
          : undefined,
      guild:
        interaction.guild !== undefined
          ? {
              locale: interaction.guild.locale,
              id: interaction.guild.id,
              features: interaction.guild.features,
            }
          : undefined,
      guild_id: interaction.guildID,
      channel:
        interaction.channel !== undefined
          ? Channels.channelToRaw(interaction.channel)
          : undefined,
      channel_id: interaction.channelID,
      member:
        interaction.member !== undefined
          ? Guilds.guildMemberToRaw(interaction.member)
          : undefined,
      user:
        interaction.user !== undefined
          ? Users.userToRaw(interaction.user)
          : undefined,
      token: interaction.token,
      version: interaction.version,
      message:
        interaction.message !== undefined
          ? Messages.messageToRaw(interaction.message)
          : undefined,
      app_permissions: interaction.appPermissions,
      locale: interaction.locale,
      guild_locale: interaction.guildLocale,
      entitlements: interaction.entitlements.map((entitlement) =>
        Entitlements.entitlementToRaw(entitlement)
      ),
      authorizing_integration_owners: {
        "0": interaction.authorizingIntegrationOwners[0],
        "1": interaction.authorizingIntegrationOwners[1],
      },
      context: interaction.context,
    };
  }

  static resolvedDataFromRaw(resolvedData: RawResolvedData): ResolvedData {
    let users: Record<snowflake, User> = {};
    let members: Record<snowflake, GuildMember> = {};
    let roles: Record<snowflake, Role> = {};
    let channels: Record<snowflake, Channel> = {};
    let messages: Record<snowflake, Message> = {};
    let attachments: Record<snowflake, Attachment> = {};

    if (resolvedData.users !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.users)) {
        users[key] = Users.userFromRaw(value);
      }
    }

    if (resolvedData.members !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.members)) {
        members[key] = Guilds.guildMemberFromRaw(value);
      }
    }

    if (resolvedData.roles !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.roles)) {
        roles[key] = Roles.roleFromRaw(value);
      }
    }

    if (resolvedData.channels !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.channels)) {
        channels[key] = Channels.channelFromRaw(value);
      }
    }

    if (resolvedData.messages !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.messages)) {
        messages[key] = Messages.messageFromRaw(value);
      }
    }

    if (resolvedData.attachments !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.attachments)) {
        attachments[key] = Messages.attachmentFromRaw(value);
      }
    }

    return {
      users,
      members,
      roles,
      channels,
      messages,
      attachments,
    };
  }

  static resolvedDataToRaw(resolvedData: ResolvedData): RawResolvedData {
    let users: Record<snowflake, RawUser> = {};
    let members: Record<snowflake, RawGuildMember> = {};
    let roles: Record<snowflake, RawRole> = {};
    let channels: Record<snowflake, RawChannel> = {};
    let messages: Record<snowflake, RawMessage> = {};
    let attachments: Record<snowflake, RawAttachment> = {};

    if (resolvedData.users !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.users)) {
        users[key] = Users.userToRaw(value);
      }
    }

    if (resolvedData.members !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.members)) {
        members[key] = Guilds.guildMemberToRaw(value);
      }
    }

    if (resolvedData.roles !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.roles)) {
        roles[key] = Roles.roleToRaw(value);
      }
    }

    if (resolvedData.channels !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.channels)) {
        channels[key] = Channels.channelToRaw(value);
      }
    }

    if (resolvedData.messages !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.messages)) {
        messages[key] = Messages.messageToRaw(value);
      }
    }

    if (resolvedData.attachments !== undefined) {
      for (const [key, value] of Object.entries(resolvedData.attachments)) {
        attachments[key] = Messages.attachmentToRaw(value);
      }
    }

    return {
      users,
      members,
      roles,
      channels,
      messages,
      attachments,
    };
  }
}
