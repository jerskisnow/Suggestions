import { Message } from 'discord.js';
import PostgreSQL from '../../structures/PostgreSQL';

/*
 msg -> The suggestion message
*/
export default async(msg: Message) => {

	if (!msg.deleted && msg.deletable)
		await msg.delete();

	const pgClient = new PostgreSQL().getClient();

	await pgClient.connect();

	await pgClient.query('UPDATE suggestions SET status = $1::text WHERE message = $2::text', ['Deleted', msg.id]);

	await pgClient.end();
}
