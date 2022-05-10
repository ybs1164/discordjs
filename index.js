const { Client, Intents } = require('discord.js');
const { parsing } = require('./parse');
const { createVM } = require('./vm2');

require('dotenv').config();


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const vmList = {};


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    // return codes for message of user
    const codes = parsing(client.user, message.content);
    let msg = "";
    if (!codes) {
        return;
    }

	if (vmList[message.guild.id] === undefined) {
		vmList[message.guild.id] = createVM();
	}
	const run = (code) => vmList[message.guild.id].run(code);

    try {
        for (const code of codes) {
            const value = run(code.concat("\n"));
            // const list = run(code.concat("\n"));
            let result = "";
            result = value;
            // list.forEach((str) => {
            //     result = result.concat(str);
            // });
            msg = msg.concat("```\n" + result + "```");
        }

        if (msg.length > 2000) {
            msg = msg.substring(0, 1994).concat("...```");
        }

        message.reply(msg);
    } catch (e) {
        message.reply(`\`${e.toString()}\``);
    }
});


client.login(process.env.TOKEN);
