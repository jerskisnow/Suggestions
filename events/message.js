const utf8 = require('utf8');
const utils = require('../utils');

module.exports = (client, message) => {

	// If the author is a bot, return
	if (message.author.bot) return;
	// If the message is not in a guild, return
	if (!message.guild) return;

	// Check if the message contains a remote forceregister content
	if (message.content === "123#forceregister" && message.author.id === process.env.DEVELOPER_ID)
	{
		// Get all the configuration data from the message's guild
		client.dbConnection.query('SELECT * FROM configurations WHERE id = ?', [message.guild.id], (err, result) => {
			// Check if he guild isn't registered
			if (!result.length) {
				var post = {
					id: message.guild.id
				};
				client.dbConnection.query('INSERT INTO configurations SET ?', post);
				message.channel.send("Succesfully registered this guild!");
			}

		});
	}

	// Get the server's prefix
	client.dbConnection.query('SELECT prefix FROM configurations WHERE id = ?' [message.guild.id], (error, result) => {

		// Pre-Define the prefix
		var prefix = process.env.PREFIX;

		// If there aren't any errors and if the prefix is not null
		if (!error && result.length !== 0 && result[0].prefix !== null) {

			// Change the prefix variable to the actual server prefix
			prefix = utf8.decode(result[0].prefix);
		}

		// Check if the message contains the prefix
		if (message.content.indexOf(prefix) > -1) {

			// Define the arguments
			const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
			// Define the commandName
			const command = args.shift().toLowerCase();

			// Returns a boolean, checks if the command is registered
			const cmd = client.commands.get(command);
			// If the command isn't registered, return
			if (!cmd) return;

			// Get the server's language
			client.dbConnection.query('SELECT language FROM configurations WHERE id = ?', [message.guild.id], (err, res) => {

				// Pre-Define the langauge
				var languageCode = process.env.LANGUAGE;

				// If there aren't any errors and if the languageC is not null
				if (!err && res.length !== 0 && res[0].language !== null) {

					// Change the languageCode variable to the actual server languageCode
					languageCode = res[0].language;
				}

				// Define the language file
				let language = utils.languageCodeToFile(languageCode);

				// Finally run the command file with the pre-defined parameters
				cmd.run(client, message, language, prefix, args);

			});
		}

	});

	// ...

}
