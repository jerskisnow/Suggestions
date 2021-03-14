import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';
import { getSuggestionData, rejectSuggestion, SuggestionStatus } from '../../managers/Suggestions';
import { log } from '../../structures/Logging';

botCache.commands.set('reject', {
    enabled: true,
    permission: Permission.STAFF,
    exec: async (message, commandData, args: string[]) => {
        if (args.length === 0) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.reject.helpDescription.replace('%prefix%', commandData.prefix));
            return;
        }

        let suggestion = await getSuggestionData(args[0]);
        if (suggestion == null || suggestion.status === SuggestionStatus.DELETED as number) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.reject.invalidSuggestion);
            return;
        }

        if (args.length > 1) {
            await rejectSuggestion(message, commandData.language, suggestion, args.slice(1).join(' '));
        } else {
            await rejectSuggestion(message, commandData.language, suggestion);
        }
        await sendPlainEmbed(message.channel, botCache.config.colors.green, commandData.language.reject.statusUpdated);
        await log(message.guild, commandData.language.logs.suggestionRejected.replace('%user_tag%', message.author.tag).replace('%suggestion_id%', String(suggestion.id)));
    }
});
