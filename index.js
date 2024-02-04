const { Client } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");
const keepAlive = require("./server.js");

const client = new Client({
  checkUpdate: false,
});

const guildID = "755793441287438469";
const channelID = "1203620019716624444";

client.on("ready", async () => {
  console.log(client.user.tag + " is ready!");
  const guild = await client.guilds.fetch(guildID)
  const member = await guild.members.fetch(client.user.id);
  if(!member.voice.channel) {
    await joinVC(client);
  }
});

async function joinVC(client) {
  const guild = client.guilds.cache.get(guildID);
  const voiceChannel = guild.channels.cache.get(channelID);
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: true,
  });
}

client.on("voiceStateUpdate", async (oldState, newState) => {
  const oldVoice = oldState.channelId;
  const newVoice = newState.channelId;
  if(!client.voice.channel) {
    if (oldState.member.id !== client.user.id) return;
    if(!newVoice) {
        await joinVC(client);
    }
  }
});

//keepAlive();
//client.login('ODA3MjY4MTcxMzYyNDY3ODcx.GNhbkJ.M-eOUSrW8VFIz1-J-veO_giq9N1uHyvznthSw4');
