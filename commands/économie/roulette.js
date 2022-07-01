const Discord = require('discord.js')
const fs = require('fs')


module.exports= {
    name: 'roulette' ,
    run: async(Client, message, args, config, token, eco) => { 
        if(!eco[message.author.id]) return message.channel.send("Vous n'êtes pas inscris dans le système économique, pour ce faire faites `+register`")

        let somme = args[1]
        if(!somme) return message.channel.send("Veuillez indiquer la somme souhaitée à miser !")
        if(isNaN(somme)) return message.channel.send("Veuillez indiquer un nombre de dollars à miser !")

        let placeMember = args[2]
        if(!placeMember) return message.channel.send("Veuillez indiquer où est-ce que vous souhaitez miser (red / black)")

        let rouletteList = ["red", "black"]
        var rnd = Math.floor(Math.random() * rouletteList.length);
        let rouletteStatut = rouletteList[rnd]

        let sommeADonner = somme * 2
        eco[message.author.id]["wallet"] = eco[message.author.id]["wallet"] - parseInt(somme, 10)
        
        if(placeMember == rouletteStatut) {
            eco[message.author.id]["wallet"] = eco[message.author.id]["wallet"] + parseInt(sommeADonner, 10)
            message.channel.send(`Bravo, la roulette est tombé sur ce que vous aviez parié, vous avez donc gagné **${sommeADonner}$** !`)
        } else {
            message.channel.send(`Dommage la roulette est tombée au mauvais endroit, vous avez donc perdu **${somme}$** !`)
        }
    }}