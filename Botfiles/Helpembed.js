const Discord = require('discord.js');

const HelpEmbed = new Discord.MessageEmbed()
    .setColor('#0b6b19')
    .setTitle('MAIL BOT HELP')
    .setDescription('All agruments seperated by "; " the prefix is "!". DO NOT SPAM ANY OF THESE COMMANDS')
    .addFields(
        { name: '!help', value: 'posts the helpembed' },
        { name: '!mailinglist; <EmailAdress>', value: 'Add one Email Adress to mailing list.' },
        { name: '!email; <Title(Subject)>; <Description(Text)>; <Mail(Leave blank for no mail)>', value: 'Embed command embeds messages if the mail tag is included it will send it to the mailing list as an E-mail' }
    )
module.exports = HelpEmbed;