const Discord = require('discord.js')
const fs = require('fs')


module.exports= {
    name: 'give' ,
    run: async(Client, message, args, config, token, eco) => { 

        function Savebdd() {
            fs.writeFile("./economy.json", JSON.stringify(eco, null, 4), (err) => {
                if(err) message.channel.send("Une erreur est survenue !")
            })
        }

        if(!eco[message.author.id]) return message.channel.send("Vous n'êtes pas inscris dans le système économique, pour ce faire faites `+register`")

        const member = message.mentions.members.first()
        if(!member) return message.channel.send("Veuillez mentionner le membre auquel vous souhaitez donner de l'argent !")
        if(!eco[member.user.id]) return message.channel.send("L'utilisateur souhaité n'est pas inscris dans le système économique !")

        let somme = args[2]
        if(!somme) return message.channel.send("Veuillez indiquer la somme souhaitée à ajouter !")
        if(isNaN(somme)) return message.channel.send("Veuillez indiquer un nombre de dollars à ajouter !")

        if(somme > eco[message.author.id]["wallet"]) return message.channel.send("Vous n'avez pas assez d'argent dans votre portefeuille, si vous avez assez d'argent dans votre banque, transférez l'argent avec la commande `+addwallet`")

         eco[message.author.id]["wallet"] = eco[message.author.id]["wallet"] - parseInt(somme, 10)
         eco[member.user.id]["wallet"] = eco[member.user.id]["wallet"] + parseInt(somme, 10)
         message.channel.send(`${member} a bien recu vos **${somme}$**`)

    }}