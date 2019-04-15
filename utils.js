class utils
{

	static languageCodeToFile(languageName)
	{
		return require(`./languages/${languageName}.utf8.js`);
	}

}

module.exports = utils;
