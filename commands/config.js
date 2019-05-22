const { RichEmbed } = require('discord.js');
const path = require('path');
const utf8 = require('utf8');
const utils = require('../utils');

exports.run = async (client, message, language, prefix, args) => {

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
    if (args.length !== 2) return message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.errorTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.incorrectArguments)
        .addField(language.exampleTitle, prefix + "config channel #suggestions", false)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

    let channelInput = args[1];
    var newChannelObject;

    if (channelInput.indexOf('<#') > -1 || !isNaN(channelInput))
    {
      newChannelObject = client.channels.get(utils.stripChannelInput(channelInput));
    }
    else
    {
      newChannelObject = client.channels.find(chn => chn.name === channelInput);
    }

    await client.dbConnection.query('UPDATE configurations SET channel = ? WHERE id = ?', [newChannelObject.id, message.guild.id]);

    message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.updatedConfigurationTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.updatedChannel.replace(/<ChannelName>/g, newChannelObject.name).replace(/<ChannelID>/g, newChannelObject.id))
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

  }
  else if (args[0].toLowerCase().indexOf("language") > -1)
  {
    if (args.length !== 2) return message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.errorTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.incorrectArguments)
        .addField(language.exampleTitle, prefix + "config language en_US", false)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

    let newLanguage = args[1];

    // [LANGUAGE MESSAGE]
    if (newLanguage !== "en_US" && newLanguage !== "nl_NL") return message.channel.send({
			embed: new RichEmbed()
			  .setAuthor(language.errorTitle, client.user.avatarURL)
				.setColor(process.env.EMBED_COLOR)
				.setDescription(language.invalidLanguage.replace(/<Languages>/g, "en_US, nl_NL"))
				.setTimestamp()
				.setFooter(process.env.EMBED_FOOTER)
		});

    await client.dbConnection.query('UPDATE configurations SET language = ? WHERE id = ?', [newLanguage, message.guild.id]);

    message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.updatedConfigurationTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.updatedLanguage.replace(/<Language>/g, newLanguage))
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });

  }
  else if (args[0].toLowerCase().indexOf("autodeletesuggestions") > -1)
  {
    message.channel.send({
      embed: new RichEmbed()
        .setAuthor(language.comingSoonTitle, client.user.avatarURL)
        .setColor(process.env.EMBED_COLOR)
        .setDescription(language.comingSoon)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER)
    });
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
