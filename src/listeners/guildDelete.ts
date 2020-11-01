import { Client, Guild } from 'discord.js';

import PostgreSQL from '../structures/PostgreSQL';
import { exists, remove } from '../structures/CacheManager';

export default async (client: Client, guild: Guild): Promise<void> => {
    PostgreSQL.query('DELETE FROM servers WHERE id = $1::text', [guild.id]);

    const existsInCache = await exists(guild.id);
    if (existsInCache) {
        await remove(guild.id);
    }
}
