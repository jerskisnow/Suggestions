const DBL = require('dblapi.js');
const { RichEmbed } = require('discord.js');

exports.run = async (client) => {

  if (process.env.APIS_DBL_TOKEN.length === 0 || process.env.APIS_DBL_WEBHOOK_PORT.length === 0 || process.env.APIS_DBL_WEBHOOK_AUTH.length === 0) return console.log("\nCouldn't connect to the dbl api! (No login credentials provided)");

  const dbl = new DBL(
    process.env.APIS_DBL_TOKEN, {
     webhookPort: process.env.APIS_DBL_WEBHOOK_PORT,
     webhookAuth: process.env.APIS_DBL_WEBHOOK_AUTH,
     webhookPath: process.env.APIS_DBL_WEBHOOK_PATH
   }, client);

  dbl.webhook.on('ready', (hook) => {
    console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
  });

  let logChannel = client.channels.get(process.env.CHANNELS_LOG);

  dbl.webhook.on('vote', async (res) => {

    var weekendString = "No"; // false

    if (res.isWeekend)
     {
       weekendString = "Yes"; // true
     }

    try
    {
      if (!logChannel) return;
      logChannel.send({
        embed: new RichEmbed()
          .setAuthor("Suggestions - Vote", client.user.avatarURL)
          .setColor(process.env.EMBED_COLOR)
          .setDescription(`Api: dbl (discordbots.org)\nUser: ${client.users.get(res.user).tag} (${res.user})\nWeekend: ${weekendString}`)
          .setTimestamp()
          .setFooter(process.env.EMBED_FOOTER)
      });
    }
    catch (err) { /* throw err; */}

  });

}
