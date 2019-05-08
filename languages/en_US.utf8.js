/*

Thank you for translating our messages!

NOTE:
  1. You only have to change the thing betwene the ""!
  2. Don't change the variables like <Ping> for example! (Also don't change the name of the bot, so Suggestions stays Suggestions)
  3. Don't add other things
  4. Be serious, so don't write stupid things! (We are going to check that ofc).
  5. Read ALL the comments, the text above all the consts for example.
  6. \n means that the text after this will be on a new line.

  Questions? Contact jerskisnow#8214

*/

const allMessages = {
	// Initial Commit (Version 1.0.0)
	noPermission: "You are not permitted to execute that command!",
  errorTitle: "Suggestions - Error",
  exampleTitle: "Checkout this example:",
  suggestionExample: "<Prefix><Command> a brand new meme channel!",
	approveExample: "<Prefix><Command> 1 Good Idea!",
	rejectExample: "<Prefix><Command> 1 Bad Idea!",
  newSuggestionTitle: "Suggestion from <User>",
  newSuggestionDescription: "**Description:** <Description>\n\n**Status:** <Status>",
  newSuggestionFooter: "Suggestion ID: <SuggestionID>",
	approvedTitle: "Suggestion Approval!",
	approvedDescription: "Your suggestions in <GuildName> has been approved!\n\n**Reason:** <Reason>",
	approvedSuggestionTitle: "Suggestions - Suggestion Approved",
	approvedSuggestion: "Succesfull approved the suggestion with the id of `<SuggestionID>`!",
	rejectedTitle: "Suggestion Rejection!",
	rejectedDescription: "Your suggestions in <GuildName> has been rejected!\n\n**Reason:** <Reason>",
	rejectedSuggestionTitle: "Suggestions - Suggestion Rejected",
	rejectedSuggestion: "Succesfully rejected the suggestion with the id of `<SuggestionID>`!",
  invalidChannel: "Please setup a valid suggestion channel!",
	invalidSuggestions: "Please enter a valid suggestion id!",
	invalidLanguage: "Please choose between: `<Languages>`",
	alreadyApproved: "That suggestion is already approved!",
	alreadyRejected: "That suggestions is already rejected!",
  missingArguments: "You have to fill in all the arguments!",
	incorrectArguments: "You have to fill in the correct arguments!",
	usageTitle: "Suggestions - Usage",
	configUsage: "<Prefix><Command> [Options] [Values]",
	optionsTitle: "Configuration - Options",
	updatedConfigurationTitle: "Suggestions - Configuration Update",
	updatedPrefix: "Succesfully updated the prefix to `<Prefix>`",
  updatedChannel: "Succesfully updated the channel to `<ChannelName> (<ChannelID>)`",
	updatedLanguage: "Succesfully updated the language to `<Language>`",
	privateMessages: "Check your private messages!",
	helpTitle: "Suggestions - Help Message",
	helpCMDExplanation: "Receive the help message!",
	suggestCMDExplanation: "Create a suggestion for the server!",
	approveCMDExplanation: "Approve a suggestion!",
	rejectCMDExplanation: "Reject a suggestion!",
	configCMDExplanation: "Configure the bot!",
	donateCMDExplanation: "Receive information about donating!",
	comingSoonTitle: "Suggestions - Coming Soon",
	comingSoon: "This option will be available soon!",
	suggestionListTitle: "Suggestions - Suggestion List",
	suggestionListDescription: "You can view all the active/open suggestion right below!",
	suggestionListingDescription: "**Description:** <Description>\n**ID:** <SuggestionID>\n**Link:** [Click here](<SuggestionURL>)",
	donateTitle: "Suggestions - Donate",
	donateDescription: "Don't feel obligated to donate! It isn't a requirement but it helps us to maintenance our projects including Suggestions.\n\nIf you decided to donate contact `jerskisnow#8214` if you want to receive a premium rank on the official `CodedSnow` discord server ([Click here](https://discord.gg/3SYg3M5))! When you received the premium rank you'll get some extra perks and you'll be thanked gratefully!",
	paymentMethodsTitle: "Payment Methods",
	supportTitle: "Suggestions - Support",
	supportDescription: "You can join our official server to gain support by clicking [here](https://discord.gg/3SYg3M5)!"
}

module.exports = allMessages;
