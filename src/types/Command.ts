import { Client, Message } from 'discord.js';

export default interface Command {
    permission?: string,
    helpMessage: string,
    exec: (client: Client, mesasge: Message, language: any, args?: string[]) => unknown
}