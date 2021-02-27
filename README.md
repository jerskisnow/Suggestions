# Suggestions
[![Discord Bots](https://top.gg/api/widget/status/566616056165302282.svg)](https://top.gg/bot/566616056165302282)

Suggestions is a highly configurable with lots of features, it mainly allows people to suggest their ideas or create a report. You can then afterwards review these suggestions/reports and consider what to do with them. Continue reading for a more detailed explanation for each feature.
# Features
### Commands:
1. **suggest** >> Create a suggestion, this report will show up in the configured report channel.
2. **approve** >> This will approve a given suggestion.
3. **reject** >> This will reject a given suggestion.
4. **consider** >> This will put a given suggestion under consideration.
5. **movesuggestion** >> Move a suggestion to another channel.
------
6. **report** >> Create a report, this report will show up in the configured report channel.
7. **resolve** >> This will resolve a given report.
8. **movereport** >> Move the report message to another channel.
------
9. **list** >> List all active suggestions (for everyone) or reports (staff).
10. **blacklist** >> Add/Remove someone to the blacklist, the permission this person has to make suggestions and/or reports will be denied.
11. **config** >> Configure the bot, for example: the prefix, language, channels and more.
12. **donate** >> Obtain information about donating.
13. **help** >> Obtain the help message.
14. **invite** >> Obtain the invite links.
15. **vote** >> Obtain the vote link.
### Events
1. **Auto Approval** >> An option to automatically approve suggestions when that specific suggestion received and `x`
   amount of approval reactions.
2. **Auto Rejection** >> An option to automatically reject suggestions when that specific suggestion received and `x`
   amount of rejection reactions.
3. **Delete Approved** >> An option to delete approved suggestions.
4. **Delete Rejected** >> An option to delete rejected suggestions.
5. **Logging** >> If you configure a log channel for Suggestions then it'll send mesasges when
   certain [actions](https://github.com/jerskisnow/Suggestions/wiki/Logging) are being executed.

# Contributing
### Code
Feel free to contribute, not much to say here yet. If you want to add a new feature, create a pull request. If you feel
like you want to improve some code that is currently being used, go ahead create a pull request.
### Translations
We are always looking for people to translate our bot. If you want to translate the messages for the bot or if you want
to edit someone's translation please copy en.json from the ``languages/`` directory, copy the text, create a new text file and
then save it with the name of your language. The next step is to fork the bot and create a pull request with your
new/edited file in it.
