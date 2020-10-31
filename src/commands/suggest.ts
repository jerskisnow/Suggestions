import { Client, Message, MessageEmbed, TextChannel } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';

import { botCache } from '../index';

botCache.commands.set('suggest', {
    helpMessage: 'Create a suggestion.',
    exec: async (client: Client, message: Message, language: any, args: string[]) => {

        await message.delete();

        const pgClient = await PostgreSQL.getPool().connect();

        const res = await pgClient.query('SELECT suggestion_channel FROM servers WHERE id = $1::text', [message.guild.id]);
        if (res.rows.length === 0) {
            pgClient.release();
            return;
        }

        const channel: TextChannel = message.guild.channels.cache.get(res.rows[0].suggestion_channel) as TextChannel;
        if (!channel) {
            message.channel.send({
                embed: new MessageEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.commands.suggest.invalidChannel)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            }).then(msg => msg.delete({ timeout: 8000 }));

            pgClient.release();

            return;
        }

        if (!args.length) {
            message.channel.send({
                embed: new MessageEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.commands.suggest.descriptionRequired)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            }).then(msg => msg.delete({ timeout: 8000 }));

            pgClient.release();

            return;
        }

        const desc = args.slice(0).join(" ");

        const result = await pgClient.query('SELECT id FROM suggestions ORDER BY id DESC LIMIT 1');
        let id = 1;
        if (result.rows.length)
            id += result.rows[0].id;

        const msg = await channel.send({
            embed: new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
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

        message.author.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.suggest.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.suggest.sent
                    .replace(/<Url>/g, `https://canary.discordapp.com/channels/${message.guild.id}/${channel.id}/${msg.id}`)
                )
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        }).catch(() =>
            message.channel.send({
                embed: new MessageEmbed()
                    .setAuthor(language.commands.suggest.title, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.commands.suggest.sent
                        .replace(/<Url>/g, `https://canary.discordapp.com/channels/${message.guild.id}/${channel.id}/${msg.id}`)
                    )
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            }).then(msg =>
                msg.delete({
                    timeout: 8000
                })
            )
        );

        await pgClient.query('INSERT INTO suggestions (context, author, guild, channel, message, status) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text)', [desc, message.author.id, message.guild.id, channel.id, msg.id, 'Open']);

        pgClient.release();
    }
});