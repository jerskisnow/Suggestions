import cache from 'memory-cache';

import pgPool from './PostgreSQL';
import cliColors from './CLIColors';

/**
 * Get whether a guild is cached or not (Deprecated)
 * @return {Boolean} the setting of the guild or null when the guild is not cached
 */
const guildExists = function (guild_id: string): boolean {
    return cache.get(guild_id) === null ? false : true;
};

/**
 * Get a cached setting from a guild
 * @return the setting of the guild or null when the guild is not cached
 */
const getGuildSetting = function (guild_id: string, guild_setting: string) {
    return guildExists(guild_id) ? cache.get(guild_id)[guild_setting] : null;
};

/**
 * Get the cached data from a guild (Deprecated)
 * @return {Object} the data of the guild or null when the guild is not cached 
 */
const getGuild = function (guild_id: string) {
    return cache.get(guild_id);
};

/**
 * Add data from a guild into the cache
 */
const cacheGuild = async function (guild_id: string) {
    const pgClient = await pgPool.connect();
    let result;
    try {
        result = await pgClient.query('SELECT prefix, language, channel, auto_approve, auto_reject, delete_approved, delete_rejected FROM servers WHERE id = $1::text', [guild_id]);
        if (!result.rows.length) {
            console.log(cliColors.FgCyan + "Creating an offline server in the database and cache with the id of: " + cliColors.FgYellow + guild_id + cliColors.FgCyan + "." + cliColors.Reset);
            await pgClient.query('INSERT INTO servers (id, prefix, language) VALUES ($1::text, $2::text, $3::text)', [guild_id, process.env.COMMAND_PREFIX, process.env.DEFAULT_LANGUAGE]);
            result = {
                rows: [
                    {
                        prefix: process.env.COMMAND_PREFIX,
                        language: process.env.DEFAULT_LANGUAGE,
                        channel: null,
                        auto_approve: -1,
                        auto_reject: -1,
                        delete_approved: false,
                        delete_rjected: false
                    }
                ]
            }
        }
    } finally {
        pgClient.release();
    }
    cache.put(guild_id, {
        prefix: result.rows[0].prefix,
        language: result.rows[0].language,
        channel: result.rows[0].channel,
        auto_approve: result.rows[0].auto_approve,
        auto_reject: result.rows[0].auto_reject,
        delete_approved: result.rows[0].delete_approved,
        delete_rejected: result.rows[0].delete_rejected
    });
};

/**
 * Delete the guild from the cache
 */
const deleteGuild = function (guild_id: string): void {
    cache.del(guild_id);
};

/**
 * Update a specific guild setting
 */
const setGuildSetting = function (guild_id: string, guild_setting: string, setting_value: any) {
    const settings = getGuild(guild_id);
    settings[guild_setting] = setting_value;
    cache.put(guild_id, settings);
}

export {
    getGuildSetting,
    cacheGuild,
    deleteGuild,
    setGuildSetting,
    guildExists,

    // Deprecations
    getGuild,
    cache as getCacheClass
};
