import { Client, Message } from 'discord.js-light';

import { parseCommand, Permission, sendPlainEmbed } from '../managers/Commands';
import { cacheGuild, getConfigValue, getConfigValues, isCached } from '../managers/ServerData';
import botCache from '../structures/BotCache';

export default async (client: Client, message: Message): Promise<void> => {

    if (message.author.bot) return;
    if (!message.guild) return;

    if (!await isCached(message.guild.id)) {
        await cacheGuild(message.guild.id)
    }

    const cacheData = await getConfigValues(message.guild.id, ['prefix', 'disabled', 'language', 'staff_role']);
    const prefix = cacheData.prefix;

    if (message.content.toLowerCase().startsWith(prefix) || message.content.toLowerCase().startsWith(`<@${client.user.id}> `)) {
        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);

        const input = args.shift().toLowerCase();
        if (input === '') return;

        const command = parseCommand(input);
        if (command === null) return;
        if (!command.enabled) return;

        const language = botCache.languages.get(cacheData.language);

        if (cacheData.disabled) {
            const reason = await getConfigValue(message.guild.id, 'disable_reason', false) as string;
            await sendPlainEmbed(message.channel, botCache.config.colors.red, language.additional.guildDisabled.replace('%reason%', reason));
            return;
        }

        if (command.permission === Permission.STAFF) {
            if (cacheData.staff_role == null) {
                await sendPlainEmbed(message.channel, botCache.config.colors.red, language.additional.invalidStaffRole);
                return;
            }
            if (!message.member.roles.cache.has(cacheData.staff_role)) {
                const roleName = message.guild.roles.cache.get(cacheData.staff_role).name;
                await sendPlainEmbed(message.channel, botCache.config.colors.red, language.additional.roleRequired.replace('%role_name%', roleName));
                return;
            }
        } else if (command.permission === Permission.ADMIN) {
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                await sendPlainEmbed(message.channel, botCache.config.colors.red, language.additional.permRequired.replace('%perm_name%', 'ADMINISTRATOR'));
                return;
            }
        }

        command.exec(client, message, {prefix: prefix, language: language}, args);
    }

}