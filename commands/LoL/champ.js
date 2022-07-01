const Discord = require('discord.js')
const axios = require('axios')


module.exports= {
    name: 'champ' ,
    run: async(Client, message, args, config, token) => { 
        const riotApiKey = token["riotApiKey"]
        const chooseChamp = args.slice(1).join(" ")
        if(!chooseChamp) return message.channel.send("Veuillez indiquer le nom du personnage dont vous souhaitez connaître les détails (avec une majuscule au début)")
        const champs = await axios.get("http://ddragon.leagueoflegends.com/cdn/12.11.1/data/fr_FR/champion/" + chooseChamp + ".json").catch(err => {
           return message.channel.send("Nom de champion invalide ! (pensez à la majuscule au début du nom)")
        })
        console.log(champs)
        
        let passiveName = champs.data.data[chooseChamp].passive.name
        let passiveDescription = champs.data.data[chooseChamp].passive.description
        let qSpellName = champs.data.data[chooseChamp].spells[0].name
        let qSpellDescription = champs.data.data[chooseChamp].spells[0].description
        let wSpellName = champs.data.data[chooseChamp].spells[1].name
        let wSpellDescription = champs.data.data[chooseChamp].spells[1].description
        let eSpellName = champs.data.data[chooseChamp].spells[2].name
        let eSpellDescription = champs.data.data[chooseChamp].spells[2].description
        let rSpellName = champs.data.data[chooseChamp].spells[3].name
        let rSpellDescription = champs.data.data[chooseChamp].spells[3].description

        let lore = champs.data.data[chooseChamp].lore

        var champEmbed = new Discord.MessageEmbed()
        .setAuthor(chooseChamp,("http://ddragon.leagueoflegends.com/cdn/12.11.1/img/champion/" + chooseChamp +".png"))
        .setDescription(`Voici les sorts de ${chooseChamp} :`)
        .addField(`Passif : ${passiveName} :`, passiveDescription)
        .addField(`Premier sort (A) : ${qSpellName} :`, qSpellDescription)
        .addField(`Deuxième sort (Z) : ${wSpellName} :`, wSpellDescription)
        .addField(`Troisième sort (E) : ${eSpellName} :`, eSpellDescription)
        .addField(`Ultime (R) : ${rSpellName} :`, rSpellDescription)
        .addField(`Le lore de ${chooseChamp} :`, lore)
        .setThumbnail(("http://ddragon.leagueoflegends.com/cdn/12.11.1/img/champion/" + chooseChamp +".png"))
        message.channel.send(champEmbed)
    }}