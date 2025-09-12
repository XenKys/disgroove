const {
  Client,
  InteractionType,
  InteractionCallbackType,
  ComponentTypes,
  ButtonStyles,
} = require("disgroove");
const client = new Client("B0t.T0k3N");

client.once("ready", () => {
  client.bulkEditGlobalApplicationCommands(client.application.id, [
    {
      name: "buttons",
      description: "Responds with some buttons",
    },
  ]);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.name === "buttons") {
      client.createInteractionResponse(interaction.id, interaction.token, {
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          components: [
            {
              type: ComponentTypes.ActionRow,
              components: [
                {
                  customId: "green",
                  label: "Green button",
                  style: ButtonStyles.Success,
                  type: ComponentTypes.Button,
                },
                {
                  label: "URL button",
                  style: ButtonStyles.Link,
                  type: ComponentTypes.Button,
                  url: "https://github.com/XenKys/disgroove",
                },
                {
                  customId: "red",
                  disabled: true,
                  label: "Disabled red button",
                  style: ButtonStyles.Danger,
                  type: ComponentTypes.Button,
                },
              ],
            },
          ],
        },
      });
    }
  }

  if (interaction.type === InteractionType.MessageComponent) {
    if (interaction.data.componentType !== ComponentTypes.Button) return;

    if (interaction.data.customId == "green") {
      client.createInteractionResponse(interaction.id, interaction.token, {
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          content: "Green button clicked",
        },
      });
    }
  }
});

client.connect();
