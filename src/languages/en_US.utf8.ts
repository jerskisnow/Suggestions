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
    activeCooldown: "You cannot use that command due to an active cooldown.",
    premiumFeature: "This command is only usable for premium servers (`<Prefix>premium`)",

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
                suggestionChannel: "Suggestion Channel",
                reportChannel: "Report Channel",
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
                invalidLanguage: "Suggestions is not available in that language.",
                updated: "Updated the language to ``<Language>``."
            },
            suggestionChannel: {
                description: "Please enter a new channel...",
                missingInput: "You forgot to enter a new channel.",
                invalidChannel: "You entered an invalid channel.",
                updated: "Updated the channel to <#<ChannelID>>."
            },
            reportChannel: {
                description: "Please enter a new channel...",
                missingInput: "You forgot to enter a new channel.",
                invalidChannel: "You entered an invalid channel.",
                updated: "Updated the channel to <#<ChannelID>>."
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
                invalidInput: "You can only choose between **on** and **off**.",
                updatedEnabled: "Approved suggestions will now automatically deleted from now on.",
                updatedDisabled: "Approved suggestions won't be automatically deleted from now on."
            },
            deleteRejected: {
                description: "Please enter either **on** or **off**...",
                missingInput: "You forgot to enter either on or off.",
                invalidInput: "You can only choose between **on** and **off**.",
                updatedEnabled: "Rejected suggestions will now automatically deleted from now on.",
                updatedDisabled: "Rejected suggestions won't be automatically deleted from now on."
            }
        },
        suggest: {
            title: "Suggestions - Suggest",
            invalidChannel: "Please make sure that the owner of the server configured the bot properly.",
            descriptionRequired: "Please give a description of the idea you want to suggest.",
            description: "**Description:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
            sent: "Successfully created your suggestion! ([Click here](<Url>))"
        },
        report: {
            title: "Suggestions - Report",
            invalidChannel: "Please make sure that the owner of the server configured the bot properly.",
            descriptionRequired: "Please fill in a description.",
            description: "**Description:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
            sent: "Your report was successfully sent."
        },
        approve: {
            title: "Suggestions - Approve",
            descriptionRequired: "Please fill in an valid suggestion id.",
            invalidInput: "You filled in an invalid suggestion id.",
            noSuggestionsFound: "I couldn't find any approvable suggestions.",
            approved: "I successfully completed the approval."
        },
        reject: {
            title: "Suggestions - Reject",
            descriptionRequired: "Please fill in an valid suggestion id.",
            invalidInput: "You filled in an invalid suggestion id.",
            noSuggestionsFound: "I couldn't find any rejectable suggestions.",
            rejected: "I successfully completed the rejection."
        },
        resolve: {
            title: "Suggestions - Resolve",
            descriptionRequired: "Please fill in an valid report id.",
            invalidInput: "You filled in an invalid report id.",
            noSuggestionsFound: "I couldn't find any approvable reports.",
            resolved: "The report was successfully resolved."
        },
        list: {
            title: "Suggestions - List",
            noSuggestions: "There aren't any open suggestions for this guild.",
            description: "You can view all the open suggestion right below.",
            suggestionDescription: "**Description:** <Description>\n**ID:** <ID>\n**Link:** [Click here](<Url>)"
        },
        uptime: {
            title: "Suggestions - Uptime",
            description: "I've been online for <Days> days, <Hours> hours, <Minutes> minutes and <Seconds> seconds!"
        },
        help: {
            title: "Suggestions - Help",
            commandTitle: "Command Help",
            serverTitle: "Support Server"
        },
        vote: {
            title: "Suggestions - Vote"
        },
        reportbug: {
            title: "Suggestions - Reportbug",
            descriptionRequired: "Please give a description of the bug you found.",
            confirmation: "Are you sure you want to report the bug to the developers of the bot?",
            cancelled: "Successfully cancelled the bug report.",
            sent: "Your bugreport is on its way to the developers of the bot.\n\n*Thanks for submitting!*"
        },
        premium: {
            title: "Suggestions - Premium",
            description: "Whenever you buy premium you'll get access to the perks below. Premium is per server and requires a one-time payment of $2.50. This will allow our developers to continue working on Suggestions and our other projects.",
            perksTitle: "Premium Perks",
            perksDescription: "1. Early access to beta features.\n2. Priority support.\n3. A premium rank in the CodedSnow discord server."
        },
        translation: {
            title: "Suggestions - Translation",
            description: "If you're looking for changing Suggestion's language, please use `<Prefix>config`.\n\nFor more information about contributing a language please read the field below.",
            contributeTitle: "Contribute",
            contributeDescription: "We are always looking for people to translate our bot. If you would like the translate the bot in a language or if you want to make changes to a language please read the instructions about translating over on our [github page](https://github.com/jerskisnow/Suggestions/tree/dev)."
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
    },

    /*
     * Reports part
     *
     * Words associated with reports are stated below
     */
    reports: {
        open: "Open",
        resolved: "Resolved"
    }

}
