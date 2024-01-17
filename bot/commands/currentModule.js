const { MessageEmbed } = require('discord.js');
const moduleData = require('../data/module.json');

module.exports = (client, prefix) => {
    client.on('messageCreate', async message => {
        if (message.author.bot || !message.content.startsWith(prefix)) {
            return;
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        let embedToSend = null;

        if (command === 'now') {
            const requestedModule = args[0] ? args[0].toLowerCase() : null;

            const modules = moduleData.module;

            const moduleEmbed = {
                color: 0x0099ff,
                title: 'Modules',
                description: requestedModule ? `Informations sur le module ${capitalizeFirstLetter(requestedModule)}` : 'Liste des modules du moment',
                fields: [],
            };

            if (requestedModule && modules[requestedModule]) {
                const moduleInfo = modules[requestedModule];

                moduleEmbed.fields.push({
                    name: moduleInfo.title,
                    value: `Début : ${moduleInfo.timeline_start}\nFin : ${moduleInfo.timeline_end}\nBarre de progression : ${moduleInfo.timeline_barre}%`,
                });
            } else if (!requestedModule) {
                for (const moduleKey in modules) {
                    const moduleInfo = modules[moduleKey];

                    moduleEmbed.fields.push({
                        name: capitalizeFirstLetter(moduleKey),
                        value: `Début : ${moduleInfo.timeline_start}\nFin : ${moduleInfo.timeline_end}\nBarre de progression : ${moduleInfo.timeline_barre}%`,
                    });
                }
            } else {
                message.reply('Module spécifique invalide.');
                return;
            }

            embedToSend = moduleEmbed;
        }

        if (embedToSend) {
            message.channel.send({ embeds: [embedToSend] });
        }
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
