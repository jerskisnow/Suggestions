import { Client, Message } from 'discord.js-light';

import { parseCommand, Permission, sendPlainEmbed } from '../managers/Commands';
import { cacheGuild, getConfigValues } from '../managers/ServerData';
import botCache from '../structures/BotCache';

export default async (client: Client, message: Message): Promise<void> => {
    if (message.author.bot) return;
    if (!message.guild) return;

    let cache = await getConfigValues(message.guild.id, ['prefix', 'language', 'staff_role'], true);
    if (cache == null) {
        cache = await cacheGuild(message.guild.id);
    }

    if (message.content.toLowerCase().startsWith(cache.prefix) || message.content.toLowerCase().startsWith(`<@${client.user.id}> `)) {
        const args = message.content
            .slice(cache.prefix.length)
            .trim()
            .split(/ +/g);

        const input = args.shift().toLowerCase();
        if (input === '') return;

        const command = parseCommand(input);
        if (command === null) return;
        if (!command.enabled) return;

        const language = botCache.languages.get(cache.language);

        if (command.permission === Permission.STAFF) {
            if (cache.staff_role == null) {
                await sendPlainEmbed(message.channel, botCache.config.colors.red, language.additional.invalidStaffRole);
                return;
            }
            const role = await message.guild.roles.fetch(cache.staff_role);
            if (role == null) {
                await sendPlainEmbed(message.channel, botCache.config.colors.red, language.additional.invalidStaffRole);
                return;
            }
            if (!message.member.roles.cache.has(role.id)) {
                await sendPlainEmbed(message.channel, botCache.config.colors.red, language.additional.roleRequired.replace('%role_name%', role.name));
                return;
            }
        } else if (command.permission === Permission.ADMIN) {
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                await sendPlainEmbed(message.channel, botCache.config.colors.red, language.additional.permRequired.replace('%perm_name%', 'ADMINISTRATOR'));
                return;
            }
        }

        command.exec(client, message, {prefix: cache.prefix, language: language});
    }

}