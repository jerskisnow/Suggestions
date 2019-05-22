const { RichEmbed } = require('discord.js');
const moment = require('moment');

exports.run = (client, message, language, prefix) => {
  let timeObject = moment.duration(client.uptime);

  let days = timeObject.days();
  let hours = timeObject.hours();
  let minutes = timeObject.minutes();
  let seconds = timeObject.seconds();

  let timeString = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

  message.channel.send({
    embed: new RichEmbed()
      .setAuthor(language.uptimeTitle, client.user.avatarURL)
      .setColor(process.env.EMBED_COLOR)
      .setDescription(language.uptimeDescription.replace(/<Time>/g, timeString))
      .setTimestamp()
      .setFooter(process.env.EMBED_FOOTER)
  });

}
