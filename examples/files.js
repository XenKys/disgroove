const {
  Client,
  InteractionType,
  InteractionCallbackType,
} = require("disgroove");
const client = new Client("token");
const fs = require("fs");

client.once("ready", () =>
  client.application.bulkEditGlobalApplicationCommands([
    {
      name: "file",
      description: "Responds with a file",
    },
  ])
);

client.on("interactionCreate", (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.data.name === "file") {
    interaction.createResponse({
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        files: [
          {
            name: "text.txt",
            contents: fs.readFileSync(`${__dirname}/text.txt`),
          },
        ],
      },
    });
  }
});

client.connect();
