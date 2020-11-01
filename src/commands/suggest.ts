import { Client, Message, MessageEmbed, TextChannel } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';

import { get } from '../structures/CacheManager';
import botCache from '../structures/BotCache';

botCache.commands.set('suggest', {
    helpMessage: 'Create a suggestion.',
    exec: async (client: Client, message: Message, language: any, args: string[]) => {
        await message.delete();

        const channelID: string = await get(message.guild.id, 'suggestion_channel') as string;
        const chn: TextChannel = message.guild.channels.cache.get(channelID) as TextChannel;
        if (channelID === null || !chn) {
            message.channel.send({
                embed: new MessageEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.commands.suggest.invalidChannel)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            }).then(msg => msg.delete({timeout: 8000}));
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
            }).then(msg => msg.delete({timeout: 8000}));

            return;
        }

        const desc = args.slice(0).join(" ");

        PostgreSQL.query('SELECT id FROM suggestions ORDER BY id DESC LIMIT 1', [], (error, result) => {
            let id = 1;
            if (result.rows.length) {
                id += result.rows[0].id;
            }
            chn.send({
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
            }).then(async (msg) => {
                await msg.react('✅');
                await msg.react('❎');
                message.author.send({
                    embed: new MessageEmbed()
                        .setAuthor(language.commands.suggest.title, client.user.avatarURL())
                        .setColor(process.env.EMBED_COLOR)
                        .setDescription(language.commands.suggest.sent
                            .replace(/<Url>/g, `https://canary.discordapp.com/channels/${message.guild.id}/${chn.id}/${msg.id}`)
                        )
                        .setTimestamp()
                        .setFooter(process.env.EMBED_FOOTER)
                }).catch(() =>
                    message.channel.send({
                        embed: new MessageEmbed()
                            .setAuthor(language.commands.suggest.title, client.user.avatarURL())
                            .setColor(process.env.EMBED_COLOR)
                            .setDescription(language.commands.suggest.sent
                                .replace(/<Url>/g, `https://canary.discordapp.com/channels/${message.guild.id}/${chn.id}/${msg.id}`)
                            )
                            .setTimestamp()
                            .setFooter(process.env.EMBED_FOOTER)
                    }).then(msg =>
                        msg.delete({
                            timeout: 8000
                        })
                    )
                );
                PostgreSQL.query('INSERT INTO suggestions (context, author, guild, channel, message, status) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text)', [desc, message.author.id, message.guild.id, chn.id, msg.id, 'Open']);
            });
        });

    }
});