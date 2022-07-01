const Discord = require('discord.js')
const axios = require('axios')


module.exports= {
    name: 'priceBtc' ,
    run: async(Client, message, args, config, token) => { 
        const cryptoApiKey = token["cryptoApiKey"]
        const price = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + cryptoApiKey)
        const priceBtc = price.data.data[0].quote.USD.price
        const priceBtcAround = Math.round(priceBtc)
        var priceBtcEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
        .setColor("RED")
        .setDescription(`Actuellement le prix du bitcoin est de : **${priceBtcAround} dollars**`)
        message.channel.send(priceBtcEmbed)
    }}