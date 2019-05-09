class utils
{

	static languageCodeToFile(languageName)
	{
		return require(`./languages/${languageName}.utf8.js`);
	}

	static stripChannelInput(channelInput)
    {
    	return channelInput.replace('<', '').replace('#', '').replace('>', '');
    }

}

module.exports = utils;
