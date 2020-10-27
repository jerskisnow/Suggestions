/**
 * Language: Czech (cs_CZ)
 * Date: 6/05/2020 (MM/DD/YYYY)
 *
 * Translation by PetyXbron
 */
export default {

    /**
     * Global part
     *
     * Often used messages which are not necessarily associated with a specific function / implementation
     * are stated below
     */
    insufficientPermissions: "Nemáš právo použít tento příkaz. (Potřebuješ <Permission>)",
    roleRequired: "You need the role `<Role>` in order to use that command.",
    errorTitle: "Suggestions - Error",
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
                language: "Jazyk",
                suggestionChannel: "Suggestion Channel",
                reportChannel: "Report Channel",
                autoApprove: "Automaticky schválit podle počtu hlasů",
                autoReject: "Automaticky zamítnout podle počtu hlasů",
                deleteApproved: "Automaticky mazat shvalené",
                deleteRejected: "Automaticky mazat zamítnuté"
            },
            prefix: {
                description: "Napiš nový prefix...",
                missingInput: "Zapomněl jsi napsat nový prefix.",
                updated: "Nový prefix nyní je: ``<Prefix>``."
            },
            language: {
                description: "Zadej nový jazyk...",
                availableTitle: "Dostupné jazyky",
                missingInput: "Zapomněl jsi zadat nový jazyk.",
                invalidLanguage: "Suggestions is not available in that language. (Not Translated Yet)",
                updated: "Jazyk byl aktualizován na ``<Language>``."
            },
            suggestionChannel: {
                description: "Prosím zadej nový kanál...",
                missingInput: "Zapomněl jsi napsat nový kanál.",
                invalidChannel: "Zadali jsi neplatný kanál.",
                updated: "Kanál byl aktualizován na <#<ChannelID>>."
            },
            reportChannel: {
                description: "Please enter a new channel...",
                missingInput: "You forgot to enter a new channel.",
                invalidChannel: "You entered an invalid channel.",
                updated: "Updated the channel to <#<ChannelID>>."
            },
            autoApprove: {
                description: "Zadejte požadovaný počet pozitivních reakcí, aby se návrh schválil ...\n\n*Zadej -1 pro deaktivaci*",
                missingInput: "Zapomněl jsi zadat číslo požadovaných reakcí.",
                invalidNumber: "To není platné číslo.",
                numberIsTooLow: "Číslo musí být **-1** nebo vyšší.",
                updated: "Nový požadovaný počet pozitivních reakcí aby se návrh schválil nyní je: ``<Number>``."
            },
            autoReject: {
                description: "Zadejte požadovaný počet negativních reakcí, aby se návrh schválil ...\n\n*Zadej -1 pro deaktivaci*",
                missingInput: "Zapomněl jsi zadat číslo požadovaných reakcí.",
                invalidNumber: "To není platné číslo.",
                numberIsTooLow: "Číslo musí být **-1** nebo vyšší.",
                updated: "Nový požadovaný počet pozitivních reakcí aby se návrh schválil nyní je: ``<Number>``."
            },
            deleteApproved: {
                description: "Zadej prosím **on** nebo **off**...",
                missingInput: "Zapomněl jsi napsat jestli se mají mazat schválené návrhy na zapnuto nebo vypnuto.",
                invalidInput: "Na výběr je jenom **on** a **off**.",
                updatedEnabled: "Approved suggestions will now automatically deleted from now on.",
                updatedDisabled: "Approved suggestions won't be automatically deleted from now on."
            },
            deleteRejected: {
                description: "Zadej prosím **on** nebo **off**...",
                missingInput: "Zapomněl jsi napsat jestli se mají mazat neschválené návrhy na zapnuto nebo vypnuto.",
                invalidInput: "Na výběr je jenom **on** a **off**.",
                updatedEnabled: "Rejected suggestions will now automatically deleted from now on.",
                updatedDisabled: "Rejected suggestions won't be automatically deleted from now on."
            }
        },
        suggest: {
            title: "Suggestions - Podání nápadu",
            invalidChannel: "Ujisti se, že majitel serveru správně nakonfiguroval bota.",
            descriptionRequired: "Uveď prosím popis nápadu, který chceš navrhnout.",
            description: "**Popis:** <Description>\n\n**Stav:** <Status>\n**ID:** <ID>",
            sent: "Tvůj návrh byl úspěšně vytvořen! ([→ Tady je tvůj návrh ←](<Url>))"
        },
        report: {
            title: "Suggestions - Report",
            invalidChannel: "Please make sure that the owner of the server configured the bot properly.",
            descriptionRequired: "Please fill in a description.",
            description: "**Description:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
            sent: "Your report was succesfully sent."
        },
        approve: {
            title: "Suggestions - Schválit návrh",
            descriptionRequired: "Vyplň prosím platné ID návrhu.",
            invalidInput: "Zadal jsi neplatné ID návrhu.",
            noSuggestionsFound: "Nemohl jsem najít žádné schválitelné návrhy.",
            approved: "Tento návrh byl právě schválen."
        },
        reject: {
            title: "Suggestions - Odmítnout návrh",
            descriptionRequired: "Vyplň prosím platné ID návrhu.",
            invalidInput: "Zadej platné ID návrhu.",
            noSuggestionsFound: "Nemohl jsem najít žádné schválitelné návrhy.",
            rejected: "Tento návrh byl právě zamítnut."
        },
        resolve: {
            title: "Suggestions - Resolve",
            descriptionRequired: "Please fill in an valid report id.",
            invalidInput: "You filled in an invalid report id.",
            noReportsFound: "I couldn't find any approvable reports.",
            resolved: "The report was successfully resolved."
        },
        list: {
            title: "Suggestions - List",
            noSuggestions: "Na tomto serveru nejsou žádné otevřené návrhy.",
            description: "Všechny otevřené návrhy můžeš vidět přímo tady níže.",
            suggestionDescription: "**Popis:** <Description>\n**ID:** <ID>\n**Link:** [Click here](<Url>)"
        },
        uptime: {
            title: "Suggestions - Uptime",
            description: "Bot je online <Days> dní, <Hours> hodin, <Minutes> minut a <Seconds> sekund!"
        },
        help: {
            title: "Suggestions - Help",
            commandTitle: "Command Help",
            serverTitle: "Support Server"
        },
        vote: {
            title: "Suggestions - Hlasovat pro bota"
        },
        reportbug: {
            title: "Suggestions - Náhlášení chyby",
            descriptionRequired: "Uveď prosím popis chyby, kterou jste našli.",
            confirmation: "Are you sure you want to report the bug to the developers of the bot?",
            cancelled: "Successfully cancelled the bug report.",
            sent: "Tvoje nahlašní bugu je na cestě developerům bota.\n\n*Děkujeme za odeslání!*"
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
        open: "Otevřený",
        approved: "Schváleno",
        rejected: "Odmítnuto"
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
