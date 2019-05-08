const { RichEmbed } = require('discord.js');
const path = require('path');

exports.run = async (client, message, language, prefix, args) => {

  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({
    embed: new RichEmbed()
      .setAuthor(language.errorTitle, client.user.avatarURL)
      .setColor(process.env.EMBED_COLOR)
      .setDescription(language.noPermission)
      .setTimestamp()
      .setFooter(process.env.EMBED_FOOTER)
  });

  if (args.length < 2) return message.channel.send({
    embed: new RichEmbed()
      .setAuthor(language.errorTitle, client.user.avatarURL)
      .setColor(process.env.EMBED_COLOR)
      .setDescription(language.missingArguments)
      .addField(language.exampleTitle, language.approveExample
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

    if (result[0].status === "approved") return message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.errorTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.alreadyApproved)
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
      let sAuthor = client.users.get(result[0].author);
      let sDesc = result[0].description;

      const msg = await sChannel.fetchMessage(result[0].message);

      await msg.edit({
        embed: new RichEmbed()
					.setAuthor(language.newSuggestionTitle.replace(/<User>/g, sAuthor.tag), sAuthor.avatarURL)
					.setColor(process.env.EMBED_COLOR_APPROVED)
					.setDescription(language.newSuggestionDescription.replace(/<Description>/g, sDesc).replace(/<Status>/g, "Approved"))
					.setTimestamp()
					.setFooter(language.newSuggestionFooter.replace(/<SuggestionID>/g, sID))
      });

      await client.dbConnection.query('UPDATE suggestions SET status = ? WHERE id = ?', ['Approved', sID]);

      let aReason = args.slice(1).join(" ");

      try
      {
        sAuthor.send({
          embed: new RichEmbed()
            .setAuthor(language.approvedTitle, client.user.avatarURL)
            .setColor(process.env.EMBED_COLOR)
            .setDescription(language.approvedDescription.replace(/<GuildName>/g, message.guild.name).replace(/<Reason>/g, aReason))
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
        });
      }
      catch (err) { /* throw err; */ }

      message.channel.send({
        embed: new RichEmbed()
          .setAuthor(language.approvedSuggestionTitle, client.user.avatarURL)
          .setColor(process.env.EMBED_COLOR)
          .setDescription(language.approvedSuggestion.replace(/<SuggestionID>/g, sID))
          .setTimestamp()
          .setFooter(process.env.EMBED_FOOTER)
      });

    });

  });

}
