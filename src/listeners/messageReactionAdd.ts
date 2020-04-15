import { Client, MessageReaction, Message } from 'discord.js';
import cache from 'memory-cache';
import Utils from '../structures/Utils';
import botStatus from '../structures/BotStatus';

import ApproveController from '../controllers/assessments/Approve';
import RejectController from '../controllers/assessments/Approve';

const utils: Utils = new Utils();

export default async (client: Client, reaction: MessageReaction) => {

	if (!botStatus.isRunning()) return;

	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (ex) {
			// console.log('An error occurred: ', ex);
			return;
		}
	}

	const currentCache = cache.get(reaction.message.guild.id);

	const autoApprove: number = currentCache.auto_approve;
	const autoReject: number = currentCache.auto_reject;

	const positiveCount = reaction.message.reactions.cache.filter(reaction => reaction.emoji.name === "✅").size - 1;
	const negativeCount = reaction.message.reactions.cache.filter(reaction => reaction.emoji.name === "❎").size - 1;

	if (autoApprove > -1) {
		if (autoApprove === positiveCount) {
			ApproveController(client, reaction.message as Message, utils.languageCodeToObject(currentCache.language))
		}
	}

	if (autoReject > -1) {
		if (autoReject === negativeCount) {
			RejectController(client, reaction.message as Message, utils.languageCodeToObject(currentCache.language));
		}
	}

}
