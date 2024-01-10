const {
  Client,
  InteractionType,
  InteractionCallbackType,
  BitwisePermissionFlags,
} = require("disgroove");
const client = new Client("token");

client.once("ready", () =>
  client.application.bulkEditGlobalApplicationCommands([
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
        content: hasPermission(
          interaction.member.permissions,
          BitwisePermissionFlags.SendMessages
        )
          ? "Has the 'Send Messages' permission"
          : "Hasn't the 'Send Messages' permission",
      },
    });
  }
});

client.connect();

function hasPermission(userPermissions, permission) {
  return (BigInt(userPermissions) & permission) === permission;
}
