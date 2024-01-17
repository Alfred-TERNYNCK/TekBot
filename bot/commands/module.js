const notes = require('../data/notes.json');

module.exports = {
    name: 'module',
    description: 'Display module grades',
    execute: (message, args) => {
        if (!args || args.length < 1) {
            // Afficher la liste des modules disponibles
            const moduleList = Object.keys(notes.modules[0]).join(', ');
            const helpEmbed = {
                color: 0x0099ff,
                title: 'Help - Grade Command',
                description: 'Displays the grades of the modules.',
                fields: [
                    {
                        name: 'Usage',
                        value: '!grade [module-name]',
                    },
                    {
                        name: 'Available Modules',
                        value: moduleList,
                    },
                ],
            };
            message.reply({ embeds: [helpEmbed] });
            return;
        }

        const moduleName = args[0];

        if (!notes.modules[0].hasOwnProperty(moduleName)) {
            message.reply('Module not found.');
            return;
        }

        const moduleInfo = notes.modules[0][moduleName];

        const response = {
            color: 0x0099ff,
            title: `${moduleName} - ${moduleInfo.title}`,
            fields: [
                {
                    name: 'Credits',
                    value: moduleInfo.credits,
                    inline: true,
                },
                {
                    name: 'Grade',
                    value: moduleInfo.grade,
                    inline: true,
                },
                {
                    name: 'Semester',
                    value: moduleInfo.semester,
                    inline: true,
                },
            ],
        };

        message.channel.send({ embeds: [response] });
    },
};
