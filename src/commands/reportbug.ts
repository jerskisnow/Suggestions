import { Client, Message, MessageEmbed, MessageReaction, User } from 'discord.js';

import { botCache } from '../index';

botCache.commands.set('reportbug', {
    helpMessage: 'Report a bug to the developer of this bot.',
    exec: async (client: Client, message: Message, language: any, args: string[]) => {
        if (!args.length) {
            message.channel.send({
                embed: new MessageEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.commands.reportbug.descriptionRequired)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });
            return;
        }

        const msg = await message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.config.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.reportbug.confirmation)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        await msg.react('☑️');
        await msg.react('❌');

        const filter = (reaction: MessageReaction, user: User) => ['☑️', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        const msgReactions = await msg.awaitReactions(filter, {
            max: 1,
            time: 50000
        });

        await msg.reactions.removeAll();

        if (!msgReactions.first()) {
            await msg.edit({
                embed: new MessageEmbed()
                    .setAuthor(language.commands.config.title, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.commands.reportbug.cancelled)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });
            return;
        }

        await msg.edit({
            embed: new MessageEmbed()
                .setAuthor(language.commands.reportbug.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.reportbug.sent)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        const embed: MessageEmbed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor(process.env.EMBED_COLOR)
            .setDescription(args.join(" "))
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER);

        client.shard.broadcastEval(`
            (async () => {
                const channel = await this.channels.cache.get('${process.env.CHANNELS_BUG_REPORTS}');
                if (channel) {
                    channel.send({ embed: ${JSON.stringify(embed)} });
                }
            })();
        `);
    }
});