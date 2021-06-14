const { MessageEmbed } = require('discord.js')
const { botCache, getFromCache, setInCache } = require('../structures/cache')
const { runQuery } = require('../structures/database')
const config = require('../config')

botCache.commands.set('setup', {
    desc: 'Setup the required settings for Suggestions to work properly',
    exec: async function (client, interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            interaction.reply('You need to have the `ADMINISTRATOR` permission to use this command.')
            return
        }

        const filter = msg => msg.author.id === interaction.user.id

        const embed = new MessageEmbed()
            .setColor(config.embedColor.b)
            .setDescription('In which channel should suggestions show up? (Type: #channel)')

        await interaction.reply({ embeds: [embed] })

        const interChannel = interaction.guild.channels.cache.get(interaction.channelID)

        const chnAwait = await interChannel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
        await chnAwait.first().delete()

        const channelId = chnAwait.first().content.replace('<#', '').replace('>', '')
        if (interaction.guild.channels.cache.get(channelId) == null) {
            embed.setDescription('That\'s not a valid channel, please run the command again.')
            embed.setColor(config.embedColor.r)
            await interaction.editReply({ embeds: [embed] })
            return
        }

        embed.setDescription('Which role should be able to review suggestions, so which role should have access to the `/setstatus` command? (Type: @role)')
        await interaction.editReply({ embeds: [embed] })

        const roleAwait = await interChannel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
        await roleAwait.first().delete()

        const roleId = roleAwait.first().content.replace('<@&', '').replace('>', '')
        if (interaction.guild.roles.cache.get(roleId) == null) {
            embed.setDescription('That\'s not a valid role, please run the command again.')
            embed.setColor(config.embedColor.r)
            await interaction.editReply({ embeds: [embed] })
            return
        }

        embed.setDescription('That\'s all! You\'re done configurating suggestions! Please keep in mind that you will be able to change these and other settings using the `/config` command.')
        embed.setColor(config.embedColor.g)
        await interaction.editReply({ embeds: [embed] })

        // Cache update
        var obj = await getFromCache(interaction.guildID)
        obj.staffRole = roleId
        await setInCache(interaction.guildID, obj)

        // Update database
        await runQuery('UPDATE servers SET suggestion_channel = $1::text, staff_role = $2::text WHERE id = $3::text', [channelId, roleId, interaction.guildID])
    }
})