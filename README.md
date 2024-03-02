# disgroove

A module to interface with Discord

## Features

- No cache: For large bots the cache might be a RAM memory management issue, this module doesn't include it
- Very rough style: Using a rough style for methods will always allow you to use the latest [Discord change-log](https://discord.com/developers/docs/change-log), even if the module had not yet been updated to that change-log
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
  console.log(`${client.user.username} is now online!`); // Print "Username is now online!" when the bot connects to the gateway

  client.application.createGlobalApplicationCommand({
    name: "ping",
    description: "Responds with Pong! 🏓",
  }); // Create a global application command named "ping"

  client.setPresence({
    activity: {
      name: "/ping",
      type: ActivityType.Watching,
    },
  }); // Update the bot presence to "Watching /ping"
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return; // Check if the interaction is an application command

  if (interaction.data.name === "ping") {
    // Check if the application command name is equals to "ping"
    interaction.createResponse({
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: "Pong! 🏓",
        flags: MessageFlags.Ephemeral,
      },
    }); // Responds with an ephemeral message "Pong! 🏓"
  }
});

client.connect(); // Connect the bot to the gateway
```

Enjoy the package? Give it a ⭐ on [GitHub repository](https://github.com/XenKys/disgroove)
