import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';
import { getReportData, ReportStatus, resolveReport } from '../../managers/Reports';
import { log } from '../../structures/Logging';

botCache.commands.set('resolve', {
    enabled: true,
    permission: Permission.STAFF,
    exec: async (client, message, commandData, args: string[]) => {
        if (args.length === 0) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.resolve.helpDescription.replace('%prefix%', commandData.prefix));
            return;
        }

        let report = await getReportData(args[0]);
        if (report == null || report.status === ReportStatus.DELETED as number) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.resolve.invalidReport
                + "\n\n(**Note:** If an existing message won't approve then it could be caused by the transfer from v3.5.0 to v4.0.0. We were forced to remove all current suggestions and reports from our database. You can safely delete the message and create a new one. Sorry for the inconvenience)"
            );
            return;
        }

        if (args.length > 1) {
            await resolveReport(message, commandData.language, report, args.slice(1).join(' '));
        } else {
            await resolveReport(message, commandData.language, report);
        }
        await sendPlainEmbed(message.channel, botCache.config.colors.green, commandData.language.resolve.statusUpdated);
        await log(message.guild, commandData.language.logs.reportResolved.replace('%user_tag%', message.author.tag).replace('%report_id%', String(report.id)));
    }
});