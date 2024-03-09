# disgroove

A module to interface with Discord

## Features

- No cache: For large bots the cache might be a RAM memory management issue, this module doesn't include it
- Very fast: The module contains all methods in the Client class, so sending API requests will not have to go through a third party, and this allows the module to be faster
- Documentation-based: The module is based entirely on the [Official Discord API Documentation](https://discord.com/developers/docs/intro), so it does not add custom methods or properties, to avoid future problems

## Installation

[**Node.js**](https://nodejs.org) v18 or higher required

```
npm install disgroove
```

## Example

To see more examples see the [examples](https://github.com/XenKys/disgroove/tree/main/examples) folder on GitHub repository

```js
const {
  Client,
  GatewayIntents,
  ActivityType,
  InteractionType,
  InteractionCallbackType,
  MessageFlags,
} = require("disgroove");
const client = new Client("token", {
  intents: GatewayIntents.All,
});

client.on("ready", async () => {
  console.log(`${client.user.username} is now online!`); // Prints "Username is now online!" when the bot connects to the gateway

  client.createGlobalApplicationCommand(client.application.id, {
    name: "ping",
    description: "Responds with Pong! 🏓",
  }); // Creates a global application command named "ping"

  client.setPresence({
    activity: {
      name: "/ping",
      type: ActivityType.Watching,
    },
  }); // Updates the bot presence to "Watching /ping"
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return; // Checks if the interaction is an application command

  if (interaction.data.name === "ping") {
    // Checks if the application command name is equals to "ping"
    client.createInteractionResponse(interaction.id, interaction.token, {
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: "Pong! 🏓",
        flags: MessageFlags.Ephemeral,
      },
    }); // Responds with an ephemeral message "Pong! 🏓"
  }
});

client.connect(); // Connects the bot to the gateway
```

Enjoy the package? Give it a ⭐ on [GitHub repository](https://github.com/XenKys/disgroove)
