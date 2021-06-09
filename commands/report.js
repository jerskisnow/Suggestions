const { botCache } = require('../structures/cache')

botCache.commands.set('report', {
    desc: 'Create a report',
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})