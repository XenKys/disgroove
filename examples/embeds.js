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
            title: "Title",
            description: "Description",
            url: "https://discord.com/",
            timestamp: new Date().toISOString(),
            color: 0x5865f2,
            footer: {
              text: "Footer text",
              iconURL: "https://i.imgur.com/jdOHapm.png",
            },
            image: {
              url: "https://di8m9w6rqrh5d.cloudfront.net/1zObrQ89Q4wHhgFCfYIUhMUvmNf4XjxO/resizable_f833d16a-028b-466c-a8de-57506cae31e0.png?width=1600",
            },
            thumbnail: {
              url: "https://i.imgur.com/jdOHapm.png",
            },
            author: {
              name: "Author name",
              url: "https://discord.com/",
              iconURL: "https://i.imgur.com/jdOHapm.png",
            },
            fields: [
              {
                name: "Field 1 (Inline)",
                value: "Value of field 1",
                inline: true,
              },
              {
                name: "Field 2 (Inline)",
                value: "Value of field 2",
                inline: true,
              },
              {
                name: "Field 3 (Not inline)",
                value: "Value of field 3",
                inline: false,
              },
            ],
          },
        ],
      },
    });
  }
});

client.connect();
