import { Client, Message, MessageEmbed, TextChannel } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';

import RejectController from '../controllers/assessments/Reject';

import { botCache } from '../app';

botCache.commands.set('reject', {
    permission: 'MANAGE_MESSAGES',
    helpMessage: 'Reject a suggestion.',
    exec: async (client: Client, message: Message, language: any, args: string[]) => {
        if (!args.length) {
            message.channel.send({
                embed: new MessageEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.commands.reject.descriptionRequired)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });
            return;
        }

        if (args[0].toLowerCase() === 'all') {

            PostgreSQL.query('SELECT message, channel FROM suggestions WHERE NOT status = $1::text', ['Deleted'], (error, result) => {
                if (error || !result.rows.length) {
                    message.channel.send({
                        embed: new MessageEmbed()
                            .setAuthor(language.errorTitle, client.user.avatarURL())
                            .setColor(process.env.EMBED_COLOR)
                            .setDescription(language.commands.reject.noSuggestionsFound)
                            .setTimestamp()
                            .setFooter(process.env.EMBED_FOOTER)
                    });
                    return; 
                }

                for (let i = 0; i < result.rows.length; i++) {
                    const chn: TextChannel = message.guild.channels.cache.get(result.rows[i].channel) as TextChannel;
                    if (chn) {
                        chn.messages.fetch(result.rows[i].message, false).then(msg => RejectController(client, msg, language))
                    }
                }

            });

        } else {

            const sID = parseInt(args[0]);

            if (isNaN(sID)) {
                message.channel.send({
                    embed: new MessageEmbed()
                        .setAuthor(language.errorTitle, client.user.avatarURL())
                        .setColor(process.env.EMBED_COLOR)
                        .setDescription(language.commands.reject.invalidInput)
                        .setTimestamp()
                        .setFooter(process.env.EMBED_FOOTER)
                });
                return;
            }

            PostgreSQL.query('SELECT message, channel FROM suggestions WHERE id = $1::int', [sID], (error, result) => {
                if (error || !result.rows.length) {
                    message.channel.send({
                        embed: new MessageEmbed()
                            .setAuthor(language.errorTitle, client.user.avatarURL())
                            .setColor(process.env.EMBED_COLOR)
                            .setDescription(language.commands.reject.invalidInput)
                            .setTimestamp()
                            .setFooter(process.env.EMBED_FOOTER)
                    });
                    return;
                }

                const chn: TextChannel = message.guild.channels.cache.get(result.rows[0].channel) as TextChannel;
                if (chn) {
                    chn.messages.fetch(result.rows[0].message, false).then(msg => RejectController(client, msg, language));
                }
            });

        }
        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.reject.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.reject.rejected)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });
    }
});