// Default imports
import * as dotenv from 'dotenv';
import * as path from 'path';
import { readdir } from 'fs';

// Import sharding manager
import { ShardingManager } from 'discord.js';

// Imports related to data storage
import PostgreSQL from './structures/PostgreSQL';
import Redis from './structures/Redis';

// Import types and structures
import Command from './types/Command';
import cliColors from './structures/CLIColors';

// Register dotenv
dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
});

// Main startup message
console.log(cliColors.FgCyan + `\n ██████╗ ██████╗ ██████╗ ███████╗██████╗ ███████╗███╗   ██╗ ██████╗ ██╗    ██╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔═══██╗██║    ██║
██║     ██║   ██║██║  ██║█████╗  ██║  ██║███████╗██╔██╗ ██║██║   ██║██║ █╗ ██║
██║     ██║   ██║██║  ██║██╔══╝  ██║  ██║╚════██║██║╚██╗██║██║   ██║██║███╗██║
╚██████╗╚██████╔╝██████╔╝███████╗██████╔╝███████║██║ ╚████║╚██████╔╝╚███╔███╔╝
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝
                                                                              ` + cliColors.FgBlue + "\n==============================================================================\n" + cliColors.Reset);

// Setup the the PostgreSQL pool and Redis client
PostgreSQL.setupPool();
Redis.setupClient();

// We create the botcache here so it doesn't get created multiple times due to the sharding
export const botCache = {
    commands: new Map<string, Command>(),
    languages: new Map<string, any>()
}

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

// Print that the shards are being loaded
console.log(cliColors.FgBlue + "\n---=[Loading Shards...]=---" + cliColors.Reset);
// Log the shards being loaded
manager.on('shardCreate', shard => console.log(`${cliColors.FgCyan}>> Shard ${cliColors.FgYellow + shard.id + cliColors.FgCyan} has been launched.`));