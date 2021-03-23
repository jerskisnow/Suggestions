import botCache from '../../structures/BotCache';
import { Permission, sendPlainEmbed } from '../../managers/Commands';

botCache.commands.set('help', {
    enabled: true,
    permission: Permission.DEFAULT,
    aliases: ['commands'],
    exec: async (message, commandData, args) => {
        if (args.length === 0) {
            await message.channel.send(
`\`\`\`asciidoc
== ${commandData.language.help.title} ==
[${commandData.language.help.description.replace('%prefix%', commandData.prefix)}]

= ${commandData.language.help.fields.user.title} =
${commandData.prefix}suggest   :: ${commandData.language.help.fields.user.descriptions.suggest}
${commandData.prefix}report    :: ${commandData.language.help.fields.user.descriptions.report}
${commandData.prefix}list      :: ${commandData.language.help.fields.user.descriptions.list}
${commandData.prefix}donate    :: ${commandData.language.help.fields.user.descriptions.donate}
${commandData.prefix}invite    :: ${commandData.language.help.fields.user.descriptions.invite}
${commandData.prefix}vote      :: ${commandData.language.help.fields.user.descriptions.vote}
${commandData.prefix}allowdm   :: ${commandData.language.help.fields.user.descriptions.allowdm}
${commandData.prefix}help      :: ${commandData.language.help.fields.user.descriptions.help}

= ${commandData.language.help.fields.staff.title} =
${commandData.prefix}approve   :: ${commandData.language.help.fields.staff.descriptions.approve}
${commandData.prefix}reject    :: ${commandData.language.help.fields.staff.descriptions.reject}
${commandData.prefix}consider  :: ${commandData.language.help.fields.staff.descriptions.consider}
${commandData.prefix}reopen    :: ${commandData.language.help.fields.staff.descriptions.reopen}
${commandData.prefix}resolve   :: ${commandData.language.help.fields.staff.descriptions.resolve}
${commandData.prefix}list      :: ${commandData.language.help.fields.staff.descriptions.list}
${commandData.prefix}movesug   :: ${commandData.language.help.fields.staff.descriptions.movesuggestion}
${commandData.prefix}moverep   :: ${commandData.language.help.fields.staff.descriptions.movereport}

= ${commandData.language.help.fields.admin.title} =
${commandData.prefix}config    :: ${commandData.language.help.fields.admin.descriptions.config}
${commandData.prefix}blist     :: ${commandData.language.help.fields.admin.descriptions.blacklist}
\`\`\``).catch(console.error);
        } else {
            await sendPlainEmbed(message.channel, botCache.config.colors.blue, commandData.language.additional.underConstruction);
        }
    }
});
