const { Client, GatewayIntentBits } = require('discord.js');
const { token, prefix, logChannelId } = require('./config.json');
const { setupBot, helpCommand, statCommand, sendMessageCommand, setKeyCommand, resetKeyCommand } = require('./commands');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});

setupBot(client, logChannelId);

client.on('messageCreate', async message => {
    if (message.author.bot) {
        return;
    }

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        switch (command) {
            case 'help':
                helpCommand(message);
                break;
            case 'stat':
                statCommand(message);
                break;
            case 'sendmessage':
                sendMessageCommand(message, userKeys);
                break;
            case 'setkey':
                setKeyCommand(message, userKeys);
                break;
            case 'resetkey':
                resetKeyCommand(message, userKeys);
                break;
            // Ajoutez d'autres commandes au besoin
        }
    }
});

client.login(token);
