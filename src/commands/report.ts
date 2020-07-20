import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';

export default class ReportCommand implements ICommand {

    aliases() {
        return null as null;
    }

    async run(client: Client, message: Message, language: any) {
        // Either report a user or bug to the server owners, works similar as the suggestions command
    }

    help() {
        return "Create a report. (10 second cooldown)";
    }

}
