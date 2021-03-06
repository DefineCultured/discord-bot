import _ from 'lodash'
import { Message, MessageEmbed } from 'discord.js'
import moment from 'moment-timezone'

import config from '../../config.json'
import { IBot } from '../interfaces'
import StockAPI from '../utils/StockAPI'

module.exports.run = async (_bot: IBot, message: Message, args: any) => {
  if (!args.length) return message.channel.send('Missing symbol')

  try {
    const symbol = args[0].toString().toUpperCase().trim()
    const { data } = await StockAPI.get(symbol)

    if (!data.t) return message.channel.send(`No data found for ${symbol}`)

    const stockEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setAuthor('Define Cultured', 'https://i.imgur.com/mVKllA1.jpg', 'https://definecultured.com/')
      .addField('Open', `$${data.o}`, true)
      .addField('Previous Close', `$${data.pc}`, true)
      .addField('High', `$${data.h}`, true)
      .addField('Low', `$${data.l}`, true)
      .addField('Current', `$${data.c}`, true)
      .addField('Price at', moment.unix(data.t).tz('America/New_York').format('ddd, MMM Do, h:mm a'))
      .setTimestamp()
      .setFooter(`Define Cultured Bot v${config.version}`)

    message.channel.send(stockEmbed)
  } catch (e) {
    console.error(e)
    return message.channel.send('Something went wrong..')
  }
}

module.exports.command = {
  name: 'p',
  alias: 's'
}
