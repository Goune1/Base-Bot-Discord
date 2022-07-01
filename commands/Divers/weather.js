const Discord = require('discord.js')
const weather = require("weather-js")


module.exports= {
    name: 'meteo' ,
    run: async(Client, message, args, config, token) => { 
        let city = args.slice(1).join(" ")
        if(!city) return message.channel.send("Veuillez indiquer la ville dont vous souhaitez connaître la météo")

        weather.find({ search: city, degreeType : "C"}, (error, result) => {
            if(error) return message.channel.send("Une erreur est survenue")
            else if (result.lenght === 0) {
                return message.channel.send("Ville invalide !")
            }

            let data = result[0]

            let skySituation
            if(data.current.skytext == "Sunny") skySituation = "Ensoleillé"
            if(data.current.skytext == "Partly Sunny") skySituation = "Partiellement ensoleillé"
            if(data.current.skytext == "Clear") skySituation = "Dégagé"
            if(data.current.skytext == "Mostly Clear") skySituation = "Généralement dégagé"
            if(data.current.skytext == "Rain") skySituation = "Pluie"
            if(data.current.skytext == "Mostly Rain") skySituation = "Généralement pluvieux"
            if(data.current.skytext == "Cloudy") skySituation = "Nuageux"
            if(data.current.skytext == "Partly Cloudy") skySituation = "Partiellement nuageux"
            if(skySituation == undefined) skySituation = data.current.skytext

            var weatherEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
            .setColor("RED")
            .addField("Ville :", data.location.name, true)
            .addField("État du ciel :", skySituation, true)
            .addField("Température :", data.current.temperature + "°C", true)
            message.channel.send(weatherEmbed)
        })
    }}