/**
 * Language: Russian/Русский (ru_RU)
 * Date: 21/05/2020 (DD/MM/YYYY)
 *
 * Translation by Jarnar (Discord: Jarnar#9709)
 * Edited and finished by &zdarova (Discord: &zdarova#6882)
 */
export default {

    /**
     * Global part
     *
     * Often used messages which are not necessarily associated with a specific function / implementation
     * are stated below
     */
    insufficientPermissions: "У вас нет прав для использования этой команды (вам нужны права <Permission>)",
    errorTitle: "Ошибка предложения",
    premiumFeature: "Эта команда может быть использована только на премиум-серверах! (`<Prefix>premium`)",

    /**
     * Commands part
     *
     * Messages associated to commands are stated below
     */
    commands: {
        config: {
            title: "Настройки",
            names: {
                prefix: "Префикс",
                language: "Язык",
                suggestionChannel: "Канал предложений",
                reportChannel: "Канал для жалоб",
                autoApprove: "Авто-одобрение",
                autoReject: "Авто-отказ",
                deleteApproved: "Удаление одобренных",
                deleteRejected: "Удаление откзанных"
            },
            prefix: {
                description: "Пожалуйста, напишите новый префикс...",
                missingInput: "Вы забыли написать новый префикс.",
                updated: "Префикс сменен на ``<Prefix>``."
            },
            language: {
                description: "Пожалуйста напишите, какой язык вы выбрали...",
                availableTitle: "Доступные языки",
                missingInput: "Вы забыли выбрать язык.",
                invalidLanguage: "В боте Suggestions нету такого языка.",
                updated: "Язык обновлён на ``<Language>``."
            },
            suggestionChannel: {
                description: "Пожалуйста, введите новый канал...",
                missingInput: "Вы забыли ввести новый канал.",
                invalidChannel: "Вы ввели недействительный канал.",
                updated: "Канал сменен на <#<ChannelID>>."
            },
            reportChannel: {
                description: "Пожалуйста, введите новый канал...",
                missingInput: "Вы забыли ввести новый канал.",
                invalidChannel: "Вы ввели недействительный канал.",
                updated: "Канал сменен на <#<ChannelID>>."
            },
            autoApprove: {
                description: "Пожалуйста, напишите количество позитивных реакций в цифрах, для одобрения предложения...\n\n*Укажите значение -1 для отключения*",
                missingInput: "Вы забыли написать, сколько нужно реакций.",
                invalidNumber: "Это неправильная цифра!",
                numberIsTooLow: "Цифра должна быть -1 или выше.",
                updated: "Количество положительных реакций для одобрения предложения теперь ``<Number>``."
            },
            autoReject: {
                description: "Пожалуйста, напишите количество негативных реакций в цифрах для отказа предложения...\n\n*Укажите значение -1 для отключения*",
                missingInput: "Вы забыли написать, сколько нужно реакций.",
                invalidNumber: "Это неправильная цифра!",
                numberIsTooLow: "Цифра должна быть -1 или выше.",
                updated: "Количество негативных реакций для отказа предложения теперь ``<Number>``."
            },
            deleteApproved: {
                description: "Пожалуйста введите **on** или **off**...",
                missingInput: "Вы забыли написать on или off.",
                invalidInput: "Вы можете выбрать только между **on** и **off**.",
                updatedEnabled: "Одобренные предложения теперь будут автоматически удаляться.",
                updatedDisabled: "Одобренные предложения теперь не будут автоматически удаляться."
            },
            deleteRejected: {
                description: "Пожалуста напишите **on** или **off**...",
                missingInput: "Вы забыли написать on или off.",
                invalidInput: "Вы можете выбрать только между **on** и **off**.",
                updatedEnabled: "Отклоненные предложения теперь будут автоматически удаляться.",
                updatedDisabled: "Отклоненные предложения теперь не будут автоматически удаляться."
            }
        },
        suggest: {
            title: "Suggestions - Предложение",
            invalidChannel: "Убедитесь в том, что администратор сервера настроил бота правильно!",
            descriptionRequired: "Пожалуйста, опишите свою идею!",
            description: "**Описание:** <Description>\n\n**Статус:** <Status>\n**ID:** <ID>",
            sent: "Предложение успешно добавлено! ([Нажать](<Url>))"
        },
        report: {
            title: "Suggestions - Жалоба",
            invalidChannel: "Убедитесь в том, что администратор сервера настроил бота правильно!",
            descriptionRequired: "Пожалуйста, заполните описание.",
            description: "**Описание:** <Description>\n\n**Статус:** <Status>\n**ID:** <ID>",
            sent: "Ваша жалоба была успешно отправлена."
        },
        approve: {
            title: "Suggestions - Одобрение",
            descriptionRequired: "Пожалуйста напишите ID предложения.",
            invalidInput: "Вы ввели неправильный ID предложения.",
            noSuggestionsFound: "Я не могу найти предложения, которые можно одобрить.",
            approved: "Предложение одобрено."
        },
        reject: {
            title: "Suggestions - Отказ",
            descriptionRequired: "Пожалуйста напишите ID предложения.",
            invalidInput: "Вы ввели неправильный ID предложения.",
            noReportsFound: "Я не могу найти предложения, которые можно отклонить.",
            rejected: "Предложение отклонено."
        },
        resolve: {
            title: "Suggestions - Решить вопрос",
            descriptionRequired: "Пожалуйста, заполните действительный идентификационный номер отчета.",
            invalidInput: "Вы заполнили недействительный идентификационный номер отчета.",
            noSuggestionsFound: "Я не смог найти ни одного подходящего отчета.",
            resolved: "Отчет был успешно разрешен."
        },
        list: {
            title: "Suggestions - Список",
            noSuggestions: "Нет ни одно открытого предложения на сервере.",
            description: "Вы можете посмотреть все открытые предложения ниже.",
            suggestionDescription: "**Описание:** <Description>\n**ID:** <ID>\n**Ссылка:** [Нажать](<Url>)"
        },
        uptime: {
            title: "Suggestions - Время работы",
            description: "Я в онлайне <Days> дней, <Hours> часов, <Minutes> минут и <Seconds> секунд!"
        },
        help: {
            title: "Suggestions - Помощь",
            commandTitle: "Команда помощи",
            serverTitle: "Сервер поддержки"
        },
        vote: {
            title: "Suggestions - Голосовать"
        },
        reportbug: {
            title: "Suggestions - Отчет об ошибке",
            descriptionRequired: "Пожалуйста, опишите что за баг вы нашли.",
            confirmation: "Вы уверены, что хотите сообщить об ошибке разработчикам бота?",
            cancelled: "Сообщение об ошибке успешно отменено.",
            sent: "Сообщение отправлено разработчикам.\n\n*Спасибо за сообщение!*"
        },
        premium: {
            title: "Suggestions - Премиум",
            description: "Всякий раз, когда вы покупаете премиум, вы получаете доступ к льготам, указанным ниже. Премиум взимается за каждый сервер и требует единовременной оплаты в размере 2,50$. Это позволит нашим разработчикам продолжить работу над ботом Suggestions и другими нашими проектами.",
            perksTitle: "Премиум-перки",
            perksDescription: "1. Ранний доступ к бета-функциям.\n2. Приоритетная поддержка.\n3. Премиум ранг в Discord-сервере CodedSnow. "
        },
        translation: {
            title: "Suggestions - Перевод",
            description: "Если вы хотите изменить язык бота Suggestions, воспользуйтесь`<Prefix>config`.\n\nДля получения более подробной информации о том, как написать текст на том или ином языке, ознакомьтесь, пожалуйста, с полем ниже.",
            contributeTitle: "Внести свой вклад",
            contributeDescription: "Мы всегда ищем людей для перевода нашего бота. Если вы хотите перевести бота на другой язык или внести изменения в язык, ознакомьтесь с инструкциями по переводу на нашей странице [на Github.](https://github.com/jerskisnow/Suggestions/tree/dev)."
        }
    },

    /*
     * Suggestions part
     *
     * Words associated with suggestions are stated below
     */
    suggestions: {
        open: "Открытое",
        approved: "Одобренное",
        rejected: "Отклоненное"
    },

    /*
     * Reports part
     *
     * Words associated with reports are stated below
     */
    reports: {
        open: "Открытая",
        resolved: "Решенная"
    }

}
