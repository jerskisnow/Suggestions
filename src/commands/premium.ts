import { Client, Message, MessageEmbed } from 'discord.js';

import { botCache } from '../index';

botCache.commands.set('premium', {
    helpMessage: 'Receive information about the Suggestion\'s premium plan.',
    exec: async (client: Client, message: Message, language: any) => {
        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.premium.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.premium.description)
                .addField(language.commands.premium.perksTitle, language.commands.premium.perksDescription, false)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });
    }
});