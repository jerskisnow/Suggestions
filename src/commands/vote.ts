import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';

export default class VoteCommand implements ICommand {

    aliases() {
        return ['elect'];
    }

    async run(client: Client, message: Message, language: any) {

        await message.delete({
            timeout: 125
        });

        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.vote.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(process.env.LINKS_VOTE)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

    }

    help() {
        return "Obtain a link in order to vote for the bot.";
    }

}
