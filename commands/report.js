const { botCache } = require('../structures/cache')
const { createId } = require('../utils')

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

        const repId = createId('r_')
    }
})