import _ from 'lodash'
import { Message, MessageEmbed } from 'discord.js'
import moment from 'moment-timezone'

import config from '../../config.json'
import { IBot } from '../interfaces'
import StockAPI from '../utils/StockAPI'

import { prettyPrice } from '../utils/helpers'

module.exports.run = async (_bot: IBot, message: Message, args: any) => {
  if (!args.length) return message.channel.send('Missing symbol')

  try {
    const symbol = args[0].toString().toUpperCase().trim()
    const { data } = await StockAPI.get(symbol)

    if (!data.t) return message.channel.send(`No data found for ${symbol}`)

    const stockEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setAuthor('Define Cultured', 'https://i.imgur.com/mVKllA1.jpg', 'https://definecultured.com/')
      .addField('Prev. Close', `$${prettyPrice(data.pc)}`, true)
      .addField('Low', `$${prettyPrice(data.l)}`, true)
      .addField('High', `$${prettyPrice(data.h)}`, true)
      .addField('Open', `$${prettyPrice(data.o)}`, true)
      .addField('Current Price', `$${prettyPrice(data.c)}`, true)
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
  alias: 'stock'
}
