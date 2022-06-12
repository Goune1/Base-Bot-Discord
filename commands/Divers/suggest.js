const Discord = require('discord.js')

module.exports= {
    name: 'suggest' ,
    run: async(Client, message, args, config) => { 
        if(config["statut-suggest"] == true) {
            message.channel.send(new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Cette commande est actuellement en maintenance, veuillez m'excuser pour l'eventuelle gêne occasionnée"))
        /*var suggestion = args.slice(1).join(" ")
        if(!suggestion) return message.channel.sendt("Veuillez indiquer votre suggestion")
        else {
        const embedSuggestBeforeExamination = new Discord.MessageEmbed()
        .setTitle("Nouvelle Suggestion :")
        .addField("Suggestion de :", message.author)
        .addField("Contenu :", suggestion)
        .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setFooter("Suggestion envoyée")
        .setTimestamp()
        Client.channels.cache.get(config["id_logs"]).send(embedSuggestBeforeExamination).then(message => {
            message.react("✅")
            message.react("❌")
        })}*/
        
        }
        if(config["statut-bienvenue" == false]) {
            message.channel.send("Le système de suggestion est actuellement désactivé. Si vous êtes un administrateur et que vous souhaitez l'activer, faites `+config` puis `suggest` puis `on`")
        }
	}
}