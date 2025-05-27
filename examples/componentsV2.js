const {
  Client,
  InteractionType,
  InteractionCallbackType,
  ComponentTypes,
  MessageFlags,
  ButtonStyles,
} = require("disgroove");
const client = new Client("B0t.T0k3N");

client.once("ready", () => {
  client.bulkEditGlobalApplicationCommands(client.application.id, [
    {
      name: "componentsv2",
      description: "Responds with the new Discord components",
    },
  ]);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.name === "componentsv2") {
      client.createInteractionResponse(interaction.id, interaction.token, {
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          flags: MessageFlags.IsComponentsV2,
          components: [
            {
              type: ComponentTypes.Container,
              components: [
                {
                  type: ComponentTypes.TextDisplay,
                  content: "### Use the new Discord components!",
                },
                {
                  type: ComponentTypes.Separator,
                  divider: true,
                },
                {
                  type: ComponentTypes.TextDisplay,
                  content:
                    "Make sure you include the `IsComponentsV2` flag in your message to use these new components.",
                },
                {
                  type: ComponentTypes.ActionRow,
                  components: [
                    {
                      type: ComponentTypes.Button,
                      style: ButtonStyles.Secondary,
                      label: "You can also include action rows here!",
                      customID: "secondary",
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
    }
  }
});

client.connect();
