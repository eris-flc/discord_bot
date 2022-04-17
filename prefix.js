const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'prefix',
    permissions: ['ADMINISTRATOR'],
    category: 'admin',
    ownerOnly: false,
    aliases: '',
    cooldown: 1 * 30,
    usage: 'prefix',
    examples: ['prefix'],
    description: 'Permet de changer  le prefix du serveur.',
    run: (client, message, args, db) => {
        db.query(`SELECT * FROM serveur WHERE guildID = ?`, [message.guild.id], async (err, req) => {
            let prefix = args[0];
            if(!prefix) return message.reply('Veuillez entrer un prefix');
            const beforePrefix = req[0].prefix;
            db.query('UPDATE serveur SET prefix = ? WHERE guildID = ?', [prefix, message.guild.id]);

            const embed = new MessageEmbed()
            .setColor('#4F037D')
            .setTitle('Changement du prefix !')
            .setTimestamp()
            .setDescription(`Le prefix du serveur a changé de : \`${beforePrefix}\` -> \`${prefix}\``)
            .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL()});
            message.channel.send({ embeds: [embed] })
        });
    },
    options: [
        {
            name: 'prefix',
            description: 'Entrez le nouveau prefix.',
            type: 'STRING',
            required: true,
        
        }
    ],
    async runInteraction(client, interaction, db){
        
        db.query(`SELECT * FROM serveur WHERE guildID = ${interaction.guild.id}`, async (err, req) => {
            const pprefix = interaction.options.getString('prefix')
            let prefix = pprefix;
            const beforePrefix = req[0].prefix;
            db.query('UPDATE serveur SET prefix = ? WHERE guildID = ?', [prefix, interaction.guild.id]);

            const embed = new MessageEmbed()
            .setColor('#4F037D')
            .setTitle('Changement du prefix !')
            .setTimestamp()
            .setDescription(`Le prefix du serveur a changé de : \`${beforePrefix}\` -> \`${prefix}\``)
            .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()});
            interaction.reply({ embeds: [embed] })
        });
    },
}