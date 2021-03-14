import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';
import { handleSuggestionList } from '../../managers/Suggestions';
import { handleReportList } from '../../managers/Reports';

botCache.commands.set('list', {
    enabled: true,
    permission: Permission.DEFAULT,
    exec: async (message, commandData, args: string[]) => {
        if (args.length === 0) {
            await handleSuggestionList(message, commandData.language);
        } else if (args.length === 1) {
            const argument = args[0].toLowerCase();
            if (argument === 'suggestions') {
                await handleSuggestionList(message, commandData.language);
            } else if (argument === 'reports') {
                await handleReportList(message, commandData.language);
            } else {
                await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.list.helpDescription.replace('%prefix%', commandData.prefix));
            }
            return;
        } else {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.list.helpDescription.replace('%prefix%', commandData.prefix));
        }
    }
});
