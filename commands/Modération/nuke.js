const Discord = require('discord.js')

module.exports= {
    name: 'nuke' ,
    run: async(Client, message, args, config) => { 
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.') 
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Je n'ai pas la permission d'effectuer cette commande.")
        
        message.reply("êtes vous vraiment sûr de vouloir nuke ce salon ? (oui / non)")
        const filterMessage = (m) => m.author.id===message.author.id&&!m.author.bot;
        const nukeAnswer = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()


        if(nukeAnswer.content == "oui") {
            let nukeChannel = message.channel
            if(!nukeChannel.deletable) return message.channel.send("Je ne peux pas supprimer ce salon.")
            await nukeChannel.clone().catch(err =>  console.log(err))
            await nukeChannel.delete().catch(err => console.log(err))
        }
        if(nukeAnswer.content == "Oui") {
            let nukeChannel = message.channel
            if(!nukeChannel.deletable) return message.channel.send("Je ne peux pas supprimer ce salon.")
            await nukeChannel.clone().catch(err =>  console.log(err))
            await nukeChannel.delete().catch(err => console.log(err))
            }
        else return message.channel.send("Nuke annulé...")
        
    }}