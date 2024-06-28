const {
  Client,
  GatewayIntents,
  InteractionType,
  InteractionCallbackType,
  MessageFlags,
  ApplicationCommandOptionType,
  ChannelTypes,
} = require("disgroove");
const client = new Client("B0t.T0k3N", {
  intents: GatewayIntents.All,
});

client.once("ready", async () =>
  client.bulkEditGlobalApplicationCommands(client.application.id, [
    {
      name: "join",
      description: "Join a voice channel",
      options: [
        {
          name: "channel",
          description: "The voice channel",
          type: ApplicationCommandOptionType.Channel,
          channelTypes: [ChannelTypes.GuildVoice],
          required: true,
        },
      ],
    },
    {
      name: "leave",
      description: "Leave the voice channel",
    },
  ])
);

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return;

  if (interaction.data.name === "join") {
    const channelID = interaction.data.options.find(
      (option) => option.name === "channel"
    ).value;

    client.joinVoiceChannel(interaction.guildID, channelID);

    client.createInteractionResponse(interaction.id, interaction.token, {
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: `Joined in <#${channelID}>`,
        flags: MessageFlags.Ephemeral,
      },
    });
  } else if (interaction.data.name === "leave") {
    client.leaveVoiceChannel(interaction.guildID);

    const guild = client.guilds.get(interaction.guildID);

    client.createInteractionResponse(interaction.id, interaction.token, {
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        content: `Left voice channel from **${guild.name}**`,
        flags: MessageFlags.Ephemeral,
      },
    });
  }
});

client.on("voiceServerUpdate", (voiceServer) => {
  const connection = client.voiceConnections.get(voiceServer.guildID);
  const guild = client.guilds.get(voiceServer.guildID);

  connection.once("ready", () =>
    console.log(`Voice connection ready on ${guild.name}`)
  );
});

client.connect();
