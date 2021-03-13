import Redis from '../structures/Redis';
import PostgreSQL from '../structures/PostgreSQL';
import botCache from '../structures/BotCache';
import { Client, Guild } from 'discord.js-light';

/**
 * Remove a specific guild
 * @param guild_id the id of the specific guild
 */
export const cacheGuild = async function (guild_id: string): Promise<GuildSettingOptions> {
    let result = await PostgreSQL.runQuery('SELECT prefix, language, staff_role, auto_approve, auto_reject, approve_emoji, reject_emoji FROM servers WHERE id = $1::text', [guild_id]);
    // Server does not exist in the database
    if (!result.rows.length) {
        // Write to the database
        await PostgreSQL.runQuery('INSERT INTO servers (id, prefix, language) VALUES ($1::text, $2::text, $3::text)', [guild_id, botCache.config.prefix, botCache.config.language]);
        // Manipulate the result and set it to the default data
        result.rows = [{
            prefix: botCache.config.prefix,
            language: botCache.config.language,
            staff_role: null
        }];
    }
    // The actual cache object, there are some aditional checks here to set default data
    const cacheObject = {
        prefix: result.rows[0].prefix,
        language: result.rows[0].language,
        staff_role: result.rows[0].staff_role,
        auto_approve: result.rows[0].auto_approve === undefined ? null : result.rows[0].auto_approve,
        auto_reject: result.rows[0].auto_reject === undefined ? null : result.rows[0].auto_reject,
        approve_emoji: result.rows[0].approve_emoji === undefined ? null : result.rows[0].approve_emoji,
        reject_emoji: result.rows[0].reject_emoji === undefined ? null : result.rows[0].reject_emoji
    }
    await Redis.getClient().setAsync(guild_id, JSON.stringify(cacheObject), 'EX', 18000 /* 5 hours */);
    return cacheObject;
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

        const setting = JSON.parse(output)[guild_setting];
        if (setting == null) {
            // I'm so sorry for this injection but there is not other way, also all the identifiers are set by the bot anyway and are not user input.
            const result = await PostgreSQL.runQuery(`SELECT ${guild_setting} FROM servers WHERE id = $1::text`, [guild_id]);
            if (!result.rows.length) return null;

            return result.rows[0][guild_setting];
        }
        return setting;
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
export const getConfigValues = async function (guild_id: string, guild_settings: string[], searchCache: boolean): Promise<GuildSettingOptions> {
    if (searchCache) {
        const output = await Redis.getClient().getAsync(guild_id);
        if (output == null) return null;

        const parsedOutput = JSON.parse(output);
        const outputKeys = Object.keys(parsedOutput);

        // After the loop this will contain all data that was salvageble from the cache
        const fetchedSettings: any = {};
        for (let i = 0; i < outputKeys.length; i++) {
            // Get the key of the current iteration
            const key = outputKeys[i];
            // Check if that's a key we need
            if (guild_settings.includes(key)) {
                // Set the key with in value in the new settings object
                fetchedSettings[key] = parsedOutput[key];
            }
        }

        let toFetch: string[] = [];
        // Loop though the setings again
        for (let i = 0; i < guild_settings.length; i++) {
            // Check if key we're looking for is not in settings
            if (!(guild_settings[i] in fetchedSettings)) {
                toFetch.push(guild_settings[i]);
            }
        }

        if (toFetch.length > 0) {
            // Add all values from toFetch to the injection string
            let inj = toFetch[0];
            for (let i = 1; i < toFetch.length; i++) {
                inj += `, ${toFetch[i]}`;
            }

            const result = await PostgreSQL.runQuery(`SELECT ${inj} FROM servers WHERE id = $1::text`, [guild_id]);
            if (result.rows.length) {
                // Go over the result
                for (let i = 0; i < result.rows.length; i++) {
                    const setting = toFetch[i];
                    // Set the values in 'settings'
                    fetchedSettings[setting] = result.rows[0][setting];
                }
            }
        }

        // Return the asked settings
        return fetchedSettings;
    }

    let inj = guild_settings[0];
    for (let i = 1; i < guild_settings.length; i++) {
        inj += `, ${guild_settings[i]}`;
    }

    // I'm so sorry for this injection but there is not other way, also all the identifiers are set by the bot anyway and are not user input.
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
        await Redis.getClient().setAsync(guild_id, JSON.stringify(settings), 'EX', 18000 /* 5 hours */);
    }
    // I'm so sorry for this injection but there is not other way, also all the identifiers are set by the bot anyway and are not user input.
    await PostgreSQL.runQuery(`UPDATE servers SET ${identifier} = $1 WHERE id = $2::text`, [value, guild_id]);
}

export const getServerCount = async (client: Client) => {
    const req = await client.shard.fetchClientValues('guilds.cache.size');
    return req.reduce((p, n) => p + n, 0);
}

export const getServer = async (client: Client, guildID: string): Promise<Guild> => {
    const req = await client.shard.broadcastEval(`this.guilds.cache.get("${guildID}")`);
    return req.find(res => !!res) || null;
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
    report_blacklist?: string
}
