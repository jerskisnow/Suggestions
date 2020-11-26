import Redis from '../structures/Redis';
import PostgreSQL from '../structures/PostgreSQL';
import botCache from '../structures/BotCache';
import fetch from 'node-fetch';

/**
 * Get whether a guild is cached or not (Deprecated)
 * @return {Promise<Boolean>} the setting of the guild or null when the guild is not cached
 */
export const isCached = async function (guild_id: string): Promise<boolean> {
    return await Redis.getClient().existsAsync(guild_id);
};

// --------- [This is a solution to transfer data from active guilds from the old database to the new one]
const getOldData = async (guild_id: string): Promise<any> => {
    const res = await fetch(botCache.config.oldGuildDataBackend + guild_id);
    if (res.status === 404) return null;
    const json = await res.json();
    return {
        prefix: json[0].prefix,
        suggestion_channel: json[0].suggestion_channel,
        report_channel: json[0].report_channel,
        auto_approve: json[0].auto_approve,
        auto_reject: json[0].auto_reject,
        delete_approved: json[0].delete_approved,
        delete_rejected: json[0].delete_rejected,
    }
}
// ---------[This is a solution to transfer data from active guilds from the old database to the new one]

/**
 * Remove a specific guild
 * @param guild_id the id of the specific guild
 */
export const cacheGuild = async function (guild_id: string): Promise<void> {
    let result = await PostgreSQL.runQuery('SELECT prefix, language, staff_role, auto_approve, auto_reject, approve_emoji, reject_emoji FROM servers WHERE id = $1::text', [guild_id]);
    if (!result.rows.length) {
        // ---------
        const oldData = await getOldData(guild_id);
        if (oldData !== null) {
            await PostgreSQL.runQuery('INSERT INTO servers (id, prefix, language, suggestion_channel, report_channel, auto_approve, auto_reject, approve_emoji, reject_emoji, delete_approved, delete_rejected) VALUES ($1::text, $2::text, $3::text, $4, $5, $6, $7, $8, $9, $10, $11)', [
                guild_id, oldData.prefix, botCache.config.language, oldData.suggestion_channel, oldData.report_channel, oldData.auto_approve, oldData.auto_reject, '✅', '❎', oldData.delete_approved, oldData.delete_rejected
            ]);
            result.rows = [{
                prefix: oldData.prefix,
                language: botCache.config.language,
                staff_role: null,
                auto_approve: oldData.auto_approve,
                auto_reject: oldData.auto_reject,
                approve_emoji: '✅',
                reject_emoji: '❎',
                disabled: false
            }];
        } else {
            await PostgreSQL.runQuery('INSERT INTO servers (id, prefix, language) VALUES ($1::text, $2::text, $3::text)', [guild_id, botCache.config.prefix, botCache.config.language]);
            result.rows = [{
                prefix: botCache.config.prefix,
                language: botCache.config.language,
                staff_role: null,
                auto_approve: -1,
                auto_reject: -1,
                approve_emoji: botCache.config.emojis.approve,
                reject_emoji: botCache.config.emojis.reject,
                disabled: false
            }];
        }
        // ---------
    }
    const cacheObject = {
        prefix: result.rows[0].prefix,
        language: result.rows[0].language,
        staff_role: result.rows[0].staff_role,
        auto_approve: result.rows[0].auto_approve == null ? -1 : result.rows[0].auto_approve,
        auto_reject: result.rows[0].auto_reject == null ? -1 : result.rows[0].auto_reject,
        approve_emoji: result.rows[0].approve_emoji == null ? botCache.config.emojis.approve : result.rows[0].approve_emoji,
        reject_emoji: result.rows[0].reject_emoji == null ? botCache.config.emojis.reject : result.rows[0].reject_emoji,
        disabled: result.rows[0].disabled
    }
    await Redis.getClient().setAsync(guild_id, JSON.stringify(cacheObject), 'EX', 7200);
}

/**
 * Remove a specific guild
 * @param guild_id the id of the specific guild
 * @param isDeletion whether or not the guild should be removed from the database
 */
export const unCacheGuild = async function (guild_id: string, isDeletion = false): Promise<void> {
    await Redis.getClient().delAsync(guild_id);
    if (isDeletion) {
        await PostgreSQL.runQuery('DELETE FROM servers WHERE id = $1::text', [guild_id]);
    }
}

/**
 * Get a cached setting from a guild
 * @return the setting of the guild or null when the guild is not cached
 */
export const getConfigValue = async function (guild_id: string, guild_setting: string, searchCache = true): Promise<SettingResolvable> {
    if (searchCache) {
        const output = await Redis.getClient().getAsync(guild_id);
        if (output == null) return null;

        return JSON.parse(output)[guild_setting];
    }
    // I'm so sorry for this injection but there is not other way, also all the identifiers are set by the bot anyway and are not user input.
    const result = await PostgreSQL.runQuery(`SELECT ${guild_setting} FROM servers WHERE id = $1::text`, [guild_id]);
    if (!result.rows.length) return null;

    return result.rows[0][guild_setting];
};

/**
 * Get multiple cached settings from a guild
 * @return the settings of the guild or null when the guild is not cached
 */
export const getConfigValues = async function (guild_id: string, guild_settings: string[], searchCache = true): Promise<GuildSettingOptions> {
    if (searchCache) {
        const output = await Redis.getClient().getAsync(guild_id);
        if (output == null) return null;

        const parsedOutput = JSON.parse(output);
        const outputKeys = Object.keys(parsedOutput);

        const settings: any = {};
        for (let i = 0; i < outputKeys.length; i++) {
            // Get the key of the current iteration
            const key = outputKeys[i];
            // Check if that's a key we need
            if (guild_settings.includes(key)) {
                // Set the key with in value in the new settings object
                settings[key] = parsedOutput[key];
            }
        }
        return settings;
    }
    // I'm so sorry for this injection but there is not other way, also all the identifiers are set by the bot anyway and are not user input.
    let inj = guild_settings[0];
    for (let i = 1; i < guild_settings.length; i++) {
        inj += `, ${guild_settings[i]}`
    }

    const result = await PostgreSQL.runQuery(`SELECT ${inj} FROM servers WHERE id = $1::text`, [guild_id]);
    if (!result.rows.length) return null;

    return result.rows[0];
};

/**
 * Set a specific guild setting
 */
export const setConfigValue = async function (guild_id: string, identifier: string, value: SettingResolvable, updateCache = true): Promise<void> {
    if (updateCache) {
        const rawSettings = await Redis.getClient().getAsync(guild_id);
        const settings = JSON.parse(rawSettings);

        settings[identifier] = value;
        await Redis.getClient().setAsync(guild_id, JSON.stringify(settings), 'EX', 7200 /* 2 hours */);
    }
    // I'm so sorry for this injection but there is not other way, also all the identifiers are set by the bot anyway and are not user input.
    await PostgreSQL.runQuery(`UPDATE servers SET ${identifier} = $1 WHERE id = $2::text`, [value, guild_id]);
}

type SettingResolvable = Uint8Array | string | number | boolean;

interface GuildSettingOptions {
    prefix?: string,
    language?: string,
    staff_role?: string,
    suggestion_channel?: string,
    report_channel?: string,
    log_channel?: string,
    auto_approve?: number,
    auto_reject?: number,
    approve_emoji?: string,
    reject_emoji?: string,
    delete_approved?: boolean,
    delete_rejected?: boolean,
    suggestion_blacklist?: string,
    report_blacklist?: string,
    disabled?: boolean
}