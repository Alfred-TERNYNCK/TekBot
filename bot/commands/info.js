const userData = require('../data/user_data.json');

module.exports = {
    name: 'info',
    description: 'Affiche les informations de l\'utilisateur',
    execute(message) {
        const user = userData;

        if (user) {
            const timeLeft = (user.nsstat.nslog_norm - user.nsstat.active).toFixed(1);
            const infoEmbed = {
                color: 0x0099ff,
                title: 'Information',
                description: "Information de l'étudiant",
                fields: [
                    {
                        name: 'Nom complet',
                        value: user.title,
                    },
                    {
                        name: 'GPA',
                        value: user.gpa[0].gpa,
                    },
                    {
                        name: 'Crédits',
                        value: user.credits,
                    },
                    {
                        name: 'Campus',
                        value: user.groups[0].title,
                    },
                    {
                        name: 'Temps de log actuel',
                        value: user.nsstat.active.toString(),
                    },
                    {
                        name: 'Temps de log à avoir',
                        value: user.nsstat.nslog_norm.toString(),
                    },
                    {
                        name: 'Temps de log restant',
                        value: timeLeft.toString(),
                    },
                ],
            };

            message.channel.send({ embeds: [infoEmbed] });
        } else {
            const infoEmbed = {
                color: 0x0099ff,
                title: 'Information',
                description: "L'utilisateur n'a pas été trouvé",
            };

            message.channel.send({ embeds: [infoEmbed] });
        }
    },
};
