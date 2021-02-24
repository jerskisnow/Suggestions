import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';

botCache.commands.set('invite', {
    enabled: true,
    permission: Permission.DEFAULT,
    aliases: ['support'],
    exec: async (client, message, commandData) => {
        await sendPlainEmbed(message.channel, botCache.config.colors.blue, commandData.language.invite.description.replace('%bot_invite%', botCache.config.links.botInvite).replace('%server_invite%', botCache.config.links.serverInvite));
    }
});