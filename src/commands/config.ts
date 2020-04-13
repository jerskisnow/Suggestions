import ICommand from '../structures/ICommand';
import { Client, Message, MessageReaction, User, MessageEmbed } from 'discord.js';

// Controller imports
import PrefixController from '../controllers/config/Prefix';
import LanguageController from '../controllers/config/Language';
import ChannelController from '../controllers/config/Channel';
import AutoAproveController from '../controllers/config/AutoApprove';
import AutoRejectController from '../controllers/config/AutoReject';
import DeleteApprovedController from '../controllers/config/DeleteAproved';
import DeleteRejectedController from '../controllers/config/DeleteRejected';

const reactions: any = {
    '1️⃣': PrefixController,
    '2️⃣': LanguageController,
    '3️⃣': ChannelController,
    '4️⃣': AutoAproveController,
    '5️⃣': AutoRejectController,
    '6️⃣': DeleteApprovedController,
    '7️⃣': DeleteRejectedController
}

export default class ConfigCommand implements ICommand {

    aliases() {
        return ['cfg', 'configuration']
    }

    async run(client: Client, message: Message, language: any) {

        await message.delete({
            timeout: 125
        });

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
                    **3.** ${language.commands.config.names.channel}
                    **4.** ${language.commands.config.names.autoApprove}
                    **5.** ${language.commands.config.names.autoReject}
                    **6.** ${language.commands.config.names.deleteApproved}
                    **7.** ${language.commands.config.names.deleteRejected}`
                )
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        const reactionsArray: Array<string> = Object.keys(reactions);

        for (let i = 0; i < reactionsArray.length; i++) {
            msg.react(reactionsArray[i]);
        }

        const filter = (reaction: MessageReaction, user: User) => reactionsArray.includes(reaction.emoji.name) && user.id === message.author.id;
        const msgReactions = await msg.awaitReactions(filter, {
            max: 1,
            time: 50000
        });

        msg.reactions.removeAll();

        const controller: Function = reactions[msgReactions.first().emoji.name]
        controller(client, message, language, msg)

    }

    help() {
        return "Configure the bot.";
    }

}
