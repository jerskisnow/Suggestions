import { RichEmbed } from 'discord.js';

export default (client, message, language) => {

    // Send the invite message in the channel where the command was executed
    message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.inviteTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.inviteDescription
                .replace(/<BotURL>/g, process.env.LINKS_INVITE)
                .replace(/<ServerURL>/g, process.env.LINKS_SERVER))
    });

}