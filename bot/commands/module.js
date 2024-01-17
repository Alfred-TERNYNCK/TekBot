const notes = require('../data/notes.json');

module.exports = {
    name: 'module',
    description: 'Affiche les notes des modules',
    execute: (message, args) => {
        if (!args || args.length < 1) {
            // Afficher la liste des modules disponibles
            const moduleList = Object.keys(notes.modules[0]).join(', ');
            const helpEmbed = {
                color: 0x0099ff,
                title: 'Aide - Commande Note',
                description: 'Affiche les notes des modules.',
                fields: [
                    {
                        name: 'Utilisation',
                        value: '!note [nom-du-module]',
                    },
                    {
                        name: 'Modules disponibles',
                        value: moduleList,
                    },
                ],
            };
            message.reply({ embeds: [helpEmbed] });
            return;
        }

        const moduleName = args[0];

        if (!notes.modules[0].hasOwnProperty(moduleName)) {
            message.reply('Module introuvable.');
            return;
        }

        const moduleInfo = notes.modules[0][moduleName];

        const response = {
            color: 0x0099ff,
            title: `${moduleName} - ${moduleInfo.title}`,
            fields: [
                {
                    name: 'Crédits',
                    value: moduleInfo.credits,
                    inline: true,
                },
                {
                    name: 'Note',
                    value: moduleInfo.grade,
                    inline: true,
                },
                {
                    name: 'Semestre',
                    value: moduleInfo.semester,
                    inline: true,
                },
            ],
        };

        message.channel.send({ embeds: [response] });
    },
};
