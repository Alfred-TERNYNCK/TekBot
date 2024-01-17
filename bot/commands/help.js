module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes',
    execute(message) {
        const helpEmbed = {
            color: 0x0099ff,
            title: 'Aide',
            description: 'Liste des commandes',
            fields: [
                {
                    name: 'Commandes',
                    value: "!help : Affiche la liste des commandes\n" +
                    "!info : Affiche les informations de l\'utilisateur\n" +
                    "!now : Affiche les informations sur les activitée du moment, ou sur une activtée spécifique\n" +
                    "!planning : Affiche le planning de la semaine ou celuis d'un jour en particulier\n" +
                    "!module : Affiche les crédits et le grade d'un module spécifique\n" +
                    "!setkey : Permet de changer la clé d'API de l'utilisateur\n" +
                    "!resetkey : Permet de réinitialiser la clé d'API de l'utilisateur\n",
                },
            ],
        };

        message.channel.send({ embeds: [helpEmbed] });
    },
};
