/**
 * Language: Spanish / Español (es_ES)
 * Date: 12/07/2020 (MM/DD/YYYY)
 *
 * Translation by Krak798 (Discord: Krak798#0101)
 */
export default {

    /**
     * Global part
     *
     * Often used messages which are not necessarily associated with a specific function / implementation
     * are stated below
     */
    insufficientPermissions: "¡No tienes permiso para utilizar ese comando. (El permiso <Permission> es obligatorio)",
    roleRequired: "You need the role `<Role>` in order to use that command.",
    errorTitle: "Suggestions - Error",
    premiumFeature: "Ese comando está reservado para los servidores premium. (`<Prefix>premium`)",

    /**
     * Commands part
     *
     * Messages associated to commands are stated below
     */
    commands: {
        config: {
            title: "Suggestions - Configuración",
            names: {
                prefix: "Prefijo",
                language: "Lengua",
                suggestionChannel: "Canal de sugerencias",
                reportChannel: "Canal de reportes",
                autoApprove: "Auto aprobar",
                autoReject: "Auto rechazar",
                deleteApproved: "Eliminar aprobados",
                deleteRejected: "Eliminar rechazados"
            },
            prefix: {
                description: "Por favor introduzca el nuevo prefijo...",
                missingInput: "Has olvidado introducir el nuevo prefijo.",
                updated: "El prefijo se ha establecido a``<Prefix>``."
            },
            language: {
                description: "Por favor, introduzca la nueva lengua...",
                availableTitle: "Lenguas disponibles",
                missingInput: "Has olvidado introducir la lengua nueva.",
                invalidLanguage: "Suggestions no está disponible en esa lengua.",
                updated: "La lengua ha sido cambiada a ``<Language>``."
            },
            suggestionChannel: {
                description: "Por favor, introduzca un nuevo canal...",
                missingInput: "Has olvidado introducir un nuevo canal.",
                invalidChannel: "Has introducido un canal no válido.",
                updated: "Canal actualizado a <#<ChannelID>>."
            },
            reportChannel: {
                description: "Por favor, introduzca un nuevo canal...",
                missingInput: "Has olvidado introducir un nuevo canal.",
                invalidChannel: "Has introducido un canal no válido.",
                updated: "Canal actualizado a <#<ChannelID>>."
            },
            autoApprove: {
                description: "Por favor, introduzca cantidad necesaria de reacciones positivas para aprobar la sugerencia...\n\n*Introduzca -1 para deshabilitar*",
                missingInput: "Has olvidado introducir el número de reacciones necesarias.",
                invalidNumber: "Ese no es un número válido.",
                numberIsTooLow: "El número debe ser -1 o superior.",
                updated: "La cantidad necesaria de reacciones positivas para auto probar es ahora ``<Number>``."
            },
            autoReject: {
                description: "Por favor, introduzca cantidad necesaria de reacciones negativas para rechazar la sugerencia...\n\n*Introduzca -1 para deshabilitar*",
                missingInput: "Has olvidado introducir el número de reacciones necesarias.",
                invalidNumber: "Ese no es un número válido.",
                numberIsTooLow: "El número debe ser -1 o superior.",
                updated: "La cantidad necesaria de reacciones positivas para auto rechazar es ahora ``<Number>``."
            },
            deleteApproved: {
                description: "Por favor, seleccione **on** u **off**...",
                missingInput: "Has olvidado seleccionar entre **on** y **off**.",
                invalidInput: "Solo puedes seleccionar entre **on** u **off**.",
                updatedEnabled: "Las sugerencias aprobadas se eliminarán desde ahora.",
                updatedDisabled: "Las sugerencias aprobadas no se eliminarán desde ahora."
            },
            deleteRejected: {
                description: "Por favor, seleccione **on** u **off**...",
                missingInput: "Has olvidado seleccionar entre **on** u **off**.",
                invalidInput: "Solo puedes seleccionar entre **on** u **off**.",
                updatedEnabled: "Las sugerencias rechazadas se eliminarán desde ahora.",
                updatedDisabled: "Las sugerencias rechazadas no se eliminarán desde ahora."
            }
        },
        suggest: {
            title: "Suggestions - Sugerencia",
            invalidChannel: "Por favor, confirma que el dueño del servidor haya configurado correctamente el servidor.",
            descriptionRequired: "Por favor, danos una descripción de la sugerencia que quieres sugerir.",
            description: "**Descripción:** <Description>\n\n**Estado:** <Status>\n**ID:** <ID>",
            sent: "Tu sugerencia ha sido creada correctamente! ([Click aquí](<Url>))"
        },
        report: {
            title: "Suggestions - Reporte",
            invalidChannel: "Por favor, confirma que el dueño del servidor haya configurado correctamente el servidor.",
            descriptionRequired: "Por favor, danos una descripción del reporte que quieres reportar.",
            description: "**Descripción:** <Description>\n\n**Estado:** <Status>\n**ID:** <ID>",
            sent: "TU reporte ha sido enviado correctamente."
        },
        approve: {
            title: "Suggestions - Aprobar",
            descriptionRequired: "Por favor, introduzca una ID válida.",
            invalidInput: "Has introducido una ID no válida.",
            noSuggestionsFound: "No puedo encontrar ninguna sugerencia aprobable.",
            approved: "He completado el aprobado correctamente."
        },
        reject: {
            title: "Suggestions - Rechazar",
            descriptionRequired: "Por favor, introduzca una ID válida.",
            invalidInput: "Has introducido una ID no válida.",
            noSuggestionsFound: "No puedo encontrar ninguna sugerencia rechazable.",
            rejected: "He completado el rechazo correctamente."
        },
        resolve: {
            title: "Suggestions - Resolver",
            descriptionRequired: "Por favor, introduzca una ID válida.",
            invalidInput: "Has introducido una ID no válida.",
            noReportsFound: "No puedo encontrar ningún reporte aprovable.",
            resolved: "He completado el aprovado correctamente."
        },
        list: {
            title: "Suggestions - Lista",
            noSuggestions: "No hay ninguna sugerencia abierta para este servidor.",
            description: "Puedes ver todas la sugerencias abiertas aquí abajo.",
            suggestionDescription: "**Descripción:** <Description>\n**ID:** <ID>\n**Enlace:** [Click aquí](<Url>)"
        },
        uptime: {
            title: "Suggestions - Tiempo de funcionamiento",
            description: "¡He estado funcionando durante <Days> días, <Hours> horas, <Minutes> minutos y <Seconds> segundos!"
        },
        help: {
            title: "Suggestions - Ayuda",
            commandTitle: "Ayuda sobre los comandos",
            serverTitle: "Servidor de soporte"
        },
        vote: {
            title: "Suggestions - Votación"
        },
        reportbug: {
            title: "Suggestions - Reporte de error",
            descriptionRequired: "Por favor, danos una descripción del error o problema.",
            confirmation: "¿Estás seguro que quieres enviar este reporte de error a los autores del bot?",
            cancelled: "El envío del reporte se ha cancelado",
            sent: "Tu reporte ha sido enviado a los desarrolladores del bot.\n\n*Gracias por sumisión!*"
        },
        premium: {
            title: "Suggestions - Premium",
            description: "Cuando compres el premium podrás acceder a estas funciones. Premium es por cada servidor y cuesta un pago único de 2.50$. Esto permitirá a los desarolladores seguir con Suggestions y otros proyectos.",
            perksTitle: "Premium Perks",
            perksDescription: "1. Acceso anticipado a las funciones beta.\n2. Soporte prioritario.\n3. Un rango premium en el servidor de discord de CodedSnow."
        },
        translation: {
            title: "Suggestions - Translation",
            description: "Si estas buscando como cambiar el lenguaje de Suggestios, por favor `<Prefix>config`.\n\nPara más inforamción sobre traducciones lea el campo siguiente.",
            contributeTitle: "Contribuir",
            contributeDescription: "Siiempre estamos buscando a gente que pueda traducir nuestro bot. Si quieres traducir nuestro bot a tu idioma o si quieres hacer cambios en una lengua, por favor, lea las instrucciones sobre traducción en nuestra [página de GitHub](https://github.com/jerskisnow/Suggestions/tree/dev)."
        }
    },

    /*
     * Suggestions part
     *
     * Words associated with suggestions are stated below
     */
    suggestions: {
        open: "Abierta",
        approved: "Aprovada",
        rejected: "Rechazada"
    },

    /*
     * Reports part
     *
     * Words associated with reports are stated below
     */
    reports: {
        open: "Abierto",
        resolved: "Resuelto"
    }

}
