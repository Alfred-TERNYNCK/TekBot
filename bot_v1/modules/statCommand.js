module.exports = (client, prefix, userKeys) => {
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
};
