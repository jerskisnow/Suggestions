import { Client } from 'discord.js';
import { cmdMap, aliasMap } from './structures/CMDMap';
import cliColors from './structures/CLIColors';
import { readdir } from 'fs';

const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

// TODO: Make a custom error system
// client.on("error", (e) => console.error(e));
// client.on("warn", (e) => console.warn(e));

client.on("debug", e => console.info(e));
client.on('shardError', e => console.error(e));

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

readdir('./commands/', (err, files) => {
    if (err) throw err;

    console.log(cliColors.FgBlue + "\n---=[Loading Commands...]=---" + cliColors.Reset);

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;

        const cmdInstance = require(`./commands/${file}`);
        const cmdName = file.split(".")[0];

        console.log(cliColors.FgCyan + `>> ${cliColors.FgYellow + cmdName + cliColors.FgCyan} has been loaded.` + cliColors.Reset);

        const cmdClass = new cmdInstance.default();

        cmdMap.set(cmdName, cmdClass);

        const cmdAliases = cmdClass.aliases();

        if (cmdAliases !== null) {
            for (let i = 0; i < cmdAliases.length; i++) {
                aliasMap.set(cmdAliases[i], cmdName);
            }
        }

    });

});

client.login(process.env.CLIENT_TOKEN);
