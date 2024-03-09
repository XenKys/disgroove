const {
  Client,
  InteractionType,
  InteractionCallbackType,
} = require("disgroove");
const client = new Client("token");

client.once("ready", () =>
  client.bulkEditGlobalApplicationCommands(client.application.id, [
    {
      name: "embed",
      description: "Responds with an embed",
    },
  ])
);

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.data.name === "embed") {
    client.createInteractionResponse(interaction.id, interaction.token, {
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        embeds: [
          {
            color: 5793266,
            description: "Description",
            title: "Title",
          },
        ],
      },
    });
  }
});

client.connect();
