# disgroove

A module to interface with Discord

- Fast
- Lightweight
- Flexible
- 100% coverage of the [Official Discord API Documentation](https://discord.com/developers/docs/intro)

## Installation

[**NodeJS v18**](https://nodejs.org) or newer required

```
npm install disgroove
```

#### Example

```js
const {
  Client,
  GatewayIntents,
  InteractionType,
  InteractionCallbackType,
  MessageFlags,
} = require("disgroove");
const client = new Client("B0t.T0k3N");

client.once("ready", () => {
  console.log("Logged in as", client.user.username);

  client.createGlobalApplicationCommand(client.application.id, {
    name: "ping",
    description: "Pong!",
  });
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.data.name === "ping") {
    client.createInteractionResponse(interaction.id, interaction.token, {
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: "Pong! 🏓",
        flags: MessageFlags.Ephemeral,
      },
    });
  }
});

client.connect();
```

More examples on the [GitHub repository](https://github.com/XenKys/disgroove/tree/main/examples)
