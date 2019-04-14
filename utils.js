class utils
{

	static generateSuggestionID()
	{
		return Math.floor(Math.random() * 9000000000) + 1000000000;
	}

	static languageCodeToFile(languageName)
	{
		return require(`./languages/${languageName}.utf8.js`);
	}

}

module.exports = utils;
