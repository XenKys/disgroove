const { Client, ActivityType } = require("disgroove");
const client = new Client("B0t.T0k3N");

client.once("ready", () => {
  client.setPresence({
    activities: [
      {
        name: "Minecraft",
        type: ActivityType.Game,
      },
    ],
  });
});

client.connect();
