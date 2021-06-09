const redis = require('redis')
const bluebird = require('bluebird')
const config = require('../config')

const { runQuery, registerGuild } = require('../structures/database')

module.exports.botCache = {
    commands: new Map(),
    lstSugId: 0,
    lstRepId: 0
}

bluebird.promisifyAll(redis)
const redisClient = redis.createClient()
module.exports.redisClient = redisClient

async function cacheGuild (guildId) {
    let result = await runQuery('SELECT staff_role, approve_emoji, reject_emoji, auto_approve, auto_reject, premium FROM servers WHERE id = $1::text', [guildId])

    if (!result.rowCount) {
        // Register guild in database if it doesn't already exist
        await runQuery('INSERT INTO servers (id, premium) VALUES ($1::text, $2::bool)', [guildId, false])
        result.rows = [{ premium: false }]
    }

    const data = {
        staffRole: result.rows[0].staff_role,
        approveEmoji: result.rows[0].approve_emoji || '⬆️',
        rejectEmoji: result.rows[0].reject_emoji || '⬇️',
        autoApprove: result.rows[0].auto_approve || -1,
        autoReject: result.rows[0].auto_reject || -1,
        isPremium: result.rows[0].premium
    }

    await redisClient.setAsync(guildId, JSON.stringify(data), 'EX', 60 * 60 * config.cacheExpireTime)
    return data
}

module.exports.getFromCache = async function (guildId) {
    if (await redisClient.existsAsync(guildId)) {
        return JSON.parse(await redisClient.getAsync(guildId))
    }

    return await cacheGuild(guildId)
}

module.exports.setInCache = async function (guildId, newData) {
    if (!await redisClient.existsAsync(guildId)) {
        await cacheGuild(guildId)
    }

    await redisClient.setAsync(guildId, JSON.stringify(newData), 'EX', 60 * 60 * config.cacheExpireTime)
}

module.exports.removeFromCache = async function (guildId) {
    if (await redisClient.existsAsync(guildId)) {
        await redisClient.delAsync(guildId)
    }
}