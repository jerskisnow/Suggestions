import botCache from '../../structures/BotCache';
import { Permission } from '../../managers/Commands';

botCache.commands.set('movereport', {
    enabled: true,
    permission: Permission.STAFF,
    exec: async (client, message, commandData, args) => {

    }
});