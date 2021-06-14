const { botCache } = require('../structures/cache')

botCache.commands.set('blacklist', {
    desc: 'Prevent someone from submitting suggestions & reports',
    isPremium: true,
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})