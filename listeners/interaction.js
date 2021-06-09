const { botCache } = require('../structures/cache')
const { getFromCache } = require('../structures/cache')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const config = require('../config')

module.exports = async function (client, interaction) {
    if (!interaction.isCommand()) return;

    if (botCache.commands.has(interaction.commandName)) {
        const obj = botCache.commands.get(interaction.commandName)

        if (obj.isPremium) {
            const data = await getFromCache(interaction.guildID)
            if (!data.isPremium) {
                const row = new MessageActionRow().addComponents(new MessageButton()
                    .setURL('https://github.com/jerskisnow/Suggestions/wiki/Donating')
                    .setLabel('Donating')
                    .setEmoji('💰')
                    .setStyle('LINK'))

                const embed = new MessageEmbed()
                embed.setColor(config.embedColor.r)
                embed.setTitle('Premium Command')
                embed.setDescription("The command you tried to use is only for premium servers. See the button below for more information.")

                await interaction.reply({ embeds: [embed], components: [row] })
                return
            }
        }

        obj.exec(client, interaction)
    }
}