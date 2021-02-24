import { Constants, Message, MessageEmbed, TextChannel } from 'discord.js-light';
import Language from '../types/Language';
import { getConfigValue, getConfigValues } from './ServerData';
import PostgreSQL from '../structures/PostgreSQL';
import { MessageableChannel, sendPlainEmbed, sendPrivateMessage } from './Commands';
import botCache from '../structures/BotCache';
import { log } from '../structures/Logging';

export const handleSuggestionCreation = async (message: Message, language: Language, description: string) => {
    const guildData = await getConfigValues(message.guild.id, ['suggestion_blacklist', 'suggestion_channel', 'approve_emoji', 'reject_emoji'], false);

    // I did this here so we can don't have to get configuration from the database twice.
    if (guildData.suggestion_blacklist != null &&
        JSON.parse(guildData.suggestion_blacklist).includes(message.author.id)
    ) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.suggest.onBlacklist);
        await log(message.guild, language.logs.blacklistLogs.isOnSuggestion.replace('%user_tag%', message.author.tag));
        return;
    }

    const channel = await message.guild.channels.fetch(guildData.suggestion_channel);
    if (!channel || channel.type !== 'text') {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.suggest.invalidChannel)
        return;
    }

    const idResult = await PostgreSQL.runQuery('SELECT id FROM suggestions ORDER BY id DESC LIMIT 1');
    const id = !idResult.rows.length ? 1 : 1 + idResult.rows[0].id;

    const sMessage = await (channel as TextChannel).send({
        embed: new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor(botCache.config.colors.blue)
            .setDescription(language.suggest.suggestionDescription
                .replace('%description%', description)
                .replace('%status%', language.additional.openStatus)
                .replace('%id%', id))
            .setTimestamp()
            .setFooter('Suggestions© 2020 - 2021')
    });

    try {
        await sMessage.react(guildData.approve_emoji);
        await sMessage.react(guildData.reject_emoji);
    } catch (ex) {
        console.log('DEBUG:' + guildData.approve_emoji);
        console.log('DEBUG:' + guildData.reject_emoji);
    }

    await PostgreSQL.runQuery('INSERT INTO suggestions (context, author, guild, channel, message, status) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::int)', [description, message.author.id, message.guild.id, channel.id, sMessage.id, SuggestionStatus.OPEN]);

    await sendPrivateMessage(message.author, new MessageEmbed().setColor(botCache.config.colors.green).setDescription(
        language.suggest.suggestionSent.replace('%guild_name%', message.guild.name).replace('%message_url%', sMessage.url)
    ));
    await log(message.guild, language.logs.suggestionCreated.replace('%user_tag%', message.author.tag).replace('%mesage_url%', sMessage.url));
}

export const approveSuggestion = async (message: Message, language: Language, suggestion: SuggestionData, reason?: string) => {
    const channel = message.guild.channels.cache.get(suggestion.channel) as TextChannel;
    if (!channel) {
        await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.DELETED, suggestion.id]);
        return;
    }

    let msg;
    try {
        msg = await channel.messages.fetch(suggestion.message);
    } catch (ex) {
        if (ex.code !== Constants.APIErrors.UNKNOWN_MESSAGE) {
            console.error('An error occured', ex);
        }
    }
    if (msg == null || msg.deleted) {
        await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.DELETED, suggestion.id]);
        return;
    }

    if (await getConfigValue(message.guild.id, 'delete_approved') as boolean) {
        await msg.delete();
        await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.DELETED, suggestion.id]);
        return;
    }

    const embed = msg.embeds[0];
    embed.description = language.suggest.suggestionDescription
        .replace('%description%', suggestion.context)
        .replace('%status%', reason ? `${language.additional.approvedStatus} (${reason})` : language.additional.approvedStatus)
        .replace('%id%', String(suggestion.id));
    embed.color = parseInt(botCache.config.colors.green.slice(1), 16);

    await msg.edit({ embed: embed });

    await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.APPROVED, suggestion.id]);
}

export const rejectSuggestion = async (message: Message, language: Language, suggestion: SuggestionData, reason?: string) => {
    const channel = message.guild.channels.cache.get(suggestion.channel) as TextChannel;
    if (!channel) {
        await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.DELETED, suggestion.id]);
        return;
    }

    let msg;
    try {
        msg = await channel.messages.fetch(suggestion.message);
    } catch (ex) {
        if (ex.code !== Constants.APIErrors.UNKNOWN_MESSAGE) {
            console.error('An error occured', ex);
        }
    }
    if (!msg || msg.deleted) {
        await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.DELETED, suggestion.id]);
        return;
    }
    if (await getConfigValue(message.guild.id, 'delete_rejected') as boolean) {
        await msg.delete();
        await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.DELETED, suggestion.id]);
        return;
    }

    const embed = msg.embeds[0];
    embed.description = language.suggest.suggestionDescription
        .replace('%description%', suggestion.context)
        .replace('%status%', reason ? `${language.additional.rejectedStatus} (${reason})` : language.additional.rejectedStatus)
        .replace('%id%', String(suggestion.id));
    embed.color = parseInt(botCache.config.colors.red.slice(1), 16);

    await msg.edit({ embed: embed });

    await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.REJECTED, suggestion.id]);
}

export const considerSuggestion = async (message: Message, language: Language, suggestion: SuggestionData, reason?: string) => {
    const channel = message.guild.channels.cache.get(suggestion.channel) as TextChannel;
    if (!channel) {
        await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.DELETED, suggestion.id]);
        return;
    }

    let msg;
    try {
        msg = await channel.messages.fetch(suggestion.message);
    } catch (ex) {
        if (ex.code !== Constants.APIErrors.UNKNOWN_MESSAGE) {
            console.error('An error occured', ex);
        }
    }
    if (!msg || msg.deleted) {
        await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.DELETED, suggestion.id]);
        return;
    }

    const embed = msg.embeds[0];
    embed.description = language.suggest.suggestionDescription
        .replace('%description%', suggestion.context)
        .replace('%status%', reason ? `${language.additional.considerstatus} (${reason})` : language.additional.considerstatus)
        .replace('%id%', String(suggestion.id));
    embed.color = parseInt(botCache.config.colors.green.slice(1), 16);

    await msg.edit({ embed: embed });

    await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.UNDER_CONSIDERATION, suggestion.id]);
}

export const moveSuggestion = async (message: Message, language: Language, suggestion: SuggestionData, newChannel: MessageableChannel) => {
    const oldChannel = await message.guild.channels.fetch(suggestion.channel) as TextChannel;
    if (!oldChannel) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.movesuggestion.invalidMessage)
        await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.DELETED, suggestion.id]);
        return;
    }

    let msg;
    try {
        msg = await oldChannel.messages.fetch(suggestion.message);
    } catch (ex) {
        if (ex.code !== Constants.APIErrors.UNKNOWN_MESSAGE) {
            console.error('An error occured', ex);
        }
    }

    if (!msg || msg.deleted) {
        await PostgreSQL.runQuery('UPDATE suggestions SET status = $1::int WHERE id = $2::int', [SuggestionStatus.DELETED, suggestion.id]);
        return;
    }

    await msg.delete();
    const newMsg = await newChannel.send({
        embed: msg.embeds[0]
    });

    await PostgreSQL.runQuery('UPDATE suggestions SET channel = $1::text, message = $2::text WHERE id = $3::int', [newChannel.id, newMsg.id, suggestion.id]);
}

export const handleSuggestionList = async (message: Message, language: Language) => {
    let result = await PostgreSQL.runQuery('SELECT id, context, author, guild, channel, message FROM suggestions WHERE guild = $1::text AND status = $2::int ORDER BY id DESC', [message.guild.id, SuggestionStatus.OPEN]);

    if (!result.rows.length) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.list.noSuggestionsFound);
        return;
    }

    const embed = new MessageEmbed()
        .setColor(botCache.config.colors.blue)
        .setDescription(language.list.suggestionListDescription.replace('%amount%', String(result.rowCount)));

    for (let i = 0; i < result.rows.length; i++) {
        let member = null;
        try {
            member = await message.guild.members.fetch(result.rows[i].author);
        } catch (ex) {
            if (ex.code !== Constants.APIErrors.UNKNOWN_MEMBER) {
                console.error(ex);
            }
        }
        embed.addField(member == null ? 'User Left ~ Suggestions' : member.user.tag, `${result.rows[i].context}\n**ID:** ${result.rows[i].id}`, false);
        if (i === 7) break;
    }

    await message.channel.send({embed: embed});
}

export const getSuggestionData = async (resolvable: string): Promise<SuggestionData> => {
    let result = await PostgreSQL.runQuery('SELECT id, context, author, guild, channel, message, status FROM suggestions WHERE message = $1::text', [resolvable]);
    if (!result.rows.length) {
        result = await PostgreSQL.runQuery('SELECT id, context, author, guild, channel, message, status FROM suggestions WHERE id = $1::int', [parseInt(resolvable)]);
        if (!result.rows.length) {
            result = null;
        }
    }
    return result == null ? null : result.rows[0];
}

export const getLatestSuggestions = async (guild_id: string, limit: number): Promise<SuggestionData[]> => {
    let result = await PostgreSQL.runQuery('SELECT id, context, author, guild, channel, message FROM suggestions WHERE guild = $1::text AND status = $2::int LIMIT $3::int', [guild_id, SuggestionStatus.OPEN, limit]);
    return result.rows;
}

interface SuggestionData {
    id: number,
    context: string,
    author: string,
    guild: string,
    channel: string,
    message: string,
    status: number // See SuggestionStatus
}

export enum SuggestionStatus {
    OPEN,
    APPROVED,
    UNDER_CONSIDERATION,
    REJECTED,
    DELETED
}