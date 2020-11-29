import botCache from '../structures/BotCache';
import { Guild } from 'discord.js';
import { MessageableChannel, sendPlainEmbed } from '../managers/Commands';
import { getConfigValue } from '../managers/ServerData';

export const log = async (guild: Guild, message: string) => {
    const channel = await guild.channels.fetch(
        await getConfigValue(guild.id, 'log_channel', false) as string
    ) as MessageableChannel;

    if (!channel || channel.deleted) return;

    await sendPlainEmbed(channel, botCache.config.colors.blue, message);
}