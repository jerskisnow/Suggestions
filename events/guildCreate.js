const {
	RichEmbed
} = require('discord.js');

module.exports = (client, guild) => {

	client.dbConnection.query('SELECT * FROM configurations WHERE id = ?', [guild.id], (err, result) => {

		if (!result.length) {
			var post = {
				id: guild.id
			};
			client.dbConnection.query('INSERT INTO configurations SET ?', post);
		}

	});

	var inviteCode;
	let textChannelIDS = guild.channels.filter(chn => chn.type === 'text' && !chn.deleted).map(g => g.id).join('-');
	let tcArray = textChannelIDS.split('-');

	if (tcArray.length === 0) {
		inviteCode = "failed_to_resolve_invite";
	} else {
		let potentationChannel = client.channels.get(tcArray[0]);
		if (!potentationChannel) {
			inviteCode = "failed_to_resolve_invite";
		} else {
			potentationChannel.createInvite().then(invite => {
				inviteCode = invite.url;
			}).catch(console.error);
		}
	}

	setTimeout(sendEmbed, 5000);

	function sendEmbed() {
		let logChannel = client.channels.get(process.env.CHANNELS_LOG);
		if (!logChannel) return;

		logChannel.send({
			embed: new RichEmbed()
				.setColor(process.env.EMBED_COLOR)
				.setTitle("Suggestions - New Guild")
				.addField("GuildInfo", `GuildName: ${guild.name}\nGuildID: ${guild.id}\nMembercount: ${guild.memberCount}\nGuildRegion: ${guild.region}\nInvite: ${inviteCode}`, false)
				.addField("OwnerInfo", `OwnerName: ${guild.owner.user.tag}\nOwnerID: ${guild.ownerID}`, false)
				.addField("Casual Information", `Suggestions is now in ${client.guilds.size} guilds and those contain ${client.users.size} members and ${client.channels.size} channels!`, false)
				.setTimestamp()
				.setFooter(process.env.EMBED_FOOTER)
		});
	}

}
