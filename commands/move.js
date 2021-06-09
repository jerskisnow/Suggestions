const { botCache } = require('../structures/cache')

botCache.commands.set('move', {
    desc: 'Move a suggestion or report',
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})