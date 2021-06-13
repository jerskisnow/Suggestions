const { promises } = require('fs')
const { Client } = require('discord.js')
const config = require('./config')

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
    // ...

    // Cache the application, we'll use this for getting application owner id later on
    await client.application?.fetch()
}

prepareCache()

client.login(config.botToken)