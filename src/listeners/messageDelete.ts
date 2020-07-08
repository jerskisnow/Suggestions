import { Message } from 'discord.js';
import pgPool from '../structures/PostgreSQL';

import DeleteController from '../controllers/assessments/Delete';

export default async (message: Message) => {

	const pgClient = await pgPool.connect();

	let res;

	try {
		res = await pgClient.query('SELECT * FROM suggestions WHERE message = $1::text', [message.id]);
	} finally {
		pgClient.release();
	}

	if (res.rows.length)
		DeleteController(message);

}
