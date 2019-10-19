import * as mysql from 'mysql';
import SetupDB from '../setupdb';
import cliColors from '../structures/CLIColors';

let dbConnection = null;

export default class MySQL {
  createConnection() {
    const con = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    con.connect((err) => {
      if (err)
        if (err.toString() === `Error: connect ECONNREFUSED ${process.env.DB_HOST}:${process.env.DB_PORT}`)
          return console.log(cliColors.FgRed + "\nCouldn't connect to the database! (Data use disabled)" + cliColors.Reset);
        else if (err.toString() === `Error: ER_BAD_DB_ERROR: Unknown database '${process.env.DB_DATABASE}'`)
          return this.registerConnection();
        else return console.log(err);

      console.log("\nConnected to the database!");
    });

    dbConnection = con;
  }

  async registerConnection() {
    const con = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });

    await con.connect((err) => {
      if (err) return console.log(err);
      console.log("\nConnected to the database!");
    });

    await con.query("CREATE DATABASE " + process.env.DB_DATABASE);
    await con.query("USE " + process.env.DB_DATABASE);

    await new SetupDB(con);

    dbConnection = con;
  }
}

export { dbConnection };
