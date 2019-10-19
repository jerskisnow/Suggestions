import { RichEmbed } from 'discord.js';
import moment from 'moment';

export default (client, message, language, prefix, args) => {
    const timeObject = moment.duration(client.uptime);

    const days = timeObject.days();
    const hours = timeObject.hours();
    const minutes = timeObject.minutes();
    const seconds = timeObject.seconds();

    const uptimeDesc = language.uptimeDescription
        .replace(/<Days>/g, days)
        .replace(/<Hours>/g, hours)
        .replace(/<Minutes>/g, minutes)
        .replace(/<Seconds>/g, seconds);

    message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.uptimeTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(uptimeDesc)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

}