const { botCache } = require('../structures/cache')

botCache.commands.set('setstatus', {
    desc: 'Change the status of a suggestion or report',
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})