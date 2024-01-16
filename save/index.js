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
// Utilisation d'une Map pour stocker les clés d'authentification associées à chaque utilisateur
const userKeys = new Map();

client.once('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Récupérer le canal de logs par ID
    const logChannel = client.channels.cache.get(logChannelId);

    // Vérifier si le canal de logs existe
    if (logChannel) {
        logChannel.send('Je suis maintenant en ligne!');
    } else {
        console.error('Le canal de logs est introuvable. Assurez-vous que le canal log_bot existe et que le bot a les autorisations nécessaires.');
    }
});

// help command

client.on('messageCreate', async message => {
    if (message.author.bot) {
        return;
    }

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'help') {
            const helpEmbed = {
                color: 0x0099ff,
                title: 'Help',
                description: 'Liste des commandes',
                fields: [
                    {
                        name: 'Commandes',
                        value: '!help : Affiche la liste des commandes\n!stat : Affiche les informations de l\'utilisateur mentionné\n !setkey : Envoie un message privé à TekBot pour enregistrer ta clé d\'authentification',
                    },
                ],
            };

            return message.channel.send({ embeds: [helpEmbed] });
        }
    }

}
);

// stat command

client.on('messageCreate', async message => {
    if (message.author.bot) {
        return;
    }

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'stat') {
            const user = message.mentions.users.first();

            if (!user) {
                return message.reply('Veuillez mentionner un utilisateur valide.');
            }

            const key = userKeys.get(user.id);

            if (!key) {
                return message.reply('Cet utilisateur n\'a pas de clé d\'authentification.');
            }

            const statEmbed = {
                color: 0x0099ff,
                title: 'Statistiques',
                description: 'Statistiques de l\'utilisateur',
                fields: [
                    {
                        name: 'Clé d\'authentification',
                        value: key,
                    },
                ],
            };

            return message.channel.send({ embeds: [statEmbed] });
        }
    }

}
);

// envoie automatique de message privé a tout les membres qui n'ont pas envoyé leurs clefs d'authentification au bot quand je le lance, mais uniquement a ceux qui n'on pas encore envoyé leurs clefs d'authentification


client.on('messageCreate', async message => {
    // Vérifier si le message provient d'un utilisateur (pas un bot)
    if (message.author.bot) {
        return;
    }

    // Vérifier si le message est une commande dans le chat général
    if (message.content.startsWith(prefix)) {
        // Séparer la commande et les arguments
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        // Vérifier si la commande est "!sendmessage"
        if (command === 'setkey') {
            // Envoyer un message privé à l'utilisateur
            message.author.send("Bonjour, afin de pouvoir utiliser toutes les fonctionnalitées de TekBot merci de renseigner votre clef d'authentification de compte Epitech.\n" +
            "Pour cela rendez vous sur le site suivant et copiez collez votre clef comme l'exemple ci-dessous : \n" +
            "auth-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
            "https://intra.epitech.eu/admin/autolog\n");
        }
    }

    // Vériifer si le message commence par "auth-"
    if (message.content.startsWith('auth-')) {
        // Vérifier si l'utilisateur a déjà envoyé sa clé
        if (userKeys.has(message.author.id)) {
            return message.reply('Vous avez déjà envoyé votre clé d\'authentification.');
        }

        // Ajouter la clé d'authentification à la Map
        userKeys.set(message.author.id, message.content);

        // Envoyer un message de confirmation
        message.reply('Votre clé d\'authentification a bien été enregistrée.');
    }
}
);

client.login(token);
