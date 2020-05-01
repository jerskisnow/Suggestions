import { cmdMap, aliasMap } from '../structures/CMDMap';
import Utils from '../structures/Utils';
import { Client, Message } from 'discord.js';
import cache from 'memory-cache';
import botStatus from '../structures/BotStatus';
import PostgreSQL from '../structures/PostgreSQL';

const utils = new Utils();

export default async (client: Client, message: Message) => {

    if (!botStatus.isRunning()) return;

    // If the author is a bot, return
    if (message.author.bot) return;
    // If the message is not in a guild, return
    if (!message.guild) return;

    let prefix: string = process.env.COMMAND_PREFIX;

    if (cache.get(message.guild.id) === null) {
        const pgClient = new PostgreSQL().getClient();

        await pgClient.connect();

        await pgClient.query('INSERT INTO servers (id, prefix, language) VALUES ($1::text, $2::text, $3::text)', [message.guild.id, process.env.COMMAND_PREFIX, process.env.DEFAULT_LANGUAGE]);

        cache.put(message.guild.id, {
            prefix: process.env.COMMAND_PREFIX,
            language: process.env.DEFAULT_LANGUAGE,
            auto_approve: null as any,
            auto_reject: null as any,
            delete_approved: null as any,
            delete_rejected: null as any
        });

        await pgClient.end();
    } else {
        prefix = cache.get(message.guild.id).prefix;
    }

    // Check if the message contains the prefix
    if (message.content.startsWith(prefix)) {

        // Define the command arguments
        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);

        // Define the commandName
        const command = args.shift().toLowerCase();

        const languageCode = cache.get(message.guild.id).language;
        const language: Object = utils.languageCodeToObject(languageCode);

        // Define the command instance
        const cmdInstance = cmdMap.get(command);
        // Check if the command is not undefined, if so run the command
        if (cmdInstance !== undefined) {
            cmdInstance.run(client, message, language, args);
        } else {
            // Search for a registered alias
            const cmdName = aliasMap.get(command);
            // Return if the alias is not registered
            if (cmdName === undefined) return;

            // Get the command instance from the command map with the value from the alias map
            const secondary = cmdMap.get(cmdName);
            // Finally run the command file
            secondary.run(client, message, language, args)
        }
    }

    // ...

}
