import Command from "../types/Command";

const botCache = {
    commands: new Map<string, Command>(),
    languages: new Map<string, any>()
}

export default botCache;
