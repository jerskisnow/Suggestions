import botCache from '../../structures/BotCache';
import { Permission } from '../../managers/Commands';

botCache.commands.set('list', {
    enabled: true,
    permission: Permission.DEFAULT,
    exec: async (client, message, commandData, args: string[]) => {
        // ...
    }
});