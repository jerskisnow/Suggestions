import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';

export default class VoteCommand implements ICommand {

    aliases() {
        return ['bugreport'];
    }

    async run(client: Client, message: Message, language: any) {

        await message.delete({
            timeout: 125
        });

		// ...

    }

    help() {
        return "Report a bug to the developer of this bot.";
    }

}
