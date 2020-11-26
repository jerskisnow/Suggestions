import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';
import { handleReportCreation } from '../../managers/Reports';

botCache.commands.set('report', {
    enabled: true,
    permission: Permission.DEFAULT,
    exec: async (client, message, commandData, args: string[]) => {
        await message.delete();
        if (args.length === 0) {
            const msg = await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.report.helpDescription);
            await msg.delete({timeout: 8000});
            return;
        }
        await handleReportCreation(message, commandData.language, args.join(' '));
    }
});