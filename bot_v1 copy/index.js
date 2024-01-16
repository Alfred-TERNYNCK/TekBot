const { Client, GatewayIntentBits } = require('discord.js');
const { token, prefix, logChannelId } = require('./config.json');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});

const userKeys = new Map();

// Charger les modules
require('./modules/onReady')(client, logChannelId);
require('./modules/helpCommand')(client, prefix);
require('./modules/statCommand')(client, prefix, userKeys);
require('./modules/setKeyCommand')(client, prefix, userKeys);
require('./modules/resetKeyCommand')(client, prefix, userKeys);

// Lancer le bot
client.login(token);
