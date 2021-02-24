import { Client, Guild, MessageEmbed } from 'discord.js-light';
import PostgreSQL from '../structures/PostgreSQL';
import botCache from '../structures/BotCache';
import { getServerCount } from '../managers/ServerData';

export default async (client: Client, guild: Guild): Promise<void> => {

    // Insert the new server into the database to take away some pressure of guild registration in the cache function.
    await PostgreSQL.runQuery('INSERT INTO servers (id, prefix, language) VALUES ($1::text, $2::text, $3::text)', [guild.id, botCache.config.prefix, botCache.config.language]);

    const guildCount = await getServerCount(client);
    const guildOwner = await guild.members.fetch(guild.ownerID);

    const embed: MessageEmbed = new MessageEmbed()
        .setColor(botCache.config.colors.blue)
        .setTitle("Suggestions - New Guild")
        .setDescription(`Suggestions is now in ${guildCount} guilds.`)
        .addField(
            "GuildInfo",
            `**Name:** ${guild.name}\n**ID:** ${guild.id}\n**Membercount:** ${guild.memberCount}\n**Region:** ${guild.region}`,
            false
        )
        .addField("OwnerInfo", `**Name:** ${guildOwner.user.tag}\n**ID:** ${guild.id}`, false)

    await client.channels.forge(botCache.config.channels.devLogs).send({embed: embed});

}