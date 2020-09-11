require("dotenv").config();

//Discord API
const { Client } = require("discord.js");

const client = new Client();

//Login bot
client.login(process.env.DISCORD_TOKEN);

//Bot ready
client.on("ready", () => {
  console.log(`${client.user.username} has logged in.`);
});

//Message event, and get content
client.on("message", (message) => {
  console.log(`${message.author.tag} said ${message.content}`);
  if (message.author.bot) return;
  message.reply("What's up?");
  message.channel.send("Nah brah");
});
