const Discord = require("discord.js");
module.exports.run = async (client, msg, args) => {
    let user = msg.mentions.users.first() || msg.author
    
    let dembed = new Discord.RichEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setAuthor(user.tag)
        .setImage(user.displayAvatarURL)
    msg.channel.send("**/" + msg.guild + "/" + msg.channel.name + "/**")
    return msg.channel.send(dembed);
}
module.exports.help = {
    name: "avatar"
}
