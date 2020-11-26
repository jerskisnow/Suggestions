import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';

botCache.commands.set('vote', {
    enabled: true,
    permission: Permission.DEFAULT,
    exec: async (client, message, commandData) => {
        await sendPlainEmbed(message.channel, botCache.config.colors.blue, commandData.language.vote.description.replace('%vote_link%', botCache.config.links.voteLink));
    }
});