const { botCache, getFromCache } = require('../structures/cache')
const { createId } = require('../utils')

botCache.commands.set('suggest', {
    desc: 'Create a suggestion',
    options: [
        {
            name: 'description',
            type: 'STRING',
            description: 'A detailed description of your suggestions',
            required: true
        }
    ],
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')

        const sugId = createId('s_')
    }
})