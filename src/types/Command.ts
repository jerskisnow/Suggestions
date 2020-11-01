import { Client, Message } from 'discord.js';

export default interface Command {
    permission?: string,
    aliases?: string[],
    helpMessage: string,
    exec: (client: Client, message: Message, language: any, args?: string[]) => unknown
}