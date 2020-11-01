import { Client, Message, MessageEmbed, TextChannel } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';

import ApproveController from '../controllers/assessments/Approve';

import { botCache } from '../app';

botCache.commands.set('approve', {
    permission: 'MANAGE_MESSAGES',
    helpMessage: 'Approve a suggestion.',
    exec: async (client: Client, message: Message, language: any, args: string[]) => {
        if (!args.length) {
            message.channel.send({
                embed: new MessageEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.commands.approve.descriptionRequired)
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
                            .setDescription(language.commands.approve.noSuggestionsFound)
                            .setTimestamp()
                            .setFooter(process.env.EMBED_FOOTER)
                    });
                    return;
                }

                for (let i = 0; i < result.rows.length; i++) {
                    const chn: TextChannel = message.guild.channels.cache.get(result.rows[i].channel) as TextChannel;
                    if (chn) {
                        chn.messages.fetch(result.rows[i].message, false).then(msg => ApproveController(client, msg, language));
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
                        .setDescription(language.commands.approve.invalidInput)
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
                            .setDescription(language.commands.approve.invalidInput)
                            .setTimestamp()
                            .setFooter(process.env.EMBED_FOOTER)
                    });
                    return;
                }

                const chn: TextChannel = message.guild.channels.cache.get(result.rows[0].channel) as TextChannel;
                if (chn) {
                    chn.messages.fetch(result.rows[0].message, false).then(msg => ApproveController(client, msg, language));
                }
            });

        }
        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.approve.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.approve.approved)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });
    }
});