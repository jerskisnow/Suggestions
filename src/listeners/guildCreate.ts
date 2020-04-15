import { Client, Guild, MessageEmbed } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';
import cache from 'memory-cache';
import botStatus from '../structures/BotStatus';

export default async (client: Client, guild: Guild) => {

    if (!botStatus.isRunning()) return;

    const pgClient = new PostgreSQL().getClient();

    await pgClient.connect();

    if (cache.get(guild.id) === null) {

        await pgClient.query('INSERT INTO servers (id, prefix, language) VALUES ($1::text, $2::text, $3::text)', [guild.id, process.env.COMMAND_PREFIX, process.env.DEFAULT_LANGUAGE]);

        cache.put(guild.id, {
            prefix: process.env.COMMAND_PREFIX,
            language: process.env.DEFAULT_LANGUAGE,
            auto_approve: null as any,
            auto_reject: null as any,
            delete_approved: null as any,
            delete_rejected: null as any
        });
    }

    await pgClient.end();

    // Predefine the invite code
    let inviteCode;

    // Group the ids of the text channels
    const textChannelIDS = guild.channels.cache
        .filter((chn) => chn.type === "text" && !chn.deleted)
        .map((g) => g.id)
        .join("-");

    // Split the ids of the text channels into an array
    const tcArray = textChannelIDS.split("-");

    // Check if the length of the array is 0
    if (tcArray.length === 0)
        // Set the inviteCode to an 'failed_to_resolve' string
        inviteCode = "failed_to_resolve_invite";
    // Else if the length of the array isn't 0
    else {
        // Get the channel
        const chn = guild.channels.cache.get(tcArray[0]);

        // Check if the channel is valid
        if (chn) {
            // Create an invite for the guild
            const invite = await chn.createInvite();
            // Set the inviteCode to the url of the created invite
            inviteCode = invite.url;
        }
        // Else if the channel isn't valid
        else
            // Set the inviteCode to an 'failed_to_resolve' string
            inviteCode = "failed_to_resolve_invite";
    }

    const guilds_result = await client.shard.fetchClientValues('guilds.cache.size');
    const users_result = await client.shard.fetchClientValues('users.cache.size');
    const channels_result = await client.shard.fetchClientValues('channels.cache.size');

    const guildCount = guilds_result.reduce((prev, count) => prev + count, 0);
    const userCount = users_result.reduce((prev, count) => prev + count, 0);
    const channelCount = channels_result.reduce((prev, count) => prev + count, 0);

    const stringEmbed = JSON.stringify(
        new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle("Suggestions - New Guild")
            .addField(
                "GuildInfo",
                `**Name:** ${guild.name}\n**ID:** ${guild.id}\n**Membercount:** ${guild.memberCount}\n**Region:** ${guild.region}\n**Invite:** ${inviteCode}`,
                false
            )
            .addField("OwnerInfo", `**Name:** ${guild.owner.user.tag}\n**ID:** ${guild.ownerID}`, false)
            .addField(
                "Other Information",
                `Suggestions is now in \`${guildCount}\` guilds and those contain \`${userCount}\` members and \`${channelCount}\` channels.`,
                false
            )
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    ).replace(/'/g, "\'");

    client.shard.broadcastEval(`
        const channel = this.channels.cache.get('${process.env.CHANNELS_LOGS}');
        const embed = JSON.parse('${stringEmbed}');
        channel.send({ embed: embed });
    `);

}
