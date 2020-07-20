import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';

export default class PremiumCommand implements ICommand {

    aliases() {
        return null as null;
    }

    async run(client: Client, message: Message, language: any) {

        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.premium.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.premium.description)
                .addField(language.commands.premium.perksTitle, language.commands.premium.perksDescription, false)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

    }

    help() {
        return "Receive information about the Suggestion's premium plan.";
    }

}
