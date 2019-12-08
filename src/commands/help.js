import { RichEmbed } from 'discord.js';

const wait = require('util').promisify(setTimeout);

export default async (client, message, language, prefix, args) => {
    var msg = null;
    try {
        await message.delete(250);
        msg = await message.channel.send({
            embed: new RichEmbed()
                .setAuthor(language.helpTitle, client.user.avatarURL)
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.checkPrivateMessages)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        await message.author.send({
            embed: new RichEmbed()
                .setAuthor(language.helpTitle, client.user.avatarURL)
                .setColor(process.env.EMBED_COLOR)
                .setDescription(`${prefix}approve >> ${language.helpExplanationApprove}\n${prefix}config >> ${language.helpExplanationConfig}\n${prefix}donate >> ${language.helpExplanationDonate}\n${prefix}help >> ${language.helpExplanationHelp}\n${prefix}invite >> ${language.helpExplanationInvite}\n${prefix}list >> ${language.helpExplanationList}\n${prefix}reject >> ${language.helpExplanationReject}\n${prefix}reportbug >> ${language.helpExplanationReportbug}\n${prefix}suggest >> ${language.helpExplanationSuggest}\n${prefix}uptime >> ${language.helpExplanationUptime}\n${prefix}vote >> ${language.helpExplanationVote}\n`)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

    } catch (err) {
        if (err.toString() === "DiscordAPIError: Cannot send messages to this user")
            setTimeout(async function () {
                await msg.edit({
                    embed: new RichEmbed()
                        .setAuthor(language.helpTitle, client.user.avatarURL)
                        .setColor(process.env.EMBED_COLOR)
                        .setDescription(language.cannotSendPrivateMessages)
                        .setTimestamp()
                        .setFooter(process.env.EMBED_FOOTER)
                });
                message.channel.send({
                    embed: new RichEmbed()
                        .setAuthor(language.helpTitle, client.user.avatarURL)
                        .setColor(process.env.EMBED_COLOR)
                        .setDescription(`${prefix}approve >> ${language.helpExplanationApprove}\n${prefix}config >> ${language.helpExplanationConfig}\n${prefix}donate >> ${language.helpExplanationDonate}\n${prefix}help >> ${language.helpExplanationHelp}\n${prefix}invite >> ${language.helpExplanationInvite}\n${prefix}list >> ${language.helpExplanationList}\n${prefix}reject >> ${language.helpExplanationReject}\n${prefix}reportbug >> ${language.helpExplanationReportbug}\n${prefix}suggest >> ${language.helpExplanationSuggest}\n${prefix}uptime >> ${language.helpExplanationUptime}\n${prefix}vote >> ${language.helpExplanationVote}\n`)
                        .setTimestamp()
                        .setFooter(process.env.EMBED_FOOTER)
                });
            }, 1825);
        else throw err;
    }


}