import pgPool from './PostgreSQL';
import cliColors from './CLIColors';

import redisClient from './RedisClient';

/**
 * Get whether a guild is cached or not (Deprecated)
 * @return {Promise<Boolean>} the setting of the guild or null when the guild is not cached
 */
const exists = async function (guild_id: string): Promise<boolean> {
    const result: boolean = await redisClient.existsAsync(guild_id);
    return result;
};

/**
 * Get a cached setting from a guild
 * @return the setting of the guild or null when the guild is not cached
 */
const get = async function (guild_id: string, guild_setting: string): Promise<string|number|boolean|null> {
    const output = await redisClient.getAsync(guild_id);
    return JSON.parse(output)[guild_setting];
};

/**
 * Add data from a guild into the cache
 * 
 * TODO: Make this dynamic once
 */
const cache = async function (guild_id: string) {
    const pgClient = await pgPool.connect();
    let result;
    try {
        result = await pgClient.query('SELECT prefix, language, suggestion_channel, report_channel, auto_approve, auto_reject, delete_approved, delete_rejected, is_premium FROM servers WHERE id = $1::text', [guild_id]);
        if (!result.rows.length) {
            console.log(cliColors.FgCyan + "Creating an offline server in the database and cache with the id of: " + cliColors.FgYellow + guild_id + cliColors.FgCyan + "." + cliColors.Reset);
            await pgClient.query('INSERT INTO servers (id, prefix, language, is_premium) VALUES ($1::text, $2::text, $3::text, $4::boolean)', [guild_id, process.env.COMMAND_PREFIX, process.env.DEFAULT_LANGUAGE, false]);
            result = {
                rows: [
                    {
                        prefix: process.env.COMMAND_PREFIX,
                        language: process.env.DEFAULT_LANGUAGE,
                        suggestion_channel: null,
                        report_channel: null,
                        auto_approve: -1,
                        auto_reject: -1,
                        delete_approved: false,
                        delete_rjected: false,
                        is_premium: false
                    }
                ]
            }
        }
    } finally {
        pgClient.release();
    }

    const cacheObject = {
        prefix: result.rows[0].prefix, // Not null
        language: result.rows[0].language, // Not null
        suggestion_channel: result.rows[0].suggestion_channel, // Can be null
        report_channel: result.rows[0].report_channel, // Can be null
        auto_approve: result.rows[0].auto_approve === null ? -1 : result.rows[0].auto_approve,
        auto_reject: result.rows[0].auto_reject === null ? -1 : result.rows[0].auto_reject,
        delete_approved: result.rows[0].delete_approved === null ? false : result.rows[0].delete_approved,
        delete_rejected: result.rows[0].delete_rejected === null ? false : result.rows[0].delete_rejected,
        is_premium: result.rows[0].is_premium // Not null
    }

    await redisClient.setAsync(
        guild_id, // key
        JSON.stringify(cacheObject), // value
        'EX', 28800 // expiration in seconds (8 hours)
    );
    
    return cacheObject;
};

/**
 * Set a specific guild setting
 */
const set = async function (guild_id: string, guild_setting: string, setting_value: any) {

    const settingsString = await redisClient.getAsync(guild_id);
    const settings = JSON.parse(settingsString);

    settings[guild_setting] = setting_value;
    redisClient.setAsync(guild_id, JSON.stringify(settings), 'EX', 28800);

}

/**
 * Remove a specific guild
 * @param guild_id the id of the specific guild
 */
const remove = async function (guild_id: string) {
    await redisClient.delAsync(guild_id);
}

export {
    exists, get, cache, set, remove
};
