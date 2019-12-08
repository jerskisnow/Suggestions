import TopGG from 'dblapi.js';
import cliColors from '../structures/CLIColors';
import { RichEmbed } from 'discord.js';

export default async (client) => {

    const topgg = new TopGG(process.env.APIS_TOPGG_TOKEN, {
        webhookPort: process.env.APIS_TOPGG_WEBHOOK_PORT,
        webhookAuth: process.env.APIS_TOPGG_WEBHOOK_AUTH,
        webhookPath: process.env.APIS_TOPGG_WEBHOOK_PATH,
    }, client);

    topgg.webhook.on("ready", (hook) => {
        console.log(cliColors.FgCyan + `\nWebhook running at http://${hook.hostname}:${hook.port}${hook.path}` + cliColors.Reset);
    });

    topgg.webhook.on("vote", (vote) => {

        client.channels.get(process.env.CHANNELS_VOTELOG).send({
            embed: new RichEmbed()
                .setAuthor("Suggestions - Vote", client.user.avatarURL)
                .setColor(process.env.EMBED_COLOR)
                .setDescription(`Api: TopGG (top.gg)\nUser: ${client.users.get(vote.user).tag} (${vote.user})\nWeekend: ${vote.isWeekend ? "yes" : "no"}`)
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

    });

    setInterval(() => {
        topgg.post.postStats(client.guilds.size, client.shard.id, client.shards.total)
    }, 1800000)

}
