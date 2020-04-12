import ICommand from '../structures/ICommand';
import { Client, Message } from 'discord.js';

import ApproveController from '../controllers/assessments/Approve';

/*
 * Listen for ID or 'all'
 */
export default class ApproveCommand implements ICommand {

    aliases() {
        return ['accept'];
    }

    async run(client: Client, message: Message, lanugage: any) {

        await message.delete({
            timeout: 125
        });

        // ...
        
    }

    help() {
        return "Approve a suggestion.";
    }

}
