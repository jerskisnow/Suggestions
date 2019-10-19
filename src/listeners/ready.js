import cliColors from '../structures/CLIColors';

module.exports = (client) => {
	
  // Pre-Define the activities list for the client's activity
  const activities_list = ["Suggestions", client.guilds.size + " Servers", client.users.size + " Users"];

  // First set the activitie to 'Watching Suggestions'
  client.user.setActivity("Suggestions", {
    type: "WATCHING",
  });

  // Activate an interval which runs the updateStatus every 5 seconds
  setInterval(updateStatus, 8000);

  // Print a message to the console that the events and commands has been loaded
  console.log(cliColors.FgBlue + "\n---=[Succesfully enabled the bot!]=---" + cliColors.Reset);

  // Update status function
  function updateStatus() {
    // calculate an index number fr the activities list array
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    // Finally change the set the activity status
    client.user.setActivity(activities_list[index], {
      type: "WATCHING",
	});
	
  }

};
