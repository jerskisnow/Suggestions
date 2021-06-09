const { botCache } = require('../structures/cache')

botCache.commands.set('graph', {
    desc: 'Obtain a graph of the suggestions/reports in this server',
    isPremium: true,
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})