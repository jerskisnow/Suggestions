import { dbConnection } from '../structures/MySQL';
import { RichEmbed } from 'discord.js';

module.exports = async (client, guild) => {

    // Get the id of this guild from the MySQL databse
    await dbConnection.query("SELECT id FROM configurations WHERE id = ?", [guild.id], (err, res) => {
        // Check if the guild isn't registered
        if (!res.length)
            // Insert a new entry for this guild into the database
            dbConnection.query("INSERT INTO configurations SET ?", { id: guild.id });
    });

    // Predefine the invite code
    let inviteCode;

    // Group the ids of the text channels
    const textChannelIDS = guild.channels
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
        const chn = client.channels.get(tcArray[0]);

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

    // Send the 'New Guild' message
    client.channels.get(process.env.CHANNELS_GUILDLOG).send({
        embed: new RichEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle("Suggestions - New Guild")
            .addField(
                "GuildInfo",
                `**Name:** ${guild.name}\n**ID:** ${guild.id}\nMembercount: ${guild.memberCount}\n**Region:** ${guild.region}\nInvite: ${inviteCode}`,
                false
            )
            .addField("OwnerInfo", `**Name:** ${guild.owner.user.tag}\n**ID:** ${guild.ownerID}`, false)
            .addField(
                "Other Information",
                `Suggestions is now in \`${client.guilds.size}\` guilds and those contain \`${client.users.size}\` members and \`${client.channels.size}\` channels!`,
                false
            )
            .setTimestamp()
            .setFooter(process.env.EMBED_FOOTER)
    });

};
