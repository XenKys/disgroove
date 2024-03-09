const {
  Client,
  ApplicationCommandOptionType,
  InteractionType,
  InteractionCallbackType,
} = require("disgroove");
const client = new Client("token");

client.once("ready", () =>
  client.bulkEditGlobalApplicationCommands(client.application.id, [
    {
      name: "echo",
      description: "Responds with your provided text",
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "text",
          description: "The text",
          required: true,
        },
      ],
    },
  ])
);

client.on("interactionCreate", (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.data.name === "echo") {
    const text = interaction.data.options.find(
      (option) => option.name === "text"
    ).value;

    client.createInteractionResponse(interaction.id, interaction.token, {
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: text,
      },
    });
  }
});

client.connect();
