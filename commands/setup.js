const { botCache } = require('../structures/cache')

botCache.commands.set('setup', {
    desc: 'Setup the bot',
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})