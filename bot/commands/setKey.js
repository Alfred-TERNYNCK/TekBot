module.exports = (client, prefix, userKeys) => {
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
}
