const userData = require('../data/user_data.json');

module.exports = {
    name: 'info',
    description: 'Display user information',
    execute(message) {
        const user = userData;

        if (user) {
            const timeLeft = (user.nsstat.nslog_norm - user.nsstat.active).toFixed(1);
            const infoEmbed = {
                color: 0x0099ff,
                title: 'Information',
                description: "Student Information",
                fields: [
                    {
                        name: 'Full Name',
                        value: user.title,
                    },
                    {
                        name: 'GPA',
                        value: user.gpa[0].gpa,
                    },
                    {
                        name: 'Credits',
                        value: user.credits,
                    },
                    {
                        name: 'Campus',
                        value: user.groups[0].title,
                    },
                    {
                        name: 'Current Log Time',
                        value: user.nsstat.active.toString(),
                    },
                    {
                        name: 'Required Log Time',
                        value: user.nsstat.nslog_norm.toString(),
                    },
                    {
                        name: 'Remaining Log Time',
                        value: timeLeft.toString(),
                    },
                ],
            };

            message.channel.send({ embeds: [infoEmbed] });
        } else {
            const infoEmbed = {
                color: 0x0099ff,
                title: 'Information',
                description: "User not found",
            };

            message.channel.send({ embeds: [infoEmbed] });
        }
    },
};
