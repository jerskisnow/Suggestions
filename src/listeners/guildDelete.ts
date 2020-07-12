import { Guild } from 'discord.js';
import pgPool from '../structures/PostgreSQL';
import { guildExists, deleteGuild } from '../structures/CacheManager';

export default async (guild: Guild) => {

    if (guildExists)
        deleteGuild(guild.id);

    const pgClient = await pgPool.connect();

    try {
        await pgClient.query('DELETE FROM servers WHERE id = $1::text', [guild.id]);
    } finally {
        pgClient.release();
    }

}
