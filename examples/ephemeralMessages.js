const {
  Client,
  InteractionType,
  InteractionCallbackType,
  MessageFlags,
} = require("disgroove");
const client = new Client("token");

client.once("ready", () =>
  client.application.bulkEditGlobalApplicationCommands([
    {
      name: "ephemeral",
      description: "Responds with an ephemeral message",
    },
  ])
);

client.on("interactionCreate", (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.data.name === "ephemeral") {
    interaction.createResponse({
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: "This is an ephemeral message!",
        flags: MessageFlags.Ephemeral,
      },
    });
  }
});

client.connect();
