const Discord = require('discord.js')
const fs = require('fs')


module.exports= {
    name: 'addbank' ,
    run: async(Client, message, args, config, token, eco) => { 

        function Savebdd() {
            fs.writeFile("./economy.json", JSON.stringify(eco, null, 4), (err) => {
                if(err) message.channel.send("Une erreur est survenue !")
            })
        }

        if(!eco[message.author.id]) return message.channel.send("Vous n'êtes pas inscris dans le système économique, pour ce faire faites `+register`")

        let somme = args[1]
        if(!somme) return message.channel.send("Veuillez indiquer la somme souhaitée à transférer !")
        if(somme > eco[message.author.id]["wallet"]) return message.channel.send("Vous ne pouvez pas transférer plus que ce que vous avez !")
        if(isNaN(somme)) return message.channel.send("Veuillez indiquer un nombre de dollars à transférer !")

        eco[message.author.id]["wallet"] = eco[message.author.id]["wallet"] - somme
        eco[message.author.id]["bank"] = eco[message.author.id]["bank"] + parseInt(somme, 10)
        Savebdd()

        var moneyEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setColor("RED")
        .addField("Portefeuille :", eco[message.author.id]["wallet"] + "$")
        .addField("Banque :", eco[message.author.id]["bank"] + "$")
        message.channel.send(moneyEmbed)
    }}