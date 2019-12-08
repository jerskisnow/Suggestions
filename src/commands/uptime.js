import { RichEmbed } from 'discord.js';
import moment from 'moment';

export default (client, message, language) => {

    // Retrieve the duration using moment from the uptime of the client
    const timeObject = moment.duration(client.uptime);

    // Define the variables for the up-time
    const days = timeObject.days();
    const hours = timeObject.hours();
    const minutes = timeObject.minutes();
    const seconds = timeObject.seconds();

    // Define the final uptime description
    const uptimeDesc = language.uptimeDescription
        .replace(/<Days>/g, days)
        .replace(/<Hours>/g, hours)
        .replace(/<Minutes>/g, minutes)
        .replace(/<Seconds>/g, seconds);

    // Finally send the uptime message in the channel where the command was executed
    message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.uptimeTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(uptimeDesc)
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

}