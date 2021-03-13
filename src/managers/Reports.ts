import { Constants, Message, MessageEmbed, TextChannel } from 'discord.js-light';
import Language from '../types/Language';
import { getConfigValues } from './ServerData';
import PostgreSQL from '../structures/PostgreSQL';
import { MessageableChannel, sendPlainEmbed, sendPrivateMessage } from './Commands';
import botCache from '../structures/BotCache';
import { log } from '../structures/Logging';

export const handleReportCreation = async (message: Message, language: Language, description: string) => {
    const guildData = await getConfigValues(message.guild.id, ['report_blacklist', 'report_channel'], false);

    if (guildData.report_blacklist != null &&
        JSON.parse(guildData.report_blacklist).includes(message.author.id)
    ) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.report.onBlacklist);
        await log(message.guild, language.logs.blacklistLogs.isOnReport.replace('%user_tag%', message.author.tag));
        return;
    }

    const channel = await message.guild.channels.fetch(guildData.report_channel);

    if (!channel || channel.type !== 'text') {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.report.invalidChannel)
        return;
    }

    const idResult = await PostgreSQL.runQuery('SELECT id FROM reports ORDER BY id DESC LIMIT 1');
    const id = !idResult.rows.length ? 1 : 1 + idResult.rows[0].id;

    const rMessage = await (channel as TextChannel).send({
        embed: new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor(botCache.config.colors.blue)
            .setDescription(language.report.reportDescription
                .replace('%description%', description)
                .replace('%status%', language.additional.openStatus)
                .replace('%id%', id))
            .setTimestamp()
            .setFooter('Suggestions© 2020 - 2021')
    });

    await PostgreSQL.runQuery('INSERT INTO reports (context, author, guild, channel, message, status) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::int)', [description, message.author.id, message.guild.id, channel.id, rMessage.id, ReportStatus.OPEN]);

    await sendPrivateMessage(message.author, new MessageEmbed().setColor(botCache.config.colors.green).setDescription(
        language.report.reportSent.replace('%guild_name%', message.guild.name)
    ));
    await log(message.guild, language.logs.reportCreated.replace('%user_tag%', message.author.tag).replace('%mesage_url%', rMessage.url));
}

export const resolveReport = async (message: Message, language: Language, report: ReportData, reason?: string) => {
    const channel = message.guild.channels.cache.get(report.channel) as TextChannel;
    if (!channel) {
        await PostgreSQL.runQuery('UPDATE reports SET status = $1::int WHERE id = $2::int', [ReportStatus.DELETED, report.id]);
        return;
    }

    let msg;
    try {
        msg = await channel.messages.fetch(report.message);
    } catch (ex) {
        if (ex.code !== Constants.APIErrors.UNKNOWN_MESSAGE) {
            console.error(ex);
        }
    }
    if (!msg || msg.deleted) {
        await PostgreSQL.runQuery('UPDATE reports SET status = $1::int WHERE id = $2::int', [ReportStatus.DELETED, report.id]);
        return;
    }

    const embed = msg.embeds[0];
    embed.description = language.report.reportDescription
        .replace('%description%', report.context)
        .replace('%status%', reason ? `${language.additional.resolvedStatus} (${reason})` : language.additional.resolvedStatus)
        .replace('%id%', String(report.id));
    embed.color = parseInt(botCache.config.colors.green.slice(1), 16);

    await msg.edit({embed: embed}).catch(console.error);

    await PostgreSQL.runQuery('UPDATE reports SET status = $1::int WHERE id = $2::int', [ReportStatus.RESOLVED, report.id]);
}

export const moveReport = async (message: Message, language: Language, report: ReportData, newChannel: MessageableChannel) => {
    const oldChannel = await message.guild.channels.fetch(report.channel) as TextChannel;
    if (!oldChannel) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.movereport.invalidMessage)
        await PostgreSQL.runQuery('UPDATE reports SET status = $1::int WHERE id = $2::int', [ReportStatus.DELETED, report.id]);
        return;
    }

    let msg;
    try {
        msg = await oldChannel.messages.fetch(report.message);
    } catch (ex) {
        if (ex.code !== Constants.APIErrors.UNKNOWN_MESSAGE) {
            console.error(ex);
        }
    }
    if (!msg || msg.deleted) {
        await PostgreSQL.runQuery('UPDATE reports SET status = $1::int WHERE id = $2::int', [ReportStatus.DELETED, report.id]);
        return;
    }

    await msg.delete();
    const newMsg = await newChannel.send({
        embed: msg.embeds[0]
    });

    await PostgreSQL.runQuery('UPDATE reports SET channel = $1::text, message = $2::text WHERE id = $3::int', [newChannel.id, newMsg.id, report.id]);
}

export const handleReportList = async (message: Message, language: Language) => {
    let result = await PostgreSQL.runQuery('SELECT id, context, author, guild, channel, message FROM reports WHERE guild = $1::text AND status = $2::int ORDER BY id DESC', [message.guild.id, ReportStatus.OPEN]);

    if (!result.rows.length) {
        await sendPlainEmbed(message.channel, botCache.config.colors.red, language.list.noReportsFound);
        return;
    }

    const embed = new MessageEmbed()
        .setColor(botCache.config.colors.blue)
        .setDescription(language.list.reportListDescription.replace('%amount%', String(result.rowCount)));

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

export const getReportData = async (resolvable: string): Promise<ReportData> => {
    let result = await PostgreSQL.runQuery('SELECT id, context, author, guild, channel, message, status FROM reports WHERE message = $1::text', [resolvable]);
    if (!result.rows.length) {
        result = await PostgreSQL.runQuery('SELECT id, context, author, guild, channel, message, status FROM reports WHERE id = $1::int', [parseInt(resolvable)]);
        if (!result.rows.length) {
            result = null;
        }
    }
    return result.rows[0];
}

interface ReportData {
    id: number,
    context: string,
    author: string,
    guild: string,
    channel: string,
    message: string,
    status: number // See ReportStatus
}

export enum ReportStatus {
    OPEN,
    RESOLVED,
    DELETED
}
