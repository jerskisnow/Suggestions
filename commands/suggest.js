const { RichEmbed } = require('discord.js');
const path = require('path');

exports.run = async (client, message, language, prefix, args) => {

	// Check if the arguments have a length of 0, if yes return a message
	if (args.length === 0) return message.channel.send({
		embed: new RichEmbed()
		  .setAuthor(language.errorTitle, client.user.avatarURL)
		  .setColor(process.env.EMBED_COLOR)
			.setDescription(language.missingArguments)
			.addField(language.exampleTitle, language.suggestionExample
				.replace(/<Prefix>/g, prefix)
				.replace(/<Command>/g, path.basename(__filename, '.js')), false)
			.setTimestamp()
			.setFooter(process.env.EMBED_FOOTER)
	});

	// Get the channel data from the database
	client.dbConnection.query('SELECT channel FROM configurations WHERE id = ?', [message.guild.id], async (err, res) => {

		// Check if the channel data if valid
		if (err || res.length === 0 || res[0].channel === null || !client.channels.get(res[0].channel)) return message.channel.send({
			embed: new RichEmbed()
			  .setAuthor(language.errorTitle, client.user.avatarURL)
				.setColor(process.env.EMBED_COLOR)
				.setDescription(language.invalidChannel)
				.setTimestamp()
				.setFooter(process.env.EMBED_FOOTER)
		});

		// Pre-Define the suggestion's description
		let sDesc = args.slice(0).join(" ");

		// Pre-Define the suggestion's channel
		let sChannel = client.channels.get(res[0].channel);

		// Get the id form the suggestion with the highest id
		client.dbConnection.query('SELECT id FROM suggestions ORDER BY id DESC LIMIT 1', async (err, rawID) => {
			// Pre-Define sID, set to 1 because if there aren't any suggestions registered it have to return the number 1, since that's the number for the first registered suggestions
			var sID = "1";
			// Check if the data is valid
			if (!err && rawID.length !== 0 && rawID[0].id !== null)
			{
				// Set sID to the highest id + 1
				sID = rawID[0].id + 1;
			}

			// Send the actual suggestion
			const sMessage = await sChannel.send({
				embed: new RichEmbed()
					.setAuthor(language.newSuggestionTitle.replace(/<User>/g, message.author.tag), message.author.avatarURL)
					.setColor(process.env.EMBED_COLOR)
					.setDescription(language.newSuggestionDescription.replace(/<Description>/g, sDesc).replace(/<Status>/g, "Open"))
					.setTimestamp()
					.setFooter(language.newSuggestionFooter.replace(/<SuggestionID>/g, sID))
			});

			// Reject with the emojis
			await sMessage.react("✅");
			await sMessage.react("❎");

			// Define the post for the insertance of the new suggestion
			var post = {
				message: sMessage.id,
				description: sDesc,
				author: message.author.id,
				status: "Open",
				guild: message.guild.id
			};
			// Finally insert the new suggestion into the database
			client.dbConnection.query('INSERT INTO suggestions SET ?', post);

		});

	});

}
