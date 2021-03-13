import { Client } from 'discord.js-light';
import DBL from 'dblapi.js';
import botCache from '../structures/BotCache';
import Logger, { LogType } from '../structures/CliLogger';
import fetch from 'node-fetch';
import { getServerCount } from '../managers/ServerData';

export default async (client: Client): Promise<void> => {

    // ---------------- Bot listing apis part
    const dbl = new DBL(botCache.config.apis.dblToken, client);
    const shardID = client.guilds.cache.first().shardID;

    setInterval(async () => {
        try {
            await dbl.postStats(
                client.guilds.cache.size,
                shardID,
                client.shard.count
            );
            await fetch('https://discord.bots.gg/api/v1', {
                method: 'POST',
                body: `{ "guildCount": ${client.guilds.cache.size}, "shardCount": ${client.shard.count}, "shardId": ${shardID} }`,
                headers: {'Content-Type': 'application/json', 'Authorization': botCache.config.apis.dbggToken}
            });
        } catch (ex) {
            console.log('Couldn\'t send a request to TopGG.');
        }
    }, 1800000);


    if (shardID === 0) {
        setInterval(async () => {
            try {
                const serverCount = await getServerCount(client);
                await fetch(`https://botsfordiscord.com/api/bot/${client.user.id}`, {
                    method: 'POST',
                    body: `{ "server_count": ${serverCount} }`,
                    headers: {'Content-Type': 'application/json', 'Authorization': botCache.config.apis.bfdToken}
                });
            } catch (ex) {
                console.log('Couldn\'t send a request to BotsForDiscord.');
            }
        }, 1800000);
    }
    // ----------------

    setTimeout(async () => await setPresence(client), 12500);
    setInterval(async () => await setPresence(client), 850000);

    Logger.log('Successfully enabled the client.', LogType.INFO);
}

const setPresence = async (client: Client) => {
    const guilds_result = await client.shard.fetchClientValues('guilds.cache.size');
    const guildCount = guilds_result.reduce((prev, count) => prev + count, 0);

    await client.user.setActivity(`${guildCount} guilds on ${client.shard.count} shards.`, {
        type: 'WATCHING'
    });
}
