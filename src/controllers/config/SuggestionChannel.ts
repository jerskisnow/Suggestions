import { Client, Message, MessageEmbed } from 'discord.js';

import pgPool from '../../structures/PostgreSQL';
import { set } from '../../structures/CacheManager';
import Utils from '../../structures/Utils';

const utils: Utils = new Utils();

/**
 * The prefix controller function handles the prefix part
 * @param {Client}  client   The client supplied by discord
 * @param {Message} message  The message that was used to initiate the controller process
 * @param {Object}  language The language used on the server where the controller process got initated
 * @param {Message} msg      The choose menu message used to activate the controller
 * @return                   Ends the function in an earlier stage
 */
export default async (client: Client, message: Message, language: any, msg: Message) => {

    await msg.edit({
        embed: new MessageEmbed()
            .setAuthor(language.commands.config.title, client.user.avatarURL())
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.commands.config.suggestionChannel.description)
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
                .setDescription(language.commands.config.suggestionChannel.missingInput)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        await msg.delete({
            timeout: 50000
        });

        return;

    }

    const newChannel: any = awaitMessage.first().content;

	await awaitMessage.first().delete({
		timeout: 125
	});

    let newChannelObject;

    if (newChannel.indexOf('<#') > -1 || !isNaN(newChannel))
        newChannelObject = message.guild.channels.cache.get(utils.stripChannelInput(newChannel));
    else
        newChannelObject = message.guild.channels.cache.find(chn => chn.name === newChannel);

    if (!newChannelObject) {

        await msg.edit({
            embed: new MessageEmbed()
                .setAuthor(language.commands.config.title, client.user.avatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.commands.config.suggestionChannel.invalidChannel)
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
            .setDescription(language.commands.config.suggestionChannel.updated
                .replace(/<ChannelID>/g, newChannelObject.id)
            )
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    const pgClient = await pgPool.connect();

    try {
        await pgClient.query('UPDATE servers SET suggestion_channel = $1::text WHERE id = $2::text', [newChannelObject.id, message.guild.id]);
    } finally {
        pgClient.release();
    }

    await set(message.guild.id, 'suggestion_channel', newChannelObject.id);

}
