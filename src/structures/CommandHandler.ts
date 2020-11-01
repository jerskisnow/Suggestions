import botCache from '../structures/BotCache';
import Command from '../types/Command';
import { GuildMember } from 'discord.js';

export const parseCommand = (cmdName: string): Command => {
    const command = botCache.commands.get(cmdName);
    if (command) return command;

    for (const key of Array.from(botCache.commands.keys())) {
        const cmd: Command = botCache.commands.get(key);
        if (cmd.aliases != null && cmd.aliases.includes(cmdName)) {
            return cmd;
        }
    }

    return null;
}

export const hasPermission = (member: GuildMember, command: Command): boolean => {
    if (command.permission === null) return true;
    return member.hasPermission(command.permission as any);
}