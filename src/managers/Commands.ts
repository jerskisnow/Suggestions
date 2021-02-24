import {
    Client,
    Constants,
    DMChannel,
    Guild,
    GuildMember,
    Message,
    MessageEmbed,
    NewsChannel,
    Role,
    TextChannel,
    User
} from 'discord.js-light';
import botCache from '../structures/BotCache';
import Language from '../types/Language';

export const parseCommand = (cmdName: string): ICommand => {
    const command = botCache.commands.get(cmdName);
    if (command) return command;

    for (const key of Array.from(botCache.commands.keys())) {
        const cmd = botCache.commands.get(key);
        if (cmd.aliases != null && cmd.aliases.includes(cmdName)) {
            return cmd;
        }
    }
    return null;
}

export const getChannelFromArgs = async (guild: Guild, input: string): Promise<MessageableChannel | null> => {
    if (input.startsWith('<#') && input.endsWith('>')) {
        input = input.slice(2, -1);
    }
    // Check if the input is not a number
    if (isNaN(parseInt(input))) {
        const channel = guild.channels.cache.find(m => m.name === input);
        if (channel == null) return null;
        if (channel.type === 'text' || channel.type === 'news') {
            return channel as MessageableChannel;
        } else return null;
    }
    // Check if the channel is in the discord.js-light cache
    if (guild.channels.cache.has(input)) {
        // Get the channel from the cache
        const cacheChannel = guild.channels.cache.get(input);
        // Check if the channel is messageable
        if (cacheChannel.type === 'text' || cacheChannel.type === 'news') {
            // Return if so
            return cacheChannel as MessageableChannel;
            // If the channel does exist but is not messageable
        } else return null;
    }
    // Fetch the channel manually
    const channel = await guild.channels.fetch(input) as MessageableChannel;
    // Check if the channel is null
    if (channel == null) return null;
    // Check if the channel not messageable
    if (channel.type !== 'text' && channel.type !== 'news') return null;
    // Return the channel
    return channel;
}

export const getMemberFromArgs = async (guild: Guild, input: string): Promise<GuildMember | null | undefined> => {
    if (input.startsWith('<@') && input.endsWith('>')) {
        input = input.slice(2, -1);
        if (input.startsWith('!')) {
            input = input.slice(1);
        }
    }
    // Check if the input is not a number
    if (isNaN(parseInt(input))) {
        // Return the member from the cache
        return guild.members.cache.find(m => m.user.tag === input);
    }
    // Check if the channel is in the discord.js-light cache
    if (guild.members.cache.has(input)) {
        // Return the member from the cache
        return guild.members.cache.get(input);
    }
    // Fetch the member and return it
    return await guild.members.fetch(input);
}

export const getRoleFromArgs = async (guild: Guild, input: string): Promise<Role | null | undefined> => {
    if (input.startsWith('<@') && input.endsWith('>')) {
        input = input.slice(2, -1);
        if (input.startsWith('&')) {
            input = input.slice(1);
        }
    }
    // Check if the input is not a number
    if (isNaN(parseInt(input))) {
        // Return the role form the cache
        return guild.roles.cache.find(m => m.name === input);
    }
    // Check if the role is in the discord.js-light cache
    if (guild.roles.cache.has(input)) {
        // Return the role from the cache
        return guild.roles.cache.get(input);
    }
    // Fetch the role and return it
    return await guild.roles.fetch(input) as Role;
}

export const sendPrivateMessage = async (user: User | GuildMember, embed: MessageEmbed): Promise<Message> => {
    let msg = null;
    try {
        msg = await user.send({embed: embed});
    } catch (ex) {
        if (ex.code !== Constants.APIErrors.CANNOT_MESSAGE_USER) {
            console.error('An error occured', ex);
        }
    }
    return msg;
}

export const sendPlainEmbed = async (channel: MessageableChannel | DMChannel, color: string, description: string): Promise<Message> => {
    return await channel.send({embed: new MessageEmbed().setColor(color).setDescription(description)});
}

export interface ICommand {
    enabled: boolean,
    permission: Permission,
    aliases?: string[],
    exec: (client: Client, message: Message, commandData: CommandData, args?: string[]) => unknown
}

interface CommandData {
    prefix: string,
    language: Language
}

export enum Permission {
    DEFAULT,
    STAFF,
    ADMIN
}

export type MessageableChannel = TextChannel | NewsChannel;