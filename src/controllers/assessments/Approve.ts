import { Client, Message, MessageEmbed } from 'discord.js';

import pgPool from '../../structures/PostgreSQL';
import { get } from '../../structures/CacheManager';

import DeleteController from './Delete';

/*
 msg -> The suggestion message
*/
export default async (client: Client, msg: Message, language: any) => {

	const pgClient = await pgPool.connect();

	const result = await pgClient.query('SELECT id, context, author, status FROM suggestions WHERE message = $1::text', [msg.id]);

	if (!result.rows.length || result.rows[0].status !== 'Open') {
		await pgClient.release();
		return;
	}
	
	const deleteApproved = await get(msg.guild.id, 'delete_approved') as boolean;

	if (deleteApproved) {
		DeleteController(msg);
	} else {

		// const shard_result = await client.shard.broadcastEval(`this.users.cache.get('${res.rows[0].author}')`);
		// const user = shard_result[0];
		const user = msg.guild.members.cache.get(result.rows[0].author);

		let title = "User Left ~ Suggestions";
		let picture = client.user.avatarURL();

		if (user != null) {
			// title = user.tag;
			// picture = user.avatarURL;
			title = user.user.tag;
			picture = user.user.avatarURL();
		}

		await msg.edit({
			embed: new MessageEmbed()
				.setAuthor(title, picture)
				.setColor(process.env.APPROVED_EMBED_COLOR)
				.setDescription(language.commands.suggest.description
					.replace(/<Description>/g, result.rows[0].context)
					.replace(/<Status>/g, language.suggestions.approved)
					.replace(/<ID>/g, result.rows[0].id)
				)
				.setTimestamp()
				.setFooter(process.env.EMBED_FOOTER)
		});

		await pgClient.query('UPDATE suggestions SET status = $1::text WHERE message = $2::text', ['Approved', msg.id]);

	}

	await pgClient.release();

}
