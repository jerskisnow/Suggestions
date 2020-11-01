import { Client } from 'discord.js';
import { readdir } from 'fs';
import PostgreSQL from "./structures/PostgreSQL";
import Redis from "./structures/Redis";

// Instantiate the client
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

// Enable advanced logging, if enabled
if (process.env.ADVANCED_LOGS === 'true') {
    client.on("error", (e) => console.error(e));
    client.on("warn", (e) => console.warn(e));
    client.on("debug", (e) => console.info(e));
    client.on('shardError', (e) => console.error(e));
}

// Setup the the PostgreSQL pool and Redis client
PostgreSQL.setupPool();
Redis.setupClient();

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