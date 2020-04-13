import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';

export default class VoteCommand implements ICommand {

    aliases() {
        return ['bugreport'];
    }

    async run(client: Client, message: Message, _language: any, args: string[]) {

        await message.delete({
            timeout: 125
        });

        const channel_result = await client.shard.broadcastEval(`this.channels.cache.get(${process.env.CHANNELS_BUG_REPORTS})`);
        const chn = channel_result[0];

        chn.send({
            embed: new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(args.join(" "))
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

    }

    help() {
        return "Report a bug to the developer of this bot.";
    }

}
