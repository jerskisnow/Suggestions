import { Client, Message, MessageEmbed } from 'discord.js';
import utf8 from 'utf8';

import pgPool from '../../structures/PostgreSQL';
import { set } from '../../structures/CacheManager';

/**
 * The prefix controller function handles the prefix part
 * @param {Client}  client   The client supplied by discord
 * @param {Message} message  The message that was used to initiate the controller process
 * @param {Object}  language The language used on the server where the controller process got initated
 * @param {Message} msg      The choose menu message used to activate the controller
 * @return                   Ends the function in an earlier stage
 */
export default async(client: Client, message: Message, language: any, msg: Message) => {

    await msg.edit({
        embed: new MessageEmbed()
        .setAuthor(language.commands.config.title, client.user.avatarURL())
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.commands.config.prefix.description)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

    const filter = (msg: Message) => msg.author.id === message.author.id;
    const awaitMessage = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 35000
    });

    const inputMessage: Message = awaitMessage.first();

    if (inputMessage === undefined) {

        await msg.edit({
            embed: new MessageEmbed()
            .setAuthor(language.commands.config.title, client.user.avatarURL())
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.commands.config.prefix.missingInput)
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
        });

        await msg.delete({
            timeout: 50000
        });

        return;

    }

    const newPrefix: string = awaitMessage.first().content;

    await awaitMessage.first().delete({
        timeout: 125
    });

    await msg.edit({
        embed: new MessageEmbed()
        .setAuthor(language.commands.config.title, client.user.avatarURL())
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.commands.config.prefix.updated
            .replace(/<Prefix>/g, newPrefix)
        )
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

    const pgClient = await pgPool.connect();

    try {
        await pgClient.query('UPDATE servers SET prefix = $1::text WHERE id = $2::text', [utf8.encode(newPrefix), message.guild.id]);
    } finally {
        pgClient.release();
    }

    await set(message.guild.id, 'prefix', newPrefix);
    
}
