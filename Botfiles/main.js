// Import Modules
const Discord = require('discord.js');
const fs = require('fs');
const privateinfo = require('./privateinfo.json');

const HelpEmbed = require('./Helpembed.js')

const nodemailer = require('nodemailer');
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

    //read mailing list
    const MailingList = fs.readFileSync('./MailingList.json').toString();
    if (cmd == 'embed') {
        //Created the custom Embed
        const embed = new Discord.MessageEmbed()
            .setColor('#0b6b19')
            .setTitle(args[0])
            .setDescription(args[1]);
        if (args[2] == 'mail') {
            const embedmail = {
                from: 'noreplytroop302@gmail.com',
                to: MailingList,
                subject: args[1],
                text: args[2]
            };
            console.log('E-mail sending');
            transportmailer.sendMail(embedmail, (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('E-mail Sent' + info.response);
                }

            });
        }
        // sends the embed
        msg.channel.send({ embeds: [embed] });
        msg.delete();
    }
    else if (cmd == 'mailinglist') {
        console.log(MailingList);
        // const newmailinglist = MailingList.
        fs.writeFile('./MailingList.json', newmailinglist, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    else if (cmd == 'help') {
        msg.channel.send({ embeds: [HelpEmbed] });
    }

});

client.login(privateinfo.Token);
