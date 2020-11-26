import botCache from '../../structures/BotCache';
import { getMemberFromArgs, Permission, sendPlainEmbed } from '../../managers/Commands';
import { Message, MessageEmbed } from "discord.js";
import Language from '../../types/Language';
import { handleBlacklistAdd, handleBlacklistRemove, handleClearBlacklist } from '../../managers/Blacklist';

botCache.commands.set('blacklist', {
    enabled: true,
    permission: Permission.ADMIN,
    exec: async (client, message, commandData, args: string[]) => {
        if (args.length !== 2 && args.length !== 3) {
            await sendHelp(message, commandData);
            return;
        }

        if (args[0].toLowerCase() === 'add') {
            if (args.length !== 3) {
                await sendHelp(message, commandData);
                return;
            }
            const member = getMemberFromArgs(message.guild, args[1]);
            if (member == null) {
                await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.blacklist.invalidMember)
                return;
            }
            await handleBlacklistAdd(message, commandData.language, member, args[2].toLowerCase());
        } else if (args[0].toLowerCase() === 'remove') {
            if (args.length !== 3) {
                await sendHelp(message, commandData);
                return;
            }
            const member = getMemberFromArgs(message.guild, args[1]);
            if (member == null) {
                await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.blacklist.invalidMember)
                return;
            }
            await handleBlacklistRemove(message, commandData.language, member, args[2].toLowerCase());
        } else if (args[0].toLowerCase() === 'clear') {
            if (args.length !== 2) {
                await sendHelp(message, commandData);
                return;
            }
            await handleClearBlacklist(message, commandData.language, args[1]);
        } else {
            await sendHelp(message, commandData);
            return;
        }
    }
});

const sendHelp = async (message: Message, commandData: { prefix: string, language: Language }) => {
    const helpEmbed = new MessageEmbed().setColor(botCache.config.colors.red).setDescription(commandData.language.blacklist.helpDescription);
    const helpFields = commandData.language.blacklist.helpFields;
    for (let i = 0; i < helpFields.length; i++) {
        helpEmbed.addField(helpFields[i].title, helpFields[i].description.replace(/%prefix%/g, commandData.prefix), false);
    }
    await message.channel.send({embed: helpEmbed});
    return;
}