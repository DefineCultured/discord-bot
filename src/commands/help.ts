import config from '../../config.json'
import { Message, MessageEmbed } from 'discord.js'

import { IBot } from '../interfaces'

module.exports.run = async (_bot: IBot, message: Message, _args: any) => {
  const helpEmbed = new MessageEmbed()
    .setColor('#00FF00')
    .setAuthor('Define Cultured', 'https://i.imgur.com/mVKllA1.jpg', 'https://definecultured.com/')
    .setThumbnail('https://i.imgur.com/mVKllA1.jpg')
    .addField('!cc', 'Clear current email cache. (alias !clearcache)')
    .addField('!e', 'Get current amount of emails. (alias !emails)')
    .addField('!export', 'Export current signup data to CSV file.')
    .addField('!help', 'Show this help embed. (alias !commands)')
    .addField('!p <symbol>', 'Get price for stock by symbol. (alias !stock)')
    .addField('!c <symbol>', 'Get price for crypto by symbol. (alias !crypto)')
    .addField('!shorten <url> <keyword?>', 'Shorten URL. Keyword is optional.')
    .setTimestamp()
    .setFooter(`Define Cultured Bot v${config.version}`)

  message.channel.send(helpEmbed)
}

module.exports.command = {
  name: 'help',
  alias: 'commands'
}
