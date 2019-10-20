import cliColors from './structures/CLIColors';

export default (dbConnection) => {

    function tableExists(tablename, callback) {
        dbConnection.query("SELECT 1 FROM " + tablename + " LIMIT 1", (err) => {
            if (!err) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    console.log(cliColors.FgBlue + "\n---=[Setting Up Database]=---");

    /*
    Suggestion:
      - id
      - message
      - description
      - status
      - author
      - guild
    */
    tableExists("suggestions", (bool) => {
        if (!bool) {
            dbConnection.query("CREATE TABLE suggestions (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, message VARCHAR(60) NOT NULL, description TEXT NOT NULL, status VARCHAR(60) NOT NULL, author VARCHAR(60) NOT NULL, guild VARCHAR(60) NOT NULL)");
            console.log(cliColors.FgCyan + " >> Suggestions Table has been created!" + cliColors.Reset);
        } else {
            console.log(cliColors.FgYellow + " >> Suggestions Table already exists!" + cliColors.Reset);
        }
    });

    /*
    Guild:
      - prefix
      - channel
      - language
     */
    tableExists("configurations", (bool) => {
        if (!bool) {
            dbConnection.query("CREATE TABLE configurations (id VARCHAR(60) PRIMARY KEY NOT NULL, prefix VARCHAR(60), channel VARCHAR(60), language VARCHAR(60))");
            console.log(cliColors.FgCyan + " >> Configurations Table has been created!" + cliColors.Reset);
        } else {
            console.log(cliColors.FgYellow + " >> Configurations Table already exists!" + cliColors.Reset);
        }
    });

};
