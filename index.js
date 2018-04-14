const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const client = new Discord.Client();

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var prefix = ("**")

bot.on('ready', function() {
    bot.user.setGame("Command: $help for help");
    console.log("Connected");
});

bot.login("NDM0NzE4NzM3OTA0NDM1MjAw.DbOe9Q.BsPrYQqjfZ-zXfwXsD9zkbmj76o");

bot.on('message', message => {

    if (message.content === prefix + "avatar")
    message.reply(message.author.avatarURL);

    if (message.content === prefix + "reglesRp")
    message.reply("Voici le Rappel des Régles Rp : \n deux étoile [*] | pour les penser Ex : *Je me fait chier* \n **** | pour les actions Ex : **Te tape bien fort dans ton cochi** \n Pour le dialogue Ex : Bla bla CLAIR \n () pour le Hors-rp Ex : ( PUTAIN TU FAIT NIMP )");

    if (message.content === "Salut"){
        message.reply("Bien le bonjour. :)");
        console.log("Commande Salut effectué");

    }

    if (message.content === prefix + "blaguelist")
    message.reply("Pour faire une blague faite **blague[Numéro de la blague] \n -1 Blague du jour \n -2 Humour deux poules discutent ");

    if(message.content === prefix + "help")
        var embed = new Discord.RichEmbed()
        .setTitle("Liste des commandes")
        .setDescription("-**help | Permet d'avoir la liste des commandes \n -**Blaguelist | Permet d'afficher les blagues disponible \n -**avatar | permet d'afficher votre avatar \n -**reglesRp | fait un rapide Rappels des regles Rp \n -**xp | Permet d'afficher votre xp") 
        .addField("Utilisateurs sur le Discord", message.guild.memberCount)
        .setColor("#F3DB00")
    message.channel.sendEmbed(embed)

        if (message.content === prefix + "blague1")
        message.reply("La blague du jour \n Un mec demande a son pote:\n - Tu préfères avoir la maladie d'alzheimer ou de parkinson? \n Son pote lui répond:\n - Je sais pas, tu préfères quoi toi ? \n Et il lui dit :\n- Moi je préfère parkinson, parce que vaut mieux renverser une goutte de Ricard que d'oublier de le boire...")

        if (message.content === prefix  + "blague2")
        message.reply("Les nouvelles blagues\n- Humour Deux poules discutent:\n- Comment vas-tu ma cocotte?\n- Pas très bien. Je crois que je couve quelque chose ! ")

        var msgauthor =  message.author.id;

        if(message.author.bot)return;
    
        if(!db.get("xp").find({user: msgauthor}).value()){
            db.get("xp").push({user: msgauthor, xp: 1}).write();
        }else{
            var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
            console.log(userxpdb);
            var userxp = Object.values(userxpdb)
            console.log(userxp)
            console.log(`Nombre d'xp: ${userxp[1]}`)
    
            db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    
        if (message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Stat des Xp de ${message.author.username}`)
                .setColor('F4D03F')
                .setDescription("Affichage des Xp")
                .addField("XP:", `${xpfinal[1]} xp`)
                .setFooter("Enjoy :p")
            message.channel.send({embed: xp_embed});
}}})
