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
            console.log(" - Suggestions Table has been created!");
        } else {
            console.log(" - Suggestions Table already exists!");
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
            console.log(" - Configurations Table has been created!");
        } else {
            console.log(" - Configurations Table already exists!");
        }
    });

};
