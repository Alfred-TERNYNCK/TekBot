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
                return message.reply('Veuillez mentionner un utilisateur valide. Utilisez !stat @pseudo');
            }

            const key = userKeys.get(user.id);

            if (!key) {
                return message.reply('Cet utilisateur n\'a pas de clé d\'authentification. Utilisez !setkey pour enregistrer une clé.');
            }

            const statEmbed = {
                color: 0x0099ff,
                title: 'Statistiques',
                description: 'Pseudo de l\'utilisateur',
                fields: [
                    {
                        name: 'Pseudo',
                        value: user.username,
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

        // Vérifier si la commande est "!setkey"
        if (command === 'setkey') {
            // Vérifier si l'utilisateur a déjà une clé d'authentification
            if (userKeys.has(message.author.id)) {
                // Si oui, envoyer un message dans le même canal
                return message.channel.send('Vous avez déjà une clé d\'authentification. Si vous souhaitez la changer, faites !resetkey.');
            }

            // Envoyer un message privé à l'utilisateur
            message.author.send("Bonjour, afin de pouvoir utiliser toutes les fonctionnalités de TekBot merci de renseigner votre clef d'authentification de compte Epitech.\n" +
            "Pour cela, rendez vous sur le site suivant et copiez collez votre clef comme l'exemple ci-dessous : \n" +
            "auth-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
            "https://intra.epitech.eu/admin/autolog\n");
        }
    }

    // Vérifier si le message commence par "auth-"
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
});


client.on('messageCreate', async message => {
    if (message.author.bot) {
        return;
    }

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'resetkey') {
            if (userKeys.has(message.author.id)) {
                // effacer la clé d'authentification de la Map
                userKeys.delete(message.author.id);
                message.reply('Votre clé d\'authentification a été réinitialisée avec succès.\n' +'Veuillez renvoyer votre clé d\'authentification avec la commande !setkey');
            } else {
                message.reply('Vous n\'avez pas encore enregistré de clé d\'authentification. Utilisez !setkey pour enregistrer une clé.');
            }
        }
    }

}
);

const axios = require('axios');

client.on('messageCreate', async message => {
    // Vérifier si le message provient d'un utilisateur (pas un bot)
    if (message.author.bot) {
        return;
    }

    // Vérifier si la commande est !getinfo
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
    
        if (command === 'getinfo') {
            // Vérifiez si l'utilisateur a déjà fourni la clé d'autologin
            if (!userKeys.has(message.author.id)) {
                return message.reply('Veuillez fournir votre clé d\'autologin en message privé au bot.');
            }

            // Obtenez la clé d'autologin de l'utilisateur à partir de la Map userKeys
            const autologinKey = userKeys.get(message.author.id);

            try {
                // Modifiez le lien pour extraire les données du site
                const apiUrl = `https://intra.epitech.eu/user/?autologin=${autologinKey}`;

                // Effectuez la requête HTTP pour obtenir les informations du site
                const response = await axios.get(apiUrl);

                // Vérifiez si la requête a réussi (code 200)
                if (response.status === 200) {
                    // Vous pouvez traiter les données ici selon la structure de la réponse du site
                    // Pour l'instant, renvoyons simplement un message confirmant la connexion
                    return message.reply('Vous êtes bien sur la page. Les informations peuvent être extraites ici.');
                }
            } catch (error) {
                // Gérez les erreurs liées à la requête ici
                console.error('Erreur de requête :', error.message);
                return message.reply('Une erreur s\'est produite lors de la récupération des informations.');
            }
        }
    }
}
);


// await page.goto('https://login.microsoftonline.com/common/oauth2/authorize?response_type-code&client_id=e05d4149-1624-4627-aSba-7472a39e43ab8redirect_uri-https%3A%2F%2Fintra.epitech.eu%2Fauth%2Foffice3658state-%2Fuser%2F');

// module.exports = {
//     name: 'getinfo',
//     description: 'Obtient des informations à partir du lien d\'authentification',
//     async execute(message, args, userKeys) {
//         // Vérifiez si l'utilisateur a déjà fourni la clé d'autologin
//         if (!userKeys.hasOwnProperty(message.author.id)) {
//             return message.reply('Veuillez fournir votre clé d\'autologin en message privé au bot.');
//         }

//         // Obtenez la clé d'autologin de l'utilisateur à partir de l'objet userKeys
//         const autologinKey = userKeys[message.author.id];

//         try {
//             // Modifiez le lien pour extraire les données du site
//             const apiUrl = `https://intra.epitech.eu/user/?autologin=${autologinKey}`;

//             // Effectuez la requête HTTP pour obtenir les informations du site
//             const response = await axios.get(apiUrl);

//             // Vérifiez si la requête a réussi (code 200)
//             if (response.status === 200) {
//                 // Vous pouvez traiter les données ici selon la structure de la réponse du site
//                 // Pour l'instant, renvoyons simplement un message confirmant la connexion
//                 return message.reply('Vous êtes bien sur la page. Les informations peuvent être extraites ici.');
//             } else {
//                 // Gérez les erreurs HTTP ici
//                 return message.reply(`Erreur lors de la requête : ${response.status} ${response.statusText}`);
//             }
//         } catch (error) {
//             // Gérez les erreurs liées à la requête ici
//             console.error('Erreur de requête :', error.message);
//             return message.reply('Une erreur s\'est produite lors de la récupération des informations.');
//         }
//     },
// };


client.login(token);
