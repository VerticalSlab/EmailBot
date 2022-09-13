// Import Modules
const Discord = require('discord.js');
const fs = require('fs');
const privateinfo = require('./privateinfo.json');

const HelpEmbed = require('./Helpembed.js')

const nodemailer = require('nodemailer');
const { channel } = require('diagnostics_channel');
const transportmailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: privateinfo.username,
        pass: privateinfo.password
    }
})


const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '!';


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (msg) => {
    // Filter out normal msgs
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split('; ');
    const cmd = args.shift().toLowerCase();

    console.log(`Command:${cmd} Arguments:${args}`);
    const guildid = msg.guild.id;

    const Emaillist = JSON.parse(fs.readFileSync(`./Botfiles/Emaillist.json`));

    if (cmd == 'email') {
        if (!msg.member.permissions.has(Discord.Permissions.FLAGS.MENTION_EVERYONE)) {
            msg.channel.send('You are not trusted to send Emails')
            return;
        }
        //Created the custom Embed
        const embed = new Discord.MessageEmbed()
            .setColor('#0b6b19')
            .setTitle(args[0])
            .setDescription(args[1]);
        const embedmail = {
            from: privateinfo.username,
            to: Emaillist[guildid].toString(),
            subject: args[0],
            text: args[1]
        }
        console.log('E-mail sending...');
        transportmailer.sendMail(embedmail, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('E-mail Sent' + info.response);
            }
        });
        // sends the embed
        msg.channel.send({ embeds: [embed] });
        msg.delete();
    }

    else if (cmd == 'mailinglist') {
        if (args[0] == 'view') {  
            msg.channel.send(`Mailing List for ${msg.guild.name}: ${Emaillist[guildid]}`);
            return;
        }
        if (args[0] == 'clear') {
            if (msg.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)){
                msg.channel.send('You do not have permission to clear the MailingList');
                return;
            }
            Emaillist[guildid] = [];
        } else {
            if (!args[0].includes('@' || '.') || args[0].includes(' ')) {
                msg.channel.send('Sorry that E-mail is not valid');
                return;
            }
            var servermaillist = Emaillist[guildid];
    
            if (Emaillist[guildid] == null) {
                Emaillist[guildid] = [];
            }
            
            servermaillist = servermaillist.concat(args);
            Emaillist[guildid] = servermaillist;
        }
        
        let data = JSON.stringify(Emaillist);
        fs.writeFile('./Botfiles/Emaillist.json', data, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Succsesfuly added Email')
            }
        })
        msg.channel.send('Email Succsesfully Added')
    }
    else if (cmd == 'help') {
        msg.channel.send({ embeds: [HelpEmbed] });
    }

});

client.login(privateinfo.Token);
