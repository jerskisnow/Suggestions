import { Client, Message, MessageEmbed } from 'discord.js';
import Command from '../types/Command';

import { exists, get, cache } from '../structures/CacheManager';
import { botCache } from '../app';

export default async (client: Client, message: Message): Promise<void> => {

    if (message.author.bot) return;
    if (!message.guild) return;

    const bool = await exists(message.guild.id);
    if (!bool) {
        await cache(message.guild.id);
    }

    const prefix = await get(message.guild.id, 'prefix') as string;

    if (message.content.startsWith(prefix) || message.content.startsWith(`<@${client.user.id}> `)) {

        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);

        const command = args.shift().toLowerCase();
        if (command === '') return;

        const languageCode = await get(message.guild.id, 'language') as string;
        const language = botCache.languages.get(languageCode);

        const cmd: Command = botCache.commands.get(command);
        if (cmd === undefined) {
            return;
        }

        if (cmd.permission !== null &&
            !message.member.permissions.has(cmd.permission as any)
        ) {
            message.channel.send({
                embed: new MessageEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL())
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.insufficientPermissions
                        .replace(/<Permission>/g, cmd.permission))
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });
            return;
        }

        botCache.commands.get(command).exec(client, message, language, args);
    }

}
