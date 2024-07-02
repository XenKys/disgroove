const { Client, ActivityType, StatusTypes } = require("disgroove");
const client = new Client("B0t.T0k3N");

client.once("ready", () => {
  client.setPresence({
    activities: [
      {
        name: "Minecraft",
        type: ActivityType.Game,
      },
    ],
    status: StatusTypes.Online,
  });
});

client.connect();
