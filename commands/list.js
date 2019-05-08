const { RichEmbed } = require('discord.js');

exports.run = async (client, message, language, prefix) => {

  client.dbConnection.query("SELECT * FROM suggestions WHERE guild = ? AND Status = 'Open'", [message.guild.id], async (err, res) => {

    client.dbConnection.query('SELECT channel FROM configurations WHERE id = ?', [message.guild.id], async (cfErr, cfRes) => {

      const listEmbed = new RichEmbed()
        .setAuthor(language.suggestionListTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.suggestionListDescription)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER);

      for (var i = 0; i < res.length; i++)
      {
        listEmbed.addField(
          language.newSuggestionTitle.replace(/<User>/g,client.users.get(res[i].author).tag),
          language.suggestionListingDescription
            .replace(/<Description>/g, res[i].description)
            .replace(/<SuggestionID>/g, res[i].id)
            .replace(/<SuggestionURL>/g, `https://canary.discordapp.com/channels/${res[i].guild}/${cfRes[0].channel}/${res[i].message}`),
          false);
      }

      message.channel.send({embed: listEmbed});

    });

  });

}
