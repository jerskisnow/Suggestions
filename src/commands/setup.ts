import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';

export default class SetupCommand implements ICommand {

    aliases() {
        return null as null;
    }

    async run(client: Client, message: Message, language: any) {
        // Simply only make them set the channel
    }

    help() {
        return "Configure the essentials settings for the first time.";
    }

}
