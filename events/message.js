const utf8 = require('utf8');
const utils = require('../utils');
const { inspect } = require('util');

module.exports = (client, message) => {

	// If the author is a bot, return
	if (message.author.bot) return;
	// If the message is not in a guild, return
	if (!message.guild) return;

	if (message.author.id === process.env.DEVELOPER_ID
		 && message.content.toLowerCase().startsWith(process.env.DEVELOPER_PREFIX))
	{
			// Define the arguments
			const args = message.content.slice(process.env.DEVELOPER_PREFIX.length).trim().split(/ +/g);
			// Define the commandName
			const command = args.shift().toLowerCase();

			if (command === "forceregister")
			{
				if (!require('../app').isDatabaseConnected) return message.channel.send("A valid DatabaseConnection is required for this function!")
				var gID = message.guild.id;

				if (args.length !== 0 && args.length === 1)
				{
					if (!client.guilds.get(args[0])) return message.channel.send("Invalid Guild!");
					gID = args[0];
				}
				else if (args.length > 1) return	message.channel.send(`Usage: ${process.env.DEVELOPER_PREFIX}forceregister [GuildID(Optional)]`);

				client.dbConnection.query('SELECT * FROM configurations WHERE id = ?', [gID], (err, result) => {

					if (!result.length) {
						var post = {
							id: gID
						};
						client.dbConnection.query('INSERT INTO configurations SET ?', post);
						message.channel.send("Succesfully registered this guild!");
					}
					else
					{
						message.channel.send("This guild is already registered!");
					}

				});
			}
			else if (command === "eval")
			{
				if (args.length === 0) return message.channel.send(`Usage: ${process.env.DEVELOPER_PREFIX}eval <Code>`);
				let toEval = args.join(" ");
				let evaluated = inspect(eval(toEval, { depth: 0 }));
				try
				{
					let hrStart = process.hrtime();
					var hrDiff;
					hrDiff = process.hrtime(hrStart);
					message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
					// message.channel.send(`\`\`\`javascript\n${evaluated}\n\`\`\`\n*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*`, { maxLength: 1900 });
				}
				catch (err)
				{
					message.channel.send(`Error: \`${err.message}\``);
				}

			}


	}

	// Get the server's prefix
	client.dbConnection.query('SELECT prefix FROM configurations WHERE id = ?', [message.guild.id], (error, result) => {

		// Pre-Define the prefix
		var prefix = process.env.PREFIX;

		// If there aren't any errors and if the prefix is not null
		if (!error && result.length !== 0 && result[0].prefix !== null) {

			// Change the prefix variable to the actual server prefix
			prefix = utf8.decode(result[0].prefix);
		}

		// Check if the message contains the prefix
		if (message.content.startsWith(prefix)) {

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