import { Client } from 'discord.js-light';
import { promises as fs } from 'fs';
import botCache from './structures/BotCache';
import PostgreSQL from './structures/PostgreSQL';
import Redis from './structures/Redis';
import { unCacheGuild } from './managers/ServerData';

const client = new Client({
    cacheGuilds: true,
    cacheRoles: true,
    fetchAllMembers: false,
    disabledEvents: [
        'channelCreate',
        'channelDelete',
        'channelPinsUpdate',
        'channelUpdate',
        'emojiCreate',
        'emojiDelete',
        'emojiUpdate',
        'guildBanAdd',
        'guildBanRemove',
        'guildIntegrationsUpdate',
        'guildMemberAdd',
        'guildMemberAvailable',
        'guildMemberRemove',
        'guildMembersChunk',
        'guildMemberSpeaking',
        'guildMemberUpdate',
        'guildUnavailable',
        'guildUpdate',
        'invalidated',
        'inviteCreate',
        'inviteDelete',
        'messageDeleteBulk',
        'messageReactionRemove',
        'messageReactionRemoveAll',
        'messageReactionRemoveEmoji',
        'messageUpdate',
        'presenceUpdate',
        'rateLimit',
        'roleCreate',
        'roleDelete',
        'roleUpdate',
        'typingStart',
        'userUpdate',
        'voiceStateUpdate',
        'webhookUpdate'
    ],
    partials: ['MESSAGE', 'REACTION']
});

(async () => {
    botCache.config = JSON.parse((await fs.readFile('../config.json')).toString());

    const lFiles = await fs.readdir('../languages/');
    for (let i = 0; i < lFiles.length; i++) {
        const lObject = JSON.parse((await fs.readFile(`../languages/${lFiles[i]}`)).toString());
        botCache.languages.set(
            lObject.name,
            JSON.parse((await fs.readFile(`../languages/${lFiles[i]}`)).toString())
        )
    }

    await PostgreSQL.setupPool();
    await Redis.setupClient();

    (await fs.readdir('./listeners/')).forEach((file: any) =>
        client.on(file.split('.')[0], require(`./listeners/${file}`).default.bind(null, client))
    );

    client.on('guildDelete', async (g) => await unCacheGuild(g.id, true));

    if (botCache.config.advancedLogging) {
        client.on("error", (e) => console.error(e));
        client.on("warn", (e) => console.warn(e));
        client.on("debug", (e) => console.info(e));
    }

    (await fs.readdir('./commands/suggestions/')).forEach((file: any) => require(`./commands/suggestions/${file}`));
    (await fs.readdir('./commands/reports/')).forEach((file: any) => require(`./commands/reports/${file}`));
    (await fs.readdir('./commands/configuration/')).forEach((file: any) => require(`./commands/configuration/${file}`));
    (await fs.readdir('./commands/support/')).forEach((file: any) => require(`./commands/support/${file}`));

    await client.login(botCache.config.token);
})();