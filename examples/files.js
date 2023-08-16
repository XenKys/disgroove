const { Client, GatewayIntents } = require("disgroove");
const client = new Client("token", {
  intents: [GatewayIntents.GuildMessages, GatewayIntents.MessageContent],
});
const fs = require("fs");

client.on("messageCreate", async (message) => {
  if (message.content === "!file") {
    const channel = await client.getChannel(message.channelId);

    channel.createMessage({
      files: [
        {
          name: "text.txt",
          contents: fs.readFileSync(`${__dirname}/text.txt`),
        },
      ],
    });
  }
});

client.connect();
