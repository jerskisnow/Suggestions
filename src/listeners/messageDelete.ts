import { Message } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';

import DeleteController from '../controllers/assessments/Delete';

export default async (message: Message): Promise<void> => {

	const pgClient = await PostgreSQL.getPool().connect();

	let res;

	try {
		res = await pgClient.query('SELECT * FROM suggestions WHERE message = $1::text', [message.id]);
	} finally {
		pgClient.release();
	}

	if (res.rows.length) {
		await DeleteController(message);
	}

}
