const {
  Client,
  InteractionType,
  InteractionCallbackType,
} = require("disgroove");
const client = new Client("B0t.T0k3N");

client.once("ready", () => {
  client.bulkEditGlobalApplicationCommands(client.application.id, [
    {
      name: "embed",
      description: "Responds with an embed",
    },
  ]);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.data.name === "embed") {
    client.createInteractionResponse(interaction.id, interaction.token, {
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        embeds: [
          {
            title: "disgroove",
            description: "A module to interface with Discord",
            url: "https://npmjs.com/package/disgroove",
            timestamp: new Date().toISOString(),
            color: 16777215,
            author: {
              name: "XenKys",
              url: "https://github.com/XenKys",
              iconURL: "https://avatars.githubusercontent.com/u/78646587?v=4",
            },
          },
        ],
      },
    });
  }
});

client.connect();
