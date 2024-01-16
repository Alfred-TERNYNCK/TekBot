module.exports = (client, logChannelId) => {
    client.once('ready', () => {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    
        // Récupérer le canal de logs par ID
        const logChannel = client.channels.cache.get(logChannelId);
    
        // Vérifier si le canal de logs existe
        if (logChannel) {
            logChannel.send('Je suis maintenant en ligne!');
        } else {
            console.error('Le canal de logs est introuvable. Assurez-vous que le canal log_bot existe et que le bot a les autorisations nécessaires.');
        }
    });
}
