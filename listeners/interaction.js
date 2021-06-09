const { botCache } = require('../structures/cache')
const { getFromCache } = require('../structures/cache')

module.exports = async function(client, interaction) {
    if (!interaction.isCommand()) return;

    if (botCache.commands.has(interaction.commandName)) {
        const obj = botCache.commands.get(interaction.commandName)

        if (obj.isPremium) {
            const data = await getFromCache(interaction.guildID)
            if (!data.isPremium) {
                interaction.reply('That command is for premium servers only.')
                return
            }
        }

        obj.exec(client, interaction)
    }
}