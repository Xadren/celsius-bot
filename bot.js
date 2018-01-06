const config = require("./config.json");
const Discord = require("discord.js");
const prefix = config.prefix;

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    // Generate an invite, and then log it to the console
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
    }).catch(err => {
        console.log(err.stack);
    });
});

bot.on("message", async message => {
    if(message.author.bot) return; // if the author of the message is a bot, do not execute
    if(message.channel.type === "dm") return; // if the channel of the message is a DM do not execute

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return; // exit the function call if the message isn't a command beginning with !

    if(command === `${prefix}celsius`){
        let response = Math.round((args - 32) * .5556); // Convert Farenheit to Celsius
        message.channel.send(`${response} °C`);
    }

    if(command === `${prefix}farenheit`){
        let response = Math.round((args * 1.8) + 32); // Convert Celsius to Farenheit
        message.channel.send(`${response} °F`);
    }

});


bot.login(config.token);