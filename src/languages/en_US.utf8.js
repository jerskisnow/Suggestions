export default {

    /*
    General Part
     */
    insufficientPermissions: "You don't have permission to use that command! (<Permission> is required)",
    errorTitle: "Suggestions - Error",
    exampleTitle: "Example",

    /*
    Actual Suggestion Part
     */
    suggestionDescription: "**Description:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
    suggestionStatusOpen: "Open",
    suggestionStatusApproved: "Approved",
    suggestionStatusRejected: "Rejected",

    /*
    Commands Part
     */
    uptimeTitle: "Suggestions - Uptime",
    uptimeDescription: "I've been online for <Days> days, <Hours> hours, <Minutes> minutes and <Seconds> seconds!",

    reportBugTitle: "Suggestions - Reportbug",
    reportBugMissingArguments: "Please enter a bug to report!",
    reportCooldownActive: "You can only report a bug every per hour!",
    reportBugSuccess: "Thanks for reporting that bug! Our team will look at it as soon as possible!",

    suggestMissingArguments: "Please enter a suggestion to suggest!",
    suggestExample: "<Prefix>suggest A brand new programming channel!",
    suggestInvalidChannel: "Please setup a valid `suggestion channel` using the config command!",
    suggestTitle: "Suggestions - Suggest",
    suggestSuccess: "Succesfully created your suggestion! ([Click here](<SuggestionURL>))",

    voteTitle: "Suggestions - Vote",
    voteDescription: "You can vote for us by clicking [here](<VoteURL>)",

    inviteTitle: "Suggestions - Invite",
    inviteDescription: "**BotInvite:** <BotURL>\n**SupportServer:** <ServerURL>",

    approveMissingArguments: "Please enter at least a suggestion id to approve a suggestion!",
    approveExample: "<Prefix>approve 1 Yeah cool idea mate!",
    approveInvalidSuggestion: "Can't approve that suggestion since it doesn't exist!",
    approveSuggestionAlreadyApproved: "That suggestion is already approved!",
    approveAuthorTitle: "Suggestion Approval",
    approveAuthorDescription: "Your suggestions in `<GuildName>` has been approved!\n\n**Description:** <Description>\n\n**Reason:** <Reason>",
    approveTitle: "Suggestions - Approve",
    approveDescription: "Succesfull approved the suggestion with the id of `<SuggestionID>`!",

    rejectMissingArguments: "Please enter at least a suggestion id to reject a suggestion!",
    rejectExample: "<Prefix>reject 1 Nah not happening mate!",
    rejectInvalidSuggestion: "Can't reject that suggestion since it doesn't exist!",
    rejectSuggestionAlreadyRejected: "That suggestion is already rejected",
    rejectAuthorTitle: "Suggestion Rejection",
    rejectAuthorDescription: "Your suggestions in <GuildName> has been rejected!\n\nDescription: <Description>\n\n**Reason:** <Reason>",
    rejectTitle: "Suggestions - Reject",
    rejectDescription: "Succesfull rejected the suggestion with the id of `<SuggestionID>`!",

    configTitle: "Suggestions - Config",

    configPrefixMissingArguments: "Please enter a character to change the prefix!",
    configPrefixExample: "<Prefix>config prefix ?",
    configPrefixSuccessDescription: "Successfully changed the prefix to `<NewPrefix>`",

    configChannelMissingArguments: "Please enter a valid channel!!",
    configChannelExample: "<Prefix>config channel #suggestion-channel",
    configChannelSuccessDescription: "Successfully changed the channel to `<#<NewChannelID>>`",

    configLanguageMissingArguments: "Please enter a valid language-code!",
    configLanguageExample: "<Prefix>config langauge en_US",
    configLanguageInvalidLanguage: "Please enter a valid Language!\n\n**Language List:** <LanguageList>",
    configLanguageSuccessDescription: "Successfully changed the language to `<NewLanguageCode>`"

}