const { botCache } = require('../structures/cache')

botCache.commands.set('poll', {
    desc: 'Create a poll',
    isPremium: true,
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})