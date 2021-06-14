const { botCache } = require('../structures/cache')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const config = require('../config')

botCache.commands.set('about', {
    desc: 'Obtain general information about the bot.',
    exec: async function (client, interaction) {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setURL('https://top.gg/bot/566616056165302282/invite/')
                .setLabel('Invite')
                .setEmoji('🤖')
                .setStyle('LINK'),
            new MessageButton()
                .setURL('https://github.com/jerskisnow/Suggestions/wiki/Donating')
                .setLabel('Donate')
                .setEmoji('💰')
                .setStyle('LINK'),
            new MessageButton()
                .setURL('https://top.gg/bot/566616056165302282/vote')
                .setLabel('Vote')
                .setEmoji('📰')
                .setStyle('LINK'),
            new MessageButton()
                .setURL('https://discord.gg/3SYg3M5')
                .setLabel('Discord')
                .setEmoji('👥')
                .setStyle('LINK'),
        )

        const embed = new MessageEmbed()
        embed.setColor(config.embedColor.b)
        embed.setTitle('About Suggestions')
        embed.setDescription("Suggestions is a discord bot, created by CodedSnow (jerskisnow), that allows for perfect collaboration between members and staff members." +
            " Members can submit their ideas, a staff member can then approve, consider or reject them." +
            " Suggestions also offers support for reports, polls and a lot more!\n\nConsider taking a look at the buttons below this message for more information and how to support us.")

        await interaction.reply({ embeds: [embed], components: [row] })
    }
})