exports.run = (client, message, args) => {
	if (message.author.id !== process.env.DEVELOPER_ID) return;
	client.dbConnection.query('SELECT * FROM configurations WHERE id = ?', [message.guild.id], (err, result) => {

		if (!result.length) {
			var post = {
				id: message.guild.id
			};
			client.dbConnection.query('INSERT INTO configurations SET ?', post);
		}

	});

	message.channel.send("Done!")
}