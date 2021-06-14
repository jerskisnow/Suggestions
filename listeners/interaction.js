const { botCache, getFromCache, setInCache } = require('../structures/cache')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const config = require('../config')
const { runQuery } = require('../structures/database')

module.exports = async function (client, interaction) {
    if (interaction.isCommand()) {
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
    } else if (interaction.isMessageComponent() && interaction.componentType === 'BUTTON') {
        const arr = interaction.customID.split(':') // ['<module>', '<identifier>']

        // ============ Config Part ============
        if (arr[0] === 'config') {
            const embed = new MessageEmbed()
                .setColor(config.embedColor.b)

            const filter = msg => msg.author.id === interaction.user.id

            // ============ Config Category Part ============
            if (arr[1] === 'channels_cat') {
                embed.setTitle('Config - Channels')
                embed.setDescription('In this category you will able to configure all the specific channels. See the buttons below for more information.')

                const row = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomID('config:conf_sug_channel')
                        .setLabel('Suggestion Channel')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomID('config:conf_rep_channel')
                        .setLabel('Report Channel')
                        .setStyle('SUCCESS')
                )

                await interaction.update({ embeds: [embed], components: [row] })
            } else if (arr[1] === 'roles_cat') {
                embed.setTitle('Config - Roles')
                embed.setDescription('In this category you will able to configure all the roles required to execute certain commands. See the buttons below for more information.')

                const row = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomID('config:conf_staff_role')
                        .setLabel('Staff Role')
                        .setStyle('PRIMARY')
                )

                await interaction.update({ embeds: [embed], components: [row] })
            } else if (arr[1] === 'misc_cat') {
                embed.setTitle('Config - Misc')
                embed.setDescription('In this category you will be able to find all the other options not listed previously. See the buttons below for more information.')

                const row = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomID('config:conf_delete_approved')
                        .setLabel('Delete Approved')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomID('config:conf_delete_rejected')
                        .setLabel('Delete Rejected')
                        .setStyle('SUCCESS'),
                    new MessageButton()
                        .setCustomID('config:conf_auto_approve')
                        .setLabel('Auto Approve')
                        .setStyle('DANGER'),
                    new MessageButton()
                        .setCustomID('config:conf_auto_reject')
                        .setLabel('Auto Reject')
                        .setStyle('SECONDARY')
                )

                await interaction.update({ embeds: [embed], components: [row] })
            }

            // ============ Config Chanel Part ============
            else if (arr[1] === 'conf_sug_channel') {
                embed.setTitle('Config - Suggestion Channel')
                embed.setDescription('In which channel should suggestions show up? (Type: #channel)')

                await interaction.update({ embeds: [embed], components: [] })

                const msgAwait = await interaction.message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                // Delete the user input message
                await msgAwait.first().delete()

                const channelId = msgAwait.first().content.replace('<#', '').replace('>', '')
                if (interaction.guild.channels.cache.get(channelId) == null) {
                    embed.setDescription('That\'s not a valid channel, please run the command again.')
                    embed.setColor(config.embedColor.r)
                    await interaction.message.edit({ embeds: [embed] })
                    return
                }

                embed.setDescription(`Okay, setting the suggestion channel to: <#${channelId}>`)
                embed.setColor(config.embedColor.g)
                await interaction.message.edit({ embeds: [embed] })

                await runQuery('UPDATE servers SET suggestion_channel = $1::text WHERE id = $2::text', [channelId, interaction.guildID])
            } else if (arr[1] === 'conf_rep_channel') {
                embed.setTitle('Config - Report Channel')
                embed.setDescription('In which channel should reports show up? (Type: #channel)')

                await interaction.update({ embeds: [embed], components: [] })

                const msgAwait = await interaction.message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                // Delete the user input message
                await msgAwait.first().delete()

                const channelId = msgAwait.first().content.replace('<#', '').replace('>', '')
                if (interaction.guild.channels.cache.get(channelId) == null) {
                    embed.setDescription('That\'s not a valid channel, please run the command again.')
                    embed.setColor(config.embedColor.r)
                    await interaction.message.edit({ embeds: [embed] })
                    return
                }

                embed.setDescription(`Okay, setting the report channel to: <#${channelId}>`)
                embed.setColor(config.embedColor.g)
                await interaction.message.edit({ embeds: [embed] })

                await runQuery('UPDATE servers SET report_channel = $1::text WHERE id = $2::text', [channelId, interaction.guildID])
            }

            // ============ Config Roles Part ============
            else if (arr[1] === 'conf_staff_role') {
                embed.setTitle('Config - Staffrole')
                embed.setDescription('Which role should be able to review suggestions and reports? (Type: @role)')

                await interaction.update({ embeds: [embed], components: [] })

                const msgAwait = await interaction.message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                await msgAwait.first().delete()

                const roleId = msgAwait.first().content.replace('<@&', '').replace('>', '')
                if (interaction.guild.roles.cache.get(roleId) == null) {
                    embed.setDescription('That\'s not a valid role, please run the command again.')
                    embed.setColor(config.embedColor.r)
                    await interaction.message.edit({ embeds: [embed] })
                    return
                }

                embed.setDescription(`Okay, setting the staffrole to: <@&${roleId}>`)
                embed.setColor(config.embedColor.g)
                await interaction.message.edit({ embeds: [embed] })

                // Update cache
                var obj = await getFromCache(interaction.guildID)
                obj.staffRole = roleId
                await setInCache(interaction.guildID, obj)
                // Update database
                await runQuery('UPDATE servers SET staff_role = $1::text WHERE id = $2::text', [roleId, interaction.guildID])
            }

            // ============ Config Misc Part ============
            else if (arr[1] === 'conf_delete_approved') {
                await interaction.update('Coming Soon!', { components: [] })
            } else if (arr[1] === 'conf_delete_rejected') {
                await interaction.update('Coming Soon!', { components: [] })
            } else if (arr[1] === 'conf_auto_approve') {
                await interaction.update('Coming Soon!', { components: [] })
            } else if (arr[1] === 'conf_auto_reject') {
                await interaction.update('Coming Soon!', { components: [] })
            }

        }
        // ============ Poll Part ============
        else if (arr[0] === 'poll') {
            // TODO: This
        }

    }
}