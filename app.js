require('dotenv').config();

const Discord = require('discord.js');
const mysql = require('mysql');
const Enmap = require('enmap');
const fs = require('fs');

const client = new Discord.Client();

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

con.connect(err => {
  if (err) throw err;
  console.log("\nConnected to the database!");
});

client.dbConnection = con;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  console.log("\n---=[Loading Events...]=---");
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(` - ${eventName} has been loaded!`);
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  console.log("\n---=[Loading Commands...]=---");
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(` - ${commandName} has been loaded!`);
    client.commands.set(commandName, props);
  });
});

client.login(process.env.TOKEN);