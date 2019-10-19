import { RichEmbed } from 'discord.js';

const reportArray = new Array();

export default async (client, message, language, prefix, args) => {

	if (args.length === 0) return message.channel.send({
		embed: new RichEmbed()
		.setAuthor(language.reportBugTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.reportBugUsage)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
	});

	if (reportArray.includes(message.author.id)) return message.channel.send({
		embed: new RichEmbed()
		.setAuthor(language.reportBugTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.reportCooldownActive)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
	});

	await message.channel.send({
		embed: new RichEmbed()
		.setAuthor(language.reportBugTitle, message.author.avatarURL)
		.setColor(process.env.EMBED_COLOR)
		.setDescription(language.reportBugSuccess)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
	});

	await reportArray.push(message.author.id);

	client.channels.get(process.env.CHANNELS_REPORTBUG).send({
		embed: new RichEmbed()
		.setAuthor("New Bug Report", message.author.avatarURL)
		.setColor(process.env.EMBED_COLOR)
		.addField("Reporter", `${message.author.tag} (${message.author.id})`, false)
		.addField("Description", args.slice(0).join(" "))
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
	});

	setTimeout(() => {
		reportArray.splice(reportArray.indexOf(message.author.id), 1);
	}, 1000 * 60 /* 3 hours */);

}