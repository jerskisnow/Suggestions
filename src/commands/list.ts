import ICommand from '../structures/ICommand';
import { Client, Message } from 'discord.js';

export default class ListCommand implements ICommand {

    aliases() {
        return ['suggestions'];
    }

    async run(client: Client, message: Message) {

        await message.delete({
            timeout: 125
        });

        // ...

    }

    help() {
        return "Obtain a list of all active suggestions.";
    }

}
