const { Client, ActivityType, StatusTypes } = require("disgroove");
const client = new Client("token");

client.once("ready", () =>
  client.setPresence({
    activities: [
      {
        name: "/ping",
        type: ActivityType.Watching,
      },
    ],
    status: StatusTypes.Online,
  })
);

client.connect();
