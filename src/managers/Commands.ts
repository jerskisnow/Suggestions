import botCache from '../structures/BotCache';
import {
    Client,
    Collection,
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

export const getMemberFromArgs = (guild: Guild, input: string): GuildMember => {
    if (input.startsWith('<@') && input.endsWith('>')) {
        input = input.slice(2, -1);
        if (input.startsWith('!')) {
            input = input.slice(1);
        }
    }
    if (isNaN(parseInt(input))) {
        return guild.members.cache.find(m => m.user.tag === input);
    }

    const member = guild.members.cache.get(input);
    return member == null ? null : member;
}

export const getChannelFromArgs = async (guild: Guild, input: string): Promise<MessageableChannel> => {
    if (input.startsWith('<#') && input.endsWith('>')) {
        input = input.slice(2, -1);
    }
    if (isNaN(parseInt(input))) return null;
    const channel = await guild.channels.fetch(input) as MessageableChannel;
    if (channel.type !== 'text' && channel.type !== 'news') return null;

    return channel == null ? null : channel;
}

export const getRoleFromArgs = (guild: Guild, input: string): Role => {
    if (input.startsWith('<@') && input.endsWith('>')) {
        input = input.slice(2, -1);
        if (input.startsWith('&')) {
            input = input.slice(1);
        }
    }
    if (isNaN(parseInt(input))) {
        return guild.roles.cache.find(c => c.name === input);
    }

    const role = guild.roles.cache.get(input);
    return role == null ? null : role;
}

export const sendPrivateMessage = async (user: User | GuildMember, embed: MessageEmbed): Promise<Message> => {
    let msg = null;
    try {
        msg = await user.send({embed: embed});
    } catch (ex) {
        if (ex.code !== 50007) {
            console.error('An error occured', ex)
        }
    }
    return msg;
}

export const sendPlainEmbed = async (channel: TextChannel | DMChannel | NewsChannel, color: string, description: string): Promise<Message> =>
    await channel.send({embed: new MessageEmbed().setColor(color).setDescription(description)});

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