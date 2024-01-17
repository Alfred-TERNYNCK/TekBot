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
                    message.reply('Your authentication key has been successfully reset.\n' +'Please resend your authentication key using the command !setkey.');
                } else {
                    message.reply('You have not yet registered an authentication key. Use !setkey to register a key.');
                }
            }
        }
    });
};
