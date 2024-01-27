const {
  Client,
  InteractionType,
  InteractionCallbackType,
  ComponentTypes,
} = require("disgroove");
const client = new Client("token");

client.once("ready", () =>
  client.application.setGlobalApplicationCommands([
    {
      name: "string-menu",
      description: "Responds with a string select menu",
    },
    {
      name: "user-menu",
      description: "Responds with a user select menu",
    },
    {
      name: "role-menu",
      description: "Responds with a role select menu",
    },
    {
      name: "channel-menu",
      description: "Responds with a channel select menu",
    },
  ])
);

client.on("interactionCreate", (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.name === "string-menu") {
      interaction.createResponse({
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          components: [
            {
              type: ComponentTypes.ActionRow,
              components: [
                {
                  customId: "string",
                  options: [
                    {
                      description: "First value",
                      label: "First option",
                      value: "first",
                    },
                    {
                      description: "Second value",
                      label: "Second option",
                      value: "second",
                    },
                    {
                      description: "Third value",
                      label: "Third option",
                      value: "third",
                    },
                  ],
                  placeholder: "Select an option",
                  type: ComponentTypes.StringSelect,
                },
              ],
            },
          ],
        },
      });
    } else if (interaction.data.name === "user-menu") {
      interaction.createResponse({
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          components: [
            {
              type: ComponentTypes.ActionRow,
              components: [
                {
                  customId: "user",
                  placeholder: "Select a user",
                  type: ComponentTypes.UserSelect,
                },
              ],
            },
          ],
        },
      });
    } else if (interaction.data.name === "role-menu") {
      interaction.createResponse({
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          components: [
            {
              type: ComponentTypes.ActionRow,
              components: [
                {
                  customId: "role",
                  placeholder: "Select a role",
                  type: ComponentTypes.RoleSelect,
                },
              ],
            },
          ],
        },
      });
    } else if (interaction.data.name === "channel-menu") {
      interaction.createResponse({
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          components: [
            {
              type: ComponentTypes.ActionRow,
              components: [
                {
                  customId: "channel",
                  placeholder: "Select a channel",
                  type: ComponentTypes.ChannelSelect,
                },
              ],
            },
          ],
          flags,
        },
      });
    }
  } else if (interaction.type === InteractionType.MessageComponent) {
    if (interaction.data.customId === "string") {
      interaction.createResponse({
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          content: `Clicked option value: ${interaction.data.values[0]}`,
          flags: MessageFlags.Ephemeral,
        },
      });
    } else if (interaction.data.customId === "user") {
      interaction.createResponse({
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          content: `Clicked user: <@${interaction.data.values[0]}>`,
          flags: MessageFlags.Ephemeral,
        },
      });
    } else if (interaction.data.customId === "role") {
      interaction.createResponse({
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          content: `Clicked role: <@&${interaction.data.values[0]}>`,
          flags: MessageFlags.Ephemeral,
        },
      });
    } else if (interaction.data.customId === "channel") {
      interaction.createResponse({
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          content: `Clicked channel: <#${interaction.data.values[0]}>`,
          flags: MessageFlags.Ephemeral,
        },
      });
    }
  }
});

client.connect();
