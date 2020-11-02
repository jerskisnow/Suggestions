import * as dotenv from 'dotenv';
import * as path from 'path';
import { ShardingManager } from 'discord.js';

import Logger, { LogType } from './structures/Logger';

// Register dotenv
dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
});

// Main startup message
Logger.printStartup();

// The actual sharding part starts here
const manager = new ShardingManager('app.js', {
    token: process.env.CLIENT_TOKEN
});

// Spawn the sharding manager
manager.spawn();

// Log the shards being loaded
manager.on('shardCreate', shard => Logger.log(`Shard ${shard.id} has been launched.`, LogType.INFO));