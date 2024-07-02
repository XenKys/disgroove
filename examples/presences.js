const { Client, ActivityType, StatusTypes } = require("disgroove");
const client = new Client("B0t.T0k3N");

client.once("ready", () => {
  client.setPresence({
    activities: [
      {
        name: "/ping",
        type: ActivityType.Watching,
      },
    ],
    status: StatusTypes.Online,
  });
});

client.connect();
