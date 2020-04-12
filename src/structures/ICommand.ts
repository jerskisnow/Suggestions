import { Client, Message } from 'discord.js';

export default interface ICommand {

    aliases(): string[] | null;

    run(client: Client, message: Message, _language: Object, _args: string[]): void;

    help(): string;

}
