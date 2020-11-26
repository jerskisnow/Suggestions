import botCache from '../../structures/BotCache';
import { Permission } from '../../managers/Commands';
import { MessageEmbed } from "discord.js";

botCache.commands.set('help', {
    enabled: true,
    permission: Permission.DEFAULT,
    aliases: ['commands'],
    exec: async (client, message, commandData, args: string[]) => {
        const helpEmbed = new MessageEmbed().setColor(botCache.config.colors.blue).setDescription(commandData.language.help.description);
        const helpFields = commandData.language.help.fields;
        for (let i = 0; i < helpFields.length; i++) {
            helpEmbed.addField(helpFields[i].title, helpFields[i].description.replace(/%prefix%/g, commandData.prefix), false);
        }
        await message.channel.send({embed: helpEmbed});
    }
});