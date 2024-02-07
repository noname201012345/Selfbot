const { Client } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");
const keepAlive = require("./server.js");
const { Worker, isMainThread, parentPort } = require('worker_threads');
const https = require('https');

const guildID = "755793441287438469";
const channelID = "1204372615871860796";
const url = ["https://selfcall.onrender.com", "https://music-bot-4bpb.onrender.com"];

if (isMainThread) {
  // Main thread code
  // Create an array to store worker threads
  const workerThreads = [];
  // Create a number of worker threads and add them to the array
  for (let i = 0; i < 6; i++) {
    workerThreads.push(new Worker(__filename));
  }
  // Send a message to each worker thread with a task to perform
  workerThreads.forEach((worker, index) => {
    worker.postMessage({ task: index });
  });
  keepAlive();
  let iter = setInterval(function() {
    for(let i = 0; i< url.length; i++) {
    https.get(url[i], (resp) => {
    console.log("Request \"" + url+"\" Success!");
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
    }
  }, 1000*60)
} else {
  // Worker thread code
  // Listen for messages from the main thread
  parentPort.on('message', message => {
    // console.log(`Worker ${process.pid}: Received task ${message.task}`);
    // Perform the task
    performTask(message.task);
  });
  function performTask(task) {
    // … operations to be performed to execute the task
const client = new Client({
  checkUpdate: false,
});

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
if(task === 1) {
  client.login(process.env.TOKEN);
} else if(task === 2) {
  client.login(process.env.TOKENa);
} else if(task === 3) {
  client.login(process.env.TOKENt);
} else if(task === 4) {
  client.login(process.env.TOKENo);
} else if(task === 5) {
  client.login(process.env.TOKENy);
} else if(task === 0) {
  client.login(process.env.TOKENl);
}
  }
}
