const { RichEmbed } = require('discord.js');
const path = require('path');

const utils = require('../utils');

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

	client.dbConnection.query('SELECT channel FROM configurations WHERE id = ?', [message.guild.id], async (err, res) => {

		if (err || res.length === 0 || res[0].channel === null || !client.channels.get(res[0].channel)) return message.channel.send({
			embed: new RichEmbed()
			  .setAuthor(language.errorTitle, client.user.avatarURL)
				.setColor(process.env.EMBED_COLOR)
				.setDescription(language.invalidChannel)
				.setTimestamp()
				.setFooter(process.env.EMBED_FOOTER)
		});

		let sDesc = args.slice(0).join(" ");

		let sChannel = client.channels.get(res[0].channel);

		client.dbConnection.query('SELECT id FROM suggestions ORDER BY id DESC LIMIT 1', async (err, rawID) => {
			var sID = "Invalid";
			if (!err && rawID.length !== 0 && rawID[0].id !== null)
			{
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

			await sMessage.react("✅");
			await sMessage.react("❎");

			var post = {
				message: sMessage.id,
				description: sDesc,
				status: "Open",
				guild: message.guild.id
			};
			client.dbConnection.query('INSERT INTO suggestions SET ?', post);

		});

	});

}
