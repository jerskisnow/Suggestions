import { dbConnection } from '../structures/MySQL';
import { RichEmbed } from 'discord.js';

export default (client, message, language, prefix, args) => {
    dbConnection.query("SELECT * FROM suggestions WHERE guild = ? AND status = 'Open'", message.guild.id, (sError, sResult) => {
        if (sError || !sResult.length || sResult[0].message === null) return message.channel.send({
            embed: new RichEmbed()
                .setAuthor(language.errorTitle, client.user.avatarURL)
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.listNoSuggestionsFoundDescription)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        dbConnection.query("SELECT channel FROM configurations WHERE id = ?", message.guild.id, (cError, cResult) => {

            const listEmbed = new RichEmbed()
                .setAuthor(language.listTitle, client.user.avatarURL)
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.listDescription)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER);

            for (var i = 0; i < sResult.length; i++) {
                listEmbed.addField(
                    language.listSuggestionTitle.replace(/<User>/g, client.users.get(sResult[i].author).tag),
                    language.suggestionListingDescription
                    .replace(/<Description>/g, sResult[i].description)
                    .replace(/<SuggestionID>/g, sResult[i].id)
                    .replace(/<SuggestionURL>/g, `https://canary.discordapp.com/channels/${sResult[i].guild}/${cResult[0].channel}/${sResult[i].message}`),
                    false);
            }

            message.channel.send({ embed: listEmbed });

        });

    });
}