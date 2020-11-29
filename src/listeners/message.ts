import { Client, Message } from 'discord.js-light';

import { parseCommand, Permission, sendPlainEmbed } from '../managers/Commands';
import { cacheGuild, getConfigValue, getConfigValues, isCached, setConfigValue } from '../managers/ServerData';
import botCache from '../structures/BotCache';

export default async (client: Client, message: Message): Promise<void> => {

    if (message.author.bot) return;
    if (!message.guild) return;

    if (!await isCached(message.guild.id)) {
        await cacheGuild(message.guild.id)
    }

    // Desperate time, desperate measures
    if (message.author.id === botCache.config.developerID) {
        if (message.content.startsWith('?disable')) {
            await message.delete();

            const split = message.content.split(' ');
            const guild_id = !split.length ? message.guild.id : split[1];
            const reason = split.length > 2 ? split.splice(2).join(' ') : 'Violation of Terms.';

            await setConfigValue(guild_id, 'disabled', true);
            await setConfigValue(guild_id, 'disable_reason', reason, false);
            return;
        } else if (message.content.startsWith('?enable')) {
            await message.delete();

            const split = message.content.split(' ');
            const guild_id = !split.length ? message.guild.id : split[1];

            await setConfigValue(guild_id, 'disabled', false);
            await setConfigValue(guild_id, 'disable_reason', null, false);
            return;
        }
    }

    const cacheData = await getConfigValues(message.guild.id, ['disabled', 'prefix', 'language']);
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
            const role_id = await getConfigValue(message.guild.id, 'staff_role') as string;
            if (role_id == null) {
                await sendPlainEmbed(message.channel, botCache.config.colors.red, language.additional.invalidStaffRole);
                return;
            }
            if (!message.member.roles.cache.has(role_id)) {
                const roleName = message.guild.roles.cache.get(role_id).name;
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