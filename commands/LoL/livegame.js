const Discord = require('discord.js')
const axios = require('axios')


module.exports= {
    name: 'livegame' ,
    run: async(Client, message, args, config, token) => { 
        const riotApiKey = token["riotApiKey"]
          //récupération du pseudo du joueur
          var name = args.slice(1).join(" ")
          if(!name) return 
  
          // récupération des données personnelles de l'utilisateur indiqué via discord + return
          const profile = await axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotApiKey).catch(err => {
             return message.channel.send("Ce pseudo a été mal écrit ou n'existe pas")
          })
  
          // identifiant du joueur
          if(profile) {
          var encryptedId = profile.data.id 
          } 

          console.log(encryptedId)
          
          // récupération et listage de toutes les informations ranked du joueur
          let livegame
          if(profile) {
              livegame = await axios.get('https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/' + encryptedId + "?api_key=" + riotApiKey).catch(err => {
                return message.channel.send("Ce joueur n'est actuellement pas en game !")
              })
          } 

          console.log(livegame)

          let player0 = livegame.data.participants[0].summonerName
          let player1 = livegame.data.participants[1].summonerName
          let player2 = livegame.data.participants[2].summonerName
          let player3 = livegame.data.participants[3].summonerName
          let player4 = livegame.data.participants[4].summonerName
          let player5 = livegame.data.participants[5].summonerName
          let player6 = livegame.data.participants[6].summonerName
          let player7 = livegame.data.participants[7].summonerName
          let player8 = livegame.data.participants[8].summonerName
          let player9 = livegame.data.participants[9].summonerName

          let champJson = await axios.get("http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/champion.json")
          console.log(champJson)

        
          /*let playerChamp1 = 
          let playerChamp2 = 
          let playerChamp3 = 
          let playerChamp4 = 
          let playerChamp5 = 
          let playerChamp6 = 
          let playerChamp7 = 
          let playerChamp8 =
          let playerChamp9 = */
          
          var livegameEmbed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
          .addField("Team 1", `Joueur 1 : ${player0}\nJoueur 2 : ${player1}\nJoueur 3 : ${player2}\nJoueur 4 : ${player3}\nJoueur 5 : ${player4}`)
          .addField("Team 2", `Joueur 1 : ${player5}\nJoueur 2 : ${player6}\nJoueur 3 : ${player7}\nJoueur 4 : ${player8}\nJoueur 5 : ${player9}`)
          message.channel.send(livegameEmbed)

        }}