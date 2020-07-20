import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';

export default class ResolveCommand implements ICommand {

    aliases() {
        return null as null;
    }

    async run(client: Client, message: Message, language: any) {
        // Resolve a report
    }

    help() {
        return "Resolve a report.";
    }

}
