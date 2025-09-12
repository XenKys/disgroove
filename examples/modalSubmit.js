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
          customId: "modal-submit",
          title: "Modal",
          components: [
            {
              type: ComponentTypes.Label,
              label: "Short",
              component: {
                type: ComponentTypes.TextInput,
                customId: "short",
                style: TextInputStyles.Short,
              },
            },
            {
              type: ComponentTypes.Label,
              label: "Paragraph",
              component: {
                type: ComponentTypes.TextInput,
                customId: "paragraph",
                style: TextInputStyles.Paragraph,
              },
            },
          ],
        },
      });
    }
  }

  if (interaction.type === InteractionType.ModalSubmit) {
    if (interaction.data.customId === "modal-submit") {
      const short = interaction.data.components.find(
        (component) =>
          component.type === ComponentTypes.Label &&
          component.component.customId === "short"
      ).component;
      const paragraph = interaction.data.components.find(
        (component) =>
          component.type === ComponentTypes.Label &&
          component.component.customId === "paragraph"
      ).component;

      client.createInteractionResponse(interaction.id, interaction.token, {
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          content: `Short: ${short.value}\n\nParagraph:\n${paragraph.value}`,
        },
      });
    }
  }
});

client.connect();
