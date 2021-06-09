const { botCache } = require('../structures/cache')

botCache.commands.set('suggest', {
    desc: 'Create a suggestion',
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})