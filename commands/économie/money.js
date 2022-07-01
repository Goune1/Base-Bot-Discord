const Discord = require('discord.js')
const fs = require('fs')


module.exports= {
    name: 'money' ,
    run: async(Client, message, args, config, token, eco) => { 
        if(!eco[message.author.id]) return message.channel.send("Vous n'êtes pas inscris dans le système économique, pour ce faire faites `+register`")

        const member = message.mentions.members.first()
        if(!member){
            var moneyEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
            .setColor("RED")
            .addField("Portefeuille :", eco[message.author.id]["wallet"] + "$")
            .addField("Banque :", eco[message.author.id]["bank"] + "$")
            message.channel.send(moneyEmbed)
        } else {
            if(!eco[member.user.id]) return message.channel.send("L'utilisateur souhaité n'est pas inscris dans le système économique !")

            var moneyEmbed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor("RED")
            .addField("Portefeuille :", eco[member.user.id]["wallet"] + "$")
            .addField("Banque :", eco[member.user.id]["bank"] + "$")
            message.channel.send(moneyEmbed)
        }
    }}