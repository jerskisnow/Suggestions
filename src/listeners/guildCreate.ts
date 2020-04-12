import { Guild } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';
import cache from 'memory-cache';

export default async (guild: Guild) => {

    const pgClient = new PostgreSQL().getClient();

    await pgClient.connect();

    if (cache.get(guild.id) === null) {

        await pgClient.query('INSERT INTO servers (id, prefix, language) VALUES ($1::text, $2::text, $3::text)', [guild.id, process.env.COMMAND_PREFIX, process.env.DEFAULT_LANGUAGE]);

        cache.put(guild.id, {
            prefix: process.env.COMMAND_PREFIX,
            language: process.env.DEFAULT_LANGUAGE,
            auto_approve: null as any,
            auto_reject: null as any,
            delete_approved: null as any,
            delete_rejected: null as any
        });
    }

    await pgClient.end();
}
