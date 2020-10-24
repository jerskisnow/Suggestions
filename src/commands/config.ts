import ICommand from '../structures/ICommand';
import { Client, Message, MessageReaction, User, MessageEmbed } from 'discord.js';

// Controller imports
import PrefixController from '../controllers/config/Prefix';
import LanguageController from '../controllers/config/Language';
import SuggestionChannelController from '../controllers/config/SuggestionChannel';
import ReportChannelController from '../controllers/config/ReportChannel';
import AutoAproveController from '../controllers/config/AutoApprove';
import AutoRejectController from '../controllers/config/AutoReject';
import DeleteApprovedController from '../controllers/config/DeleteAproved';
import DeleteRejectedController from '../controllers/config/DeleteRejected';

export default class ConfigCommand implements ICommand {

    aliases() {
        return ['cfg', 'configuration']
    }

    private reactions: any = {
        '1️⃣': PrefixController,
        '2️⃣': LanguageController,
        '3️⃣': SuggestionChannelController,
        '4️⃣': ReportChannelController,
        '5️⃣': AutoAproveController,
        '6️⃣': AutoRejectController,
        '7️⃣': DeleteApprovedController,
        '8️⃣': DeleteRejectedController
    }

    async run(client: Client, message: Message, language: any) {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.errorTitle, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.insufficientPermissions
                    .replace(/<Permission>/g, "ADMINISTRATOR"))
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        const msg = await message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.config.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(
                    `**1.** ${language.commands.config.names.prefix}
                    **2.** ${language.commands.config.names.language}
                    **3.** ${language.commands.config.names.suggestionChannel}
                    **4.** ${language.commands.config.names.reportChannel}
                    **5.** ${language.commands.config.names.autoApprove}
                    **6.** ${language.commands.config.names.autoReject}
                    **7.** ${language.commands.config.names.deleteApproved}
                    **8.** ${language.commands.config.names.deleteRejected}`
                )
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        const reactionsArray: Array<string> = Object.keys(this.reactions);

        for (let i = 0; i < reactionsArray.length; i++) {
            msg.react(reactionsArray[i]);
        }

        const filter = (reaction: MessageReaction, user: User) => reactionsArray.includes(reaction.emoji.name) && user.id === message.author.id;
        const msgReactions = await msg.awaitReactions(filter, {
            max: 1,
            time: 50000
        });

        msg.reactions.removeAll();

        if (msgReactions.first()) {
            const controller: Function = this.reactions[msgReactions.first().emoji.name]
            controller(client, message, language, msg)
        }

        // Probably edit the message saying the process failed

    }

    help() {
        return "Configure the bot.";
    }

}
