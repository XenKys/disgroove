const {
  Client,
  InteractionType,
  InteractionCallbackType,
  ComponentTypes,
  ButtonStyles,
} = require("disgroove");
const client = new Client("token");

client.once("ready", () =>
  client.application.bulkEditGlobalApplicationCommands([
    {
      name: "buttons",
      description: "Responds with some buttons",
    },
  ])
);

client.on("interactionCreate", (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.name === "button") {
      interaction.createResponse({
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          components: [
            {
              type: ComponentTypes.ActionRow,
              components: [
                {
                  customId: "normal-green",
                  label: "Normal green button",
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
                  customId: "disabled-red",
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
  } else if (interaction.type === InteractionType.MessageComponent) {
    if (
      interaction.data.componentType !== ComponentTypes.Button ||
      interaction.data.customId !== "normal-green"
    )
      return;

    interaction.createResponse({
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: "You've clicked the normal green button",
      },
    });
  }
});

client.connect();
