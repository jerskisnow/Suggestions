import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';
import { reopenSuggestion, getSuggestionData, SuggestionStatus } from '../../managers/Suggestions';
import { log } from '../../structures/Logging';

botCache.commands.set('reopen', {
    enabled: true,
    aliases: ['open'],
    permission: Permission.STAFF,
    exec: async (message, commandData, args: string[]) => {
        if (args.length === 0) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.reopen.helpDescription.replace('%prefix%', commandData.prefix));
            return;
        }

        let suggestion = await getSuggestionData(args[0]);
        if (suggestion == null || suggestion.status === SuggestionStatus.OPEN as number) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.reopen.invalidSuggestion);
            return;
        }

        await reopenSuggestion(message, commandData.language, suggestion);
        await sendPlainEmbed(message.channel, botCache.config.colors.green, commandData.language.reopen.statusUpdated);
        await log(message.guild, commandData.language.logs.suggestionReopened.replace('%user_tag%', message.author.tag).replace('%suggestion_id%', String(suggestion.id)));
    }
});
