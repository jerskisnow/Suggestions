import { Client, MessageReaction, Message } from 'discord.js';
import Utils from '../structures/Utils';
import botStatus from '../structures/BotStatus';

import { guildExists, getGuildSetting, cacheGuild } from '../structures/CacheManager';

import ApproveController from '../controllers/assessments/Approve';
import RejectController from '../controllers/assessments/Reject';

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

	if (reaction.emoji.name !== "✅" && reaction.emoji.name !== "❎")
		return;

	if (!reaction.message.reactions.cache.get("✅") || !reaction.message.reactions.cache.get("❎"))
		return;

	if (!guildExists)
		cacheGuild(reaction.message.guild.id);

	const positiveCount = reaction.message.reactions.cache.get("✅").count - 1;
	const negativeCount = reaction.message.reactions.cache.get("❎").count - 1;

	if (getGuildSetting(reaction.message.guild.id, 'auto_approve') === positiveCount)
		ApproveController(client, reaction.message as Message, utils.languageCodeToObject(getGuildSetting(reaction.message.guild.id, 'language')));
	else if (getGuildSetting(reaction.message.guild.id, 'auto_reject') === negativeCount)
		RejectController(client, reaction.message as Message, utils.languageCodeToObject(getGuildSetting(reaction.message.guild.id, 'language')));

}
