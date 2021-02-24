import Logger, { LogType } from './structures/CliLogger';
import { ShardingManager } from 'discord.js';
import { readFile } from 'fs';

// Main startup message
Logger.printStartup();

// Read the config file in order to obtain the token
readFile('../config.json', async (err, res) => {
    // Whenever there is an error just throw it
    if (err) throw err;

    // Instatiating the sharding manager
    const manager = new ShardingManager('app.js', {
        token: JSON.parse(res.toString()).token
    });

    // Spawn the sharding manager
    await manager.spawn();

    // Log the shards being created
    manager.on('shardCreate', shard => Logger.log(`Shard ${shard.id} has been launched.`, LogType.INFO));
});