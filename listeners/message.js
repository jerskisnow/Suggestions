const { removeFromCache, setInCache, getFromCache } = require('../structures/cache')
const { runQuery } = require('../structures/database')

module.exports = async function (client, message) {
    if (message.author.id !== client.application?.owner.id) return

    if (!message.content.startsWith('^^&')) return
    const arr = message.content.split('&')[1].split(' ') // [0 = cmd, 1 = arg, 2 = arg, ...]

    // =====================================
    if (arr[0] === 'delcache') {
        let guildId = message.guild.id
        if (arr.length > 1) {
            guildId = arr[1]
        }
        await removeFromCache(message.guild.id)
        message.reply(`Removed guild (\`${guildId}\`) from the cache!`)
    }
    // =====================================
    if (arr[0] === 'delguild') {
        let guildId = message.guild.id
        if (arr.length > 1) {
            guildId = arr[1]
        }
        await removeFromCache(message.guild.id)
        await runQuery('DELETE FROM servers WHERE id = $1::text', [guildId])
        message.reply(`Removed guild (\`${guildId}\`) from the cache & database!`)
    }
    // =====================================
    if (arr[0] === 'addpremium') {
        let guildId = message.guild.id
        if (arr.length > 1) {
            guildId = arr[1]
        }
        await runQuery('UPDATE servers SET premium = $1::bool WHERE id = $2::text', [true, guildId])
        var obj = await getFromCache(guildId)
        obj.isPremium = true
        await setInCache(guildId, obj)
        message.reply(`Made guild (\`${guildId}\`) a premium guild!`)
    }
    // =====================================
    if (arr[0] === 'rempremium') {
        let guildId = message.guild.id
        if (arr.length > 1) {
            guildId = arr[1]
        }
        await runQuery('UPDATE servers SET premium = $1::bool WHERE id = $2::text', [false, guildId])
        var obj = await getFromCache(guildId)
        obj.isPremium = false
        await setInCache(guildId, obj)
        message.reply(`Guild (\`${guildId}\`) is no longer a premium guild!`)
    }
    // =====================================

}