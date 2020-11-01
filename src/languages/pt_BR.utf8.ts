/**
 * Language: Portuguese (pt_BR)
 * Date: 07/03/2020 (MM/DD/YYYY)
 *
 * Translation by Sordinni#6464
 */
export default {

    /**
     * Global part
     *
     * Often used messages which are not necessarily associated with a specific function / implementation
     * are stated below
     */
    insufficientPermissions: "Você não tem permissão pra usar este comando. (<Permission> is required)",
    roleRequired: "You need the role `<Role>` in order to use that command.",
    errorTitle: "Suggestions - Erro",
    premiumFeature: "Este comando é apenas para servidores premium (`<Prefix>premium`)",

    /**
     * Commands part
     *
     * Messages associated to commands are stated below
     */
    commands: {
        config: {
            title: "Suggestions - Config",
            names: {
                prefix: "Prefixo",
                language: "Idioma",
                suggestionChannel: "Canal de sugestões",
                reportChannel: "Canal de report",
                autoApprove: "Aprovação automática",
                autoReject: "Rejeição automática",
                deleteApproved: "Deletar aprovadas",
                deleteRejected: "Deletar rejeitadas"
            },
            prefix: {
                description: "Digite um novo prefixo...",
                missingInput: "Você esqueceu de digitar o prefixo.",
                updated: "Prefixo atualizado para ``<Prefix>``."
            },
            language: {
                description: "Por favor, escolha um idioma...",
                availableTitle: "Idiomas disponíveis",
                missingInput: "Você esqueceu de escolher o idioma",
                invalidLanguage: "As sugestões não estão disponíveis nesse idioma.",
                updated: "Idioma foi atualizado para ``<Language>``."
            },
            suggestionChannel: {
                description: "Por favor, marque um canal...",
                missingInput: "Você esqueceu de marcar um canal.",
                invalidChannel: "Opa! Canal inválido!",
                updated: "Canal foi atualizado para <#<ChannelID>>."
            },
            reportChannel: {
                description: "Por favor, marque um canal...",
                missingInput: "Você esqueceu de marcar um canal.",
                invalidChannel: "Opa! Canal inválido.",
                updated: "Canal foi atualizado para <#<ChannelID>>."
            },
            autoApprove: {
                description: "Digite a quantidade exata de reações positivas para aprovar uma sugestão ...\n\n*Mande -1 para desativar*",
                missingInput: "Você esqueceu de digitar um número exato.",
                invalidNumber: "Ei, isso não é um número!.",
                numberIsTooLow: "O número tem que ser maior que -1.",
                updated: "A quantidade de reações positivas para a auto-aprovação agora é ``<Number>``."
            },
            autoReject: {
                description: "Digite a quantidade de reações negativas para rejeitar uma sugestão\n\n*Mande -1 pra desativar*",
                missingInput: "Ei, esqueceu de digitar o número!.",
                invalidNumber: "Isso é um número?.",
                numberIsTooLow: "O número tem que ser maior que -1.",
                updated: "A quantidade de reações negativas para a auto-rejeição agora é ``<Number>``."
            },
            deleteApproved: {
                description: "Por favor, digite **on** ou **off**...",
                missingInput: "Você esqueceu de ativar ou desativar.",
                invalidInput: "Você só pode escolher entre **on** ou **off**.",
                updatedEnabled: "Approved suggestions will now automatically deleted from now on.",
                updatedDisabled: "Approved suggestions won't be automatically deleted from now on."
            },
            deleteRejected: {
                description: "Por favor, digite **on** ou **off**...",
                missingInput: "Você esqueceu de ativar ou desativar.",
                invalidInput: "Você só pode escolher entre **on** ou **off**.",
                updatedEnabled: "Rejected suggestions will now automatically deleted from now on.",
                updatedDisabled: "Rejected suggestions won't be automatically deleted from now on."
            }
        },
        suggest: {
            title: "Suggestions - Sugerir",
            invalidChannel: "Verifique se o dono do servidor configurou o bot corretamente.",
            descriptionRequired: "Qual será a descrição da sua sugestão?",
            description: "**Descrição:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
            sent: "Sugestão enviada! ([clique aqui](<Url>))"
        },
        report: {
            title: "Suggestions - Relatório",
            invalidChannel: "Verifique se o dono do servidor configurou o bot corretamente.",
            descriptionRequired: "Por favor, crie uma descrição.",
            description: "**Descrição:** <Description>\n\n**Status:** <Status>\n**ID:** <ID>",
            sent: "Seu relatório foi enviado com sucesso."
        },
        approve: {
            title: "Suggestions - Aprovar",
            descriptionRequired: "Ponha o ID válido da sugestão.",
            invalidInput: "Você preencheu um ID de sugestão inválido.",
            noSuggestionsFound: "Não encontrei sugestões a serem aprovadas.",
            approved: "Eu completei a aprovação com sucesso."
        },
        reject: {
            title: "Suggestions - Rejeitar",
            descriptionRequired: "Ponha o ID válido da sugestão.",
            invalidInput: "Você preencheu um ID de sugestão inválido.",
            noSuggestionsFound: "Não encontrei sugestões a serem descartadas.",
            rejected: "Eu completei com sucesso a rejeição."
        },
        resolve: {
            title: "Suggestions - Resolve",
            descriptionRequired: "Please fill in an valid report id.",
            invalidInput: "You filled in an invalid report id.",
            noReportsFound: "I couldn't find any approvable reports.",
            resolved: "The report was successfully resolved."
        },
        list: {
            title: "Suggestions - Listas",
            noSuggestions: "Não há sugestões abertas para esta guild.",
            description: "Você pode ver todas as sugestões abertas logo abaixo.",
            suggestionDescription: "**Descrição:** <Description>\n**ID:** <ID>\n**Link:** [clique aqui](<Url>)"
        },
        help: {
            title: "Suggestions - Ajuda",
            commandTitle: "Comando Ajudar",
            serverTitle: "Servidor de Suporte"
        },
        vote: {
            title: "Suggestions - Votação"
        },
        reportbug: {
            title: "Suggestions - Reportar bug",
            descriptionRequired: "Por favor, descreva o bug que você encontrou.",
            confirmation: "Tem certeza de que deseja relatar o bug aos desenvolvedores?",
            cancelled: "O relatório do bug foi cancelado com sucesso.",
            sent: "Seu relatório de bugs está a caminho dos desenvolvedores. \n\n*Obrigado por enviar!*"
        },
        premium: {
            title: "Suggestions - Premium",
            description: "Sempre que você comprar premium, terá acesso às vantagens abaixo. O Premium é por servidor e exige um pagamento único de US $ 2,50 (R$13,05). Isso permitirá que nossos desenvolvedores continuem trabalhando nas sugestões e nas nossas",
            perksTitle: "Vantagens premium",
            perksDescription: "1. Acesso antecipado aos recursos beta.\n2. Prioridade no Suporte.\n3. Um cargo premium no servidor de Discord CodedSnow."
        },
        translation: {
            title: "Suggestions - Tradução",
            description: "Se você deseja alterar o idioma da sugestão, use `<Prefix>config`.\n\nPara informações adicionais, clique abaixo.",
            contributeTitle: "Contribuir",
            contributeDescription: "Estamos sempre procurando pessoas para traduzir nosso bot. Se você deseja traduzir o bot em um idioma ou se deseja fazer alterações em um, leia as instruções sobre tradução[github page](https://github.com/jerskisnow/Suggestions/tree/dev)."
        }
    },

    /*
     * Suggestions part
     *
     * Words associated with suggestions are stated below
     */
    suggestions: {
        open: "Aberta",
        approved: "Aprovada",
        rejected: "Rejeitada"
    },

    /*
     * Reports part
     *
     * Words associated with reports are stated below
     */
    reports: {
        open: "Aberto",
        resolved: "Resolvido"
    }

}
