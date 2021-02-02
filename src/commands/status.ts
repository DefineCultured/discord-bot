import config from '../../config.json'
import { Message, MessageEmbed } from 'discord.js'

import { IBot } from '../interfaces'

module.exports.run = async (bot: IBot, message: Message, _args: any) => {
  const statusEmbed = new MessageEmbed()
    .setColor('#000000')
    .setAuthor('Define Cultured', 'https://i.imgur.com/mVKllA1.jpg', 'https://definecultured.com/')
    .setThumbnail('https://i.imgur.com/mVKllA1.jpg')
    .addField('Bot Latency', `${Date.now() - message.createdTimestamp}ms`)
    .addField('API Latency', `${Math.round(bot.ws.ping)}ms`)
    .setTimestamp()
    .setFooter(`Define Cultured Bot v${config.version}`)

  message.channel.send(statusEmbed)
}

module.exports.command = {
  name: 'status'
}
