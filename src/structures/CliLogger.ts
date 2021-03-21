export default class Logger {

    static log(msg: any, type: LogType) {
        // <type_color>[hour:minutes:seconds type]: <message>
        const date = new Date();

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        console.log(`${type as string}[${hours}:${minutes}:${seconds}]: ${msg}\x1b[0m`);
    }

    static printStartup() {
        console.log(`\x1b[36m
   _____          _          _  _____
  / ____|        | |        | |/ ____|
 | |     ___   __| | ___  __| | (___  _ __   _____      __
 | |    / _ \\ / _\` |/ _ \\/ _\` |\\___ \\| '_ \\ / _ \\ \\ /\\ / /
 | |___| (_) | (_| |  __/ (_| |____) | | | | (_) \\ V  V /
  \\_____\\___/ \\__,_|\\___|\\__,_|_____/|_| |_|\\___/ \\_/\\_/
\x1b[34m==========================================================\n\x1b[0m`);
    }

}

export enum LogType {
    INFO = "\x1b[36m",
    WARNING = "\x1b[33m",
    ERROR = "\x1b[31m"
}

/*
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
 */
