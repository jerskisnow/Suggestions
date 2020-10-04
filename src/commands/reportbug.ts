import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed, MessageReaction, User } from 'discord.js';

export default class VoteCommand implements ICommand {

    aliases() {
        return ['bugreport'];
    }

    async run(client: Client, message: Message, language: any, args: string[]) {

        if (!args.length) return message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.errorTitle, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.reportbug.descriptionRequired)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

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

    help() {
        return "Report a bug to the developer of this bot.";
    }

}
