import { Client, Message, MessageEmbed } from 'discord.js';

import { botCache } from '../index';

botCache.commands.set('vote', {
    helpMessage: 'Obtain a link in order to vote for the bot.',
    exec: (client: Client, message: Message, language: any) => {
        message.channel.send({
            embed: new MessageEmbed()
                .setAuthor(language.commands.vote.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(process.env.LINKS_VOTE)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });
    }
});
