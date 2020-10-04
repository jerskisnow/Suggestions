import { cmdMap, aliasMap } from '../structures/CMDMap';
import { Client, Message } from 'discord.js';

import { exists, get, cache } from '../structures/CacheManager';

export default async (client: Client, message: Message) => {

    // If the author is a bot, return
    if (message.author.bot) return;
    // If the message is not in a guild, return
    if (!message.guild) return;

    const bool = await exists(message.guild.id);
    if (!bool) {
        await cache(message.guild.id);
    }

    let prefix = await get(message.guild.id, 'prefix') as string;

    // Check if the message contains the prefix
    if (message.content.startsWith(prefix) || message.content.startsWith(`<@${client.user.id}> `)) {

        // Define the command arguments
        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);

        // Define the commandName
        const command = args.shift().toLowerCase();
        // Check if someone actually entered a command instead of just the prefix
        if (command === '') return;

        // Fetch the language of the guild
        const languageCode = await get(message.guild.id, 'language') as string;
        const language: Object = require(`../languages/${languageCode}.utf8.js`).default;
        
        // Define the command instance
        const cmdInstance = cmdMap.get(command);

        // Check if the command is not undefined, if so run the command
        if (cmdInstance != null) {
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

}
