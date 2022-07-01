const Discord = require('discord.js')
const Client = new Discord.Client()
const ms = require('ms')
const fs = require('fs')
const moongose = require('mongoose')
const axios = require('axios')
const moment = require('moment')
Client.commands = new Discord.Collection()
const Timeout = new Discord.Collection()

const config = require("./config.json")
const token = require("./token.json")
const eco = require("./economy.json")


let prefix
let bienvenue_statut
let logs_statut 
let suggest_statut
let welcomeMessage
let roleBienvenue_statut
let clear_messages
if(config["prefix"]) {
    prefix = config["prefix"]
} else {
    prefix = "+"
}

Client.on("guildMemberAdd", async member => {
    if(config["statut-bienvenue"] == true) {
    Client.channels.cache.get(config["id_bienvenue"]).send(`Bienvenue sur le serveur ${member}`);
    const welcomeEmbed = new Discord.MessageEmbed()
    .setColor("RED")
    .setAuthor("Bienvenue à " + member.user.tag ,member.user.displayAvatarURL({dynamic: true}))
    .setDescription(`Tu es notre ${member.guild.members.cache.size}ème membre !`)
    .addField("N'hésite pas à aller voir le règlement", "<#920746514685501480>")
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    
    Client.channels.cache.get(config["id_bienvenue"]).send(welcomeEmbed)
    }

    if(config["role-bienvenue"] == true) {
        if(config["role_bienvenue"] == undefined) return
        member.roles.add(config["role_bienvenue"])
    }
})

Client.on("ready", async (message) => {

    Client.user.setActivity(config["bios-bot"], {type: config["statutType"]})
    console.log("bot opérationnel")
    
})

Client.on("guildCreate", (guild) => {
    
    // Ajout de l'id du serveur rejoins par le bot ainsi que les données nécessaires pour le bot dans la base de donnée
    
    config["statut-logs"] = false
    config["statut-bienvenue"] = false
    config["role-bienvenue"] = false
    config["statutType"] = "PLAYING"
    config["bios-bot"] = ""
    config["id_logs"] = ""
    config["role_bienvenue"] = ""
    config["id_bienvenue"] = ""
    config["message_bienvenue"] = ""
    config["id_suggest"] = ""
    Savebdd()

    
    
    // Message automatique lorsque le bot rejoins un serveur
    let channelToSend;
    
    guild.channels.cache.forEach((channel) => {
        if (
            channel.type === "text" &&
            !channelToSend &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        ) channelToSend = channel;
    });

    if(!channelToSend) return;

    channelToSend.send(
        new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true}))
            .setDescription("Merci de m'avoir ajouté sur votre serveur ! Mon prefix de base est `+` \n N'hésitez pas à réaliser la commande `+config` pour me configurer")
            .setColor("RED")

    )
})

const { readdirSync } = require("fs");

const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
  
        for(const files of commands) {
            const getFileName = require(`${dir}/${dirs}/${files}`)
            Client.commands.set(getFileName.name, getFileName);
            console.log(`Commande ${getFileName.name} chargée dans ${dirs}`);
      if(!files) return console.log(`Aucune commande trouvée dans ${dirs}.`)
        };
    });
  };
  loadCommands();

  



  Client.on(`message`, async message => {

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let Args = messageArray.slice(1);
    var args = message.content.substring(prefix.length).split(" ");

    if(message.content.startsWith(prefix)){
    let commandeFile = Client.commands.get(cmd.slice(prefix.length));
    if (commandeFile) { 
        if(commandeFile.timeout) {
            if(Timeout.has(`${commandeFile.name}${message.author.id}`)) return message.channel.send(`Vous devez attendre **${ms(Timeout.get(`${commandeFile.name}${message.author.id}`) - Date.now(), {long: true})}** avant de pouvoir exécuter cette commande de nouveau !`)
            Timeout.set(`${commandeFile.name}${message.author.id}`, Date.now() + commandeFile.timeout)
            setTimeout(() => {
                Timeout.delete(`${commandeFile.name}${message.author.id}`)
            }, commandeFile.timeout)
        }
        commandeFile.run(Client, message, args, config, token, eco)
    }
    
}
})  

Client.on("message", async message => {
    if(message.content.startsWith(prefix + "test")) {
        message.channel.send("Oui, je suis là !")
    }

    if(message.content.startsWith("ratio")) {
        message.react("❤️")
        message.react("🔁")
    }

    if(message.content.startsWith("Ratio")) {
        message.react("❤️")
        message.react("🔁")
    }
})    

////////////////////////////////LOGS////////////////////////////////////

Client.on('messageDelete', async message => {
    if(config["statut-logs"] == true) {
        if(message.author.bot) return;
        if(message.content.startsWith(prefix)) return;
        console.log(`Message supprimé : ${message.content}`)
        const embedLogsMessageDelete = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
            .addField("Message supprimé :", message.content)
            .addField("Salon :", message.channel)
        Client.channels.cache.get(config["id_logs"]).send(embedLogsMessageDelete);    
    }

    
})

/*Client.on('roleCreate', async role=> {
    if(config["statut-logs"] == true) {
        const embedLogsRoleCreate = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor("Rôle crée.")
            .addField("Nommé :", role.name)
            
        Client.channels.cache.get(config["id_logs"]).send(embedLogsRoleCreate);    
    }
})*/

Client.on('roleDelete', async role => {
    if(config["statut-logs"] == true) {
        const embedLogsRoleDelete = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor("Rôle Supprimé.")
            .addField("Nommé :", role.name)
            
        Client.channels.cache.get(config["id_logs"]).send(embedLogsRoleDelete); 
    }
})

Client.on('roleUpdate', async oldRole => {
    if(config["statut-logs"] == true) {
        const embedLogsRoleUpdate = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor("Rôle mis à jour")
        .addField("Ancien nom :", oldRole.name)
    }
})

Client.on('messageUpdate', async message => {
    if(message.author.bot) return;
    if(config["statut-logs"] == true) {
        const embedLogsMessageEdited = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
            .addField("Message édité :", message.content)
            .addField("Salon :", message.channel)
        Client.channels.cache.get(config["id_logs"]).send(embedLogsMessageEdited);  
    }
})

Client.on('channelCreate', async channel => {
    if(config["statut-logs"] == true) {
        const embedLogsChannelCreate = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor("Salon crée")
            .addField("Nom :", channel.name)
            Client.channels.cache.get(config["id_logs"]).send(embedLogsChannelCreate);  
    }
})

Client.on('channelDelete', async channel => {
    if(config["statut-logs"] == true) {
        const embedLogsChannelDeleted = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor("Salon supprimé")
            .addField("Nom :", channel.name)
            Client.channels.cache.get(config["id_logs"]).send(embedLogsChannelDeleted);  
    }
})

function Savebdd() {
    fs.writeFile("./config.json", JSON.stringify(config, null, 4), (err) => {
        if(err) message.channel.send("Une erreur est survenue !")
    })
}

Client.login(token.token)