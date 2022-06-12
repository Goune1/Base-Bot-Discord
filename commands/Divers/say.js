const Discord = require('discord.js')

module.exports= {
    name: 'say' ,
    run: async(Client, message, args, config) => { 
        var said = args.slice(1).join(' ')
        if(!said) return message.delete()
        message.delete()
        message.channel.send(said)
        if(config["statut-logs"] == true) {
            Client.channels.cache.get(config["id_logs"]).send(new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
                .setDescription("Commande say.")
                .setColor("RED")
                .addField('Utilisateur', message.author, true)
                .addField('Message', said, true))
            }
	}
}