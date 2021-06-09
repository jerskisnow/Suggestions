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

async function prepareCache() {
    // Add the latest suggestion id to the botcache
    const sugRes = await runQuery('SELECT id FROM suggestions ORDER BY id DESC LIMIT 1')
    botCache.lstSugId = !sugRes.rowCount ? 1 : 1 + sugRes.rows[0].id

    // Add the latest report id to the botcache
    const repRes = await runQuery('SELECT id FROM reports ORDER BY id DESC LIMIT 1')
    botCache.lstRepId = !repRes.rowCount ? 1 : 1 + repRes.rows[0].id

    // Cache the application, we'll use this for getting application owner id later on
    await client.application?.fetch()
}

prepareCache()

client.login(config.botToken)