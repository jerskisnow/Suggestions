import { Client } from 'discord.js';
import { readdir } from 'fs';

import PostgreSQL from './structures/PostgreSQL';
import Redis from './structures/Redis';

import Command from './types/Command';

// Instantiate the client
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

// We create the botcache here so it doesn't get created multiple times due to the sharding
export const botCache = {
    commands: new Map<string, Command>(),
    languages: new Map<string, any>()
}

// Enable advanced logging, if enabled
if (process.env.ADVANCED_LOGS === 'true') {
    client.on("error", (e) => console.error(e));
    client.on("warn", (e) => console.warn(e));
    client.on("debug", e => console.info(e));
    client.on('shardError', e => console.error(e));
}

// Setup the the PostgreSQL pool and Redis client
PostgreSQL.setupPool();
Redis.setupClient();

// Initiate all command files, which basically means that they will execute and get added to the bot cache
readdir('./commands/', (_err, files) =>
    files.forEach(file => require(`./commands/${file}`))
);

// Store all languages including the imports in the bot cache
readdir('./languages/', (_err, files) =>
    files.forEach(file =>
        botCache.languages.set(
            file.split(".")[0], require(`./languages/${file}`).default
        )
    )
);

// Register all listeners to the client
readdir('./listeners/', (_err, files) =>
    files.forEach(file =>
        client.on(file.split(".")[0],
            require(`./listeners/${file}`).default.bind(null, client)
        )
    )
)

// Login with the token
client.login(process.env.CLIENT_TOKEN);