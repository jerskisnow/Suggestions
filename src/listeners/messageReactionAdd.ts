import { Client, MessageReaction } from 'discord.js-light';
import botCache from '../structures/BotCache';
import { cacheGuild, getConfigValue, getConfigValues } from '../managers/ServerData';
import { approveSuggestion, getSuggestionData, rejectSuggestion } from '../managers/Suggestions';
import { log } from '../structures/Logging';

export default async (client: Client, reaction: MessageReaction): Promise<void> => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (ex) {
            console.log('An error occurred: ', ex);
            return;
        }
    }

    if (reaction.me) return;

    let cache = await getConfigValues(reaction.message.guild.id, ['approve_emoji', 'reject_emoji', 'language']);
    if (cache == null) {
        cache = await cacheGuild(reaction.message.guild.id);
    }

    if (reaction.emoji.name !== cache.approve_emoji && reaction.emoji.name !== cache.reject_emoji) return;
    if (!reaction.message.reactions.cache.get(cache.approve_emoji) || !reaction.message.reactions.cache.get(cache.reject_emoji)) return;

    const approveCount = reaction.message.reactions.cache.get(cache.approve_emoji).count - 1;
    const rejectCount = reaction.message.reactions.cache.get(cache.reject_emoji).count - 1;

    const autoApproveCount = await getConfigValue(reaction.message.guild.id, 'auto_approve') as number;
    const autoRejectCount = await getConfigValue(reaction.message.guild.id, 'auto_reject') as number;

    const suggestion = await getSuggestionData(reaction.message.id);
    const language = botCache.languages.get(cache.language);
    if (autoApproveCount !== -1 && approveCount >= autoApproveCount) {
        await approveSuggestion(reaction.message, language, suggestion);
        await log(reaction.message.guild, language.logs.autoApproved.replace('%suggestion_id%', String(suggestion.id)));
    } else if (autoRejectCount !== -1 && rejectCount >= autoRejectCount) {
        await rejectSuggestion(reaction.message, language, suggestion);
        await log(reaction.message.guild, language.logs.autoRejected.replace('%suggestion_id%', String(suggestion.id)));
    }

}