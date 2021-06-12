const { botCache } = require('../structures/cache')

botCache.commands.set('setstatus', {
    desc: 'Change the status of a suggestion or report',
    options: [
        {
            name: 'id',
            type: 'INTERGER',
            description: 'The ID of the suggestion/report',
            required: true
        },
        {
            name: 'status',
            type: 'STRING',
            description: 'The desired status-action of the suggestion/report',
            required: true,
            choices: [
                {
                    name: 'approve',
                    value: 'approve'
                },
                {
                    name: 'reject',
                    value: 'reject'
                },
                {
                    name: 'consider',
                    value: 'consider'
                },
                {
                    name: 'resolve',
                    value: 'resolve'
                }
            ]
        }
    ],
    exec: async function (client, interaction) {
        await interaction.reply('Coming soon!')
    }
})