const Discord = require('discord.js')
const axios = require('axios')


module.exports= {
    name: 'priceEth' ,
    run: async(Client, message, args, config, token) => { 
        const cryptoApiKey = token["cryptoApiKey"]
        const price = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + cryptoApiKey)
        const priceEth = price.data.data[1].quote.USD.price
        const priceEthAround = Math.round(priceEth)
        var priceEthEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
        .setColor("RED")
        .setDescription(`Actuellement le prix de l'ethereum est de : **${priceEthAround} dollars**`)
        message.channel.send(priceEthEmbed)
    }}