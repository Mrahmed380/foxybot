const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let role = args.join(" ").slice(22);
  let gRole = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()

  if (args.includes("@everyone"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error**');

  if (args.includes("@here"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error** ');

  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Vous ne disposez pas des autorisations suffisantes pour ajouter des rôles.");

  if (!message.guild.me.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Je n'ai pas les autorisations suffisantes pour gérer les rôles.");

  if (!rMember)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n " + " Impossible de trouver cet utilisateur");

  if (!role)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Veuillez fournir un rôle");

  if (!gRole)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Ce rôle n'existe pas, s'il existe: vérifiez votre orthographe");

  if (rMember.roles.has(gRole.id))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Cette personne a déjà ce rôle.");

  await (rMember.addRole(gRole.id));

  try {
    await message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ` Added **${gRole.name}** to ${rMember}.`)
    let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
    if (!logs[message.guild.id]) {
      logs[message.guild.id] = {
        toggle: 0
      };
    }
    if (logs[message.guild.id].toggle === 1) {
      const logchannel = message.guild.channels.find(channel => channel.name === "terminal-logs");
      let eventembed = new Discord.RichEmbed()
        .setColor(0x00ff00)
        .setTitle("Add Role Event:")
        .addField("User:", rMember)
        .addField("Admin:", message.author)
        .addField("Role:", gRole)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  } catch (e) {
    console.log(e.stack);
  }
}
module.exports.help = {
  name: "addrole"
}
