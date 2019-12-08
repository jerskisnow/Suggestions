import { dbConnection } from '../structures/MySQL';
import cmdMap from '../structures/CMDMap';
import Utils from '../structures/Utils';
import utf8 from 'utf8';

const utils = new Utils();

module.exports = (client, message) => {

    // If the author is a bot, return
    if (message.author.bot) return;
    // If the message is not in a guild, return
    if (!message.guild) return;

    // Get the server's prefix
    dbConnection.query("SELECT prefix FROM configurations WHERE id = ?", [message.guild.id], (error, result) => {

        // Define the default prefix
        let prefix = process.env.COMMAND_PREFIX;

        // If there aren't any errors and if the prefix is not null
        if (!error && result.length !== 0 && result[0].prefix !== null) {
            // Change the prefix variable to the actual server prefix
            prefix = utf8.decode(result[0].prefix);
        }

        // I know, not the smoothest way to go but hé feel free to improve it
        if (process.env.DEV_MODE) {
            if (message.channel.id !== process.env.DEV_CHANNEL) return;
            prefix = "?";
        }

        // Check if the message contains the prefix
        if (message.content.startsWith(prefix)) {

            // Define the command arguments
            const args = message.content
                .slice(prefix.length)
                .trim()
                .split(/ +/g);

            // Define the commandName
            const command = args.shift().toLowerCase();

            // Define the command instance
            const cmdInstance = cmdMap.get(command);
            // Check if the command is undefined, if so return
            if (cmdInstance === undefined) return;

            // Get the server's language
            dbConnection.query("SELECT language FROM configurations WHERE id = ?", [message.guild.id], (err, res) => {

                // Pre-Define the langauge
                var languageCode = process.env.DEFAULT_LANGUAGE;

                // If there aren't any errors and if the languageC is not null
                if (!err && res.length !== 0 && res[0].language !== null) {
                    // Change the languageCode variable to the actual server languageCode
                    languageCode = res[0].language;
                }

                // Define the language file
                let language = utils.languageCodeToObject(languageCode);

                // Finally run the command file with the pre-defined parameters
                cmdInstance(client, message, language, prefix, args)
                // cmdInstance.run(client, message, language, prefix, args);

            });

        }

    });

    // ...

};
