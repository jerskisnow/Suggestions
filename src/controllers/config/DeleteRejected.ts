import { Client, Message, MessageEmbed } from 'discord.js';

import pgPool from '../../structures/PostgreSQL';
import { set } from '../../structures/CacheManager';

/**
 * The delete approved controller function handles the delete approved part
 * @param {Client}  client   The client supplied by discord
 * @param {Message} message  The message that was used to initiate the controller process
 * @param {Object}  language The language used on the server where the controller process got initated
 * @param {Message} msg      The choose menu message used to activate the controller
 * @return                   Ends the function in an earlier stage
 */
export default async(client: Client, message: Message, language: any, msg: Message) => {

	await msg.edit({
		embed: new MessageEmbed()
		.setAuthor(language.commands.config.title, client.user.avatarURL())
		.setColor(process.env.EMBED_COLOR)
		.setDescription(language.commands.config.deleteRejected.description)
		.setTimestamp()
		.setFooter(process.env.EMBED_FOOTER)
	});

	const filter = (msg: Message) => msg.author.id === message.author.id;
	const awaitMessage = await message.channel.awaitMessages(filter, {
		max: 1,
		time: 35000
	});

	const inputMessage: Message = awaitMessage.first();

	// Check if there wasn't any input given
	if (inputMessage === undefined) {
		await msg.edit({
			embed: new MessageEmbed()
			.setAuthor(language.commands.config.title, client.user.avatarURL())
			.setColor(process.env.EMBED_COLOR)
			.setDescription(language.commands.config.deleteRejected.missingInput)
			.setTimestamp()
			.setFooter(process.env.EMBED_FOOTER)
		});

		await msg.delete({
			timeout: 50000
		});

		return;
	}

	const input: string = awaitMessage.first().content;

	await awaitMessage.first().delete({
		timeout: 125
	});

	let inputResult;

	if (input.toLowerCase() === "on") {
		inputResult = true;
	} else if (input.toLowerCase() === "off") {
		inputResult = false;
	} else {
		await msg.edit({
			embed: new MessageEmbed()
			.setAuthor(language.commands.config.title, client.user.avatarURL())
			.setColor(process.env.EMBED_COLOR)
			.setDescription(language.commands.config.deleteRejected.invalidInput)
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
		.setDescription(language.commands.config.deleteRejected.updated)
		.setTimestamp()
		.setFooter(process.env.EMBED_FOOTER)
	});

	const pgClient = await pgPool.connect();

	try {
		await pgClient.query('UPDATE servers SET delete_rejected = $1::bool WHERE id = $2::text', [inputResult, message.guild.id]);
	} finally {
		pgClient.release();
	}

	await set(message.guild.id, 'delete_rejected', inputResult);

}
