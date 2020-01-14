import { RichEmbed } from 'discord.js';
import { dbConnection } from '../structures/MySQL';

export default (client, message, language, prefix, args) => {

    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.errorTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.insufficientPermissions
                .replace(/<Permission>/g, "MANAGE_MESSAGES"))
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    if (!args.length) return message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.errorTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.approveMissingArguments)
            .addField(language.exampleTitle, language.approveExample
                .replace(/<Prefix>/g, prefix), false)
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    const sID = args[0];
    let reason = "No reason provided";

    if (args.length > 1)
        reason = args.splice(1).join(" ");

    dbConnection.query("SELECT * FROM suggestions WHERE id = ?", sID, async (err, res) => {

        if (err || !res.length || res[0].message === null) return message.channel.send({
            embed: new RichEmbed()
                .setAuthor(language.errorTitle, client.user.avatarURL)
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.approveInvalidSuggestion)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        if (res[0].status === "Approved") return message.channel.send({
            embed: new RichEmbed()
                .setAuthor(language.errorTitle, client.user.avatarURL)
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.approveSuggestionAlreadyApproved)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        const sAuthor = client.users.get(res[0].author);
        const sMessageID = res[0].message;
        const sDesc = res[0].description;

        await dbConnection.query("SELECT channel FROM configurations WHERE id = ?", message.guild.id, async (err, res) => {

            if (err || !res.length || res[0].channel === null || !client.channels.get(res[0].channel)) return message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.errorTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.suggestInvalidChannel)
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            const sChannel = client.channels.get(res[0].channel);

            await dbConnection.query("UPDATE suggestions SET status = ? WHERE id = ?", ['Approved', sID]);

            const msg = await sChannel.fetchMessage(sMessageID);

            await msg.edit({
                embed: new RichEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setColor(process.env.EMBED_COLOR_APPROVED)
                    .setDescription(language.suggestionDescription
                        .replace(/<Description>/g, sDesc)
                        .replace(/<Status>/g, "Approved")
                        .replace(/<ID>/g, sID))
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.approveTitle, client.user.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.approveDescription.replace(/<SuggestionID>/g, sID))
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            try {
                sAuthor.send({
                    embed: new RichEmbed()
                        .setAuthor(language.approveAuthorTitle, client.user.avatarURL)
                        .setColor(process.env.EMBED_COLOR)
                        .setDescription(language.approveAuthorDescription.replace(/<GuildName>/g, message.guild.name).replace(/<Description>/g, sDesc).replace(/<Reason>/g, reason))
                        .setTimestamp()
                        .setFooter(process.env.EMBED_FOOTER)
                });
            } catch (err) {
                if (err.toString() === "DiscordAPIError: Cannot send messages to this user")
                    return;
                else
                    throw err;
            }

        });

    });


}