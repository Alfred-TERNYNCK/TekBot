module.exports = {
    name: 'help',
    description: 'Displays the list of commands',
    execute(message) {
        const helpEmbed = {
            color: 0x0099ff,
            title: 'Help',
            description: 'List of commands',
            fields: [
                {
                    name: 'Commandes',
                    value: "!help : Displays the list of commands\n" +
                    "!info : Displays user information\n" +
                    "!now : Displays information on current activities, or on a specific activity\n" +
                    "!planning : Displays the weekly schedule or that of a specific day\n" +
                    "!module : Displays the credits and grade of a specific module\n" +
                    "!setkey : Allows changing the user's API key\n" +
                    "!resetkey : Allows resetting the user's API key\n",
                },
            ],
        };

        message.channel.send({ embeds: [helpEmbed] });
    },
};
