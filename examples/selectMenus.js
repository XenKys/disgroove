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
      name: "menu",
      description: "Responds with the menu",
    },
  ]);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.name === "menu") {
      client.createInteractionResponse(interaction.id, interaction.token, {
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          components: [
            {
              type: ComponentTypes.ActionRow,
              components: [
                {
                  customId: "order",
                  options: [
                    {
                      label: "Pizza margherita",
                      description: "Price: €7,00",
                      value: "margherita",
                    },
                    {
                      label: "Pizza alla diavola",
                      description: "Price: €8,50",
                      value: "diavola",
                    },
                    {
                      label: "Pizza alle quattro stagioni",
                      description: "Price: €9,00",
                      value: "quattro-stagioni",
                    },
                  ],
                  placeholder: "Select a pizza",
                  type: ComponentTypes.StringSelect,
                },
              ],
            },
          ],
        },
      });
    }
  }

  if (interaction.type === InteractionType.MessageComponent) {
    if (interaction.data.customId === "order") {
      let orderedPizza;

      switch (interaction.data.values[0]) {
        case "margherita":
          orderedPizza = "Pizza margherita";
          break;
        case "diavola":
          orderedPizza = "Pizza alla diavola";
          break;
        case "quattro-stagioni":
          orderedPizza = "Pizza alle quattro stagioni";
          break;
      }

      client.createInteractionResponse(interaction.id, interaction.token, {
        type: InteractionCallbackType.ChannelMessageWithSource,
        data: {
          content: `You ordered a **${orderedPizza}**`,
          flags: MessageFlags.Ephemeral,
        },
      });
    }
  }
});

client.connect();
