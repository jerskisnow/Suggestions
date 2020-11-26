import { Client, Guild, MessageEmbed } from 'discord.js';
import PostgreSQL from '../structures/PostgreSQL';
import botCache from '../structures/BotCache';

export default async (client: Client, guild: Guild): Promise<void> => {

    // Insert the new server into the database to take away some pressure of guild registration in the cache function.
    await PostgreSQL.runQuery('INSERT INTO servers (id, prefix, language) VALUES ($1::text, $2::text, $3::text)', [guild.id, botCache.config.prefix, botCache.config.language]);

    // Predefine the invite code.
    let inviteCode;

    // Group the ids of the text channels.
    const textChannelIDS = guild.channels.cache
        .filter((chn) => chn.type === "text" && !chn.deleted)
        .map((g) => g.id)
        .join("-");

    // Split the ids of the text channels into an array.
    const tcArray = textChannelIDS.split("-");

    // Check if the length of the array is 0.
    if (tcArray.length === 0)
        // Set the inviteCode to an 'failed_to_resolve' string.
        inviteCode = "failed_to_resolve_invite";
    // Else if the length of the array isn't 0.
    else {
        // Get the channel.
        const chn = guild.channels.cache.get(tcArray[0]);

        // Check if the channel is valid.
        if (chn) {
            // Create an invite for the guild.
            const invite = await chn.createInvite();
            // Set the inviteCode to the url of the created invite.
            inviteCode = invite.url;
        }
        // Else if the channel isn't valid.
        else
            // Set the inviteCode to an 'failed_to_resolve' string.
            inviteCode = "failed_to_resolve_invite";
    }

    const guilds_result = await client.shard.fetchClientValues('guilds.cache.size');
    const guildCount = guilds_result.reduce((prev, count) => prev + count, 0);

    const guildOwner = await guild.members.fetch(guild.ownerID);

    const embed: MessageEmbed = new MessageEmbed()
        .setColor(botCache.config.colors.blue)
        .setTitle("Suggestions - New Guild")
        .setDescription(`Suggestions is now in ${guildCount} guilds.`)
        .addField(
            "GuildInfo",
            `**Name:** ${guild.name}\n**ID:** ${guild.id}\n**Membercount:** ${guild.memberCount}\n**Region:** ${guild.region}\n**Invite:** ${inviteCode}`,
            false
        )
        .addField("OwnerInfo", `**Name:** ${guildOwner.user.tag}\n**ID:** ${guild.id}`, false)

    await client.shard.broadcastEval(`
        (async () => {
            const channel = await this.channels.cache.get('${botCache.config.channels.devLogs}');
            if (channel) {
                channel.send({ embed: ${JSON.stringify(embed)} });
            }
        })();
    `);

}