import ICommand from '../structures/ICommand';
import { Client, Message } from 'discord.js';

import RejectController from '../controllers/assessments/Reject';

/*
 * Listen for ID or 'all'
 */
export default class RejectCommand implements ICommand {

    aliases() {
        return ['deny'];
    }

    async run(client: Client, message: Message) {
        await message.delete({
            timeout: 125
        });

        // ...
        
    }

    help() {
        return "Reject a suggestion.";
    }

}
