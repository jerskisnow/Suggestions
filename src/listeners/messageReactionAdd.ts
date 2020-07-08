import { Client, MessageReaction, Message } from 'discord.js';
import Utils from '../structures/Utils';

import { guildExists, getGuildSetting, cacheGuild } from '../structures/CacheManager';

import ApproveController from '../controllers/assessments/Approve';
import RejectController from '../controllers/assessments/Reject';

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

	if (reaction.emoji.name !== "✅" && reaction.emoji.name !== "❎")
		return;

	if (!reaction.message.reactions.cache.get("✅") || !reaction.message.reactions.cache.get("❎"))
		return;

	if (!guildExists(reaction.message.guild.id)) {
		await cacheGuild(reaction.message.guild.id);
	}

	const positiveCount = reaction.message.reactions.cache.get("✅").count - 1;
	const negativeCount = reaction.message.reactions.cache.get("❎").count - 1;

	const auto_approve = getGuildSetting(reaction.message.guild.id, 'auto_approve');
	const auto_reject = getGuildSetting(reaction.message.guild.id, 'auto_reject');

	if (auto_approve !== -1 && positiveCount >= auto_approve)
		ApproveController(client, reaction.message as Message, utils.languageCodeToObject(getGuildSetting(reaction.message.guild.id, 'language')));
	else if (auto_reject !== -1 && negativeCount >= auto_reject)
		RejectController(client, reaction.message as Message, utils.languageCodeToObject(getGuildSetting(reaction.message.guild.id, 'language')));

}
