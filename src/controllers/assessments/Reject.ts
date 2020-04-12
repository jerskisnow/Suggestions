import { Client, Message, MessageEmbed } from 'discord.js';
import PostgreSQL from '../../structures/PostgreSQL';
import cache from 'memory-cache';

import DeleteController from './Delete';

/*
 msg -> The suggestion message
*/
export default async(client: Client, msg: Message, language: any) => {

	const pgClient = new PostgreSQL().getClient();

	await pgClient.connect();

	const res = await pgClient.query('SELECT id, context, author FROM suggestions WHERE message = $1::text', [msg.id]);
	// if (!res.rows[0].length) return;

	if (cache.get(msg.guild.id).delete_rejected) {
		DeleteController(msg);
	} else {
		const shard_result = await client.shard.broadcastEval(`this.users.cache.get(${res.rows[0].author})`);
		const user = shard_result[0];

		let title = "User Left ~ Suggestions";
		let picture = client.user.avatarURL();

		if (user !== null) {
			title = user.tag;
			picture = user.avatarURL();
		}

		await msg.edit({
			embed: new MessageEmbed()
				.setAuthor(title, picture)
				.setColor(process.env.REJECTED_EMBED_COLOR)
				.setDescription(language.commands.suggest.description
					.replace(/<Description>/g, res.rows[0].context)
					.replace(/<Status>/g, language.suggestions.rejected)
					.replace(/<ID>/g, res.rows[0].id)
				)
				.setTimestamp()
				.setFooter(process.env.EMBED_FOOTER)
		});

		try {
			user.send({
				embed: new MessageEmbed()
					.setAuthor(language.commands.reject.title, client.user.avatarURL())
					.setColor(process.env.EMBED_COLOR)
					.setDescription(language.commands.reject.authorMessage
						.replace(/<Server>/g, msg.guild.name)
					)
					.setTimestamp()
					.setFooter(process.env.EMBED_FOOTER)
			});
		} catch (err) {
			// throw err;
		}

	}

	await pgClient.query('UPDATE suggestions SET status = $1::text WHERE message = $2::text', ['Rejected', msg.id]);

	await pgClient.end();

}
