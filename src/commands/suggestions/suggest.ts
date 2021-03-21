import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';
import { handleSuggestionCreation } from '../../managers/Suggestions';

botCache.commands.set('suggest', {
    enabled: true,
    permission: Permission.DEFAULT,
    aliases: ['requestfeature'],
    exec: async (message, commandData, args: string[]) => {
        await message.delete();
        if (args.length === 0) {
            const msg = await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.suggest.helpDescription.replace('%prefix%', commandData.prefix));
            await msg.delete({timeout: 8000});
            return;
        }
        await handleSuggestionCreation(message, commandData.language, args.join(' '));
    }
});
