export default class Utils {

    /**
     * Use the language code to get the actual language file
     * @param  {string} languageName A valid language code
     * @return {NodeRequire} Returns the instance to the language file
     */
    languageCodeToObject(languageName: string): Object {
        return require(`../languages/${languageName}.utf8.js`).default;
    }

    /**
     * Get the channel id by stripping of characters from a channel mention string
     * @param  {string} channelInput Channel mention to strip
     * @return {string} Returns the channel id from the stripped channel mention
     */
    stripChannelInput(channelInput: string): string {
        return channelInput.replace('<#', '').replace('>', '');
    }

    /**
    * Reformat a language input into the valid and correctly capitilized language code
    * @param  {string} languageInput The input to reformat
    * @return {string} Returns the a valid laguage code
    */
    reformatLanguageCode(languageInput: string): string {
        const splittedInput: string[] = languageInput.split('_');
        return splittedInput[0].toLowerCase() + "_" + splittedInput[1].toUpperCase();
    }

}
