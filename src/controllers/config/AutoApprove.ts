import { Client, Message, MessageEmbed } from 'discord.js';
import PostgreSQL from '../../structures/PostgreSQL';
import { set } from '../../structures/CacheManager';

/**
 * The auto approve controller function handles the auto approve part
 * @param {Client}  client   The client supplied by discord
 * @param {Message} message  The message that was used to initiate the controller process
 * @param {Object}  language The language used on the server where the controller process got initated
 * @param {Message} msg      The choose menu message used to activate the controller
 * @return                   Ends the function in an earlier stage
 */
export default async (client: Client, message: Message, language: any, msg: Message): Promise<void> => {
	await msg.edit({
		embed: new MessageEmbed()
			.setAuthor(language.commands.config.title, client.user.avatarURL())
			.setColor(process.env.EMBED_COLOR)
			.setDescription(language.commands.config.autoApprove.description)
			.setTimestamp()
			.setFooter(process.env.EMBED_FOOTER)
	});

	const filter = (msg: Message) => msg.author.id === message.author.id;
	const awaitMessage = await message.channel.awaitMessages(filter, {
		max: 1,
		time: 35000
	});

	const inputMessage: Message = awaitMessage.first();

	if (inputMessage === undefined) {

		await msg.edit({
			embed: new MessageEmbed()
				.setAuthor(language.commands.config.title, client.user.avatarURL())
				.setColor(process.env.EMBED_COLOR)
				.setDescription(language.commands.config.autoApprove.missingInput)
				.setTimestamp()
				.setFooter(process.env.EMBED_FOOTER)
		});

		await msg.delete({
			timeout: 50000
		});

		return;

	}

	const newAmount: number = parseInt(awaitMessage.first().content);

	await awaitMessage.first().delete({
		timeout: 125
	});

	if (isNaN(newAmount)) {
		await msg.edit({
			embed: new MessageEmbed()
				.setAuthor(language.commands.config.title, client.user.avatarURL())
				.setColor(process.env.EMBED_COLOR)
				.setDescription(language.commands.config.autoApprove.invalidNumber)
				.setTimestamp()
				.setFooter(process.env.EMBED_FOOTER)
		});

		await msg.delete({
			timeout: 50000
		});

		return;
	}

	if (newAmount < -1) {
		await msg.edit({
			embed: new MessageEmbed()
				.setAuthor(language.commands.config.title, client.user.avatarURL())
				.setColor(process.env.EMBED_COLOR)
				.setDescription(language.commands.config.autoApprove.numberIsTooLow)
				.setTimestamp()
				.setFooter(process.env.EMBED_FOOTER)
		});

		await msg.delete({
			timeout: 50000
		});

		return;
	}

	await msg.edit({
		embed: new MessageEmbed()
			.setAuthor(language.commands.config.title, client.user.avatarURL())
			.setColor(process.env.EMBED_COLOR)
			.setDescription(language.commands.config.autoApprove.updated
				.replace(/<Number>/g, newAmount)
			)
			.setTimestamp()
			.setFooter(process.env.EMBED_FOOTER)
	});

	const pgClient = await PostgreSQL.getPool().connect();

	try {
		await pgClient.query('UPDATE servers SET auto_approve = $1::int WHERE id = $2::text', [newAmount, message.guild.id]);
	} finally {
		pgClient.release();
	}

	await set(message.guild.id, 'auto_approve', newAmount);

}
