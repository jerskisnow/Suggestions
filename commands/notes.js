const { botCache } = require('../structures/cache')

botCache.commands.set('notes', {
    desc: 'Save a note, list your notes and read your notes (DM Only)',
    isPremium: true,
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})