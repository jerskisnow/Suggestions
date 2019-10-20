import { RichEmbed } from 'discord.js';
import { dbConnection } from '../structures/MySQL';
import { readdir } from 'fs';

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
    $config ~
     */

    if (!args.length) return; // TODO: This

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
                newChannelObject = client.channels.get(parseInt(args[1]));
            else
                newChannelObject = client.channels.find(chn => chn.name === args[1]);

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

            if (args.length !== 2) return message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.configLanguageMissingArguments)
                    .addField(language.exampleTitle, language.configLanguageExample
                        .replace(/<Prefix>/g, prefix)
                    )
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            const languageList = new Array();

            await readdir("./languages/", (err, files) => {
                if (err) throw err;

                files.forEach((file) => {
                    if (!file.endsWith(".js")) return;

                    languageList.push(file.split(".utf8.")[0]);
                });

            });

            if (!languageList.includes(args[1])) return message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.configLanguageInvalidLanguage
                        .replace(/<LanguageList>/g, languageList.join(", "))
                    )
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
            // TODO: This
            break;
        case "autoreject":
            // TODO: This
            break;
        case "autoremove":
            // TODO: This
            break;
        default:
            return message.channel.send("help message for config command"); // TODO: This
    }

}