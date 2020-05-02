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
 * Language: Czech (cz)
 * Date: 04/27/2020 (MM/DD/YYYY)
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
    insufficientPermissions: "Nemáš právo použít tento příkaz! (Potřebuješ <Permission>)",
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
                language: "Jazyk",
                channel: "Kanál",
                autoApprove: "Auto schválení",
                autoReject: "Auto odmítnutí",
                deleteApproved: "Automaticky mazat shvalené",
                deleteRejected: "Automaticky mazat neschválené"
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
                invalidLanguage: "Tento jazyk nebyl nikdy přidán.",
                updated: "Jazyk byl aktualizován na ``<Language>``."
            },
            channel: {
                description: "Prosím zadej nový kanál...",
                missingInput: "Zapomněl jsi napsat nový kanál.",
                invalidChannel: "Zadali jsi neplatný kanál.",
                updated: "Kanál byl aktualizován na <#<ChannelID>>."
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
                invalidNumber: "Na výběr je jenom **on** a **off**.",
                updated: "Schválené návrhy budou nyní automaticky odstraněny."
            },
            deleteRejected: {
                description: "Zadej prosím **on** nebo **off**...",
                missingInput: "Zapomněl jsi napsat jestli se mají mazat neschválené návrhy na zapnuto nebo vypnuto.",
                invalidNumber: "Na výběr je jenom **on** a **off**.",
                updated: "Odmítnuté návrhy budou nyní automaticky odstraněny."
            }
        },
        suggest: {
            title: "Suggestions - Podání nápadu",
            invalidChannel: "Ujisti se, že majitel serveru správně nakonfiguroval bota.",
            descriptionRequired: "Uveď prosím popis nápadu, který chceš navrhnout.",
            description: "**Popis:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
            sent: "Tvůj návrh byl úspěšně vytvořen! ([Click here](<Url>))"
        },
        approve: {
            title: "Suggestions - Schválit návrh",
            descriptionRequired: "Vyplň prosím platné ID návrhu.",
            invalidInput: "Zadal jsi neplatné ID návrhu.",
            noSuggestionsFound: "Nemohl jsem najít žádné schválitelné návrhy.",
            approved: "I've successfully completed the approval. (Not Translated Yet)"
        },
        reject: {
            title: "Suggestions - Odmítnout návrh",
            descriptionRequired: "Vyplň prosím platné ID návrhu.",
            invalidInput: "Zadal jsi neplatné ID návrhu.",
            noSuggestionsFound: "Nemohl jsem najít žádné schválitelné návrhy.",
            rejected: "I've successfully completed the rejection. (Not Translated Yet)"
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
        donate: {
            title: "Suggestions - Donate"
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
            sent: "Tvoje nahlašní bugu je na cestě developerům bota.\n\n*Děkujeme za odeslání!*"
        }
    },

    /*
     * Suggestions part
     *
     * Words associated with suggestions are stated below
     */
    suggestions: {
        open: "Otevřené",
        approved: "Schválené",
        rejected: "Odmítnuté"
    }

}
