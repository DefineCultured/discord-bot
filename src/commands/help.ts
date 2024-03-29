import { version } from '../../package.json'
import { Message, MessageEmbed } from 'discord.js'

import { IBot } from '../interfaces'

module.exports.run = async (_bot: IBot, message: Message, _args: any) => {
  const helpEmbed = new MessageEmbed()
    .setColor('#00FF00')
    .setAuthor('Define Cultured', 'https://i.imgur.com/mVKllA1.jpg', 'https://definecultured.com/')
    .setThumbnail('https://i.imgur.com/mVKllA1.jpg')
    .addField('!help', 'Show this help embed. (alias !commands)')
    .addField('!p <symbol>', 'Get price for stock by symbol. (alias !stock)')
    .addField('!c <symbol>', 'Get price for crypto by symbol. (alias !crypto)')
    .addField('!shorten <url> <keyword?>', 'Shorten URL. Keyword is optional.')
    .setTimestamp()
    .setFooter(`Define Cultured Bot v${version}`)

  message.channel.send(helpEmbed)
}

module.exports.command = {
  name: 'help',
  alias: 'commands'
}
