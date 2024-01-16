const { generateAuthKey } = require('./utils');

function setupBot(client, logChannelId) {
    client.once('ready', () => {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const logChannel = client.channels.cache.get(logChannelId);

        if (logChannel) {
            logChannel.send('Je suis maintenant en ligne!');
        } else {
            console.error('Le canal de logs est introuvable. Assurez-vous que le canal log_bot existe et que le bot a les autorisations nécessaires.');
        }
    });
}

function helpCommand(message) {
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

    message.channel.send({ embeds: [helpEmbed] });
}

function statCommand(message) {
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

    message.channel.send({ embeds: [statEmbed] });
}

function sendMessageCommand(message, userKeys) {
    if (userKeys.has(message.author.id)) {
        message.author.send("Bonjour, afin de pouvoir utiliser toutes les fonctionnalités de TekBot, merci de renseigner votre clé d'authentification de compte Epitech.\n" +
            "Pour cela, rendez-vous sur le site suivant et copiez-collez votre clé comme l'exemple ci-dessous :\n" +
            "auth-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
            "https://intra.epitech.eu/admin/autolog\n");
    }
}

function setKeyCommand(message, userKeys) {
    if (!userKeys.has(message.author.id)) {
        message.author.send("Bonjour, afin de pouvoir utiliser toutes les fonctionnalités de TekBot, merci de renseigner votre clé d'authentification de compte Epitech.\n" +
            "Pour cela, rendez-vous sur le site suivant et copiez-collez votre clé comme l'exemple ci-dessous :\n" +
            "auth-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
            "https://intra.epitech.eu/admin/autolog\n");
    }
}

function resetKeyCommand(message, userKeys) {
    if (userKeys.has(message.author.id)) {
        const newAuthKey = generateAuthKey();
        userKeys.set(message.author.id, newAuthKey);
        message.author.send(`Votre clé d'authentification a été réinitialisée. Nouvelle clé : ${newAuthKey}`);
        message.reply('Votre clé d\'authentification a été réinitialisée avec succès.');
    } else {
        message.reply('Vous n\'avez pas encore enregistré de clé d\'authentification. Utilisez !setkey pour enregistrer une clé.');
    }
}

module.exports = {
    setupBot,
    helpCommand,
    statCommand,
    sendMessageCommand,
    setKeyCommand,
    resetKeyCommand,
};
