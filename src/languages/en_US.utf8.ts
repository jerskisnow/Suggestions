/**
 * PLEASE MAKE SURE THAT:
 *  - You read the instruction for translation in the readme.md file.
 *  - You speak the language you want to translate to fluently, since translation programs are NOT allowed.
 *  - You now how to use git / github and how to contribute to the project.
 *  - You are on the 'dev' branch.
 *
 * FURTHER INFORMATION:
 *  - You may put the language after 'Language: '
 *  - You may put the date after 'Date: ', keep in mind that the regular format is month/day/year
 *  - You may put your name after the 'Translation by' part.
 *  - You can join our discord (https://discord.gg/3SYg3M5) if you have any questions.
 */

/**
 * Language: English (en_US)
 * Date: 03/07/2020 (MM/DD/YYYY)
 *
 * Translation by jerskisnow (CodedSnow)
 */
export default {

    /**
     * Global part
     *
     * Often used messages which are not necessarily associated with a specific function / implementation
     * are stated below
     */
    insufficientPermissions: "You don't have permission to use that command! (<Permission> is required)",
    errorTitle: "Suggestions - Error",

    /**
     * Commands part
     *
     * Messages associated to commands are stated below
     */
    commands: {
        config: {
            title: "Suggestions - Config",
            names: {
                prefix: "Prefix",
                language: "Language",
                channel: "Channel",
                autoApprove: "Auto approve",
                autoReject: "Auto reject",
                deleteApproved: "Delete approved",
                deleteRejected: "Delete rejected"
            },
            prefix: {
                description: "Please enter a new prefix...",
                missingInput: "You forgot to enter a new prefix.",
                updated: "Updated the prefix to ``<Prefix>``."
            },
            language: {
                description: "Please enter a new language...",
                availableTitle: "Available languages",
                missingInput: "You forgot to enter a new language.",
                invalidLanguage: "That language does not exists.",
                updated: "Updated the language to ``<Language>``."
            },
            channel: {
                description: "Please enter a new channel...",
                missingInput: "You forgot to enter a new channel.",
                invalidChannel: "You entered an invalid channel.",
                updated: "Updated the channel to `<#<ChannelID>>`."
            },
            autoApprove: {
                description: "Please enter the required amount of positive reactions to approve a suggestion...\n\n*Enter -1 to disable*",
                missingInput: "You forgot to enter a number of required reactions.",
                invalidNumber: "That is not a valid number.",
                numberIsTooLow: "The number should be -1 or higher.",
                updated: "The amount of required positive reactions for auto approval is now ``<Number>``."
            },
            autoReject: {
                description: "Please enter the required amount of negative reactions to reject a suggestion...\n\n*Enter -1 to disable*",
                missingInput: "You forgot to enter a number of required reactions.",
                invalidNumber: "That is not a valid number.",
                numberIsTooLow: "The number should be -1 or higher.",
                updated: "The amount of required negative reactions for auto rejection is now ``<Number>``."
            },
            deleteApproved: {
                description: "Please enter either **on** or **off**...",
                missingInput: "You forgot to enter either on or off.",
                invalidNumber: "You can only choose between **on** and **off**.",
                updated: "Approved suggestions will now be deleted automatically."
            },
            deleteRejected: {
                description: "Please enter either **on** or **off**...",
                missingInput: "You forgot to enter either on or off.",
                invalidNumber: "You can only choose between **on** and **off**.",
                updated: "Rejected suggestions will now be deleted automatically."
            }
        },
        suggest: {
            title: "Suggestions - Suggest",
            invalidChannel: "Please make sure that the owner of the server configured the bot properly.",
            descriptionRequired: "Please give a description of the idea you want to suggest.",
            description: "**Description:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
            sent: "Succesfully created your suggestion! ([Click here](<Url>))"
        },
        approve: {
            title: "Suggestions - Approve",
            authorMessage: "**Suggestion Approved**\nCongratulations, the suggestion you made in <Server> has been approved!"
        },
        reject: {
            title: "Suggestions - Reject",
            authorMessage: "**Suggestion Approved**\nCongratulations, the suggestion you made in <Server> has been rejected!"
        },
        list: {
            title: "Suggestions - List"
        },
        uptime: {
            title: "Suggestions - Uptime",
            description: "I've been online for <Days> days, <Hours> hours, <Minutes> minutes and <Seconds> seconds!"
        },
        donate: {
            title: "Suggestions - Donate"
        },
        help: {
            title: "Suggestions - Help",
            commandTitle: "Command Help",
            serverTitle: "Support Server"
        },
        vote: {
            title: "Suggestions - Vote"
        }
    },

    /*
     * Suggestions part
     *
     * Words associated with suggestions are stated below
     */
    suggestions: {
        open: "Open",
        approved: "Approved",
        rejected: "Rejected"
    }

}
