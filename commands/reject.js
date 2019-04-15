const { RichEmbed } = require('discord.js');
const path = require('path');

exports.run = (client, message, language, prefix, args) => {

  if (args.length < 2) return message.channel.send({
    embed: new RichEmbed()
      .setAuthor(language.errorTitle, client.user.avatarURL)
      .setColor(process.env.EMBED_COLOR)
      .setDescription(language.missingArguments)
      .addField(language.exampleTitle, language.rejectExample
        .replace(/<Prefix>/g, prefix)
        .replace(/<Command>/g, path.basename(__filename, '.js')), false)
      .setTimestamp()
      .setFooter(process.env.EMBED_FOOTER)
  });

  let sID = args[0];

  client.dbConnection.query('SELECT * FROM suggestions WHERE id = ?', [sID], async (error, result) => {
    if (error || result.length === 0 || result[0].message === null) return message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.errorTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.invalidSuggestion)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

    if (result[0].status === "rejected") return message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.errorTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.alreadyRejected)
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

      let sChannel = client.channels.get(res[0].channel);
      let sAuthor = client.users.get(res[0].author);
      let sDesc = result[0].description;

      const msg = await sChannel.fetchMessage(result[0].channel);

      await msg.edit({
        embed: new RichEmbed()
					.setAuthor(language.newSuggestionTitle.replace(/<User>/g, sAuthor.tag), sAuthor.avatarURL)
					.setColor(process.env.EMBED_COLOR_REJECTED)
					.setDescription(language.newSuggestionDescription.replace(/<Description>/g, sDesc).replace(/<Status>/g, "Rejected"))
					.setTimestamp()
					.setFooter(language.newSuggestionFooter.replace(/<SuggestionID>/g, sID))
      });

      client.dbConnection.query('UPDATE suggestions SET status = ? WHERE id = ?', ['Rejected', sID]);

      let aReason = args.slice(1).join(" ");

      try
      {
        sAuthor.send({
          embed: new RichEmbed()
            .setAuthor(language.approvedTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.rejectedDescription.replace(/<GuildName>/g, message.guild.name).replace(/<Reason>/g, aReason)))
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
        });
      }
      catch (err) { // throw err; }

    });

  });

}
