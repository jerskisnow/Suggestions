import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';

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

        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.reportBug.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.reportbug.sent)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        })

        const stringEmbed = JSON.stringify(
            new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(args.join(" "))
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        ).replace(/'/g, "\'");

        client.shard.broadcastEval(`
            const channel = this.channels.cache.get('${process.env.CHANNELS_BUG_REPORTS}');
            const embed = JSON.parse('${stringEmbed}');
            channel.send({ embed: embed });
        `);

    }

    help() {
        return "Report a bug to the developer of this bot.";
    }

}
