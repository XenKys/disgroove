const {
  Client,
  InteractionType,
  InteractionCallbackType,
  ComponentTypes,
  TextInputStyles,
} = require("disgroove");
const client = new Client("token");

client.once("ready", () =>
  client.application.setGlobalApplicationCommands([
    {
      name: "modal",
      description: "Opens a modal submit",
    },
  ])
);

client.on("interactionCreate", (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.name === "modal") {
      interaction.createResponse({
        type: InteractionCallbackType.Modal,
        data: {
          customId: "modal-submit",
          title: "Modal submit",
          components: [
            {
              type: ComponentTypes.ActionRow,
              components: [
                {
                  type: ComponentTypes.TextInput,
                  customId: "text-input",
                  style: TextInputStyles.Short,
                  label: "Text input",
                },
              ],
            },
          ],
        },
      });
    }
  } else if (interaction.type === InteractionType.ModalSubmit) {
    if (interaction.data.customId === "modal-submit") {
      const actionRow = interaction.data.components.find(
        (component) => component.type === ComponentTypes.ActionRow
      );
      const textInput = actionRow.components.find(
        (component) => component.customId === "text-input"
      );

      interaction.createResponse({
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          content: `Text input: ${textInput}`,
        },
      });
    }
  }
});

client.connect();
