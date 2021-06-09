const { ShardingManager } = require('discord.js')
const config = require('./config')

const manager = new ShardingManager('app.js', { token: config.botToken })

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`))
manager.spawn()