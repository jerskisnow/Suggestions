import { Guild } from 'discord.js';
import pgPool from '../structures/PostgreSQL';
import { exists, remove } from '../structures/CacheManager';

export default async (guild: Guild) => {

    const pgClient = await pgPool.connect();

    try {
        await pgClient.query('DELETE FROM servers WHERE id = $1::text', [guild.id]);
    } finally {
        pgClient.release();
    }

    if (exists(guild.id))
        remove(guild.id);

}
