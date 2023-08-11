# disgroove

An NPM package to interact with the Discord API

## Getting started

- Install the package

```
npm install disgroove
```

- Import the package

```js
const { Client, GatewayIntents } = require("disgroove");
```

- Create the client

```js
const client = new Client("token", {
  intents: GatewayIntents.AllNonPrivileged,
});
```

### Example

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
    description: "Reply with Pong! 🏓",
  }); // Create a global application command named "ping"

  client.updatePresence({
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
    }); // Reply with an ephemeral message "Pong! 🏓"
  }
});

client.connect(); // Connect the bot to the gateway
```
