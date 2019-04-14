module.exports = (client) => {

	const activities_list = ["Suggestions", client.guilds.size + " Servers", client.users.size + " Users"];

	client.user.setActivity('Suggestions', {
		type: 'WATCHING'
	});

	setInterval(updateStatus, 10 * 500);

	console.log("\n---=[Events & Commands has been loaded succesfully!]=---");

	function updateStatus() {
		const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
		client.user.setActivity(activities_list[index], {
			type: 'WATCHING'
		});
	}

}