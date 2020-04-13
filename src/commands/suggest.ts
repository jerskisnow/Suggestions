/*
 * This class is still untested.
 */
import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed, TextChannel } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';

export default class SuggestCommand implements ICommand {

    aliases() {
        return null as null;
    }

    async run(client: Client, message: Message, language: any, args: string[]) {
        
        await message.delete({
            timeout: 125
        });

        const pgClient = new PostgreSQL().getClient();

        await pgClient.connect();

        const res = await pgClient.query('SELECT channel FROM servers WHERE id = $1::text', [message.guild.id]);
        if (res.rows.length === 0) return;

        const channel: TextChannel = message.guild.channels.cache.get(res.rows[0].channel) as TextChannel;
        if (!channel) return message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.errorTitle, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.suggest.invalidChannel)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        if (!args.length) return message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.errorTitle, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.suggest.descriptionRequired)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        const desc = args.slice(0).join(" ");

        const result = await pgClient.query('SELECT id FROM suggestions ORDER BY id DESC LIMIT 1');
        let id = 1;
        if (result.rows[0].length)
            id += result.rows[0].id;

        const msg = await channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.suggestions.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.suggest.description
                    .replace(/<Description>/g, desc)
                    .replace(/<Status>/g, language.suggestions.open)
                    .replace(/<ID>/g, id)
                )
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        await msg.react('✅');
        await msg.react('❎');

        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.suggest.sent
                    .replace(/<Url>/g, `https://canary.discordapp.com/channels/${message.guild.id}/${channel.id}/${msg.id}`)
                )
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        await pgClient.query('INSERT INTO suggestions (id, context, author, channel, message, status) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text)', [id, desc, message.author.id, channel.id, msg.id, 'Open']);

        await pgClient.end();
    }

    help() {
        return "Create a suggestion.";
    }

}