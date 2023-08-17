const {
  Client,
  InteractionType,
  InteractionCallbackType,
  BitwisePermissionFlags,
} = require("disgroove");
const client = new Client("token");

client.once("ready", () =>
  client.application.bulkOverwriteGlobalApplicationCommands([
    {
      name: "permission",
      description:
        "Responds whether you have the permission to send messages or not",
    },
  ])
);

client.on("interactionCreate", (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.data.name === "permission") {
    interaction.createResponse({
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content:
          (BigInt(interaction.member.permissions) &
            BitwisePermissionFlags.SendMessages) ===
          BitwisePermissionFlags.SendMessages
            ? "Yes"
            : "No",
      },
    });
  }
});

client.connect();
