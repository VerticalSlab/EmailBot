const Discord = require('discord.js');

const HelpEmbed = new Discord.MessageEmbed()
    .setColor('#0b6b19')
    .setTitle('MAIL BOT HELP')
    .setDescription('All agruments seperated by "; " the prefix is "!".')
    .addFields(
        { name: '!help', value: 'posts the helpembed' },
        { name: '!mailinglist; <EmailAdress>; <EmailAdress>; <EmailAdress>, ...', value: 'Adds an Email Adress(es) to mailing list.' },
        { name: '!mailinglist; view', value: 'shows the contents of the Mail List'},
        { name: '!mailinglist; clear', value: 'Clears the mailing list THIS IS IRREVERSABLE AND CANNOT BE UNDONE !!!You must be an admin to use this command!!!'},
        { name: '!email; <Title(Subject)>; <Description(Body)>', value: 'Sends an Email to the Email list for the server you are on. Also Sends the Message as an embed !!!Cannot use if you cannot mention everyone!!!' }
    )
module.exports = HelpEmbed;