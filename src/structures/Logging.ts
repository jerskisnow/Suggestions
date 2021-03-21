import botCache from '../structures/BotCache';
import { Guild } from 'discord.js';
import { MessageableChannel, sendPlainEmbed } from '../managers/Commands';
import { getConfigValue } from '../managers/ServerData';

export const log = async (guild: Guild, message: string) => {
    const channel_id = await getConfigValue(guild.id, 'log_channel', false) as string;
    if (channel_id == null) return;

    const channel = await guild.channels.fetch(channel_id) as MessageableChannel;
    if (channel == null || channel.deleted) return;

    await sendPlainEmbed(channel, botCache.config.colors.blue, message);
}
