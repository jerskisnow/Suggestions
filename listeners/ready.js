const { promises } = require('fs')
const { botCache } = require('../structures/cache')
const config = require('../config')

module.exports = async function (client) {
    // TODO: Botlist Apis

    setInterval(async function () {
        const guilds_result = await client.shard.fetchClientValues('guilds.cache.size')
        const guildCount = guilds_result.reduce((prev, count) => prev + count, 0)

        await client.user.setActivity(`${guildCount} guilds on ${client.shard.count} shards.`, {
            type: 'WATCHING'
        })
    }, 15 * 60 * 1000)

    await registerCommands(client)

    console.log('Fully started.')
}

async function registerCommands(client) {
    if (!client.application?.owner) await client.application?.fetch()
        (await promises.readdir('./commands')).forEach(file => require(`../commands/${file}`))

    const list = []
    for (let [key, value] of botCache.commands) {
        const data = {
            name: key,
            description: value.desc
        }
        if (value.options != null) data.options = value.options

        list.push(data)
    }

    // TODO: Set right permissions for the commands here
    if (config.devBuild) await client.guilds.cache.get(config.devGuild)?.commands.set(list)
    else await client.application?.commands.set(list)
}

module.exports.once = true