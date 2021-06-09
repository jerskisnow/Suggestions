const { promises } = require('fs')
const { Client } = require('discord.js')
const config = require('./config')
const { runQuery } = require('./structures/database')
const { botCache } = require('./structures/cache')

const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES'],
    partials: ['MESSAGE', 'REACTION']
})

async function bindListeners() {
    (await promises.readdir('./listeners')).forEach(file => {
        const obj = require(`./listeners/${file}`)
        if (obj.once) {
            client.once(file.split('.')[0], obj.bind(null, client))
        } else {
            client.on(file.split('.')[0], obj.bind(null, client))
        }
    })
}

bindListeners()

async function updateBotCache() {
    const sugRes = await runQuery('SELECT id FROM suggestions ORDER BY id DESC LIMIT 1');
    botCache.lstSugId = !idResult.rows.length ? 1 : 1 + idResult.rows[0].id;

    const repRes = await runQuery('SELECT id FROM reports ORDER BY id DESC LIMIT 1');
    botCache.lstRepId = !idResult.rows.length ? 1 : 1 + idResult.rows[0].id;
}

updateBotCache()

client.login(config.botToken);