import { Client, Message, MessageEmbed } from 'discord.js';
import PostgreSQL from '../../structures/PostgreSQL';
import cache from 'memory-cache';

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
		.setDescription(language.commands.config.deleteApproved.description)
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
			.setDescription(language.commands.config.deleteApproved.missingInput)
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
			.setDescription(language.commands.config.deleteApproved.invalidInput)
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
		.setDescription(language.commands.config.deleteApproved.updated)
		.setTimestamp()
		.setFooter(process.env.EMBED_FOOTER)
	});

	const pgClient = new PostgreSQL().getClient();

	await pgClient.connect();

	await pgClient.query('UPDATE servers SET delete_approved = $1::bool WHERE id = $2::text', [inputResult, message.guild.id]);

	await pgClient.end();

	const currentCache = cache.get(message.guild.id);

	cache.put(message.guild.id, {
		prefix: currentCache.prefix,
		language: currentCache.language,
		channel: currentCache.channel,
		auto_approve: currentCache.auto_approve,
		auto_reject: currentCache.auto_reject,
		delete_approved: inputResult,
		delete_rejected: currentCache.delete_rejected
	});

	msg.delete({
		timeout: 5000
	});

}
