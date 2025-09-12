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
                  label: "Green",
                  style: ButtonStyles.Success,
                  type: ComponentTypes.Button,
                },
                {
                  customId: "red",
                  disabled: true,
                  label: "Red (Disabled)",
                  style: ButtonStyles.Danger,
                  type: ComponentTypes.Button,
                },
                {
                  customId: "blurple",
                  label: "Blurple",
                  style: ButtonStyles.Primary,
                  type: ComponentTypes.Button,
                },
                {
                  customId: "gray",
                  label: "Gray",
                  style: ButtonStyles.Secondary,
                  type: ComponentTypes.Button,
                },
                {
                  label: "URL button",
                  style: ButtonStyles.Link,
                  type: ComponentTypes.Button,
                  url: "https://discord.com",
                },
              ],
            },
          ],
        },
      });
    }
  } else if (interaction.type === InteractionType.MessageComponent) {
    if (interaction.data.componentType !== ComponentTypes.Button) return;

    client.createInteractionResponse(interaction.id, interaction.token, {
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: `${
          interaction.data.customId.charAt(0).toUpperCase() +
          interaction.data.customId.slice(1)
        } button clicked`,
      },
    });
  }
});

client.connect();
