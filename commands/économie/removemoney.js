const Discord = require('discord.js')
const fs = require('fs')


module.exports= {
    name: 'removemoney' ,
    run: async(Client, message, args, config, token, eco) => { 

        function Savebdd() {
            fs.writeFile("./economy.json", JSON.stringify(eco, null, 4), (err) => {
                if(err) message.channel.send("Une erreur est survenue !")
            })
        }

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')

        if(!eco[message.author.id]) return message.channel.send("Vous n'êtes pas inscris dans le système économique, pour ce faire faites `+register`")

        const member = message.mentions.members.first()
        if(!member) return message.channel.send("Veuillez mentionner le membre auquel vous souhaitez enlever de l'argent !")
        if(!eco[member.user.id]) return message.channel.send("L'utilisateur souhaité n'est pas inscris dans le système économique !")

        let typeMoney = args[2]
        if(!typeMoney) return message.channel.send("Veuillez indiquer si vous souhaitez enlever de l'argent dans le portefeuille (wallet) ou dans la banque (bank), exemple : `+removemoney @user wallet 1000`")

        let somme = args[3]
        if(!somme) return message.channel.send("Veuillez indiquer la somme souhaitée à enlever !")
        if(isNaN(somme)) return message.channel.send("Veuillez indiquer un nombre de dollars à enlever !")

        if(typeMoney == "wallet") {
            if(somme > eco[member.user.id]["wallet"]) return message.channel.send("Vous ne pouvez pas enlever plus que ce qu'à cet utilisateur")
            eco[member.user.id]["wallet"] = eco[member.user.id]["wallet"] - parseInt(somme, 10)
            Savebdd()
            message.channel.send(`${member} a bien perdu ${somme}$ dans son portefeuille !`)
        }

        if(typeMoney == "bank") {
            if(somme > eco[member.user.id]["bank"]) return message.channel.send("Vous ne pouvez pas enlever plus que ce qu'à cet utilisateur")
            eco[member.user.id]["bank"] = eco[member.user.id]["bank"] - parseInt(somme, 10)
            Savebdd()
            message.channel.send(`${member} a bien perdu ${somme}$ dans sa banque !`)
        }
    }}