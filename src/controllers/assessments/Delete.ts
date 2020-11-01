import { Message } from 'discord.js';
import PostgreSQL from '../../structures/PostgreSQL';

/*
 msg -> The suggestion message
*/
export default async (msg: Message): Promise<void> => {

    if (!msg.deleted && msg.deletable) {
        await msg.delete();
    }

    PostgreSQL.query('SELECT id FROM suggestions WHERE message = $1::text', [msg.id], (error, result) => {
        if (!error || result.rows.length) {
            PostgreSQL.query('UPDATE suggestions SET status = $1::text WHERE message = $2::text', ['Deleted', msg.id]);
        }
    });

}
