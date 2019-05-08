const { RichEmbed } = require('discord.js');

exports.run = async (client, message, language, prefix) => {
  message.channel.send({
    embed: new RichEmbed()
      .setAuthor(language.donateTitle, client.user.avatarURL)
      .setColor(process.env.EMBED_COLOR)
      .setDescription(language.donateDescription)
      .addField(language.paymentMethodsTitle, "**PayPal:** `jerskisnow@gmail.com`\n**Bitcoin:** `1KJxP4jgciYyAQghqVQoDeEHhR6vNFStAn`\n**Ethereum:** `0x3f856027D5164bA560F732075E5Be35C71720AC3`", false)
      .setTimestamp()
      .setFooter(process.env.EMBED_FOOTER)
  });
}
