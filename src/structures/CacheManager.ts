import PostgreSQL from './PostgreSQL';
import Redis from './Redis';

/**
 * Get whether a guild is cached or not (Deprecated)
 * @return {Promise<Boolean>} the setting of the guild or null when the guild is not cached
 */
const exists = async function (guild_id: string): Promise<boolean> {
    return await (Redis.getClient() as any).existsAsync(guild_id);
};

/**
 * Get a cached setting from a guild
 * @return the setting of the guild or null when the guild is not cached
 */
const get = async function (guild_id: string, guild_setting: string): Promise<string | number | boolean | null> {
    const output = await (Redis.getClient() as any).getAsync(guild_id);
    if (output == null) {
        return null;
    }
    return JSON.parse(output)[guild_setting];
};

const cache = async function (guild_id: string): Promise<void>{

    PostgreSQL.query('SELECT prefix, language, suggestion_channel, report_channel, auto_approve, auto_reject, delete_approved, delete_rejected, is_premium FROM servers WHERE id = $1::text', [guild_id], async (error, result) => {
        if (error || !result.rows.length) {
            result.rows = [
                {
                    prefix: process.env.COMMAND_PREFIX,
                    language: process.env.DEFAULT_LANGUAGE,
                    suggestion_channel: null,
                    report_channel: null,
                    auto_approve: -1,
                    auto_reject: -1,
                    delete_approved: false,
                    delete_rejected: false,
                    is_premium: false
                }  
            ]
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
    
        await (Redis.getClient() as any).setAsync(
            guild_id, // key
            JSON.stringify(cacheObject), // value
            'EX', 28800 // expiration in seconds (8 hours)
        );

    });
};

/**
 * Set a specific guild setting
 */
const set = async function (guild_id: string, guild_setting: string, setting_value: string | number | boolean): Promise<void> {

    const settingsString = await (Redis.getClient() as any).getAsync(guild_id);
    const settings = JSON.parse(settingsString);

    settings[guild_setting] = setting_value;
    (Redis.getClient() as any).setAsync(guild_id, JSON.stringify(settings), 'EX', 28800);

}

/**
 * Remove a specific guild
 * @param guild_id the id of the specific guild
 */
const remove = async function (guild_id: string): Promise<void>  {
    await (Redis.getClient() as any).delAsync(guild_id);
}

export { exists, get, cache, set, remove };
