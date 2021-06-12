const { botCache } = require('../structures/cache')

botCache.commands.set('report', {
    desc: 'Create a report',
    options: [
        {
            name: 'description',
            type: 'STRING',
            description: 'A detailed description of your report',
            required: true
        }
    ],
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})