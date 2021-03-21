import { Client, MessageReaction } from 'discord.js-light';
import botCache from '../structures/BotCache';
import { cacheGuild, getConfigValues } from '../managers/ServerData';
import { approveSuggestion, getSuggestionData, rejectSuggestion } from '../managers/Suggestions';
import { log } from '../structures/Logging';

export default async (_client: Client, reaction: MessageReaction): Promise<void> => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (ex) {
            return;
        }
    }

    if (reaction.me) return;

    let cache = await getConfigValues(reaction.message.guild.id, ['approve_emoji', 'reject_emoji', 'language', 'auto_approve', 'auto_reject'], true);
    if (cache == null) {
        cache = await cacheGuild(reaction.message.guild.id);
    }

    // Give the emojis a proper definition
    const approveEmoji = cache.approve_emoji === null ? botCache.config.emojis.approve : cache.approve_emoji;
    const rejectEmoji = cache.reject_emoji === null ? botCache.config.emojis.reject : cache.reject_emoji;

    if (reaction.emoji.name !== approveEmoji && reaction.emoji.name !== rejectEmoji) return;
    if (!reaction.message.reactions.cache.get(approveEmoji) || !reaction.message.reactions.cache.get(rejectEmoji)) return;

    const approveCount = reaction.message.reactions.cache.get(approveEmoji).count - 1;
    const rejectCount = reaction.message.reactions.cache.get(rejectEmoji).count - 1;

    const suggestion = await getSuggestionData(reaction.message.id);
    const language = botCache.languages.get(cache.language);
    if (cache.auto_approve !== -1 && approveCount >= cache.auto_approve) {
        await approveSuggestion(reaction.message, language, suggestion);
        await log(reaction.message.guild, language.logs.autoApproved.replace('%suggestion_id%', String(suggestion.id)));
    } else if (cache.auto_reject !== -1 && rejectCount >= cache.auto_reject) {
        await rejectSuggestion(reaction.message, language, suggestion);
        await log(reaction.message.guild, language.logs.autoRejected.replace('%suggestion_id%', String(suggestion.id)));
    }

}
