const { MessageEmbed } = require('discord.js');
const planningData = require('../data/planning.json');

module.exports = (client, prefix) => {
    client.on('messageCreate', async message => {
        if (message.author.bot || !message.content.startsWith(prefix)) {
            return;
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        let embedToSend = null;

        if (command === 'planning') {
            const requestedDay = args[0] ? args[0].toLowerCase() : null;

            const weekPlanning = planningData.week_planning;

            const planningEmbed = {
                color: 0x0099ff,
                title: 'Planning',
                description: requestedDay ? `Planning pour ${capitalizeFirstLetter(requestedDay)}` : 'Planning de la semaine',
                fields: [],
            };

            if (requestedDay && weekPlanning[requestedDay]) {
                const daySchedule = weekPlanning[requestedDay];
                const morningActivity = `Matin : ${daySchedule.morning.activity} (${daySchedule.morning.start} - ${daySchedule.morning.end})`;
                const afternoonActivity = `Après-midi : ${daySchedule.afternoon.activity} (${daySchedule.afternoon.start} - ${daySchedule.afternoon.end})`;

                planningEmbed.fields.push({ name: capitalizeFirstLetter(requestedDay), value: `${morningActivity}\n${afternoonActivity}` });
            } else if (!requestedDay) {
                for (const day in weekPlanning) {
                    const daySchedule = weekPlanning[day];
                    const morningActivity = `Matin : ${daySchedule.morning.activity} (${daySchedule.morning.start} - ${daySchedule.morning.end})`;
                    const afternoonActivity = `Après-midi : ${daySchedule.afternoon.activity} (${daySchedule.afternoon.start} - ${daySchedule.afternoon.end})`;

                    planningEmbed.fields.push({ name: capitalizeFirstLetter(day), value: `${morningActivity}\n${afternoonActivity}` });
                }
            } else {
                message.reply('Jour spécifique invalide.');
                return;
            }

            embedToSend = planningEmbed;
        }

        if (embedToSend) {
            message.channel.send({ embeds: [embedToSend] });
        }
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
