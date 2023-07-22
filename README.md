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
const { Client, GatewayIntents, GatewayEvents } = require("disgroove");
const client = new Client("token", {
  intents: GatewayIntents.All,
});

client.on(GatewayEvents.Ready, async () => {
  const user = await client.getUser();

  console.log(`${user.username} is ready`);
});

client.on(GatewayEvents.MessageCreate, async (message) => {
  if (message.content === "!ping") {
    const channel = await client.getChannel(message.channelId);

    await channel.createMessage({
      content: "Pong! �",
    });
  }
});
```
