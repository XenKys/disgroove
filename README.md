# disgroove

> A lightweight (≈ **791 KB** unpacked) and low-level Node.js dependency for interfacing with Discord, focused on accuracy and flexibility.
> It is designed for developers who want full control over the Discord API without heavy abstractions and want as little RAM and CPU usage as possible.

> **disgroove** is intended for developers already familiar with the Discord API and gateway model.

## Why disgroove?

### ✅ Accurate with the official Discord API

All commits (since __July 3, 2024__), types, REST requests, and utilities strictly follow the [official Discord API documentation repository](https://github.com/discord/discord-api-docs) and are referenced to the [Discord API developer docs](https://docs.discord.com/developers/intro).

Development releases are mainly published when breaking changes are introduced in the Discord API.

---

### 🧠 Minimal caching

**disgroove** only caches guilds.

Guilds are mapped from the `READY` gateway event and kept in sync through
`GUILD_CREATE`, `GUILD_UPDATE` and `GUILD_DELETE` gateway events.

This design significantly decreases RAM and CPU usage and keeps the library lightweight.

---

### 🔧 Highly flexible and low-level

**disgroove** doesn't hide Discord features behind abstractions.

Every REST request is built directly on top of the [Discord API developer docs](https://docs.discord.com/developers/intro), with no changes.

You can listen to any gateway event directly using `Shard.ws.on(...)` and perform raw REST requests using `Client.rest.request(...)`

This allows you to use new Discord features immediately, even before a dedicated **disgroove** update is released.

## Example
```js
const {
  Client,
  GatewayIntents,
  InteractionType,
  InteractionCallbackType,
  MessageFlags,
} = require("disgroove");
const client = new Client(process.env.TOKEN);

client.once("ready", () => {
  console.log("Logged in as", client.user.username);

  client.createGlobalApplicationCommand(client.application.id, {
    name: "ping",
    description: "Pong!",
  });
});

client.on("interactionCreate", (interaction) => {
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

More examples on the [GitHub repository](https://github.com/sergiogotuzzo/disgroove/tree/main/examples)

> Enjoy **disgroove**? Leave a ⭐ to this repository!