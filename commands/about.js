const { botCache } = require('../structures/cache')
const { MessageEmbed } = require('discord.js')

botCache.commands.set('about', {
    desc: 'Obtain general information about the bot.',
    exec: async function (client, interaction) {
        const embed = new MessageEmbed()
        embed.addField('Project - Suggestions',
            "Suggestions is a discord bot, created by CodedSnow, that allows for perfect collaboration between members and staff members." +
            " Members can create their ideas, a staff member can then approve, consider or reject them." +
            " Suggestions also allows people to create a Report. This is useful for example for Gaming servers where a player needs to be reported or a support server where you can report bugs." +
            "\n\nYou can invite Suggestions to your own server by clicking [here](https://top.gg/bot/566616056165302282/invite/).",
        false)
        embed.addField('Voting',
            "Voting for Suggestions is a great way of supporting our project." +
            " Voting for Suggestions will make it appear higher in de botlists, making it grow even faster" +
            "\n\nYou can vote for suggestions by clicking [here](https://top.gg/bot/566616056165302282/vote).",
        false)
        embed.addField('Donating',
            "Don't feel obligated to donate! It isn't a requirement but it helps us to maintenance our projects including Suggestions.\n\n" +
            "If you decided to donate contact jerskisnow#8214 if you want to receive a premium rank, based on the amount you donated, on the official CodedSnow discord server!" +
            " When you received a premium rank you'll receive some extra perks and you'll be thanked gratefully!\n\n" +
            "You can go to our [wiki](https://github.com/jerskisnow/Suggestions/wiki/Donating) in order to find more information about donating including the payment details.",
        false)

        await interaction.reply({ embeds: [embed] })
    }
})