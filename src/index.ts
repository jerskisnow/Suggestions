import * as dotenv from 'dotenv';
import * as path from 'path';
import { ShardingManager } from 'discord.js';
import { readdir } from 'fs';

import Logger, { LogType } from './structures/Logger';
import botCache from "./structures/BotCache";

// Register dotenv
dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
});

// Main startup message
Logger.printStartup();

// Initiate all command files, which basically means that they will execute and get added to the bot cache
readdir('./commands/', (_err, files) =>
    files.forEach(file => require(`./commands/${file}`))
);

// Store all languages including the imports in the bot cache
readdir('./languages/', (_err, files) =>
    files.forEach(file =>
        botCache.languages.set(
            file.split(".")[0], require(`./languages/${file}`).default
        )
    )
);

// The actual sharding part starts here
const manager = new ShardingManager('app.js', {
    token: process.env.CLIENT_TOKEN
});

// Spawn the sharding manager
manager.spawn();

// Log the shards being loaded
manager.on('shardCreate', shard => Logger.log(`Shard ${shard.id} has been launched.`, LogType.INFO));