import { Client, Message, MessageEmbed } from 'discord.js';

import { get } from '../structures/CacheManager';
import botCache from '../structures/BotCache';

botCache.commands.set('help', {
    helpMessage: 'Obtain a list of all commands with a description and a link to the support discord.',
    exec: async (client: Client, message: Message, language: any) => {
        const prefix = await get(message.guild.id, 'prefix') as string;

        const stringArray: string[] = [];

        for (const key of Array.from(botCache.commands.keys())) {
            stringArray.push(prefix + key + " >> " + botCache.commands.get(key).helpMessage);
        }

        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.help.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .addField(language.commands.help.commandTitle, stringArray.join("\n"), false)
                .addField(language.commands.help.serverTitle, process.env.LINKS_SERVER_INVITE, false)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });
    }
});
