const {
  Client,
  InteractionType,
  InteractionCallbackType,
  BitwisePermissionFlags,
} = require("disgroove");
const client = new Client("B0t.T0k3N");

client.once("ready", () => {
  client.bulkEditGlobalApplicationCommands(client.application.id, [
    {
      name: "permission",
      description:
        "Responds whether you have the permission to add reactions or not",
    },
  ]);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.data.name === "permission") {
    client.createInteractionResponse(interaction.id, interaction.token, {
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: hasPermission(
          interaction.member.permissions,
          BitwisePermissionFlags.AddReactions
        )
          ? "You have the permission to add reactions"
          : "You haven't the permission to add reactions",
      },
    });
  }
});

client.connect();

/** https://discord.com/developers/docs/topics/permissions */
function hasPermission(userPermissions, permission) {
  return (BigInt(userPermissions) & permission) === permission;
}
