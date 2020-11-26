import { GuildMember, Message } from 'discord.js';
import Language from '../types/Language';
import { sendPlainEmbed } from './Commands';
import botCache from '../structures/BotCache';
import { getConfigValues, setConfigValue } from './ServerData';
import { log } from '../structures/Logging';

export const handleBlacklistAdd = async (message: Message, language: Language, member: GuildMember, blacklistString: string) => {
    const data = await getConfigValues(message.guild.id, ['suggestion_blacklist', 'report_blacklist'], false);

    if (blacklistString === 'suggestion') {
        const bl: string[] = data.suggestion_blacklist == null ? [] : JSON.parse(data.suggestion_blacklist);
        if (bl.includes(member.id)) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.alreadyOnBlacklist);
            return;
        }

        bl.push(message.author.id);

        await setConfigValue(message.guild.id, 'suggestion_blacklist', JSON.stringify(bl), false);

        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.blacklistUpdated);
        await log(message.guild, language.logs.blacklistLogs.addedToSuggestion);
    } else if (blacklistString === 'report') {
        const bl: string[] = data.report_blacklist == null ? [] : JSON.parse(data.report_blacklist);
        if (bl.includes(member.id)) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.alreadyOnBlacklist);
            return;
        }

        bl.push(message.author.id);

        await setConfigValue(message.guild.id, 'report_blacklist', JSON.stringify(bl), false);

        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.blacklistUpdated);
        await log(message.guild, language.logs.blacklistLogs.addedToReport);
    } else if (blacklistString === 'all') {
        const s_bl: string[] = data.suggestion_blacklist == null ? [] : JSON.parse(data.suggestion_blacklist);
        const r_bl: string[] = data.report_blacklist == null ? [] : JSON.parse(data.report_blacklist);
        if (s_bl.includes(member.id) && r_bl.includes(member.id)) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.alreadyOnBlacklist);
            return;
        }

        if (!s_bl.includes(member.id)) {
            s_bl.push(message.author.id);
            await setConfigValue(message.guild.id, 'suggestion_blacklist', JSON.stringify(s_bl), false);
        }

        if (!r_bl.includes(member.id)) {
            r_bl.push(message.author.id);
            await setConfigValue(message.guild.id, 'report_blacklist', JSON.stringify(r_bl), false);
        }

        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.blacklistsUpdated);
        await log(message.guild, language.logs.blacklistLogs.addedToAll);
    } else {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.invalidBlacklist);
        return;
    }
}

export const handleBlacklistRemove = async (message: Message, language: Language, member: GuildMember, blacklistString: string) => {
    const data = await getConfigValues(message.guild.id, ['suggestion_blacklist', 'report_blacklist'], false);

    if (blacklistString === 'suggestion') {
        const bl: string[] = data.suggestion_blacklist == null ? [] : JSON.parse(data.suggestion_blacklist);
        if (!bl.includes(member.id)) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.notOnBlacklist);
            return;
        }

        bl.splice(bl.indexOf(message.author.id), 1);

        await setConfigValue(message.guild.id, 'suggestion_blacklist', JSON.stringify(bl), false);

        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.blacklistUpdated);
        await log(message.guild, language.logs.blacklistLogs.removedFromSuggestion);
    } else if (blacklistString === 'report') {
        const bl: string[] = data.report_blacklist == null ? [] : JSON.parse(data.report_blacklist);
        if (!bl.includes(member.id)) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.notOnBlacklist);
            return;
        }

        bl.splice(bl.indexOf(message.author.id), 1);

        await setConfigValue(message.guild.id, 'report_blacklist', JSON.stringify(bl), false);

        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.blacklistUpdated);
        await log(message.guild, language.logs.blacklistLogs.removedFromReport);
    } else if (blacklistString === 'all') {
        const s_bl: string[] = data.suggestion_blacklist == null ? [] : JSON.parse(data.suggestion_blacklist);
        const r_bl: string[] = data.report_blacklist == null ? [] : JSON.parse(data.report_blacklist);
        if (!s_bl.includes(member.id) && !r_bl.includes(member.id)) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.notOnBlacklist);
            return;
        }

        if (s_bl.includes(member.id)) {
            s_bl.splice(s_bl.indexOf(message.author.id), 1);
            await setConfigValue(message.guild.id, 'suggestion_blacklist', JSON.stringify(s_bl), false);
        }

        if (r_bl.includes(member.id)) {
            r_bl.splice(r_bl.indexOf(message.author.id), 1);
            await setConfigValue(message.guild.id, 'report_blacklist', JSON.stringify(r_bl), false);
        }

        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.blacklistsUpdated);
        await log(message.guild, language.logs.blacklistLogs.removedFromAll);
    } else {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.invalidBlacklist);
        return;
    }
}

export const handleClearBlacklist = async (message: Message, language: Language, blacklistString: string) => {
    if (blacklistString === 'suggestion') {
        await setConfigValue(message.guild.id, 'suggestion_blacklist', null, false);

        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.blacklistUpdated);
        await log(message.guild, language.logs.blacklistLogs.clearedSuggestion);
    } else if (blacklistString === 'report') {
        await setConfigValue(message.guild.id, 'report_blacklist', null, false);

        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.blacklistUpdated);
        await log(message.guild, language.logs.blacklistLogs.clearedReport);
    } else if (blacklistString === 'all') {
        await setConfigValue(message.guild.id, 'suggestion_blacklist', null, false);
        await setConfigValue(message.guild.id, 'report_blacklist', null, false);

        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.blacklistsUpdated);
        await log(message.guild, language.logs.blacklistLogs.clearedAll);
    } else {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.blacklist.invalidBlacklist);
        return;
    }
}