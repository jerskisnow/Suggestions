import { ICommand } from '../managers/Commands';
import Config from '../types/Config';
import Language from '../types/Language';

const botCache = {
    commands: new Map<string, ICommand>(),
    // @ts-ignore
    config: {} as Config,
    languages: new Map<string, Language>()
}

export default botCache;
