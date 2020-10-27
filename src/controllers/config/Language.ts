import { Client, Message, MessageEmbed } from 'discord.js';
import PostgreSQL from '../../structures/PostgreSQL';
import { set } from '../../structures/CacheManager';
import languageList from '../../structures/Languages';

/**
 * The language controller function handles the language part
 * @param {Client}  client   The client supplied by discord
 * @param {Message} message  The message that was used to initiate the controller process
 * @param {Object}  language The language used on the server where the controller process got initated
 * @param {Message} msg      The choose menu message used to activate the controller
 * @return                   Ends the function in an earlier stage
 */
export default async (client: Client, message: Message, language: any, msg: Message): Promise<void> => {

    const list: string[] = await languageList();
    const languages: string[] = [];

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
    if (inputMessage == null) {
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
    const languageCode: string = splittedInput[0].toLowerCase() + "_" + splittedInput[1].toUpperCase();

    if (input.indexOf("_") !== 2 || !languages.includes(languageCode)) {
        await msg.edit({
            embed: new MessageEmbed()
                .setAuthor(language.commands.config.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.config.language.invalidLanguage)
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
                .replace(/<Language>/g, languageCode)
            )
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    const pgClient = await PostgreSQL.getPool().connect();

    try {
        await pgClient.query('UPDATE servers SET language = $1::text WHERE id = $2::text', [languageCode, message.guild.id]);
    } finally {
        pgClient.release();
    }

    await set(message.guild.id, 'language', languageCode);

}
