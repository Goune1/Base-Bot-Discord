const Discord = require('discord.js')
const axios = require('axios')


module.exports= {
    name: 'lastgame' ,
    run: async(Client, message, args, config, token) => { 
        const riotApiKey = token["riotApiKey"]
          //récupération du pseudo du joueur
          var name = args.slice(1).join(" ")
          if(!name) return 

           // récupération des données personnelles de l'utilisateur indiqué via discord + return
           const profile = await axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotApiKey).catch(err => {
            return message.channel.send("Une erreur est survenue (sûrement un problème dans l'orthographe du pseudo)")
         })

         // le puuid du joueur
         const userPuuid = profile.data.puuid 

         //liste des 20 games les plus récentes (id de game)
         const matchId = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + userPuuid + "/ids?start=0&count=20&api_key=" + riotApiKey)

         //récupération de la game la plus récente
         const matchId1 = matchId.data[0]

         //récupération de toutes les data de la game en question
         const match = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/" + matchId1 + "?api_key=" + riotApiKey)

         //durée de la game en minute
         const gameDuration = match.data.info.gameDuration / 60
         const gameDurationFinal = Math.round(gameDuration)

         //récupération du pseudo des 10 joueurs
         const player0 = match.data.info.participants[0].summonerName
         const player1 = match.data.info.participants[1].summonerName
         const player2 = match.data.info.participants[2].summonerName
         const player3 = match.data.info.participants[3].summonerName
         const player4 = match.data.info.participants[4].summonerName
         const player5 = match.data.info.participants[5].summonerName
         const player6 = match.data.info.participants[6].summonerName
         const player7 = match.data.info.participants[7].summonerName
         const player8 = match.data.info.participants[8].summonerName
         const player9 = match.data.info.participants[9].summonerName

         //récupération du nom des champions des 10 joueurs
         let playerChamp0 = match.data.info.participants[0].championName
         let playerChamp1 = match.data.info.participants[1].championName
         let playerChamp2 = match.data.info.participants[2].championName
         let playerChamp3 = match.data.info.participants[3].championName
         let playerChamp4 = match.data.info.participants[4].championName
         let playerChamp5 = match.data.info.participants[5].championName
         let playerChamp6 = match.data.info.participants[6].championName
         let playerChamp7 = match.data.info.participants[7].championName
         let playerChamp8 = match.data.info.participants[8].championName
         let playerChamp9 = match.data.info.participants[9].championName

         //récupération du nombre de kills des 10 joueurs
         const player0kills = match.data.info.participants[0].kills
         const player1kills = match.data.info.participants[1].kills
         const player2kills = match.data.info.participants[2].kills
         const player3kills = match.data.info.participants[3].kills
         const player4kills = match.data.info.participants[4].kills
         const player5kills = match.data.info.participants[5].kills
         const player6kills = match.data.info.participants[6].kills
         const player7kills = match.data.info.participants[7].kills
         const player8kills = match.data.info.participants[8].kills
         const player9kills = match.data.info.participants[9].kills

         //récupération du nombre de morts pour les 10 joueurs
         const player0deaths = match.data.info.participants[0].deaths
         const player1deaths = match.data.info.participants[1].deaths
         const player2deaths = match.data.info.participants[2].deaths
         const player3deaths = match.data.info.participants[3].deaths
         const player4deaths = match.data.info.participants[4].deaths
         const player5deaths = match.data.info.participants[5].deaths
         const player6deaths = match.data.info.participants[6].deaths
         const player7deaths = match.data.info.participants[7].deaths
         const player8deaths = match.data.info.participants[8].deaths
         const player9deaths = match.data.info.participants[9].deaths

         //récupération du nombre d'assist pour les 10 joueurs
         const player0assists = match.data.info.participants[0].assists
         const player1assists = match.data.info.participants[1].assists
         const player2assists = match.data.info.participants[2].assists
         const player3assists = match.data.info.participants[3].assists
         const player4assists = match.data.info.participants[4].assists
         const player5assists = match.data.info.participants[5].assists
         const player6assists = match.data.info.participants[6].assists
         const player7assists = match.data.info.participants[7].assists
         const player8assists = match.data.info.participants[8].assists
         const player9assists = match.data.info.participants[9].assists

         //correction d'un bug qui indique wukong en tant que MonkeyKing
         if(playerChamp0 == "MonkeyKing") playerChamp0 = "Wukong"
         if(playerChamp1 == "MonkeyKing") playerChamp1 = "Wukong"
         if(playerChamp2 == "MonkeyKing") playerChamp2 = "Wukong"
         if(playerChamp3 == "MonkeyKing") playerChamp3 = "Wukong"
         if(playerChamp4 == "MonkeyKing") playerChamp4 = "Wukong"
         if(playerChamp5 == "MonkeyKing") playerChamp5 = "Wukong"
         if(playerChamp6 == "MonkeyKing") playerChamp6 = "Wukong"
         if(playerChamp7 == "MonkeyKing") playerChamp7 = "Wukong"
         if(playerChamp8 == "MonkeyKing") playerChamp8 = "Wukong"
         if(playerChamp9 == "MonkeyKing") playerChamp9 = "Wukong"

         //définition des variables pour les teams
         let team1
         let team2

         //permet de définir quelle équipe à win la game
         if(match.data.info.participants[0].win == true) {
            team1 = "Team 1 (Victoire)"
            team2 = "Team 2 (Défaite)"
         }
         if(match.data.info.participants[5].win == true) {
            team1 = "Team 1 (Défaite)"
            team2 = "Team 2 (Victoire)"
         }

         //embed
         var matchEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
        .setDescription(`La partie a duré ${gameDurationFinal} minutes`)
        .addField(team1, `Top : **${player0}** jouant ${playerChamp0}, **KDA** : ${player0kills} kills, ${player0deaths} morts, ${player0assists} assistances\n Jungle : **${player1}** jouant ${playerChamp1}, **KDA** : ${player1kills} kills, ${player1deaths} morts, ${player1assists} assistances\n Middle : **${player2}** jouant ${playerChamp2}, **KDA** : ${player2kills} kills, ${player2deaths} morts, ${player2assists} assistances\n ADC : **${player3}** jouant ${playerChamp3}, **KDA** : ${player3kills} kills, ${player3deaths} morts, ${player3assists} assistances\n Support : **${player4}** jouant ${playerChamp4}, **KDA** : ${player4kills} kills, ${player4deaths} morts, ${player4assists} assistances`)
        .addField(team2, `Top : **${player5}** jouant ${playerChamp5}, **KDA** : ${player5kills} kills, ${player5deaths} morts, ${player5assists} assistances\n Jungle : **${player6}** jouant ${playerChamp6}, **KDA** : ${player6kills} kills, ${player6deaths} morts, ${player6assists} assistances\n Middle : **${player7}** jouant ${playerChamp7}, **KDA** : ${player7kills} kills, ${player7deaths} morts, ${player7assists} assistances\n ADC : **${player8}** jouant ${playerChamp8}, **KDA** : ${player8kills} kills, ${player8deaths} morts, ${player8assists} assistances\n Support : **${player9}** jouant ${playerChamp9}, **KDA** : ${player9kills} kills, ${player9deaths} morts, ${player9assists} assistances`)
        message.channel.send(matchEmbed)
    }}