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
                    return message.channel.send('You already have an authentication key. If you wish to change it, use !resetkey.');
                }
    
                // Envoyer un message privé à l'utilisateur
                message.author.send("Hello, in order to use all the features of TekBot, please enter your Epitech account authentication key.\n" +
                "To do this, go to the following site and copy and paste your key as shown below : \n" +
                "auth-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
                "https://intra.epitech.eu/admin/autolog\n");
            }
        }
    
        // Vérifier si le message commence par "auth-"
        if (message.content.startsWith('auth-')) {
            // Vérifier si l'utilisateur a déjà envoyé sa clé
            if (userKeys.has(message.author.id)) {
                return message.reply('You have already sent your authentication key.');
            }
    
            // Ajouter la clé d'authentification à la Map
            userKeys.set(message.author.id, message.content);
    
            // Envoyer un message de confirmation
            message.reply('Your authentication key has been successfully registered.');
        }
    });
}
