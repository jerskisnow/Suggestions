import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';

botCache.commands.set('donate', {
    enabled: true,
    permission: Permission.DEFAULT,
    exec: async (message, commandData) => {
        await sendPlainEmbed(message.channel, botCache.config.colors.blue, commandData.language.donate.description.replace('%donate_link%', botCache.config.links.donateLink));
    }
});
