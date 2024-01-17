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
                description: requestedModule ? `Information about the module ${capitalizeFirstLetter(requestedModule)}` : 'List of current modules',
                fields: [],
            };

            if (requestedModule && modules[requestedModule]) {
                const moduleInfo = modules[requestedModule];

                moduleEmbed.fields.push({
                    name: moduleInfo.title,
                    value: `Start : ${moduleInfo.timeline_start}\nEnd : ${moduleInfo.timeline_end}\nProgress Bar : ${moduleInfo.timeline_barre}%`,
                });
            } else if (!requestedModule) {
                for (const moduleKey in modules) {
                    const moduleInfo = modules[moduleKey];

                    moduleEmbed.fields.push({
                        name: capitalizeFirstLetter(moduleKey),
                        value: `Start : ${moduleInfo.timeline_start}\nEnd : ${moduleInfo.timeline_end}\nProgress Bar : ${moduleInfo.timeline_barre}%`,
                    });
                }
            } else {
                message.reply('Invalid specific module.');
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
