require('dotenv').config();
// Define mysql
const mysql = require('mysql');

// Setup a database connection variable
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Connect to the database
con.connect(err => {
	if (err) throw err;
	console.log("\nConnected to the database server!");
});

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
	if (!bool)
	{
		con.query("CREATE TABLE suggestions (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, message VARCHAR(60) NOT NULL, description TEXT NOT NULL, status VARCHAR(60) NOT NULL, author VARCHAR(60), guild VARCHAR(60) NOT NULL)");
		console.log(" - Suggestions Table has been created!");
	}
	else
	{
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
	if (!bool)
	{
		con.query("CREATE TABLE configurations (id VARCHAR(60) PRIMARY KEY NOT NULL, prefix VARCHAR(60), channel VARCHAR(60), language VARCHAR(60))");
		console.log(" - Configurations Table has been created!");
	}
	else
	{
		console.log(" - Configurations Table already exists!");
	}
})

// The function listed below are making sure that the statements above can be executed without any errors
function tableExists(tablename, callback) {
	con.query("SELECT 1 FROM " + tablename + " LIMIT 1", (err, result) => {
		if (!err) {
			callback(true);
		} else {
			callback(false);
		}
	});
}
