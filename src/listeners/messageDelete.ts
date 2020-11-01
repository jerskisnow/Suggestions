import { Message } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';

import DeleteController from '../controllers/assessments/Delete';

export default async (message: Message): Promise<void> => {

    PostgreSQL.query('SELECT * FROM suggestions WHERE message = $1::text', [message.id], async (error, result) => {
        if (!error && result.rows.length) {
            await DeleteController(message);
        }
    });

}
