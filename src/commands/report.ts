import { Client, Message, MessageEmbed, TextChannel } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';

import { get } from '../structures/CacheManager';
import { botCache } from '../app';

botCache.commands.set('report', {
    helpMessage: 'Create a report.',
    exec: async (client: Client, message: Message, language: any, args: string[]) => {
        await message.delete();

        const channelID: string = await get(message.guild.id, 'report_channel') as string;
        const chn: TextChannel = message.guild.channels.cache.get(channelID) as TextChannel;
        if (channelID === null || !chn) {
            message.channel.send({
                embed: new MessageEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.commands.report.invalidChannel)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            }).then(msg => msg.delete({ timeout: 8000 }));
            return; 
        }

        if (!args.length) {
            message.channel.send({
                embed: new MessageEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.commands.report.descriptionRequired)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            }).then(msg => msg.delete({ timeout: 8000 }));

            return;
        }

        const desc = args.slice(0).join(" ");

        PostgreSQL.query('SELECT id FROM reports ORDER BY id DESC LIMIT 1', [], (error, result) => {
            let id = 1;
            if (result.rows.length) {
                id += result.rows[0].id;
            }

            chn.send({
                embed: new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.report.description
                    .replace(/<Description>/g, desc)
                    .replace(/<Status>/g, language.suggestions.open)
                    .replace(/<ID>/g, id)
                )
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
            }).then(msg => {
                message.author.send({
                    embed: new MessageEmbed()
                        .setAuthor(language.commands.report.title, client.user.avatarURL())
                        .setColor(process.env.EMBED_COLOR)
                        .setDescription(language.commands.report.sent)
                        .setTimestamp()
                        .setFooter(process.env.EMBED_FOOTER)
                }).catch(() =>
                    message.channel.send({
                        embed: new MessageEmbed()
                            .setAuthor(language.commands.report.title, client.user.avatarURL())
                            .setColor(process.env.EMBED_COLOR)
                            .setDescription(language.commands.report.sent)
                            .setTimestamp()
                            .setFooter(process.env.EMBED_FOOTER)
                    }).then(msg =>
                        msg.delete({
                            timeout: 8000
                        })
                    )
                );
    
                PostgreSQL.query('INSERT INTO reports (context, author, guild, channel, message, status) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text)', [desc, message.author.id, message.guild.id, chn.id, msg.id, 'Open']);
            });
        });
    }
});