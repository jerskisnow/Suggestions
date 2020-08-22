import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
});

import { ShardingManager } from 'discord.js';
import cliColors from './structures/CLIColors';

const manager = new ShardingManager('app.js', {
    token: process.env.CLIENT_TOKEN,
    totalShards: 'auto'
});

console.log(cliColors.FgCyan + `\n ██████╗ ██████╗ ██████╗ ███████╗██████╗ ███████╗███╗   ██╗ ██████╗ ██╗    ██╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔═══██╗██║    ██║
██║     ██║   ██║██║  ██║█████╗  ██║  ██║███████╗██╔██╗ ██║██║   ██║██║ █╗ ██║
██║     ██║   ██║██║  ██║██╔══╝  ██║  ██║╚════██║██║╚██╗██║██║   ██║██║███╗██║
╚██████╗╚██████╔╝██████╔╝███████╗██████╔╝███████║██║ ╚████║╚██████╔╝╚███╔███╔╝
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝
                                                                              ` + cliColors.FgBlue + "\n==============================================================================\n" + cliColors.Reset);

console.log(cliColors.FgBlue + "\n---=[Loading Shards...]=---" + cliColors.Reset);

manager.spawn().catch(ex => console.error(`[ERROR/SHARD] ${ex}`));
manager.on('shardCreate', shard => console.log(`${cliColors.FgCyan}>> Shard ${cliColors.FgYellow + shard.id + cliColors.FgCyan} has been launched.`));
