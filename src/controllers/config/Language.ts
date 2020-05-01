import { Client, Message, MessageEmbed } from 'discord.js';
import cache from 'memory-cache';

import pgPool from '../../structures/PostgreSQL';
import languageList from '../../structures/Languages';

/**
 * The language controller function handles the language part
 * @param {Client}  client   The client supplied by discord
 * @param {Message} message  The message that was used to initiate the controller process
 * @param {Object}  language The language used on the server where the controller process got initated
 * @param {Message} msg      The choose menu message used to activate the controller
 * @return                   Ends the function in an earlier stage
 */
export default async(client: Client, message: Message, language: any, msg: Message) => {

    const list: string[] = await languageList();
    const languages: string[] = new Array();

    for (const language of list)
        languages.push(language.split('.utf8')[0]);

    await msg.edit({
        embed: new MessageEmbed()
        .setAuthor(language.commands.config.title, client.user.avatarURL())
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.commands.config.language.description)
        .addField(language.commands.config.language.availableTitle, languages.join(', '), false)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

    const filter = (msg: Message) => msg.author.id === message.author.id;
    const awaitMessage = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 35000
    });

    const inputMessage: Message = awaitMessage.first();

    // Check if there wasn't any input given
    if (inputMessage === undefined) {
        await msg.edit({
            embed: new MessageEmbed()
            .setAuthor(language.commands.config.title, client.user.avatarURL())
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.commands.config.language.missingInput)
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
        });

        await msg.delete({
            timeout: 50000
        });

        return;
    }

    const input: string = awaitMessage.first().content;

    await awaitMessage.first().delete({
        timeout: 125
    });

    const splittedInput: string[] = input.split('_');

    const newLanguage: string = splittedInput[0].toLowerCase() + "_" + splittedInput[1].toUpperCase();

    // Check if the language exists
    if (!languages.includes(newLanguage)) {
      await msg.edit({
          embed: new MessageEmbed()
          .setAuthor(language.commands.config.title, client.user.avatarURL())
          .setColor(process.env.EMBED_COLOR)
          .setDescription(language.commands.config.language.invalidLanguage
              .replace(/<Language>/g, newLanguage)
          )
          .setTimestamp()
          .setFooter(process.env.EMBED_FOOTER)
      });

      await msg.delete({
        timeout: 50000
      });

      return;
    }

    await msg.edit({
        embed: new MessageEmbed()
        .setAuthor(language.commands.config.title, client.user.avatarURL())
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.commands.config.language.updated
            .replace(/<Language>/g, newLanguage)
        )
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

    const pgClient = await pgPool.connect();

    try {
        await pgClient.query('UPDATE servers SET language = $1::text WHERE id = $2::text', [newLanguage, message.guild.id]);
    } finally {
        pgClient.release();
    }

    const currentCache = cache.get(message.guild.id);

    cache.put(message.guild.id, {
        prefix: currentCache.prefix,
        language: newLanguage,
        channel: currentCache.channel,
        auto_approve: currentCache.auto_approve,
        auto_reject: currentCache.auto_reject,
        delete_approved: currentCache.delete_approved,
        delete_rejected: currentCache.delete_rejected
    });

}
