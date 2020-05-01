import { Guild } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';
import cache from 'memory-cache';
import botStatus from '../structures/BotStatus';

export default async (guild: Guild) => {

    if (!botStatus.isRunning()) return;

    if (cache.get(guild.id) !== null)
        cache.del(guild.id);

    const pgClient = new PostgreSQL().getClient();

    await pgClient.connect();

	await pgClient.query('DELETE FROM servers WHERE id = $1::text', [guild.id]);

    await pgClient.end();
}
