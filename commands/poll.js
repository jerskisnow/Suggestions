const { botCache } = require('../structures/cache')
const { createId } = require('../utils')

botCache.commands.set('poll', {
    desc: 'Create a poll',
    isPremium: true,
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')

        const pollId = createId('p_')
    }
})