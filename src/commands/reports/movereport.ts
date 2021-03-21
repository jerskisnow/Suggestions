import botCache from '../../structures/BotCache';
import { getChannelFromArgs, Permission, sendPlainEmbed } from '../../managers/Commands';
import { log } from '../../structures/Logging';
import { getReportData, moveReport, ReportStatus } from '../../managers/Reports';

botCache.commands.set('movereport', {
    enabled: true,
    permission: Permission.STAFF,
    exec: async (message, commandData, args) => {
        if (args.length !== 2) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.movereport.helpDescription.replace('%prefix%', commandData.prefix));
            return;
        }

        let report = await getReportData(args[0]);
        if (report == null || report.status === ReportStatus.DELETED as number) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.movereport.invalidReport);
            return;
        }

        let channel = await getChannelFromArgs(message.guild, args[1]);
        if (!channel) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.movereport.invalidChannel);
            return;
        }

        await moveReport(message, commandData.language, report, channel);

        await sendPlainEmbed(message.channel, botCache.config.colors.green, commandData.language.movereport.locationUpdated.replace('%new_channel%', `<#${channel.id}>`));
        await log(message.guild, commandData.language.logs.reportMoved.replace('%user_tag%', message.author.tag).replace('%report_id%', String(report.id).replace('%new_channel%', channel.name)));
    }
});
