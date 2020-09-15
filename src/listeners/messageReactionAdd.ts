import { Client, MessageReaction, Message } from 'discord.js';
import Utils from '../structures/Utils';

import { exists, get, cache } from '../structures/CacheManager';

import ApproveController from '../controllers/assessments/Approve';
import RejectController from '../controllers/assessments/Reject';

export default async (client: Client, reaction: MessageReaction) => {

	const utils: Utils = new Utils();

	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (ex) {
			// console.log('An error occurred: ', ex);
			return;
		}
	}

	if (reaction.emoji.name !== "✅" && reaction.emoji.name !== "❎")
		return;

	if (!reaction.message.reactions.cache.get("✅") || !reaction.message.reactions.cache.get("❎"))
		return;

	if (!exists(reaction.message.guild.id))
		await cache(reaction.message.guild.id);

	const positiveCount = reaction.message.reactions.cache.get("✅").count - 1;
	const negativeCount = reaction.message.reactions.cache.get("❎").count - 1;

	const auto_approve = await get(reaction.message.guild.id, 'auto_approve') as number;
	const auto_reject = await get(reaction.message.guild.id, 'auto_reject') as number;

	if (auto_approve !== -1 && positiveCount >= auto_approve) {
		const languageCodeString = await get(reaction.message.guild.id, 'language') as string;
		ApproveController(client, reaction.message as Message, utils.languageCodeToObject(languageCodeString));
	}
	else if (auto_reject !== -1 && negativeCount >= auto_reject) {
		const languageCodeString = await get(reaction.message.guild.id, 'language') as string;
		RejectController(client, reaction.message as Message, utils.languageCodeToObject(languageCodeString));
	}

}
