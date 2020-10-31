import { Client, Message, MessageEmbed } from 'discord.js';

import { get } from '../structures/CacheManager';

import { botCache } from '../index';

botCache.commands.set('translation', {
    helpMessage: 'Receive information about the translations of the bot.',
    exec: async (client: Client, message: Message, language: any) => {
        const prefix = await get(message.guild.id, 'prefix') as string;

        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.translation.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.translation.description.replaceAll(/<Prefix>/g, prefix))
                .addField(language.commands.translation.contributeTitle, language.commands.translation.contributeDescription, false)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });
    }
});