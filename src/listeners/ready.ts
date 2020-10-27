import { Client } from 'discord.js';
import DBL from 'dblapi.js';

export default async (client: Client): Promise<void> => {

    // Api part
    const dbl = new DBL(process.env.APIS_DBL_TOKEN, client);

    setInterval(async () => {
        const guilds_result = await client.shard.fetchClientValues('guilds.cache.size');
        dbl.postStats(
            guilds_result.reduce((prev, guildCount) => prev + guildCount, 0),
            client.guilds.cache.first().shardID,
            client.shard.count
        );
    }, 1800000);

    setTimeout(async () => await setPresence(client), 25000);
    setInterval(async () => await setPresence(client), 3000000);
}

const setPresence = async (client: Client) => {
    const guilds_result = await client.shard.fetchClientValues('guilds.cache.size');
    const guildCount = guilds_result.reduce((prev, count) => prev + count, 0);

    client.user.setActivity(`${guildCount} guilds on ${client.shard.count} shards.`, {
        type: 'WATCHING'
    });
}