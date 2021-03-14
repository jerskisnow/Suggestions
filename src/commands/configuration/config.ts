import { Message, MessageEmbed } from 'discord.js-light';
import botCache from '../../structures/BotCache';
import { getChannelFromArgs, getRoleFromArgs, Permission, sendPlainEmbed } from '../../managers/Commands';
import Language from '../../types/Language';
import { setConfigValue } from '../../managers/ServerData';
import { log } from '../../structures/Logging';

botCache.commands.set('config', {
    enabled: true,
    permission: Permission.ADMIN,
    aliases: ['setup', 'configure', 'configuration', 'settings'],
    exec: async (message, commandData, args: string[]) => {
        /*
         * config prefix <Prefix>
         * config language <Language>
         * config staffrole <Role>
         * config suggestionchannel <Channel>
         * config reportchannel <Channel>
         * config logchannel <Channel>
         * config approveemoji <Emoji>
         * config rejectemoji <Emoji>
         * config autoapprove <On/Off>
         * config autoreject <On/Off>
         * config deleteapproved <On/Off>
         * config deleterejected <On/Off>
         */
        if (args.length !== 2) {
            await sendHelp(message, commandData);
            return;
        }

        const options: any = {
            'prefix': handlePrefix,
            'language': handleLanguage,
            'staffrole': handleStaffrole,
            'suggestionchannel': handleSuggestionChannel,
            'reportchannel': handleReportChannel,
            'logchannel': handleLogChannel,
            'approveemoji': handleApproveEmoji,
            'rejectemoji': handleRejectEmoji,
            'autoapprove': handleAutoApprove,
            'autoreject': handleAutoReject,
            'deleteapproved': handleDeleteApproved,
            'deleterejected': handleDeleteRejected
        }

        if (options[args[0].toLowerCase()] == null) {
            await sendHelp(message, commandData);
            return;
        }

        // Run the right handler/controller
        await options[args[0].toLowerCase()](message, commandData.language, args[1].toLowerCase());
    }
});

const handlePrefix = async (message: Message, language: Language, value: string): Promise<void> => {
    await setConfigValue(message.guild.id, 'prefix', value);
    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.prefixUpdated.replace('%new_prefix%', value));
    await log(message.guild, language.logs.prefixUpdated.replace('%user_tag%', message.author.tag).replace('%new_prefix%', value));
}

const handleLanguage = async (message: Message, language: Language, value: string): Promise<void> => {
    let newLanguage: Language = null;
    for (let [key, lang] of botCache.languages) {
        if (key.toLowerCase() === value) {
            newLanguage = lang;
            continue;
        }
    }
    if (newLanguage === null) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.config.invalidLanguage.replace('%language_list_link%', botCache.config.links.languageListLink));
        return;
    }
    await setConfigValue(message.guild.id, 'language', newLanguage.name);

    await sendPlainEmbed(message.channel, botCache.config.colors.green, newLanguage.config.languageUpdated.replace('%new_language_name%', newLanguage.name).replace('%new_language_country%', newLanguage.country));
    await log(message.guild, newLanguage.logs.languageUpdated.replace('%user_tag%', message.author.tag).replace('%new_language_name%', newLanguage.name));
}

const handleStaffrole = async (message: Message, language: Language, value: string): Promise<void> => {
    const role = await getRoleFromArgs(message.guild, value);
    if (role == null) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.config.invalidRole);
        return;
    }
    await setConfigValue(message.guild.id, 'staff_role', role.id);

    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.roleUpdated.replace('%role_name%', role.name));
    await log(message.guild, language.logs.roleUpdated.replace('%user_tag%', message.author.tag).replace('%new_role%', role.name));
}

const handleSuggestionChannel = async (message: Message, language: Language, value: string): Promise<void> => {
    const channel = await getChannelFromArgs(message.guild, value);
    if (channel == null) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.config.invalidChannel);
        return;
    }
    await setConfigValue(message.guild.id, 'suggestion_channel', channel.id, false);
    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.suggestionChannelUpdated.replace('%new_channel%', channel.name));
    await log(message.guild, language.logs.suggestionChannelUpdated.replace('%user_tag%', message.author.tag).replace('%new_channel%', `<#${channel.id}>`));
}

const handleReportChannel = async (message: Message, language: Language, value: string): Promise<void> => {
    const channel = await getChannelFromArgs(message.guild, value);
    if (channel == null) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.config.invalidChannel);
        return;
    }
    await setConfigValue(message.guild.id, 'report_channel', channel.id, false);
    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.reportChannelUpdated.replace('%new_channel%', channel.name));
    await log(message.guild, language.logs.reportChannelUpdated.replace('%user_tag%', message.author.tag).replace('%new_channel%', `<#${channel.id}>`));
}

const handleLogChannel = async (message: Message, language: Language, value: string): Promise<void> => {
    const channel = await getChannelFromArgs(message.guild, value);
    if (channel == null) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.config.invalidChannel);
        return;
    }
    await setConfigValue(message.guild.id, 'log_channel', channel.id);
    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.logChannelUpdated.replace('%new_channel%', channel.name));
    await log(message.guild, language.logs.logChannelUpdated.replace('%user_tag%', message.author.tag).replace('%new_channel%', `<#${channel.id}>`));
}

const handleApproveEmoji = async (message: Message, language: Language, value: string): Promise<void> => {
    if (value.startsWith('<:')) {
        const emojiID = value.replace(/\D/g,'');
        const emoji = await message.guild.emojis.fetch(emojiID);
        value = emoji.name;

        await setConfigValue(message.guild.id, 'approve_emoji', emojiID);
    } else {
        await setConfigValue(message.guild.id, 'approve_emoji', value);
    }

    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.approveEmojiUpdated.replace('%new_emoji%', value));
    await log(message.guild, language.logs.approveEmojiUpdated.replace('%user_tag%', message.author.tag).replace('%new_emoji%', value));
}

const handleRejectEmoji = async (message: Message, language: Language, value: string): Promise<void> => {
    if (value.startsWith('<:')) {
        const emojiID = value.replace(/\D/g,'');
        const emoji = await message.guild.emojis.fetch(emojiID);
        value = emoji.name;

        await setConfigValue(message.guild.id, 'reject_emoji', emojiID);
    } else {
        await setConfigValue(message.guild.id, 'reject_emoji', value);
    }
    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.rejectEmojiUpdated.replace('%new_emoji%', value));
    await log(message.guild, language.logs.rejectEmojiUpdated.replace('%user_tag%', message.author.tag).replace('%new_emoji%', value));
}

const handleAutoApprove = async (message: Message, language: Language, value: string): Promise<void> => {
    const number = parseInt(value);
    if (isNaN(number) || number < 0) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.config.invalidNumberOption);
        return;
    }
    await setConfigValue(message.guild.id, 'auto_approve', value);
    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.autoApproveUpdated.replace('%new_amount%', value));
    await log(message.guild, language.logs.autoApproveUpdated.replace('%user_tag%', message.author.tag).replace('%new_amount%', value));
}

const handleAutoReject = async (message: Message, language: Language, value: string): Promise<void> => {
    const number = parseInt(value);
    if (isNaN(number) || number < 0) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.config.invalidNumberOption);
        return;
    }
    await setConfigValue(message.guild.id, 'auto_reject', value);
    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.autoRejectUpdated.replace('%new_amount%', value));
    await log(message.guild, language.logs.autoRejectUpdated.replace('%user_tag%', message.author.tag).replace('%new_amount%', value));
}

const handleDeleteApproved = async (message: Message, language: Language, value: string): Promise<void> => {
    let bool;
    switch (value) {
        case 'on':
            bool = true;
            break;
        case 'off':
            bool = false;
            break;
        default:
            await sendPlainEmbed(message.channel, botCache.config.colors.red, language.config.invalidToggleOption);
            return;
    }
    await setConfigValue(message.guild.id, 'delete_approved', bool);
    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.deleteApprovedUpdated.replace('%new_value%', bool ? 'On' : 'Off'));
    await log(message.guild, language.logs.deleteApprovedUpdated.replace('%user_tag%', message.author.tag).replace('%new_value%', bool ? 'On' : 'Off'));
}

const handleDeleteRejected = async (message: Message, language: Language, value: string): Promise<void> => {
    let bool;
    switch (value) {
        case 'on':
            bool = true;
            break;
        case 'off':
            bool = false;
            break;
        default:
            await sendPlainEmbed(message.channel, botCache.config.colors.red, language.config.invalidToggleOption);
            return;
    }
    await setConfigValue(message.guild.id, 'delete_rejected', bool);
    await sendPlainEmbed(message.channel, botCache.config.colors.green, language.config.deleteRejectedUpdated.replace('%new_value%', bool ? 'On' : 'Off'));
    await log(message.guild, language.logs.deleteRejectedUpdated.replace('%user_tag%', message.author.tag).replace('%new_value%', bool ? 'On' : 'Off'));
}

const sendHelp = async (message: Message, commandData: { prefix: string, language: Language }) => {
    const helpEmbed = new MessageEmbed().setColor(botCache.config.colors.red).setDescription(commandData.language.config.helpDescription);
    const helpFields = commandData.language.config.helpFields;
    for (let i = 0; i < helpFields.length; i++) {
        helpEmbed.addField(helpFields[i].title, helpFields[i].description.replace(/%prefix%/g, commandData.prefix), false);
    }
    await message.channel.send({embed: helpEmbed});
    return;
}
