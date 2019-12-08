import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
});

// Some imports, nothing special here
import { readdir } from 'fs';
import { Client } from 'discord.js';
import MySQL from './structures/MySQL';
import cmdMap from './structures/CMDMap';
import cliColors from './structures/CLIColors';

// Instantiate the client & mysql instances
const client = new Client();
const mysql = new MySQL();

console.log(cliColors.FgCyan + `\n ██████╗ ██████╗ ██████╗ ███████╗██████╗ ███████╗███╗   ██╗ ██████╗ ██╗    ██╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔═══██╗██║    ██║
██║     ██║   ██║██║  ██║█████╗  ██║  ██║███████╗██╔██╗ ██║██║   ██║██║ █╗ ██║
██║     ██║   ██║██║  ██║██╔══╝  ██║  ██║╚════██║██║╚██╗██║██║   ██║██║███╗██║
╚██████╗╚██████╔╝██████╔╝███████╗██████╔╝███████║██║ ╚████║╚██████╔╝╚███╔███╔╝
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝
                                                                              ` + cliColors.FgBlue + "\n==============================================================================\n" + cliColors.Reset);

// Run the anonymous 'Main' function
(async () => {

    // Create a connection to the database
    await mysql.createConnection();

    // ...

})();

readdir("./listeners/", (err, files) => {
    if (err) throw err;

    console.log(cliColors.FgBlue + "\n---=[Loading Events...]=---" + cliColors.Reset);

    files.forEach((file) => {
        const lFile = require(`./listeners/${file}`);
        const lName = file.split(".")[0];

        console.log(cliColors.FgCyan + ` >> ${lName} has been loaded!` + cliColors.Reset);

        client.on(lName, lFile.bind(null, client));
    });

});

readdir("./commands/", (err, files) => {
    if (err) throw err;

    console.log(cliColors.FgBlue + "\n---=[Loading Commands...]=---" + cliColors.Reset);

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;

        const cmdInstance = require(`./commands/${file}`);
        const cmdName = file.split(".")[0];

        console.log(cliColors.FgCyan + ` >> ${cmdName} has been loaded!` + cliColors.Reset);

        cmdMap.set(cmdName, cmdInstance.default);
    });

});

readdir("./apis/", (err, files) => {
    if (err) throw err;

    console.log(cliColors.FgBlue + "\n---=[Loading Apis...]=---" + cliColors.Reset);

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;

        const apiInstance = require(`./apis/${file}`);
        const apiName = file.split(".")[0];

        console.log(cliColors.FgCyan + ` >> ${apiName} has been loaded!` + cliColors.Reset);

        apiInstance.default(client);
    });

});

client.login(process.env.CLIENT_TOKEN);
