/*
 * This class was generated automatically
 */
interface Database {
    hostname: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

interface Emojis {
    approve: string;
    reject: string;
}

interface Colors {
    red: string;
    green: string;
    blue: string;
}

interface Links {
    botInvite: string;
    serverInvite: string;
    donateLink: string;
    voteLink: string;
    languageListLink: string;
}

interface Apis {
    dblToken: string;
}

interface Channels {
    devLogs: string;
}

export default interface Config {
    token: string;
    prefix: string;
    language: string;
    database: Database;
    emojis: Emojis;
    colors: Colors;
    links: Links;
    apis: Apis;
    channels: Channels;
    oldGuildDataBackend: string;
    developerID: string;
    advancedLogging: boolean;
}