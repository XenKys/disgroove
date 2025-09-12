const {
  Client,
  InteractionType,
  InteractionCallbackType,
  ComponentTypes,
  MessageFlags,
} = require("disgroove");
const client = new Client("B0t.T0k3N");

client.once("ready", () => {
  client.bulkEditGlobalApplicationCommands(client.application.id, [
    {
      name: "string-select",
      description: "Responds with a string select menu",
    },
  ]);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.name === "string-select") {
      client.createInteractionResponse(interaction.id, interaction.token, {
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          components: [
            {
              type: ComponentTypes.ActionRow,
              components: [
                {
                  type: ComponentTypes.StringSelect,
                  customId: "string-select",
                  options: [
                    {
                      label: "Option 1",
                      value: "1",
                    },
                    {
                      label: "Option 2",
                      value: "2",
                    },
                    {
                      label: "Option 3",
                      value: "3",
                    },
                    {
                      label: "Option 4",
                      value: "4",
                    },
                  ],
                  placeholder: "Select an option",
                  maxValues: 4,
                },
              ],
            },
          ],
        },
      });
    }
  } else if (interaction.type === InteractionType.MessageComponent) {
    if (interaction.data.customId === "string-select") {
      client.createInteractionResponse(interaction.id, interaction.token, {
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          content: `You selected the options ${interaction.data.values
            .map((value) => value)
            .join(", ")}`,
          flags: MessageFlags.Ephemeral,
        },
      });
    }
  }
});

client.connect();
