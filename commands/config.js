const { RichEmbed } = require('discord.js');
const utf8 = require('utf8');

exports.run = async (client, message, language, prefix args) => {

  // Check if user has the administrator permission, if not return a message
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({
    embed: new RichEmbed()
      .setAuthor(language.errorTitle, client.user.avatarURL)
      .setColor(process.env.EMBED_COLOR)
      .setDescription(language.noPermission)
      .setTimestamp()
      .setFooter(process.env.EMBED_FOOTER)
  });

  /*
  $config prefix <NewPrefix>
  $config channel <NewChannel>
  $config language <NewLanguage>
  $config autodeletesuggestions <TimeInSeconds>
  */

  if (args.length === 0) return message.channel.send({
    embed: new RichEmbed()
      .setAuthor(language.errorTitle, client.user.avatarURL)
      .setColor(process.env.EMBED_COLOR)
      .setDescription(language.missingArguments)
      .addField(language.usageTitle, language.configUsage
        .replace(/<Prefix>/g, prefix)
        .replace(/<Command>/g, path.basename(__filename, '.js')), false)
      .addField(language.optionsTitle, "prefix, channel, language, autodeletesuggestions")
      .setTimestamp()
      .setFooter(process.env.EMBED_FOOTER)
  });

  if (args[0].toLowerCase().indexOf("prefix") > -1)
  {
    if (args.length !== 2) return message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.errorTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.incorrectArguments)
        .addField(language.exampleTitle, prefix + "config prefix &", false)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

    let newPrefix = utf8.encode(args[1]);

    await client.dbConnection.query('UPDATE configurations SET prefix = ? WHERE id = ?', [newPrefix, message.guild.id]);

    message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.updatedConfigurationTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.updatedPrefix.replace(/<Prefix>/g, args[1]))
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

  }
  else if (args[0].toLowerCase().indexOf("channel") > -1)
  {
    // ...
  }
  else if (args[0].toLowerCase().indexOf("language") > -1)
  {
    // ...
  }
  else if (args[0].toLowerCase().indexOf("autodeletesuggestions") > -1)
  {
    // ...
  }
  else
  {
    message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.errorTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.missingArguments)
        .addField(language.usageTitle, language.configUsage
          .replace(/<Prefix>/g, prefix)
          .replace(/<Command>/g, path.basename(__filename, '.js')), false)
        .addField(language.optionsTitle, "prefix, channel, language, autodeletesuggestions")
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });
  }

}
