/**
 * Language: Dutch (nl_NL)
 * Date: 05/03/2020 (MM/DD/YYYY)
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
    insufficientPermissions: "Je hebt geen toestemming om die command te gebruiken! (<Permission> is vereist)",
    errorTitle: "Suggestions - Error",
    activeCooldown: "Je kan die command niet gebruiken vanwege een cooldown.",
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
                language: "Taal",
                suggestionChannel: "Suggestion Channel",
                reportChannel: "Report Channel",
                autoApprove: "Auto goedkeuring",
                autoReject: "Auto afwijzing",
                deleteApproved: "Verwijder goedgekeurd",
                deleteRejected: "Verwijder afgekeurd"
            },
            prefix: {
                description: "Voer een nieuwe prefix in...",
                missingInput: "Je bent vergeten om een nieuwe prefix in te voeren.",
                updated: "De prefix is veranderd naar ``<Prefix>``."
            },
            language: {
                description: "Voer een nieuwe taal in...",
                availableTitle: "Beschikbare Talen",
                missingInput: "Je bent vergeten om een nieuwe taal in te voeren.",
                invalidLanguage: "Suggestions is niet beschikbaar in die taal.",
                updated: "De taal is veranderd naar ``<Language>``."
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
                description: "Voer de vereiste hoeveelheid positieve reacties in om een suggestie goed te keuren...\n\n*Voer -1 in om uit te schakelen*",
                missingInput: "U bent vergeten een aantal vereiste reacties in te voeren.",
                invalidNumber: "Dat is geen geldig getal.",
                numberIsTooLow: "Het getal moet -1 of hoger zijn.",
                updated: "De hoeveelheid vereiste positieve reacties voor de automatische goedkeuring is nu ``<Number>``."
            },
            autoReject: {
                description: "Voer de vereiste hoeveelheid negatieve reacties in om een suggestie af te wijzen...\n\n*Voer -1 in om uit te schakelen*",
                missingInput: "U bent vergeten een aantal vereiste reacties in te voeren.",
                invalidNumber: "Dat is geen geldig getal.",
                numberIsTooLow: "Het getal moet -1 of hoger zijn.",
                updated: "De hoeveelheid vereiste negatieve reacties voor automatische afwijzing is nu ``<Number>``."
            },
            deleteApproved: {
                description: "Voer **on** of **off** in...",
                missingInput: "Je bent vergeten om on of off in te vullen.",
                invalidInput: "Je kan alleen kiezen tussen **on** en **off**.",
                updatedEnabled: "Goedgekeurde suggesties worden vanaf nu automatisch verwijderd.",
                updatedDisabled: "Goedgekeurde suggesties worden vanaf nu niet meer automatisch verwijderd."
            },
            deleteRejected: {
                description: "Voer **on** of **off** in...",
                missingInput: "Je bent vergeten om on of off in te vullen.",
                invalidInput: "Je kan alleen kiezen tussen **on** en **off**.",
                updatedEnabled: "Afgewezen suggesties worden vanaf nu automatisch verwijderd.",
                updatedDisabled: "Afgewezen suggesties worden vanaf nu niet meer automatisch verwijderd."
            }
        },
        suggest: {
            title: "Suggestions - Voorstellen",
            invalidChannel: "Zorg ervoor dat de eigenaar van de server de bot goed heeft geconfigureerd.",
            descriptionRequired: "Geef een beschrijving van het idee dat u wilt voorstellen.",
            description: "**Beschrijving:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
            sent: "Uw suggestie is succesvol aangemaakt! ([Klik hier](<Url>))"
        },
        report: {
            title: "Suggestions - Report",
            invalidChannel: "Please make sure that the owner of the server configured the bot properly.",
            descriptionRequired: "Please fill in a description.",
            description: "**Description:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
            sent: "Your report was succesfully sent."
        },
        approve: {
            title: "Suggestions - Goedkeuren",
            descriptionRequired: "Gelieve een geldige suggestie id in te vullen.",
            invalidInput: "Je hebt een ongeldige suggestie id ingevuld.",
            noSuggestionsFound: "Ik kon geen goedkeurbare suggesties vinden.",
            approved: "Ik heb de goedkeuring succesvol afgerond."
        },
        reject: {
            title: "Suggestions - Afwijzen",
            descriptionRequired: "Gelieve een geldige suggestie id in te vullen.",
            invalidInput: "Je hebt een ongeldige suggestie id ingevuld.",
            noSuggestionsFound: "Ik kon geen afwijsbare suggesties vinden.",
            approved: "Ik heb de afwijzing succesvol afgerond."
        },
        resolve: {
            title: "Suggestions - Resolve",
            descriptionRequired: "Please fill in an valid report id.",
            invalidInput: "You filled in an invalid report id.",
            noReportsFound: "I couldn't find any approvable reports.",
            resolved: "The report was successfully resolved."
        },
        list: {
            title: "Suggestions - Lijst",
            noSuggestions: "Er zijn geen open suggesties voor deze server.",
            description: "U kunt alle openstaande suggesties hieronder bekijken.",
            suggestionDescription: "**Beschrijving:** <Description>\n**ID:** <ID>\n**Link:** [Klik hier](<Url>)"
        },
        uptime: {
            title: "Suggestions - Uptime",
            description: "Ik ben online geweest voor <Days> dagen, <Hours> uren, <Minutes> minuten en <Seconds> seconden!"
        },
        help: {
            title: "Suggestions - Help",
            commandTitle: "Command Help",
            serverTitle: "Support Server"
        },
        vote: {
            title: "Suggestions - Stemmen"
        },
        reportbug: {
            title: "Suggestions - Reportbug",
            descriptionRequired: "Geef een beschrijving van de gevonden bug.",
            confirmation: "Are you sure you want to report the bug to the developers of the bot?",
            cancelled: "Successfully cancelled the bug report.",
            sent: "Je bugrapport is onderweg naar de ontwikkelaars van de bot.\n\n*Bedankt voor het indienen!*"
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
        approved: "Goedgekeurd",
        rejected: "Afgekeurd"
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
