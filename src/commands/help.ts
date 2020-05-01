import ICommand from '../structures/ICommand';
import { Client, Message, MessageEmbed } from 'discord.js';
import cache from 'memory-cache';

import { cmdMap } from '../structures/CMDMap';

export default class HelpCommand implements ICommand {

    aliases() {
        return ['info'];
    }

    async run(client: Client, message: Message, language: any) {

        const stringArray: string[] = [];

        for (let cmd of Array.from(cmdMap.keys())) {
            stringArray.push(cache.get(message.guild.id).prefix + cmd + " >> " + cmdMap.get(cmd).help());
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

    help() {
        return "Obtain a list of all commands with a description and a link to the support discord.";
    }

}
