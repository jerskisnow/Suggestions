import { cmdMap, aliasMap } from '../structures/CMDMap';
import Utils from '../structures/Utils';
import { Client, Message } from 'discord.js';
import botStatus from '../structures/BotStatus';

import pgPool from '../structures/PostgreSQL';
import { guildExists, getGuildSetting, cacheGuild } from '../structures/CacheManager';

const utils = new Utils();

export default async (client: Client, message: Message) => {

    if (!botStatus.isRunning()) return;

    // If the author is a bot, return
    if (message.author.bot) return;
    // If the message is not in a guild, return
    if (!message.guild) return;

    let prefix = getGuildSetting(message.guild.id, 'prefix');

    if (prefix === null) {
        if (!guildExists(message.guild.id)) {
            await cacheGuild(message.guild.id);

            // Define it once again
            prefix = getGuildSetting(message.guild.id, 'prefix');
        }
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

        const languageCode = getGuildSetting(message.guild.id, 'language');
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
