import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';

export default class ListCommand implements ICommand {

    aliases() {
        return ['suggestions'];
    }

    async run(client: Client, message: Message, language: any) {

        const pgClient = new PostgreSQL().getClient();

        await pgClient.connect();

        const res = await pgClient.query('SELECT id, context, author, channel, message FROM suggestions WHERE guild = $1::text AND status = $2::text', [message.guild.id, 'Open']);

        await pgClient.end();

        if (!res.rows.length) return message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.errorTitle, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.list.noSuggestions)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        const listEmbed = new MessageEmbed()
            .setAuthor(language.commands.list.title, client.user.avatarURL())
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.commands.list.description)
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER);

        for (var i = 0; i < res.rows.length; i++) {
            const user = message.guild.members.cache.get(res.rows[i].author) ?
                message.guild.members.cache.get(res.rows[i].author).user.tag :
                "User Left ~ Suggestions";

            listEmbed.addField(user,
                language.commands.list.suggestionDescription
                    .replace(/<Description>/g, res.rows[i].context)
                    .replace(/<ID>/g, res.rows[i].id)
                    .replace(/<Url>/g, `https://canary.discordapp.com/channels/${res.rows[i].guild}/${res.rows[0].channel}/${res.rows[i].message}`),
                false);
        }

        message.channel.send({ embed: listEmbed });

    }

    help() {
        return "Obtain a list of all active suggestions.";
    }

}
