// Register the .env file
require('dotenv').config();

// Defining the modules right here
const Discord = require('discord.js');
const mysql = require('mysql');
const Enmap = require('enmap');
const fs = require('fs');

// Making an instance of the Discord Client
const client = new Discord.Client();

// Defining the connection to the database
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

var isDatabaseConnected = false;

// Connecting to the database
con.connect(err => {
  // Check for any errors
  if (err)
  {
    // throw err;
    console.log("\nCouldn't connect to the database!");
  }
  // If there aren't any errors execute the code within the else statement's brackets
  else
  {
    isDatabaseConnected = true;
    console.log("\nConnected to the database!");
  }
});

// Making an instance, accessable from client, of the database connection
client.dbConnection = con;

// Get all the files in the event folder
fs.readdir("./events/", (err, files) => {
  // Return and send a message to the console if an error appears
  if (err) return console.error(err);
  // Print to the console that the events are being loaded
  console.log("\n---=[Loading Events...]=---");
  // Loop through the files and execute code for each one of them
  files.forEach(file => {
    // Defines the event file
    const event = require(`./events/${file}`);
    // Defines the event name
    let eventName = file.split(".")[0];
    // Print to the console that the event has been loaded
    console.log(` - ${eventName} has been loaded!`);
    // Activate the litener for that event
    client.on(eventName, event.bind(null, client));
  });
});

// Make an instance, accessable from client, of the enmap for the commands
client.commands = new Enmap();

// Get all the files in the commands folder
fs.readdir("./commands/", (err, files) => {
  // Return and send a message to the console if an error appears
  if (err) return console.error(err);
  // Print to the consoel that the commands are being loaded
  console.log("\n---=[Loading Commands...]=---");
  // Loop through the files and execute code for each one of them
  files.forEach(file => {
    // Return if a file doesn't have the extention .js
    if (!file.endsWith(".js")) return;
    // Defines the command file
    let props = require(`./commands/${file}`);
    // Defines the command name
    let commandName = file.split(".")[0];
    // Print to the console that the command has been loaded
    console.log(` - ${commandName} has been loaded!`);
    // Finally add the name of the command and the command's properties to the commmands enmap
    client.commands.set(commandName, props);
  });
});

// Get all the files in the apis folder
fs.readdir('./apis/', (err, files) => {
  // Return and send a message to the console if an error appears
  if (err) return console.error(err);
  // Print to the consoel that the commands are being loaded
  console.log("\n---=[Loading Apis...]=---");
  files.forEach(file => {
    // Return if a file doesn't have the extention .js
    if (!file.endsWith(".js")) return;
    // Defines the command file
    let apiFile = require(`./apis/${file}`);
    // Defines the command name
    let apiName = file.split(".")[0];
    // Print to the console that the command has been loaded
    console.log(` - ${apiName} has been loaded!`);
    // Finally run the api file
    apiFile.run(client);
  });
});

// Finally log into the discord client
client.login(process.env.TOKEN);

module.exports.isDatabaseConnected = isDatabaseConnected;
