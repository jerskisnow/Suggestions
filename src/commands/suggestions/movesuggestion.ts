import botCache from '../../structures/BotCache';
import { getChannelFromArgs, Permission, sendPlainEmbed } from '../../managers/Commands';
import { log } from '../../structures/Logging';
import { getSuggestionData, moveSuggestion, SuggestionStatus } from '../../managers/Suggestions';

botCache.commands.set('movesuggestion', {
    enabled: true,
    aliases: ['movesug'],
    permission: Permission.STAFF,
    exec: async (message, commandData, args) => {
        if (args.length !== 2) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.movesuggestion.helpDescription.replace('%prefix%', commandData.prefix));
            return;
        }

        let suggestion = await getSuggestionData(args[0]);
        if (suggestion == null || suggestion.status === SuggestionStatus.DELETED as number) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.movesuggestion.invalidSuggestion);
            return;
        }

        let channel = await getChannelFromArgs(message.guild, args[1]);
        if (!channel) {
            await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.movesuggestion.invalidChannel);
            return;
        }

        await moveSuggestion(message, commandData.language, suggestion, channel);

        await sendPlainEmbed(message.channel, botCache.config.colors.green, commandData.language.movesuggestion.locationUpdated.replace('%new_channel%', `<#${channel.id}>`));
        await log(message.guild, commandData.language.logs.suggestionMoved.replace('%user_tag%', message.author.tag).replace('%suggestion_id%', String(suggestion.id).replace('%new_channel%', `<#${channel.id}>`)));
    }
});
