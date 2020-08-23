import { Client } from 'discord.js';
import cliColors from '../structures/CLIColors';
import DBL from 'dblapi.js';

export default async (client: Client) => {

    console.log(cliColors.FgBlue + "\n---=[Loading Apis...]=---" + cliColors.Reset);

    // Api part
    const dbl = new DBL(process.env.APIS_DBL_TOKEN, client);
    setInterval(async () => {
        const res = await client.shard.fetchClientValues('guilds.cache.size');
        const shard_id = await client.shard.broadcastEval('this.guilds.cache.first().shardID');
        console.log('DEBUG: ' + shard_id)
        dbl.postStats(
            res.reduce((prev, guildCount) => prev + guildCount, 0),
            shard_id[0],
            client.shard.count
        );
    }, 1800000);

    console.log(cliColors.FgCyan + "Loaded the " + cliColors.FgYellow + "DBL (Top.GG)" + cliColors.FgCyan + " api." + cliColors.Reset);

    setInterval(async () => {

        const guilds_result = await client.shard.fetchClientValues('guilds.cache.size');
        const guildCount = guilds_result.reduce((prev, count) => prev + count, 0);

        client.user.setActivity(`${guildCount} guilds on ${client.shard.count} shards.`, {
            type: "WATCHING"
        });

    }, 3000000);

    console.log(cliColors.FgBlue + "\n---=[Succesfully enabled the bot]=---" + cliColors.Reset);

}
