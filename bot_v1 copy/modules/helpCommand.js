module.exports = (client, prefix) => {
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
                            value: '!help : Affiche la liste des commandes\n!stat : Affiche les informations de l\'utilisateur mentionné\n !setkey : Envoie un message privé à TekBot pour enregistrer ta clé d\'authentification !resetkey : Réinitialise ta clé d\'authentification',
                        },
                    ],
                };
    
                return message.channel.send({ embeds: [helpEmbed] });
            }
        }
    
    }
    );
};
