import { Client } from 'discord.js';
import { readdir } from 'fs';

import cliColors from './structures/CLIColors';
import Command from './types/Command';
import PostgreSQL from './structures/PostgreSQL';

const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

PostgreSQL.setupPool();

const cmdCache = new Map<string, Command>();

// client.on("error", (e) => console.error(e));
// client.on("warn", (e) => console.warn(e));
// client.on("debug", e => console.info(e));
// client.on('shardError', e => console.error(e));

readdir('./commands/', (err, files) => files.forEach(file => require(`./commands/${file}`)));

readdir('./listeners/', (err, files) => {
    if (err) throw err;

    console.log(cliColors.FgBlue + "\n---=[Loading Listeners...]=---" + cliColors.Reset);

    files.forEach((file) => {
        const lFile = require(`./listeners/${file}`);
        const lName: any = file.split(".")[0];

        console.log(cliColors.FgCyan + `>> ${cliColors.FgYellow + lName + cliColors.FgCyan} has been loaded.` + cliColors.Reset);

        client.on(lName, lFile.default.bind(null, client));
    });

});

client.login(process.env.CLIENT_TOKEN);

export {
    cmdCache
}