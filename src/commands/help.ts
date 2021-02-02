import config from '../../config.json'
import { Message, MessageEmbed } from 'discord.js'

import { IBot } from '../interfaces'

module.exports.run = async (_bot: IBot, message: Message, _args: any) => {
  const helpEmbed = new MessageEmbed()
    .setColor('#00FF00')
    .setAuthor('Define Cultured', 'https://i.imgur.com/mVKllA1.jpg', 'https://definecultured.com/')
    .setThumbnail('https://i.imgur.com/mVKllA1.jpg')
    .addField('!clearcache', 'Clear current cache. (alias !cc)')
    .addField('!emails', 'Get current amount of emails. (alias !e)')
    .addField('!export', 'Export current signup data to CSV file.')
    .addField('!help', 'Show this help embed. (alias !commands)')
    .addField('!p <symbol>', 'Get price for stock by symbol. (alias !s)')
    .setTimestamp()
    .setFooter(`Define Cultured Bot v${config.version}`)

  message.channel.send(helpEmbed)
}

module.exports.command = {
  name: 'help',
  alias: 'commands'
}
