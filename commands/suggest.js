const { botCache } = require('../structures/cache')

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
    }
})