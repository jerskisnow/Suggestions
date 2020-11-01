import * as dotenv from 'dotenv';
import * as path from 'path';
import { ShardingManager } from 'discord.js';

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