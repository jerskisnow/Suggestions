const { botCache } = require('../structures/cache')

botCache.commands.set('help', {
    desc: 'Receive help message',
    exec: async function (client, interaction) {
        await interaction.reply(
`\`\`\`asciidoc
== Commands ==
[View the autocompletion for more detailed explanation.]

= User =
/suggest    :: Create a suggestion for this server.
/report     :: Create a report for this server.
/about      :: Obtain information about this bot.
/help       :: Shows this particular help message.

= Staff =
/setstatus  :: Change the status of a Suggestion or Report. (Approve/Consider/Reject/Resolve)
/move       :: Move a suggestion or report to another channel.

= Admin =
/setup      :: Setup the bot. (This will set the staffrole and suggestion channel)
/config     :: Modify the bot's configuration for your server.
/blacklist  :: Prevent someone from creating suggestions and/or reports.
\`\`\``
        )
    }
})