const {
  Client,
  InteractionType,
  InteractionCallbackType,
} = require("disgroove");
const client = new Client("token");

client.once("ready", () =>
  client.application.setGlobalApplicationCommands([
    {
      name: "embed",
      description: "Responds with an embed",
    },
  ])
);

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.data.name === "embed") {
    interaction.createResponse({
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
