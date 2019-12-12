import { RichEmbed } from 'discord.js';
import { dbConnection } from '../structures/MySQL';
import languageList from '../structures/Languages';

export default async (client, message, language, prefix, args) => {

    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.errorTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.insufficientPermissions
                .replace(/<Permission>/g, "ADMINISTRATOR"))
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    /*
    $config prefix <NewPrefix>
    $config channel <NewChannel>
    $config language <NewLanguage>
    $config autoapprove <Amount of Reactions> --> -1 to disable
    $config autoreject <Amount of Reactions> --> -1 to disable
    $config autoremove <Approved/Rejected> <TimeInSeconds> --> -1 for no deletion
    $config ~ --> return the help message
     */

    if (!args.length) return message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.configTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(`${prefix}config prefix <NewPrefix>\n\n${prefix}config channel <NewChannel>\n\n${prefix}config language <NewLanguage>\n\n${prefix}config autoapprove <Amount of Reactions>\n**NOTE:** -1 to disable\n\n${prefix}config autoreject <Amount of Reactions>\n**NOTE:** -1 to disable`)
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    switch (args[0].toLowerCase()) {
        case "prefix":
            if (args.length !== 2) return message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.configPrefixMissingArguments)
                    .addField(language.exampleTitle, language.configPrefixExample
                        .replace(/<Prefix>/g, prefix)
                    )
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            const newPrefix = utf8.encode(args[1]);

            await dbConnection.query("UPDATE configurations SET prefix = ? WHERE id = ?", [newPrefix, message.guild.id]);

            message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.configTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.configPrefixSuccessDescription
                        .replace(/<NewPrefix>/g, newPrefix)
                    )
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            break;
        case "channel":

            if (args.length !== 2) return message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.configChannelMissingArguments)
                    .addField(language.exampleTitle, language.configChannelExample
                        .replace(/<Prefix>/g, prefix)
                    )
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            let newChannelObject;

            if (args[1].indexOf('<#') > -1 || !isNaN(args[1]))
                newChannelObject = message.guild.channels.get(args[1].replace("<#", "").replace(">", ""));
            else
                newChannelObject = message.guild.channels.find(chn => chn.name === args[1]);

            if (!newChannelObject) return message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.configChannelMissingArguments)
                    .addField(language.exampleTitle, language.configChannelExample
                        .replace(/<Prefix>/g, prefix)
                    )
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            await dbConnection.query("UPDATE configurations SET channel = ? WHERE id = ?", [newChannelObject.id, message.guild.id]);

            message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.configTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.configChannelSuccessDescription
                        .replace(/<NewChannelID>/g, newChannelObject.id)
                    )
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            break;
        case "language":

            const list = await languageList();

            const newList = new Array();

            for (const language of list)
            newList.push(language.split(".utf8.")[0])

            if (args.length !== 2 || !newList.includes(args[1])) return message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.configLanguageIncorrectArguments)
                    .addField(language.exampleTitle, language.configLanguageExample
                        .replace(/<Prefix>/g, prefix)
                    )
                    .addField(language.configLanguageListTitle, newList.join(", "))
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            await dbConnection.query("UPDATE configurations SET language = ? WHERE id = ?", [args[1], message.guild.id]);

            message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.configTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.configLanguageSuccessDescription
                        .replace(/<NewLanguageCode>/g, args[1])
                    )
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            break;
        case "autoapprove":
            message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.comingSoonTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.comingSoonDescription)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });
            // TODO: This
            break;
        case "autoreject":
            message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.comingSoonTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.comingSoonDescription)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });
            // TODO: This
            break;
        case "autoremove":
            message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.comingSoonTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.comingSoonDescription)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });
            // TODO: This
            break;
        default:
            return message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.configTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(`${prefix}config prefix <NewPrefix>\n${prefix}config channel <NewChannel>\n${prefix}config language <NewLanguage>\n${prefix}config autoapprove <Amount of Reactions>\n   **NOTE:**-1 to disable\n${prefix}config autoreject <Amount of Reactions>\n   **NOTE:** -1 to disable`)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });
    }

}
