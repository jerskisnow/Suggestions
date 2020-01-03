export default {

    /*
    General Part
     */
    insufficientPermissions: "Nie masz wystarczających uprawnień, aby wykonać to polecenie! (<Permission> wymagany)",
    errorTitle: "Suggestions - Błąd",
    exampleTitle: "Przykład",
    comingSoonTitle: "Suggestions - Wkrótce!",
    comingSoonDescription: "Ta opcja będzie dostępna wkrótce!",
    checkPrivateMessages: "Proszę sprawdzić swoje prywatne wiadomości.",
    cannotSendPrivateMessages: "Nie mogę wysłać prywatnej wiadomości, więc wyślę ją tu.",

    /*
    Actual Suggestion Part
     */
    suggestionDescription: "**Opis:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
    suggestionStatusOpen: "Otwarta",
    suggestionStatusApproved: "Zatwierdzona",
    suggestionStatusRejected: "Odrzucona",

    /*
    Commands Part
     */
    uptimeTitle: "Suggestions - Czas Pracy",
    uptimeDescription: "Jestem online <Days> dzień, <Hours> godzinę, <Minutes> minutę i <Seconds> sekundę!",

    reportBugTitle: "Suggestions - Zgłoś błąd",
    reportBugMissingArguments: "Proszę o opisanie błędu!",
    reportCooldownActive: "Możesz zgłoszać błąd tylko raz na godzinę!",
    reportBugSuccess: "Dziękuję za zgłoszenie błędu! Nasz zespół przyjży mu się jak najszybciej!",

    suggestMissingArguments: "Proszę o wpisanie sugestii!",
    suggestExample: "<Prefix>suggest nowy kanał na memy!",
    suggestInvalidChannel: "Proszę o ustawienie `kanału sugestii` używając komendy config.",
    suggestTitle: "Suggestions - Sugestia",
    suggestSuccess: "Twoja sugestia została wysłana pomyślnie! ([Naciśnij tutaj](<SuggestionURL>))",

    voteTitle: "Suggestions - Zagłosuj",
    voteDescription: "Możesz zagłosować na nas, klikając [tutaj](<VoteURL>)",

    inviteTitle: "Suggestions - Zaproszenie",
    inviteDescription: "**Zaproś Bota:** <BotURL>\n**Serwer Wsparcia:** <ServerURL>",

    approveMissingArguments: "Proszę wpisać przynajmniej numer sugestii, aby ją zaakceptować!",
    approveExample: "<Prefix>approve 1 Tak, ciekawy pomysł!",
    approveInvalidSuggestion: "Nie mogę zaakceptować sugestii, która nie istnieje!",
    approveSuggestionAlreadyApproved: "Ta sugestia jest już zaakceptowana!",
    approveAuthorTitle: "Zatwierdzenie Sugestii",
    approveAuthorDescription: "Twoja sugestia na `<GuildName>` została zatwierdzona.\n\n**Opis:** <Description>\n\n**Powód:** <Reason>",
    approveTitle: "Suggestions - Zatwierdzenie",
    approveDescription: "Udane zatwierdzenie sugestii o ID `<SuggestionID>`!",

    rejectMissingArguments: "Proszę wpisać przynajmniej numer sugestii, aby ją odrzucić!",
    rejectExample: "<Prefix>reject 1 Nie, dziękujemy!",
    rejectInvalidSuggestion: "Nie mogę odrzucić sugestii, która nie istnieje!",
    rejectSuggestionAlreadyRejected: "Ta sugestia jest już odrzucona!",
    rejectAuthorTitle: "Odrzucenie Sugestii",
    rejectAuthorDescription: "Twoja sugestia na `<GuildName>` została odrzucona.\n\n**Opis:** <Description>\n\n**Powód:** <Reason>",
    rejectTitle: "Suggestions - Odrzucenie",
    rejectDescription: "Udane odrzucenie sugestii o ID `<SuggestionID>`!",

    configTitle: "Suggestions - Konfiguracja",

    configPrefixMissingArguments: "Proszę wpisać znak, aby zmienić prefiks!",
    configPrefixExample: "<Prefix>config prefix ?",
    configPrefixSuccessDescription: "Pomyślnie zaktualizowano prefiks na `<NewPrefix>`",

    configChannelMissingArguments: "Proszę o wpisanie poprawnego kanału!",
    configChannelExample: "<Prefix>config channel #suggestion-channel",
    configChannelSuccessDescription: "Pomyślnie zaktualizowano kanał na `<#<NewChannelID>>`",

    configLanguageMissingArguments: "Proszę o wpisanie poprawnego kodu jezyka!",
    configLanguageExample: "<Prefix>config langauge en_US",
    configLanguageInvalidLanguage: "Proszę o wybranie poprawnego Języka!\n\n**Lista Języków:** <LanguageList>",
    configLanguageSuccessDescription: "Pomyślnie zaktualizowano język na `<NewLanguageCode>`",

    donateTitle: "Suggestions - Darowizny",
    donateDescription: "Nie czuj się zobowiązany/-a do darowizny! Nie jest to wymóg, ale pomaga w utrzymaniu naszych projektów, międzyinnymi Suggestions.\n\nJeśli zdecydujesz się na darowiznę skontaktuj się z `jerskisnow#8214` , aby otrzymać rangę premium na oficjalnym serwerze discord `CodedSnow` ([Naciśnij tutaj](<ServerURL>))! Po otrzymaniu rangi premium zyskasz dodatkowe profity i będziemy wdzięczni!",
    donatePaymentmethodsTitle: "Metody Płatności",

    listNoSuggestionsFoundDescription: "W tej chwili nie ma żadnych otwartych sugestii.",
    listTitle: "Suggestions - Lista",
    listDescription: "Wszystkie aktywne/otwarte sugestie znajdują się poniżej!",
    listSuggestionTitle: "Sugestia od <User>",
    listSuggestionDescription: "**Opis:** <Description>\n**ID:** <SuggestionID>\n**Link:** [Naciśnij tutaj](<SuggestionURL>)",

    helpTitle: "Suggestions - Pomoc",
    helpExplanationApprove: "Zatwierdzenie sugestii (MANAGE_MESSAGES wymagane)",
    helpExplanationConfig: "Konfiguracja Suggestions (ADMINISTRATOR wymagany)",
    helpExplanationDonate: "Informacje o darowiznach!",
    helpExplanationHelp: "Pomoc, lista komend",
    helpExplanationInvite: "Aby otrzymać zaproszenie",
    helpExplanationList: "Lista wszystkich `aktywnych` suggestii",
    helpExplanationReject: "Odrzucenie sugestii (MANAGE_MESSAGES wymagane)",
    helpExplanationReportbug: "Aby zgłośić błąd do deweloperów",
    helpExplanationSuggest: "Aby wysłać sugestię",
    helpExplanationUptime: "Czas pracy Suggestions",
    helpExplanationVote: "Link do głosowania"

}