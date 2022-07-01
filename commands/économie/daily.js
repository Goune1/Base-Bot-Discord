const Discord = require('discord.js')
const fs = require('fs')


module.exports= {
    name: 'daily' ,
    timeout: 124416000,
    run: async(Client, message, args, config, token, eco) => { 

        function Savebdd() {
            fs.writeFile("./economy.json", JSON.stringify(eco, null, 4), (err) => {
                if(err) message.channel.send("Une erreur est survenue !")
            })
        }

        if(!eco[message.author.id]) return message.channel.send("Vous n'êtes pas inscris dans le système économique, pour ce faire faites `+register`")

        let somme = Math.floor(Math.random() * 1000)
        eco[message.author.id]["wallet"] = eco[message.author.id]["wallet"] + parseInt(somme, 10)
        Savebdd()
        message.channel.send(`Vous avez gagné ${somme}$ ! (24h)`)
        
    
    }}