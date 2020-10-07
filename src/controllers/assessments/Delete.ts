import { Message } from 'discord.js';
import pgPool from '../../structures/PostgreSQL';

/*
 msg -> The suggestion message
*/
export default async (msg: Message) => {

	if (!msg.deleted && msg.deletable)
		await msg.delete();

	const pgClient = await pgPool.connect();

	try {
		const result = await pgClient.query('SELECT id FROM suggestions WHERE message = $1::text', [msg.id]);
		if (result.rows.length === 1)
			await pgClient.query('UPDATE suggestions SET status = $1::text WHERE message = $2::text', ['Deleted', msg.id]);
	} finally {
		pgClient.release();
	}

}
