const Discord = require('discord.js')
const fs = require('fs')


module.exports= {
    name: 'rob' ,
    timeout : 18144000,
    run: async(Client, message, args, config, token, eco) => { 

        function Savebdd() {
            fs.writeFile("./economy.json", JSON.stringify(eco, null, 4), (err) => {
                if(err) message.channel.send("Une erreur est survenue !")
            })
        }

        if(!eco[message.author.id]) return message.channel.send("Vous n'êtes pas inscris dans le système économique, pour ce faire faites `+register`")

        const member = message.mentions.members.first()
        if(!member) return message.channel.send("Veuillez mentionner le membre auquel vous souhaitez voler de l'argent !")
        if(!eco[member.user.id]) return message.channel.send("L'utilisateur souhaité n'est pas inscris dans le système économique !")

        let robList = ["true", "false"]
        var rnd = Math.floor(Math.random() * robList.length);
        let robStatut = robList[rnd]
        console.log(robStatut)

        if(eco[member.user.id]["wallet"] == 0) return message.channel.send("Vous ne pouvez pas cambrioler ce membre !")

        if(robStatut == "true") {
            let somme = eco[member.user.id]["wallet"]
            eco[message.author.id]["wallet"] = eco[message.author.id]["wallet"] + parseInt(somme, 10)
            eco[member.user.id]["wallet"] = eco[message.author.id]["wallet"] - parseInt(somme, 10)
            Savebdd()
            var robEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
            .setColor("GREEN")
            .addField("Bravo !", `Vous avez brillemment cambriolé **${member}** et vous avez remporté **${somme}$** !`)
            message.channel.send(robEmbed)
        }
        if(robStatut == "false") {
            let somme = Math.floor(Math.random() * 500)
            eco[message.author.id]["wallet"] = eco[message.author.id]["wallet"] - parseInt(somme, 10)
            Savebdd()
            var robEmbed2 = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
            .setColor("RED")
            .addField("Oh non...", `Vous avez tenté de cambrioler **${member}**, vous vous êtes fait avoir et vous avez perdu **${somme}$** !`)
            message.channel.send(robEmbed2)
        }
    }}