const {
  Client,
  InteractionType,
  InteractionCallbackType,
  ComponentTypes,
  TextInputStyles,
} = require("disgroove");
const client = new Client("B0t.T0k3N");

client.once("ready", () => {
  client.bulkEditGlobalApplicationCommands(client.application.id, [
    {
      name: "modal",
      description: "Opens a modal",
    },
  ]);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.name === "modal") {
      client.createInteractionResponse(interaction.id, interaction.token, {
        type: InteractionCallbackType.Modal,
        data: {
          customID: "modal-submit",
          title: "Modal",
          components: [
            {
              type: ComponentTypes.ActionRow,
              components: [
                {
                  type: ComponentTypes.TextInput,
                  customID: "text-input",
                  style: TextInputStyles.Short,
                  label: "Text input",
                },
              ],
            },
          ],
        },
      });
    }
  }

  if (interaction.type === InteractionType.ModalSubmit) {
    if (interaction.data.customID === "modal-submit") {
      const actionRow = interaction.data.components.find(
        (component) => component.type === ComponentTypes.ActionRow
      );
      const textInput = actionRow.components.find(
        (component) => component.customID === "text-input"
      ).value;

      client.createInteractionResponse(interaction.id, interaction.token, {
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          content: `Text input: ${textInput}`,
        },
      });
    }
  }
});

client.connect();
