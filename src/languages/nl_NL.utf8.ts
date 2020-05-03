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
                channel: "Channel",
                autoApprove: "Auto goedkeuring",
                autoReject: "Auto afkeuring",
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
            channel: {
                description: "Voer een nieuwe channel in...",
                missingInput: "Je bent vergeten om een nieuwe channel in te voeren.",
                invalidChannel: "Je hebt in ongeldige channel ingevoerd.",
                updated: "De channel is veranderd naar <#<ChannelID>>."
            },
            autoApprove: {
                description: "Voer de vereiste hoeveelheid positieve reacties in om een suggestie goed te keuren...\n\n*Voer -1 in om uit te schakelen*",
                missingInput: "U bent vergeten een aantal vereiste reacties in te voeren.",
                invalidNumber: "Dat is geen geldig getal.",
                numberIsTooLow: "Het getal moet -1 of hoger zijn.",
                updated: "De hoeveelheid vereiste positieve reacties voor de automatische goedkeuring is nu ``<Number>``."
            },
            autoReject: {
                description: "Voer de vereiste hoeveelheid negatieve reacties in om een suggestie af te keuren...\n\n*Voer -1 in om uit te schakelen*",
                missingInput: "U bent vergeten een aantal vereiste reacties in te voeren.",
                invalidNumber: "Dat is geen geldig getal.",
                numberIsTooLow: "Het getal moet -1 of hoger zijn.",
                updated: "De hoeveelheid vereiste negatieve reacties voor automatische afkeuring is nu ``<Number>``."
            },
            deleteApproved: {
                description: "Voer **on** of **off** in...",
                missingInput: "Je bent vergeten om on of off in te vullen.",
                invalidInput: "Je kan alleen kiezen tussen **on** en **off**.",
                updated: "Goedgekeurde suggesties worden nu automatisch verwijderd."
            },
            deleteRejected: {
                description: "Voer **on** of **off** in...",
                missingInput: "Je bent vergeten om on of off in te vullen.",
                invalidInput: "Je kan alleen kiezen tussen **on** en **off**.",
                updated: "Afgekeurde suggesties worden nu automatisch verwijderd."
            }
        },
        suggest: {
            title: "Suggestions - Voorstellen",
            invalidChannel: "Zorg ervoor dat de eigenaar van de server de bot goed heeft geconfigureerd.",
            descriptionRequired: "Geef een beschrijving van het idee dat u wilt voorstellen.",
            description: "**Beschrijving:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
            sent: "Uw suggestie is succesvol aangemaakt! ([Klik hier](<Url>))"
        },
        approve: {
            title: "Suggestions - Goedkeuren",
            descriptionRequired: "Gelieve een geldige suggestie id in te vullen.",
            invalidInput: "Je hebt een ongeldige suggestie id ingevuld.",
            noSuggestionsFound: "Ik kon geen goedkeurbare suggesties vinden.",
            approved: "Ik heb de goedkeuring succesvol afgerond."
        },
        reject: {
            title: "Suggestions - Afkeuren",
            descriptionRequired: "Gelieve een geldige suggestie id in te vullen.",
            invalidInput: "Je hebt een ongeldige suggestie id ingevuld.",
            noSuggestionsFound: "Ik kon geen afkeurbare suggesties vinden.",
            approved: "Ik heb de afkeuring succesvol afgerond."
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
        donate: {
            title: "Suggestions - Doneer"
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
            sent: "Je bugrapport is onderweg naar de ontwikkelaars van de bot.\n\n*Bedankt voor het indienen!*"
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
    }

}
