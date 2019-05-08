const { RichEmbed } = require('discord.js');

exports.run = async (client, message, language, prefix) => {
  message.channel.send({
    embed: new RichEmbed()
      .setAuthor(language.supportTitle, client.user.avatarURL)
      .setColor(process.env.EMBED_COLOR)
      .setDescription(language.supportDescription)
      .setTimestamp()
      .setFooter(process.env.EMBED_FOOTER)
  });
}
