module.exports = (client, prefix, userKeys) => {
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
    });
};
