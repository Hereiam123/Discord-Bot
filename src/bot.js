require("dotenv").config();

//Discord API
const { Client } = require("discord.js");

const client = new Client();

//Command prefix
const PREFIX = "$";

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

  //Trigger on command
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    //Respond to a kick message, and try to find if user exists
    //If so, kick user
    //Need to provide bot permissions in server for bot to kick
    //args[0] is memeber to kick/ban
    if (CMD_NAME === "kick") {
      //Reference to user trying to kick
      if (message.member.hasPermission("KICK_MEMBERS")) {
        return message.reply("You do not have permissions to use that command");
      }
      if (args.length === 0) return message.reply(`Please provide an ID.`);
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => {
            message.channel.send(`${member} was kicked.`);
          })
          .catch((err) => {
            message.channel.send("I do not have permissions");
          });
      } else {
        message.channel.send("Not a valid member ID");
      }
    } else if (CMD_NAME === "ban") {
      if (message.member.hasPermission("BAN_MEMBERS")) {
        return message.reply("You do not have permissions to use that command");
      }
      if (args.length === 0) return message.reply(`Please provide an ID.`);
      message.guild.members.ban(args[0]);
    }
  }
});
