const Discord = require('discord.js')
const fs = require('fs')


module.exports= {
    name: 'shop' ,
    run: async(Client, message, args, config, token, eco) => { 

        function Savebdd() {
            fs.writeFile("./economy.json", JSON.stringify(eco, null, 4), (err) => {
                if(err) message.channel.send("Une erreur est survenue !")
            })
        }

        const filterMessage = (m) => m.author.id===message.author.id&&!m.author.bot;

        if(!eco[message.author.id]) return message.channel.send("Vous n'êtes pas inscris dans le système économique, pour ce faire faites `+register`")

        var shopEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setColor("RED")
        .setTitle(`Bienvenue dans le shop de ${message.guild.name} !`)
        .setDescription("Voici l'ensemble des articles disponibles ! (tapez en dessous le nom de l'article que vous souhaitez)")
        .addField("Rôle VIP", "Prix : 100k $ (écrire `vip`)")
        message.channel.send(shopEmbed)
        const shopItem = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()

        if(shopItem.content == "vip") {
            let vipPrice = 100000
            let vipRole = "965333094339059803"
            if(message.member.roles.cache.some(role => role.name === "random")) return message.channel.send("Vous êtes déjà VIP !")
            if(vipPrice > eco[message.author.id]["wallet"]) return message.channel.send("Vous n'avez pas assez d'argent dans votre portefeuille ! Si vous en avez assez dans votre banque, transférez le dans votre portefeuille avec `+addwallet 100000`")
            message.member.roles.add(vipRole)
            eco[message.author.id]["wallet"] = eco[message.author.id]["wallet"] - vipPrice
            Savebdd()
            message.channel.send("Bravo, vous êtes maintenant VIP !")
        }

    }}