const Discord = require('discord.js')
const fs = require('fs')


module.exports= {
    name: 'register' ,
    run: async(Client, message, args, config, token, eco) => { 

        function Savebdd() {
            fs.writeFile("./economy.json", JSON.stringify(eco, null, 4), (err) => {
                if(err) message.channel.send("Une erreur est survenue !")
            })
        }

        if(!eco[message.author.id]) {
        eco[message.author.id] = {}
        eco[message.author.id]["wallet"] = 0
        eco[message.author.id]["bank"] = 1000
        Savebdd()
        message.channel.send("Vous avez bien été enregistré !") }

        else {
            message.channel.send("Vous êtes déjà enregistré !")
        }
        
    
    }}