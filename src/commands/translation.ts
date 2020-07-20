import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';

export default class TranslationCommand implements ICommand {

    aliases() {
        return ['translate', 'language', 'languages', 'translations'];
    }

    async run(client: Client, message: Message, language: any) {

        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.translate.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.translate.description)
                .addField(language.commands.translate.contributeTitle, language.commands.translate.contributeDescription, false)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

    }

    help() {
        return "Receive information about the translations of the bot.";
    }

}
