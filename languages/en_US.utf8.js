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
	noPermission: "You are not permitted to execute that command!",
  errorTitle: "Suggestions - Error",
  exampleTitle: "Checkout this example:",
  suggestionExample: "<Prefix><Command> a brand new meme channel!",
	approveExample: "<Prefix><Command> 1 Good Idea!",
	approveExample: "<Prefix><Command> 1 Bad Idea!",
  newSuggestionTitle: "Suggestion from <User>",
  newSuggestionDescription: "**Description:** <Description>\n\n**Status:** <Status>",
  newSuggestionFooter: "Suggestion ID: <SuggestionID>",
	approvedTitle: "Suggestion Approval!",
	approvedDescription: "Your suggestions in <GuildName> has been approved!\n\n**Reason:** <Reason>",
	rejectedTitle: "Suggestion Rejection!",
	rejectedDescription: "Your suggestions in <GuildName> has been rejected!\n\n**Reason:** <Reason>",
  invalidChannel: "Please setup a valid suggestion channel!",
	invalidSuggestions: "Please enter a valid suggestion id!",
	alreadyApproved: "That suggestion is already approved!",
	alreadyRejected: "That suggestions is already rejected!",
  missingArguments: "You have to fill in all the arguments!"
}

module.exports = allMessages;
