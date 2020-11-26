import { Client } from 'discord.js';
import DBL from 'dblapi.js';
import botCache from '../structures/BotCache';
import Logger, { LogType } from '../structures/CliLogger';

export default async (client: Client): Promise<void> => {
    const dbl = new DBL(botCache.config.apis.dblToken, client);

    setInterval(async () => {
        await dbl.postStats(
            client.guilds.cache.size,
            client.guilds.cache.first().shardID,
            client.shard.count
        );
    }, 1800000);

    setTimeout(async () => await setPresence(client), 25000);
    setInterval(async () => await setPresence(client), 3000000);

    Logger.log('Successfully enabled the bot.', LogType.INFO);
}

const setPresence = async (client: Client) => {
    const guilds_result = await client.shard.fetchClientValues('guilds.cache.size');
    const guildCount = guilds_result.reduce((prev, count) => prev + count, 0);

    await client.user.setActivity(`${guildCount} guilds on ${client.shard.count} shards.`, {
        type: 'WATCHING'
    });
}