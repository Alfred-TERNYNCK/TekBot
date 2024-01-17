const { Client, GatewayIntentBits } = require('discord.js');
const { token, prefix, logChannelId } = require('./data/config.json');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});

client.commands = new Map();
const userKeys = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const planningCommand = require('./commands/planning');
planningCommand(client, prefix);
const moduleCommand = require('./commands/currentModule');
moduleCommand(client, prefix);
const noteCommand = require('./commands/module');

const setKeyCommand = require('./commands/setKey');
setKeyCommand(client, prefix, userKeys);
const resetKeyCommand = require('./commands/resetKey');
resetKeyCommand(client, prefix, userKeys);


client.commands.set(noteCommand.name, noteCommand);


client.once('ready', () => {
    console.log(`Prêt ! Connecté en tant que ${client.user.tag}`);

    const logChannel = client.channels.cache.get(logChannelId);

    if (logChannel) {
        logChannel.send('Je suis maintenant en ligne !');
    } else {
        console.error('Le canal de logs est introuvable. Assurez-vous que le canal log_bot existe et que le bot a les autorisations nécessaires.');
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);  // Passer les arguments à la fonction execute
    } catch (error) {
        console.error(error);
        message.reply('Une erreur s\'est produite lors de l\'exécution de la commande.');
    }
});


client.login(token);
