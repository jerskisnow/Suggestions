import { RichEmbed } from 'discord.js';

export default (client, message, language) => {

    // Send the vote message in the channel where the command was executed
    message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.voteTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.voteDescription.replace(/<VoteUrl>/g, process.env.LINKS_VOTE))
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

}