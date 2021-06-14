const { botCache, getFromCache } = require('../structures/cache')

botCache.commands.set('setstatus', {
    desc: 'Change the status of a suggestion or report',
    options: [
        {
            name: 'id',
            type: 4,
            description: 'The ID of the suggestion/report',
            required: true
        },
        {
            name: 'status',
            type: 3,
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
        const cacheObj = await getFromCache(interaction.guildID)
        if (cacheObj.staffRole == null) {
            await interaction.reply('Please ask an administrator to setup the staffrole!')
            return
        }
        if (!interaction.member.roles.cache.has(cacheObj.staffRole)) {
            await interaction.reply('You don\'t have the staffrole, that\' required for this command.')
            return
        }

        // ...
    }
})