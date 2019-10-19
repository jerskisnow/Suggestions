export default class Utils {

    /**
     * Use the language code to get the actual language file
     * @param  {string} languageName A valid language code
     * @return {NodeRequire} Returns the instance to the language file
     */
    languageCodeToObject(languageName) {
        return require(`../languages/${languageName}.utf8.js`).default;
    }

    /**
     * Get the channel id by stripping of characters from a channel mention string
     * @param  {string} channelInput Channel mention to strip
     * @return {string} Returns the channel id from the stripped channel mention
     */
    stripChannelInput(channelInput) {
        return channelInput.replace('<', '').replace('#', '').replace('>', '');
    }

}