import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';
import { getUserValue, registerAndSetDM, setUserValue } from '../../managers/UserData';

/*
 * AllowDM command
 *
 * This command allows people to turn on/off dm message from the bot
 */
botCache.commands.set('allowdm', {
    enabled: true,
    permission: Permission.DEFAULT,
    exec: async (message, commandData, args: string[]) => {
        if (args.length !== 1) return await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.allowdm.invalidToggleOption);

        let value;
        if (args[0].toLowerCase() === 'on') {
            value = true;
        } else if (args[0].toLowerCase() === 'off') {
            value = false;
        } else return await sendPlainEmbed(message.channel, botCache.config.colors.red, commandData.language.allowdm.invalidToggleOption);

        // Check if the user exists
        if (await getUserValue(message.author.id, 'id') == null) {
            // Register and set the receive_dm value
            await registerAndSetDM(message.author.id, value)
        } else {
            // Set the receive_dm value
            await setUserValue(message.author.id, 'receive_dm', value);
        }

        await sendPlainEmbed(message.channel, botCache.config.colors.green, commandData.language.allowdm.allowDMUpdated);
    }
});
