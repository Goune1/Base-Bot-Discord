const Discord = require('discord.js')


module.exports= {
    name: 'help' ,
    run: async(Client, message, args, config, token) => { 
        const filterMessage = (m) => m.author.id===message.author.id&&!m.author.bot;
        const helpStatut = args.slice(1).join(" ")
        
        var helpModerationEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setColor("RED")
        .addField("Ban", "Pour bannir un membre, faites `+ban @member raison`")
        .addField("Kick", "Pour expulser un membre, faites `+kick @member raison`")
        .addField("Mute", "Pour rendre muet un utilisateur, faites `+mute @member raison`")
        .addField("Unmute", "Pour cesser de rendre muet un utilisateur, faites `+unmute @member`")
        .addField("Tempmute", "Pour rendre muet temporairement un utilisateur, faites `+tempmute @member temps raison`")
        .addField("Configuration", "Pour configurer le bot sur votre serveur, faites `+config`")
        .addField("Lock", "Pour verrouiller un salon, faites `+lock #channel")
        .addField("Unlock", "Pour déverouiller un salon, faites `+unlock #channel`")
        .addField("Nuke", "Pour recréer un salon, faites `+nuke` dans le salon souhaité")
        .addField("Clear", "Pour supprimer un nombre donné de message, faites `+clear nombreDeMessage` (jusqu'à 99 à la fois)")

        var helpLolEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setColor("RED")
        .addField("Statistiques LoL", "Pour connaître les statistiques ranked d'un joueur, faites `+lol pseudoLoL`")
        .addField("Statistiques Teamfight Tactics", "Pour connaître les statistiques ranked Teamfight Tactics d'un joueur, faites\n`+tft pseudoTft`")
        .addField("Dernière game", "Pour connaître l'ensemble des informations de la dernière game d'un joueur, faites `+lastgame pseudoLoL`")
        .addField("Game en cours", "Pour connaître l'ensemble des informations de la game en cours d'un joueur, faites `+livegame pseudoLol`")
        .addField("Champions", "Pour connaître les sorts et le lore d'un champion, faites `+champ nomDuChampion`")
        .addField("Champion aléatoire", "Pour avoir le nom d'un champion de manière aléatoire, faites `+random_champ`")

        var helpDiversEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setColor("RED")
        .addField("Prix du bitcoin", "Pour connaître le prix du bitcoin en temps réel, faites `+priceBtc`")
        .addField("Prix de l'ethereum", "Pour connaître le prix de l'ethereum en temps réel, faites `priceEth`")
        .addField("Constructeur d'embed", "Pour construire un embed comme vous le souhaitez faites `+embed`")
        .addField("Météo", "Pour connaître la météo d'une ville, faites `+meteo ville`")
        .addField("Say", "Pour faire en sorte qu'en message soit supprimé puis réécrit à l'identique par le bot, faites `+say message souhaité`")
        .addField("Restart", "Pour redémarrer le bot, faites `+restart`")
        .addField("Suggestion" ,"Pour émettre une suggestion concernant le serveur, faites `+suggest suggestion`")
        .addField("Statistiques", "Pour connaître les statistiques d'un serveur faites `+stats`")

        var helpEcoEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setColor("RED")
        .addField("Register", "Pour vous enregistrer dans le système d'économie, faites `+register`")
        .addField("Portemonnaie", "Pour connaître votre solde, faites `+money`")
        .addField("Add wallet", "Pour ajouter de l'argent venant de votre banque vers votre portefeuille, faites `+addwallet somme`")
        .addField("Add bank", "Pour ajouter de l'argent venant de votre portefeuille vers votre banque, faites `+addbank somme`")
        .addField("Daily", "Pour gagner un peu d'argent toutes les 24h, faites `+daily`")
        .addField("Work", "Pour gagner un peu d'argent en travaillant, faites `+work`")
        .addField("Give", "Pour donner de l'argent à un membre, faites `+give @user somme`")
        .addField("Add money (admin)", "Pour rajouter de l'argent à un membre, faites `+addmoney @user somme`")
        .addField("Remove money (admin)", "Pour enlever de l'argent à un membre, faites `+removemoney @user wallet/bank somme`")
        .addField("Rob", "Pour voler l'argent du portefeuille d'un membre, faites `+rob @user`")
        .addField("Roulette", "Pour miser de l'argent et tenter de doubler votre mise, faites `+roulette @user`")



        if(helpStatut == "moderation") message.channel.send(helpModerationEmbed)
        if(helpStatut == "lol") message.channel.send(helpLolEmbed)
        if(helpStatut == "divers") message.channel.send(helpDiversEmbed)
        if(helpStatut == "eco") message.channel.send(helpEcoEmbed)

        if(!helpStatut) {
            message.channel.send("Quelle section souhaitez vous voir ? (moderation / divers / lol / eco)")
            const helpSection = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
            if(helpSection.content == "moderation") message.channel.send(helpModerationEmbed)
            if(helpSection.content == "lol") message.channel.send(helpLolEmbed)
            if(helpSection.content == "divers") message.channel.send(helpDiversEmbed)
            if(helpSection.content == "eco") message.channel.send(helpEcoEmbed)
        }
    }}