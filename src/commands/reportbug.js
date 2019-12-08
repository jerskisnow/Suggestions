import { RichEmbed } from 'discord.js';

const reportArray = new Array();

export default async (client, message, language, prefix, args) => {

    // Check if arguments weren't give, if that's the case, return with a message
    if (!args.length) return message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.errorTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.reportBugMissingArguments)
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    // Check if the user already reported a bug, so if the reportArray includes message author
    if (reportArray.includes(message.author.id)) return message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.errorTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.reportCooldownActive)
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    // Send a message to the user that the bug was successfully reported
    await message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.reportBugTitle, message.author.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.reportBugSuccess)
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    // Add the user to the 'cooldown' arraylist
    await reportArray.push(message.author.id);

    // Retrieve the ReportBug channel and send the reportbug message
    client.channels.get(process.env.CHANNELS_REPORTBUG).send({
        embed: new RichEmbed()
            .setAuthor("New Bug Report", message.author.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .addField("Reporter", `${message.author.tag} (${message.author.id})`, false)
            .addField("Description", args.slice(0).join(" "))
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    // Run a timeout function to remove the user from the cooldown arraylist
    setTimeout(() => {
        reportArray.splice(reportArray.indexOf(message.author.id), 1);
    }, 1000 * 60 /* 3 hours */);

}