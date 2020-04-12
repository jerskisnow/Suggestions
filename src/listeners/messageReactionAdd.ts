import { Client, MessageReaction, Message } from 'discord.js';
import cache from 'memory-cache';
import Utils from '../structures/Utils';

import ApproveController from '../controllers/assessments/Approve';
import RejectController from '../controllers/assessments/Approve';

const utils: Utils = new Utils();

export default async (client: Client, reaction: MessageReaction) => {
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

	const reactionCount: number = reaction.message.reactions.cache.size - 1;

	if (autoApprove > -1) {
		if (autoApprove === reactionCount) {
			ApproveController(client, reaction.message as Message, utils.languageCodeToObject(currentCache.language))
		}
	}

	if (autoReject > -1) {
		if (autoReject === reactionCount) {
			RejectController(client, reaction.message as Message, utils.languageCodeToObject(currentCache.language));
		}
	}

};
