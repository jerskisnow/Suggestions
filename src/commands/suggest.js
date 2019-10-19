import { RichEmbed } from 'discord.js';
import { dbConnection } from '../structures/MySQL';

export default async (client, message, language, prefix, args) => {

    // Check if the arguments are 0, if yes return a message
    if (!args.length) return message.channel.send({
        embed: new RichEmbed()
            .setAuthor(language.errorTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.suggestMissingArguments)
            .addField(language.exampleTitle, language.suggestExample
                .replace(/<Prefix>/g, prefix), false)
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

    // Retrieve the channel id from the server from the database
    await dbConnection.query("SELECT channel FROM configurations WHERE id = ?", message.guild.id, async (err, res) => {

        // Check for errors, validatibility and channel existance. Whenever one of them fails, return a message
        if (err || !res.length || res[0].channel === null || !client.channels.get(res[0].channel)) return message.channel.send({
            embed: new RichEmbed()
                .setAuthor(language.errorTitle, client.user.avatarURL)
                .setColor(process.env.EMBED_COLOR)
                .setDescription(language.suggestInvalidChannel)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        // Define the suggestion description
        const sDesc = args.slice(0).join(" ");
        // Define the suggestion channel
        const sChannel = client.channels.get(res[0]);

        // Retrieve the highest id from the suggestions table which is within the database
        await dbConnection.query("SELECT id FROM suggestions ORDER BY id DESC LIMIT 1", async (err, res) => {

            // (Pre)Define the suggestion id
            let sID = 1;

            // If there aren't any errors, and if the length and the id are right
            if (!err && res.length && res[0].id !== null)
                sID += res[0].id; // Increase sID with the highest existing id

            // Send the actual suggesiton message
            const sMessage = await sChannel.send({
                embed: new RichEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.suggestionDescription
                        .replace(/<Description>/g, sDesc)
                        .replace(/<Status>/g, language.suggestionStatusOpen)
                        .replace(/<ID>/g, sID))
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

            // React to the messages
            await sMessage.react("✅");
            await sMessage.react("❎");

            // Define the post for the database
            const post = {
                message: sMessage.id,
                description: sDesc,
                author: message.author.id,
                status: "Open",
                guild: message.guild.id
            };

            // Add the suggestion to the database
            await dbConnection.query('INSERT INTO suggestions SET ?', post);

            // Send a message in the channel where the suggestion command was used
            message.channel.send({
                embed: new RichEmbed()
                    .setAuthor(language.suggestionTitle, message.author.avatarURL)
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(language.suggestSuccess.replace(/<SuggestionURL>/g, `https://canary.discordapp.com/channels/${message.guild.id}/${sChannel.id}/${sMessage.id}`))
                    .setTimestamp()
                    .setFooter(process.env.EMBED_FOOTER)
            });

        });

    });

}